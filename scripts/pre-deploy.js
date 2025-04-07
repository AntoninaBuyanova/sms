#!/usr/bin/env node

/**
 * Pre-deployment Optimization Script
 * 
 * This script performs various optimizations before deployment:
 * 1. Analyzes the bundle to identify large modules
 * 2. Runs extra minification and tree-shaking
 * 3. Ensures all assets are properly compressed
 * 4. Validates compression is working correctly
 */

import fs from 'fs';
import path from 'path';
import { promisify } from 'util';
import { fileURLToPath } from 'url';
import { execSync } from 'child_process';
import zlib from 'zlib';
import { glob } from 'glob';

// Convert callbacks to promises
const readFile = promisify(fs.readFile);
const writeFile = promisify(fs.writeFile);
const gzip = promisify(zlib.gzip);
const brotliCompress = promisify(zlib.brotliCompress);

// Get directory path for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.join(__dirname, '..');
const distDir = path.join(rootDir, 'dist', 'public');

// Get all JS files in dist directory
async function getJsFiles() {
  return new Promise((resolve, reject) => {
    glob(`${distDir}/**/*.js`, {}, (err, files) => {
      if (err) return reject(err);
      resolve(files);
    });
  });
}

// Analyze bundle size
async function analyzeBundleSize() {
  console.log('🔍 Analyzing bundle sizes...');
  
  const jsFiles = await getJsFiles();
  
  // Sort files by size (largest first)
  const fileSizes = await Promise.all(jsFiles.map(async (file) => {
    const stats = fs.statSync(file);
    return {
      path: file,
      name: path.basename(file),
      size: stats.size,
      sizeKb: (stats.size / 1024).toFixed(2)
    };
  }));
  
  fileSizes.sort((a, b) => b.size - a.size);
  
  // Display the top 10 largest files
  console.log('Top 10 largest JavaScript files:');
  fileSizes.slice(0, 10).forEach((file, index) => {
    console.log(`${index + 1}. ${file.name}: ${file.sizeKb} KB`);
  });
  
  // Calculate total bundle size
  const totalSize = fileSizes.reduce((sum, file) => sum + file.size, 0);
  console.log(`\nTotal JavaScript size: ${(totalSize / 1024).toFixed(2)} KB (${(totalSize / 1024 / 1024).toFixed(2)} MB)`);
  
  return fileSizes;
}

// Run extra minification on large JS files
async function extraMinification(largeFiles) {
  console.log('\n🗜️ Applying extra minification to large files...');
  
  // Use terser for more aggressive minification
  for (const file of largeFiles.slice(0, 5)) { // Process top 5 largest files
    try {
      console.log(`Processing ${file.name}...`);
      
      // Run terser with extremely aggressive settings
      execSync(`npx terser "${file.path}" --compress "passes=5,pure_getters=true,unsafe=true,unsafe_comps=true,unsafe_math=true,unsafe_proto=true,keep_fargs=false,drop_console=true,ecma=2020" --mangle "toplevel=true,properties={regex:/^_/}" --format "comments=false,ecma=2020" -o "${file.path}"`);
      
      // Measure the new size
      const newStats = fs.statSync(file.path);
      const savings = ((1 - newStats.size / file.size) * 100).toFixed(2);
      
      console.log(`✅ Optimized ${file.name}: ${file.sizeKb} KB → ${(newStats.size / 1024).toFixed(2)} KB (${savings}% smaller)`);
    } catch (error) {
      console.error(`❌ Error optimizing ${file.name}: ${error.message}`);
    }
  }
}

// Create optimized compression
async function ensureCompression() {
  console.log('\n📦 Ensuring all assets are properly compressed...');
  
  // Compression options - use maximum settings
  const gzipOpts = { level: 9, memLevel: 9, strategy: zlib.Z_DEFAULT_STRATEGY };
  const brotliOpts = { 
    params: {
      [zlib.constants.BROTLI_PARAM_QUALITY]: 11,
      [zlib.constants.BROTLI_PARAM_MODE]: zlib.constants.BROTLI_MODE_TEXT,
      [zlib.constants.BROTLI_PARAM_SIZE_HINT]: 0
    }
  };
  
  // Compress all text-based files
  const filesToCompress = await new Promise((resolve, reject) => {
    glob(`${distDir}/**/*.+(js|css|html|svg|json|txt|xml)`, {}, (err, files) => {
      if (err) return reject(err);
      resolve(files);
    });
  });
  
  console.log(`Found ${filesToCompress.length} files to compress`);
  
  let gzipSavings = 0;
  let brotliSavings = 0;
  let totalOriginalSize = 0;
  
  for (const file of filesToCompress) {
    try {
      const content = await readFile(file);
      totalOriginalSize += content.length;
      
      // Create gzip version
      const gzipped = await gzip(content, gzipOpts);
      await writeFile(`${file}.gz`, gzipped);
      gzipSavings += (content.length - gzipped.length);
      
      // Create brotli version
      const brotlied = await brotliCompress(content, brotliOpts);
      await writeFile(`${file}.br`, brotlied);
      brotliSavings += (content.length - brotlied.length);
    } catch (error) {
      console.error(`Error compressing ${path.basename(file)}: ${error.message}`);
    }
  }
  
  console.log(`\nCompression savings:`);
  console.log(`GZip: ${(gzipSavings / 1024 / 1024).toFixed(2)} MB (${((gzipSavings / totalOriginalSize) * 100).toFixed(2)}% reduction)`);
  console.log(`Brotli: ${(brotliSavings / 1024 / 1024).toFixed(2)} MB (${((brotliSavings / totalOriginalSize) * 100).toFixed(2)}% reduction)`);
}

// Validate server compression settings by making test requests
async function validateCompression() {
  console.log('\n🔄 Validating server compression settings...');
  
  try {
    // This is a simple mock validation - in a real scenario, 
    // you would make actual HTTP requests to your server to verify
    // that compression is being properly applied
    
    // Check if .htaccess or nginx.conf exists and has compression directives
    const serverFiles = [
      path.join(rootDir, 'nginx.conf'),
      path.join(distDir, '.htaccess')
    ];
    
    let hasCompressionConfig = false;
    
    for (const file of serverFiles) {
      if (fs.existsSync(file)) {
        const content = await readFile(file, 'utf-8');
        if (content.includes('gzip') || content.includes('brotli')) {
          hasCompressionConfig = true;
          console.log(`✅ Found compression configuration in ${path.basename(file)}`);
        }
      }
    }
    
    if (!hasCompressionConfig) {
      console.warn('⚠️ Warning: No server compression configuration found in nginx.conf or .htaccess');
    }
    
    // Verify pre-compressed files exist
    const gzipFiles = await new Promise((resolve) => {
      glob(`${distDir}/**/*.gz`, {}, (_, files) => resolve(files));
    });
    
    const brotliFiles = await new Promise((resolve) => {
      glob(`${distDir}/**/*.br`, {}, (_, files) => resolve(files));
    });
    
    console.log(`Found ${gzipFiles.length} gzip files and ${brotliFiles.length} brotli files`);
    
    if (gzipFiles.length === 0 || brotliFiles.length === 0) {
      console.warn('⚠️ Warning: Missing compressed files. Compression may not be working properly.');
    } else {
      console.log('✅ Pre-compressed files verified');
    }
  } catch (error) {
    console.error(`❌ Error validating compression: ${error.message}`);
  }
}

// Main function
async function main() {
  try {
    console.log('🚀 Starting pre-deployment optimizations...');
    
    // Step 1: Analyze bundle size
    const largeFiles = await analyzeBundleSize();
    
    // Step 2: Extra minification for large files
    await extraMinification(largeFiles);
    
    // Step 3: Ensure compression
    await ensureCompression();
    
    // Step 4: Validate compression
    await validateCompression();
    
    console.log('\n✅ Pre-deployment optimizations completed successfully');
  } catch (error) {
    console.error('❌ Error during pre-deployment optimizations:', error);
    process.exit(1);
  }
}

// Run the main function
main(); 