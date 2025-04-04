#!/usr/bin/env node

/**
 * Image Optimization Script
 * 
 * This script compresses and optimizes image assets to improve performance.
 * It creates optimized responsive versions of images at different sizes.
 * 
 * To use:
 * 1. Install dependencies: npm install sharp
 * 2. Run: node optimize-images.js
 */

const fs = require('fs');
const path = require('path');
const { promisify } = require('util');
const readdir = promisify(fs.readdir);
const stat = promisify(fs.stat);
const mkdir = promisify(fs.mkdir);

// Try to require sharp - if not available, warn user
let sharp;
try {
  sharp = require('sharp');
} catch (err) {
  console.error('Sharp image processing library not found. Please install it:');
  console.error('npm install sharp');
  process.exit(1);
}

// Configuration
const config = {
  inputDir: path.join(__dirname, 'public'),
  outputDir: path.join(__dirname, 'public', 'optimized'),
  extensions: ['.jpg', '.jpeg', '.png', '.webp'],
  sizes: [640, 750, 828, 1080, 1200, 1920],
  quality: 80,
  formats: ['webp', 'avif']
};

// Create output directory if it doesn't exist
async function ensureOutputDir() {
  try {
    await stat(config.outputDir);
  } catch (err) {
    await mkdir(config.outputDir, { recursive: true });
  }
}

// Get all image files
async function getImageFiles(dir) {
  const files = await readdir(dir, { withFileTypes: true });
  const imageFiles = [];
  
  for (const file of files) {
    const fullPath = path.join(dir, file.name);
    
    if (file.isDirectory()) {
      const subDirFiles = await getImageFiles(fullPath);
      imageFiles.push(...subDirFiles);
      continue;
    }
    
    const ext = path.extname(file.name).toLowerCase();
    if (config.extensions.includes(ext)) {
      imageFiles.push(fullPath);
    }
  }
  
  return imageFiles;
}

// Process an image file
async function processImage(imagePath) {
  console.log(`Processing: ${imagePath}`);
  const fileName = path.basename(imagePath, path.extname(imagePath));
  
  // Create base sharp instance
  const image = sharp(imagePath);
  const metadata = await image.metadata();
  
  // Process for each size and format
  for (const size of config.sizes) {
    // Skip if requested size is larger than original
    if (size > metadata.width) continue;
    
    for (const format of config.formats) {
      const outputFileName = `${fileName}-${size}.${format}`;
      const outputPath = path.join(config.outputDir, outputFileName);
      
      await image
        .resize({ width: size, withoutEnlargement: true })
        [format]({ quality: config.quality })
        .toFile(outputPath);
      
      console.log(`  Created: ${outputFileName}`);
    }
  }
  
  // Also create original size in optimized formats
  for (const format of config.formats) {
    const outputFileName = `${fileName}.${format}`;
    const outputPath = path.join(config.outputDir, outputFileName);
    
    await image
      [format]({ quality: config.quality })
      .toFile(outputPath);
    
    console.log(`  Created: ${outputFileName}`);
  }
}

// Main function
async function main() {
  try {
    await ensureOutputDir();
    const imageFiles = await getImageFiles(config.inputDir);
    
    console.log(`Found ${imageFiles.length} images to process`);
    
    // Process each image
    for (const imageFile of imageFiles) {
      await processImage(imageFile);
    }
    
    console.log('✅ Image optimization complete!');
    console.log(`Optimized images are in: ${config.outputDir}`);
    console.log('To use these images in your app:');
    console.log('1. Use the OptimizedImage component');
    console.log('2. Update image paths to use optimized versions');
  } catch (err) {
    console.error('Error processing images:', err);
  }
}

main(); 