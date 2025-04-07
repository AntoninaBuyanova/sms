#!/usr/bin/env node

/**
 * Pre-deployment script for myStylus
 * 
 * This script runs all optimization steps before deployment:
 * 1. Optimizes images
 * 2. Builds the project with production settings
 * 3. Compresses assets
 * 4. Runs performance tests to verify optimization
 * 
 * Usage: node scripts/pre-deploy.js
 */

import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Get directory paths
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.join(__dirname, '..');

// Ensure we're in production mode
process.env.NODE_ENV = 'production';

// Log helper function
const log = {
  info: (message) => console.log(`\x1b[36mℹ INFO:\x1b[0m ${message}`),
  success: (message) => console.log(`\x1b[32m✓ SUCCESS:\x1b[0m ${message}`),
  warning: (message) => console.log(`\x1b[33m⚠ WARNING:\x1b[0m ${message}`),
  error: (message) => console.log(`\x1b[31m✖ ERROR:\x1b[0m ${message}`)
};

// Run a command and handle errors
function runCommand(command, message) {
  log.info(message);
  try {
    execSync(command, { stdio: 'inherit', cwd: rootDir });
    log.success(`Completed: ${message}`);
    return true;
  } catch (error) {
    log.error(`Failed: ${message}`);
    log.error(error.message);
    return false;
  }
}

// Steps to run before deployment
async function runPreDeploySteps() {
  log.info('Starting pre-deployment optimization steps...');
  
  // Step 1: Clean existing build
  if (fs.existsSync(path.join(rootDir, 'dist'))) {
    log.info('Cleaning previous build...');
    fs.rmSync(path.join(rootDir, 'dist'), { recursive: true, force: true });
  }
  
  // Step 2: Optimize images
  if (!runCommand('npm run optimize:images', 'Optimizing images')) {
    log.warning('Image optimization failed, but continuing with other steps');
  }
  
  // Step 3: Run TypeScript check
  if (!runCommand('npm run check', 'Running TypeScript checks')) {
    log.error('TypeScript check failed. Please fix the errors before deploying.');
    process.exit(1);
  }
  
  // Step 4: Build the project with optimizations
  if (!runCommand('ANALYZE=true npm run build', 'Building project with optimizations')) {
    log.error('Build failed. Please fix the errors before deploying.');
    process.exit(1);
  }
  
  // Step 5: Start preview server in background
  log.info('Starting preview server...');
  const serverProcess = require('child_process').spawn('npm', ['run', 'preview'], {
    detached: true,
    stdio: 'ignore',
    cwd: rootDir
  });
  
  // Wait for server to start
  log.info('Waiting for preview server to start...');
  await new Promise(resolve => setTimeout(resolve, 5000));
  
  // Step 6: Run speed test
  if (!runCommand('npm run speed-test', 'Running performance tests')) {
    log.warning('Performance tests failed, but continuing with deployment');
  }
  
  // Step 7: Kill the preview server
  if (serverProcess && serverProcess.pid) {
    log.info('Stopping preview server...');
    try {
      process.kill(-serverProcess.pid);
    } catch (error) {
      log.warning('Could not kill preview server automatically');
    }
  }
  
  // Done!
  log.success('Pre-deployment optimization completed!');
  log.info('The build is ready for deployment in the dist/ directory');
  log.info('Check the performance reports to ensure all metrics are satisfactory');
}

// Run the pre-deployment steps
runPreDeploySteps().catch(error => {
  log.error('Pre-deployment process failed:');
  log.error(error.message);
  process.exit(1);
}); 