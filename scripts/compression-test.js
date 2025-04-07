#!/usr/bin/env node

/**
 * Compression Test Script
 * 
 * This script tests if your server is properly compressing text resources.
 * It identifies compression issues that can cause Lighthouse warnings.
 * 
 * Usage: node scripts/compression-test.js [url]
 */

import fetch from 'node-fetch';
import chalk from 'chalk';
import { createWriteStream } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { promisify } from 'util';
import { exec } from 'child_process';

const execPromise = promisify(exec);

// Get directory path
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const reportsDir = join(__dirname, '..', 'performance-reports');

// Default URL to test
const DEFAULT_URL = 'http://localhost:3000';
const url = process.argv[2] || DEFAULT_URL;

// File extensions to test for compression
const TEXT_EXTENSIONS = [
  '.html', '.css', '.js', '.json', '.svg', '.xml', '.txt'
];

// Size threshold for compression warning (bytes)
const COMPRESSION_THRESHOLD = 1024; // 1KB

/**
 * Get resources from a page
 */
async function getPageResources(url) {
  try {
    console.log(chalk.blue(`🔍 Analyzing ${url}...`));
    
    // Fetch the main HTML page
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Failed to fetch ${url}: ${response.status} ${response.statusText}`);
    }
    
    const html = await response.text();
    
    // Build the list of resources
    const resources = [
      { url, type: 'html', contentType: response.headers.get('content-type') }
    ];
    
    // Extract CSS, JS, and other resources from HTML
    const cssLinks = html.match(/<link[^>]*rel=["']stylesheet["'][^>]*href=["']([^"']+)["'][^>]*>/g) || [];
    const jsLinks = html.match(/<script[^>]*src=["']([^"']+)["'][^>]*>/g) || [];
    const imgLinks = html.match(/<img[^>]*src=["']([^"']+)["'][^>]*>/g) || [];
    
    // Extract URLs from link tags
    cssLinks.forEach(link => {
      const match = link.match(/href=["']([^"']+)["']/);
      if (match && match[1]) {
        let resourceUrl = match[1];
        if (resourceUrl.startsWith('/')) {
          const urlObj = new URL(url);
          resourceUrl = `${urlObj.protocol}//${urlObj.host}${resourceUrl}`;
        } else if (!resourceUrl.startsWith('http')) {
          resourceUrl = new URL(resourceUrl, url).toString();
        }
        resources.push({ url: resourceUrl, type: 'css', contentType: 'text/css' });
      }
    });
    
    // Extract URLs from script tags
    jsLinks.forEach(link => {
      const match = link.match(/src=["']([^"']+)["']/);
      if (match && match[1]) {
        let resourceUrl = match[1];
        if (resourceUrl.startsWith('/')) {
          const urlObj = new URL(url);
          resourceUrl = `${urlObj.protocol}//${urlObj.host}${resourceUrl}`;
        } else if (!resourceUrl.startsWith('http')) {
          resourceUrl = new URL(resourceUrl, url).toString();
        }
        resources.push({ url: resourceUrl, type: 'js', contentType: 'application/javascript' });
      }
    });
    
    // Other text resources might be included based on file extensions
    
    return resources;
  } catch (error) {
    console.error(`Error getting page resources: ${error.message}`);
    return [];
  }
}

/**
 * Test if a resource is properly compressed
 */
async function testResourceCompression(resource) {
  try {
    // Get file extension
    const urlPath = new URL(resource.url).pathname;
    const ext = urlPath.substring(urlPath.lastIndexOf('.')).toLowerCase();
    
    // Skip non-text resources based on extension
    if (!TEXT_EXTENSIONS.includes(ext)) {
      return null;
    }
    
    // Request with compression
    const compressedResponse = await fetch(resource.url, {
      headers: {
        'Accept-Encoding': 'gzip, deflate, br'
      }
    });
    
    if (!compressedResponse.ok) {
      return {
        ...resource,
        status: 'error',
        statusCode: compressedResponse.status,
        message: `HTTP error: ${compressedResponse.status}`
      };
    }
    
    // Get response details
    const contentEncoding = compressedResponse.headers.get('content-encoding');
    const contentLength = compressedResponse.headers.get('content-length');
    const contentType = compressedResponse.headers.get('content-type');
    const cacheControl = compressedResponse.headers.get('cache-control');
    const body = await compressedResponse.buffer();
    
    // Request without compression for comparison
    const uncompressedResponse = await fetch(resource.url, {
      headers: {
        'Accept-Encoding': 'identity'
      }
    });
    
    const uncompressedBody = await uncompressedResponse.buffer();
    const uncompressedLength = uncompressedBody.length;
    
    // Determine compression status
    const isCompressed = !!contentEncoding;
    const compressionRatio = isCompressed ? (1 - (body.length / uncompressedLength)) * 100 : 0;
    
    const status = isCompressed ? 'compressed' : (
      uncompressedLength >= COMPRESSION_THRESHOLD ? 'not_compressed' : 'too_small'
    );
    
    return {
      ...resource,
      contentType,
      contentEncoding,
      contentLength: body.length,
      uncompressedLength,
      compressionRatio: compressionRatio.toFixed(2),
      cacheControl,
      status,
      extension: ext,
      message: isCompressed 
        ? `Compressed with ${contentEncoding} (${compressionRatio.toFixed(2)}% saved)`
        : (uncompressedLength >= COMPRESSION_THRESHOLD 
            ? 'Not compressed but should be'
            : 'Too small to require compression')
    };
  } catch (error) {
    return {
      ...resource,
      status: 'error',
      message: `Error: ${error.message}`
    };
  }
}

/**
 * Generate a report of compression issues
 */
async function generateReport(results) {
  // Calculate statistics
  const totalResources = results.length;
  const compressedResources = results.filter(r => r.status === 'compressed').length;
  const uncompressedResources = results.filter(r => r.status === 'not_compressed').length;
  const smallResources = results.filter(r => r.status === 'too_small').length;
  const errorResources = results.filter(r => r.status === 'error').length;
  
  // Calculate potential savings
  let potentialSavingsBytes = 0;
  results.forEach(result => {
    if (result.status === 'not_compressed' && result.uncompressedLength) {
      // Estimate savings using typical compression ratio of 70%
      potentialSavingsBytes += Math.floor(result.uncompressedLength * 0.7);
    }
  });
  
  // Format sizes
  const potentialSavingsKB = (potentialSavingsBytes / 1024).toFixed(2);
  
  // Generate a simple HTML report
  const reportPath = join(reportsDir, `compression-report-${Date.now()}.html`);
  const reportStream = createWriteStream(reportPath);
  
  const reportHtml = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Compression Analysis Report</title>
  <style>
    body {
      font-family: -apple-system, system-ui, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
      line-height: 1.5;
      max-width: 1200px;
      margin: 0 auto;
      padding: 20px;
      color: #333;
    }
    h1, h2 {
      color: #1a73e8;
    }
    .summary {
      display: flex;
      flex-wrap: wrap;
      gap: 15px;
      margin: 20px 0;
    }
    .summary-item {
      flex: 1;
      min-width: 250px;
      padding: 15px;
      border-radius: 8px;
      background: #f5f5f5;
    }
    .compressed {
      color: #0cce6b;
    }
    .not-compressed {
      color: #ff4e42;
      font-weight: bold;
    }
    .issues {
      color: #ff4e42;
    }
    table {
      border-collapse: collapse;
      width: 100%;
      margin: 20px 0;
    }
    th, td {
      padding: 8px 12px;
      text-align: left;
      border-bottom: 1px solid #ddd;
    }
    th {
      background-color: #f2f2f2;
      position: sticky;
      top: 0;
    }
    tr:hover {
      background-color: #f9f9f9;
    }
    .resource-url {
      max-width: 300px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .recommendations {
      background: #e8f0fe;
      padding: 20px;
      border-radius: 8px;
      margin: 20px 0;
    }
    .header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 20px;
    }
  </style>
</head>
<body>
  <div class="header">
    <h1>Compression Analysis Report</h1>
    <div>
      <p>URL: ${url}</p>
      <p>Date: ${new Date().toLocaleString()}</p>
    </div>
  </div>

  <h2>Summary</h2>
  <div class="summary">
    <div class="summary-item">
      <h3>Resources Analyzed</h3>
      <p>${totalResources} total resources</p>
      <p><span class="compressed">${compressedResources} compressed</span></p>
      <p><span class="not-compressed">${uncompressedResources} not compressed</span></p>
      <p>${smallResources} too small to require compression</p>
      <p>${errorResources} errors</p>
    </div>
    
    <div class="summary-item">
      <h3>Potential Savings</h3>
      <p class="${potentialSavingsBytes > 0 ? 'issues' : 'compressed'}">
        ${potentialSavingsKB} KB
      </p>
      <p>Estimated improvement by compressing all text resources</p>
    </div>
    
    <div class="summary-item">
      <h3>Lighthouse Impact</h3>
      <p class="${potentialSavingsBytes > 100 * 1024 ? 'issues' : 'compressed'}">
        ${potentialSavingsBytes > 100 * 1024 ? 'Will trigger Lighthouse warning' : 'Should pass Lighthouse check'}
      </p>
      <p>Lighthouse flags when potential savings exceed 100KB</p>
    </div>
  </div>

  ${uncompressedResources > 0 ? `
  <div class="recommendations">
    <h2>Recommendations</h2>
    <p>The following steps will help resolve compression issues:</p>
    <ol>
      <li>Enable <strong>Gzip</strong> and <strong>Brotli</strong> compression on your server</li>
      <li>Verify that the <code>Content-Encoding</code> header is present on text resources</li>
      <li>Ensure the <code>Accept-Encoding</code> header is properly processed</li>
      <li>Check server configuration for compression settings</li>
    </ol>
    <p>For Node.js servers, use <code>compression</code> middleware. For Apache, use <code>mod_deflate</code> or <code>mod_brotli</code>.</p>
  </div>
  ` : ''}

  <h2>Resource Details</h2>
  <table>
    <thead>
      <tr>
        <th>Resource</th>
        <th>Type</th>
        <th>Status</th>
        <th>Size (Compressed)</th>
        <th>Size (Uncompressed)</th>
        <th>Compression</th>
        <th>Details</th>
      </tr>
    </thead>
    <tbody>
      ${results.map(resource => `
        <tr>
          <td class="resource-url" title="${resource.url}">${new URL(resource.url).pathname}</td>
          <td>${resource.contentType || resource.type || 'unknown'}</td>
          <td class="${resource.status === 'compressed' ? 'compressed' : (resource.status === 'not_compressed' ? 'not-compressed' : '')}">${resource.status}</td>
          <td>${resource.contentLength ? (resource.contentLength / 1024).toFixed(2) + ' KB' : 'N/A'}</td>
          <td>${resource.uncompressedLength ? (resource.uncompressedLength / 1024).toFixed(2) + ' KB' : 'N/A'}</td>
          <td>${resource.status === 'compressed' ? resource.contentEncoding : 'none'}</td>
          <td>${resource.message}</td>
        </tr>
      `).join('')}
    </tbody>
  </table>
</body>
</html>
  `;
  
  reportStream.write(reportHtml);
  reportStream.end();
  
  console.log(chalk.green(`✅ Report generated: ${reportPath}`));
  
  // Try to open the report
  try {
    if (process.platform === 'darwin') {
      await execPromise(`open ${reportPath}`);
    } else if (process.platform === 'win32') {
      await execPromise(`start ${reportPath}`);
    } else {
      await execPromise(`xdg-open ${reportPath}`);
    }
  } catch (error) {
    console.log(chalk.yellow(`ℹ️ Couldn't open the report automatically. Please open it manually.`));
  }
  
  return {
    totalResources,
    compressedResources,
    uncompressedResources,
    smallResources,
    errorResources,
    potentialSavingsKB
  };
}

// Main function
async function main() {
  console.log(chalk.blue('🚀 Starting compression analysis...'));
  
  // Get resources from the page
  const resources = await getPageResources(url);
  console.log(chalk.blue(`Found ${resources.length} resources to analyze`));
  
  // Test compression for each resource
  const results = [];
  for (const resource of resources) {
    console.log(chalk.dim(`Testing: ${resource.url}`));
    const result = await testResourceCompression(resource);
    if (result) results.push(result);
  }
  
  // Log summary in console
  console.log('\n' + chalk.blue('📊 Compression Summary:'));
  const textResources = results.filter(r => r);
  const compressedResources = textResources.filter(r => r.status === 'compressed');
  const uncompressedResources = textResources.filter(r => r.status === 'not_compressed');
  
  console.log(chalk.dim(`Total text resources: ${textResources.length}`));
  console.log(chalk.green(`✅ Compressed: ${compressedResources.length}`));
  
  if (uncompressedResources.length > 0) {
    console.log(chalk.red(`❌ Not Compressed: ${uncompressedResources.length}`));
    console.log(chalk.yellow('\nUncompressed resources that should be compressed:'));
    
    uncompressedResources.forEach(resource => {
      console.log(chalk.yellow(`- ${resource.url} (${(resource.uncompressedLength / 1024).toFixed(2)} KB)`));
    });
    
    // Calculate potential savings
    const potentialSavingsBytes = uncompressedResources.reduce((total, resource) => {
      return total + (resource.uncompressedLength * 0.7); // Assuming 70% compression
    }, 0);
    
    console.log(chalk.red(`\n⚠️ Potential savings: ${(potentialSavingsBytes / 1024).toFixed(2)} KB`));
    
    if (potentialSavingsBytes > 100 * 1024) {
      console.log(chalk.red('⚠️ This will trigger a Lighthouse warning for text compression'));
    }
  } else {
    console.log(chalk.green('✅ All text resources are properly compressed!'));
  }
  
  // Generate detailed report
  await generateReport(results);
}

// Run the main function
main().catch(error => {
  console.error(chalk.red(`Error: ${error.message}`));
  process.exit(1);
}); 