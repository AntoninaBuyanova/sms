#!/usr/bin/env node

/**
 * Quick Resource Check for myStylus
 * 
 * This script performs a quick check of key resources and their load times
 * Usage: node scripts/quick-resource-check.js [baseUrl]
 */

import fetch from 'node-fetch';

// Default URL to test
const DEFAULT_URL = 'http://localhost:3000';
const baseUrl = process.argv[2] || DEFAULT_URL;

console.log(`🔍 Checking resources at: ${baseUrl}\n`);

const resourcesWithPaths = [
  { name: 'HTML Document', path: '' },
  { name: 'CSS', path: '/assets/index-BycsqLtb.css' },
  { name: 'Critical CSS', path: '/critical.css' },
  { name: 'JavaScript Bundle', path: '/assets/index-pGMQx8hB.js' },
  { name: 'Main Image', path: '/pdf.png' },
  { name: 'Optimized Main Image (WebP)', path: '/optimized/pdf-768.webp' },
  { name: 'Service Worker', path: '/sw.js' }
];

async function checkResources() {
  console.log('RESOURCE                  | STATUS | SIZE       | TIME');
  console.log('--------------------------|--------|------------|-------');
  
  for (const resource of resourcesWithPaths) {
    const url = new URL(resource.path, baseUrl).toString();
    const startTime = Date.now();
    let status = '❌';
    let size = 'N/A';
    let time = 'N/A';
    
    try {
      const response = await fetch(url, { method: 'GET' });
      const data = await response.arrayBuffer();
      
      const endTime = Date.now();
      status = response.ok ? '✅' : '❌';
      size = formatBytes(data.byteLength);
      time = `${endTime - startTime}ms`;
      
    } catch (error) {
      status = '❌';
    }
    
    console.log(`${resource.name.padEnd(25)} | ${status}    | ${size.padEnd(10)} | ${time}`);
  }
}

// Format bytes to human-readable format
function formatBytes(bytes, decimals = 2) {
  if (bytes === 0) return '0 B';
  
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return parseFloat((bytes / Math.pow(k, i)).toFixed(decimals)) + ' ' + sizes[i];
}

// Run the resource check
checkResources().catch(error => {
  console.error('Error checking resources:', error);
}); 