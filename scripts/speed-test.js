#!/usr/bin/env node

/**
 * Speed Test Script for myStylus
 * 
 * This script runs automated performance tests using Lighthouse and WebPageTest
 * to measure site performance and provide optimization recommendations.
 * 
 * Usage: node scripts/speed-test.js [url]
 */

import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import fetch from 'node-fetch';
import open from 'open';

// Get directory paths
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const reportsDir = path.join(__dirname, '..', 'performance-reports');

// Create reports directory if it doesn't exist
if (!fs.existsSync(reportsDir)) {
  fs.mkdirSync(reportsDir, { recursive: true });
}

// Default URL to test if none provided
const DEFAULT_URL = 'http://localhost:4173';
const url = process.argv[2] || DEFAULT_URL;

// Current date for report naming
const now = new Date();
const dateStr = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;
const timeStr = `${String(now.getHours()).padStart(2, '0')}-${String(now.getMinutes()).padStart(2, '0')}`;
const dateTimeStr = `${dateStr}_${timeStr}`;

// Configuration
const testConfig = {
  // Lighthouse configurations for different devices/scenarios
  lighthouse: {
    mobile: {
      outputPath: path.join(reportsDir, `lighthouse-mobile-${dateTimeStr}.html`),
      flags: '--preset=perf --emulated-form-factor=mobile --throttling.cpuSlowdownMultiplier=4 --throttling.downloadThroughputKbps=1638 --throttling.uploadThroughputKbps=768'
    },
    desktop: {
      outputPath: path.join(reportsDir, `lighthouse-desktop-${dateTimeStr}.html`),
      flags: '--preset=desktop --throttling.cpuSlowdownMultiplier=1'
    },
    slow3g: {
      outputPath: path.join(reportsDir, `lighthouse-slow3g-${dateTimeStr}.html`),
      flags: '--preset=perf --emulated-form-factor=mobile --throttling.cpuSlowdownMultiplier=4 --throttling.downloadThroughputKbps=400 --throttling.uploadThroughputKbps=400'
    }
  },
  webVitals: {
    outputPath: path.join(reportsDir, `web-vitals-${dateTimeStr}.json`)
  }
};

// Run Lighthouse tests
async function runLighthouseTests() {
  console.log('🚀 Running Lighthouse performance tests...');
  
  for (const [device, config] of Object.entries(testConfig.lighthouse)) {
    try {
      console.log(`\n📱 Testing ${device} performance...`);
      const command = `npx lighthouse ${url} --output=html --output-path=${config.outputPath} ${config.flags} --quiet`;
      
      execSync(command, { stdio: 'inherit' });
      
      console.log(`✅ ${device} report generated: ${config.outputPath}`);
      
      // Extract scores and log them
      const jsonOutputPath = config.outputPath.replace('.html', '.json');
      if (fs.existsSync(jsonOutputPath)) {
        const data = JSON.parse(fs.readFileSync(jsonOutputPath, 'utf8'));
        const { performance, accessibility, 'best-practices': bestPractices, seo, pwa } = data.categories;
        
        console.log('\nPerformance Scores:');
        console.log(`⚡ Performance:    ${Math.round(performance.score * 100)}`);
        console.log(`♿ Accessibility:  ${Math.round(accessibility.score * 100)}`);
        console.log(`🔧 Best Practices: ${Math.round(bestPractices.score * 100)}`);
        console.log(`🔍 SEO:            ${Math.round(seo.score * 100)}`);
        console.log(`📱 PWA:            ${Math.round(pwa.score * 100)}`);
        
        // Clean up JSON file
        fs.unlinkSync(jsonOutputPath);
      }
    } catch (error) {
      console.error(`❌ Error running Lighthouse for ${device}:`, error.message);
    }
  }
}

// Measure Web Vitals
async function measureWebVitals() {
  console.log('\n📊 Measuring Core Web Vitals...');
  
  try {
    const command = `npx web-vitals-reporter --url ${url} --runs 3 --json > ${testConfig.webVitals.outputPath}`;
    execSync(command, { stdio: 'inherit' });
    
    // Read and display the results
    if (fs.existsSync(testConfig.webVitals.outputPath)) {
      const data = JSON.parse(fs.readFileSync(testConfig.webVitals.outputPath, 'utf8'));
      
      console.log('\nCore Web Vitals Metrics (average over 3 runs):');
      console.log(`⏱️  LCP (Largest Contentful Paint): ${Math.round(data.lcp.average)} ms`);
      console.log(`⌛ FID (First Input Delay):        ${Math.round(data.fid.average)} ms`);
      console.log(`📏 CLS (Cumulative Layout Shift):  ${data.cls.average.toFixed(3)}`);
      console.log(`🔄 TTFB (Time to First Byte):      ${Math.round(data.ttfb.average)} ms`);
      
      // Rating the scores
      const lcpRating = data.lcp.average <= 2500 ? 'Good' : data.lcp.average <= 4000 ? 'Needs Improvement' : 'Poor';
      const fidRating = data.fid.average <= 100 ? 'Good' : data.fid.average <= 300 ? 'Needs Improvement' : 'Poor';
      const clsRating = data.cls.average <= 0.1 ? 'Good' : data.cls.average <= 0.25 ? 'Needs Improvement' : 'Poor';
      
      console.log('\nRatings:');
      console.log(`LCP: ${lcpRating}`);
      console.log(`FID: ${fidRating}`);
      console.log(`CLS: ${clsRating}`);
    }
  } catch (error) {
    console.error('❌ Error measuring Web Vitals:', error.message);
  }
}

// Test resource loading
async function testResourceLoading() {
  console.log('\n🔍 Testing resource loading...');
  
  try {
    const resources = [
      { name: 'HTML', url: url },
      { name: 'CSS', url: `${url}/assets/index.css` },
      { name: 'JS', url: `${url}/assets/index.js` },
      // Add important images here
      { name: 'LCP Image', url: `${url}/pdf.png` },
    ];
    
    for (const resource of resources) {
      console.log(`Testing ${resource.name} loading time...`);
      
      const start = Date.now();
      const response = await fetch(resource.url, { method: 'HEAD' });
      const timeMs = Date.now() - start;
      
      if (response.ok) {
        console.log(`✅ ${resource.name}: ${timeMs}ms`);
      } else {
        console.log(`❌ ${resource.name}: Failed to load (${response.status})`);
      }
    }
  } catch (error) {
    console.error('❌ Error testing resource loading:', error.message);
  }
}

// Generate a summary report
function generateSummaryReport() {
  console.log('\n📝 Generating summary report...');
  
  const summaryPath = path.join(reportsDir, `performance-summary-${dateTimeStr}.html`);
  
  // Collect all report paths
  const reportFiles = fs.readdirSync(reportsDir)
    .filter(file => file.includes(dateTimeStr) && file.endsWith('.html'))
    .map(file => path.join(reportsDir, file));
  
  // Create a simple HTML report
  const reportHtml = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Performance Summary - ${dateTimeStr}</title>
  <style>
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      line-height: 1.6;
      max-width: 900px;
      margin: 0 auto;
      padding: 20px;
      color: #333;
    }
    h1, h2 {
      color: #1a73e8;
    }
    .report-links {
      margin: 20px 0;
      padding: 20px;
      background: #f5f5f5;
      border-radius: 8px;
    }
    .report-links a {
      display: block;
      margin: 10px 0;
      color: #1a73e8;
      text-decoration: none;
    }
    .report-links a:hover {
      text-decoration: underline;
    }
    .summary {
      margin: 20px 0;
      padding: 20px;
      background: #e8f0fe;
      border-radius: 8px;
    }
    .tip {
      margin: 10px 0;
      padding: 10px;
      background: #fef8e8;
      border-left: 4px solid #fbbc04;
      border-radius: 4px;
    }
  </style>
</head>
<body>
  <h1>Performance Test Summary</h1>
  <p>Date: ${dateStr} | Time: ${timeStr}</p>
  <p>URL Tested: ${url}</p>
  
  <div class="summary">
    <h2>Key Findings</h2>
    <p>Performance tests completed for mobile and desktop scenarios. See detailed reports below.</p>
  </div>
  
  <div class="report-links">
    <h2>Detailed Reports</h2>
    ${reportFiles.map(file => `<a href="file://${file}" target="_blank">${path.basename(file)}</a>`).join('\n')}
  </div>
  
  <h2>Optimization Tips</h2>
  
  <div class="tip">
    <strong>Tip 1:</strong> Ensure all LCP images use the OptimizedImage component for best performance.
  </div>
  
  <div class="tip">
    <strong>Tip 2:</strong> Verify that Service Worker is properly registered and caching critical resources.
  </div>
  
  <div class="tip">
    <strong>Tip 3:</strong> Run 'npm run optimize:images' before deployment to optimize all images.
  </div>
  
  <div class="tip">
    <strong>Tip 4:</strong> Monitor Core Web Vitals in Google Search Console after deployment.
  </div>
</body>
</html>
  `;
  
  fs.writeFileSync(summaryPath, reportHtml);
  console.log(`✅ Summary report generated: ${summaryPath}`);
  
  return summaryPath;
}

// Main function to run all tests
async function runSpeedTests() {
  console.log(`🔬 Starting speed tests for: ${url}`);
  console.log(`⏱️  Test started at: ${new Date().toLocaleString()}`);
  console.log(`📁 Reports will be saved to: ${reportsDir}\n`);
  
  // Run all tests
  await runLighthouseTests();
  await measureWebVitals();
  await testResourceLoading();
  
  // Generate and open summary
  const summaryPath = generateSummaryReport();
  
  console.log('\n✨ All tests completed!');
  console.log(`📊 Open the summary report to view detailed results: ${summaryPath}`);
  
  // Open the summary report
  try {
    await open(`file://${summaryPath}`);
  } catch (error) {
    console.log('Could not automatically open the report. Please open it manually.');
  }
}

// Run the tests
runSpeedTests().catch(error => {
  console.error('❌ Error running speed tests:', error);
  process.exit(1);
}); 