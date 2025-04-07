#!/usr/bin/env node

/**
 * Simple Speed Test Script for myStylus
 * 
 * This script runs basic performance tests using Lighthouse
 * Usage: node scripts/simple-speed-test.js [url]
 */

import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Get directory path for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Default URL to test
const DEFAULT_URL = 'http://localhost:3000';
const url = process.argv[2] || DEFAULT_URL;

// Create reports directory if it doesn't exist
const reportsDir = path.join(__dirname, '..', 'performance-reports');
if (!fs.existsSync(reportsDir)) {
  fs.mkdirSync(reportsDir, { recursive: true });
}

// Current date for report naming
const now = new Date();
const dateStr = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;
const timeStr = `${String(now.getHours()).padStart(2, '0')}-${String(now.getMinutes()).padStart(2, '0')}`;
const dateTimeStr = `${dateStr}_${timeStr}`;

// Run the speed test
console.log(`🔬 Starting speed test for: ${url}`);
console.log(`⏱️  Test started at: ${new Date().toLocaleString()}`);
console.log(`📁 Report will be saved to: ${reportsDir}\n`);

// Mobile and desktop test paths
const mobileReportPath = path.join(reportsDir, `lighthouse-mobile-${dateTimeStr}.html`);
const desktopReportPath = path.join(reportsDir, `lighthouse-desktop-${dateTimeStr}.html`);

try {
  console.log('📱 Testing mobile performance...');
  const mobileCommand = `npx lighthouse ${url} --output=html --output-path=${mobileReportPath} --preset=perf --emulated-form-factor=mobile --quiet`;
  execSync(mobileCommand, { stdio: 'inherit' });
  console.log(`✅ Mobile report generated: ${mobileReportPath}`);
  
  console.log('\n💻 Testing desktop performance...');
  const desktopCommand = `npx lighthouse ${url} --output=html --output-path=${desktopReportPath} --preset=desktop --quiet`;
  execSync(desktopCommand, { stdio: 'inherit' });
  console.log(`✅ Desktop report generated: ${desktopReportPath}`);
  
  console.log('\n✨ All tests completed!');
  console.log(`📊 Check the reports at: ${reportsDir}`);
} catch (error) {
  console.error('❌ Error running speed tests:', error.message);
} 