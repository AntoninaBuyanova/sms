#!/usr/bin/env node

/**
 * Image Optimization Script for myStylus
 * 
 * This script optimizes images for web delivery by:
 * 1. Resizing to multiple responsive sizes
 * 2. Converting to modern formats (WebP, AVIF)
 * 3. Optimizing compression for faster loading
 * 
 * Usage: node optimize-images.js
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import sharp from 'sharp';
import { createRequire } from 'module';

// Convert ESM to CommonJS for compatibility
const require = createRequire(import.meta.url);

// Get directory paths
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.join(__dirname, '..');
const publicDir = path.join(rootDir, 'client', 'public');
const optimizedDir = path.join(publicDir, 'optimized');

// Create optimized directory if it doesn't exist
if (!fs.existsSync(optimizedDir)) {
  fs.mkdirSync(optimizedDir, { recursive: true });
}

// Image configuration
const config = {
  // Responsive sizes (width in pixels)
  sizes: [320, 640, 768, 1024, 1366, 1600, 1920],
  // Image formats to generate
  formats: ['webp', 'avif'],
  // Image file extensions to process
  extensions: ['.jpg', '.jpeg', '.png', '.webp', '.gif'],
  // Quality settings for each format
  quality: {
    webp: 80,
    avif: 65,
    jpeg: 80,
    png: 80
  },
  // Skip images with these keywords in their path
  skipKeywords: ['icon', 'favicon', 'logo-small'],
};

// Check if file is an image based on extension
function isImage(filename) {
  const ext = path.extname(filename).toLowerCase();
  return config.extensions.includes(ext);
}

// Check if image should be skipped based on filename
function shouldSkipImage(filename) {
  return config.skipKeywords.some(keyword => 
    filename.toLowerCase().includes(keyword)
  );
}

// Process a single image
async function processImage(imagePath) {
  try {
    const filename = path.basename(imagePath);
    const fileNameWithoutExt = path.parse(filename).name;
    
    if (shouldSkipImage(filename)) {
      console.log(`Skipping ${filename} (matches skip pattern)`);
      return;
    }
    
    console.log(`Processing ${filename}...`);
    
    // Get image metadata
    const metadata = await sharp(imagePath).metadata();
    
    // Process each size
    for (const size of config.sizes) {
      // Skip sizes larger than original to prevent upscaling
      if (size > metadata.width) {
        continue;
      }
      
      // Process each format
      for (const format of config.formats) {
        const outputFilename = `${fileNameWithoutExt}-${size}.${format}`;
        const outputPath = path.join(optimizedDir, outputFilename);
        
        // Skip if file already exists
        if (fs.existsSync(outputPath)) {
          continue;
        }
        
        // Create a Sharp instance for processing
        let sharpInstance = sharp(imagePath)
          .resize({
            width: size,
            withoutEnlargement: true,
            fit: 'inside'
          });
          
        // Format-specific processing
        if (format === 'webp') {
          sharpInstance = sharpInstance.webp({ 
            quality: config.quality.webp,
            effort: 6 // Higher effort = better compression but slower
          });
        } else if (format === 'avif') {
          sharpInstance = sharpInstance.avif({ 
            quality: config.quality.avif,
            effort: 7
          });
        } else if (format === 'jpeg' || format === 'jpg') {
          sharpInstance = sharpInstance.jpeg({ 
            quality: config.quality.jpeg,
            mozjpeg: true // Use mozjpeg for better compression
          });
        } else if (format === 'png') {
          sharpInstance = sharpInstance.png({ 
            quality: config.quality.png,
            compressionLevel: 9,
            palette: true // Use palette for smaller file size when possible
          });
        }
        
        // Save the processed image
        await sharpInstance.toFile(outputPath);
        console.log(`  Created ${outputFilename}`);
      }
    }
    
    // Also create original format in each size
    const originalFormat = metadata.format;
    if (!config.formats.includes(originalFormat)) {
      for (const size of config.sizes) {
        // Skip sizes larger than original
        if (size > metadata.width) {
          continue;
        }
        
        const outputFilename = `${fileNameWithoutExt}-${size}.${originalFormat}`;
        const outputPath = path.join(optimizedDir, outputFilename);
        
        // Skip if file already exists
        if (fs.existsSync(outputPath)) {
          continue;
        }
        
        await sharp(imagePath)
          .resize({
            width: size,
            withoutEnlargement: true,
            fit: 'inside'
          })
          .toFile(outputPath);
          
        console.log(`  Created ${outputFilename}`);
      }
    }
    
    return true;
  } catch (err) {
    console.error(`Error processing ${imagePath}:`, err);
    return false;
  }
}

// Create a srcset helper file
async function createSrcsetHelper() {
  const helperPath = path.join(publicDir, 'image-srcsets.json');
  const imageMap = {};
  
  const files = fs.readdirSync(optimizedDir);
  
  for (const file of files) {
    // Parse filename to extract original name, size and format
    const match = file.match(/(.+)-(\d+)\.(\w+)$/);
    if (match) {
      const [_, baseName, size, format] = match;
      
      if (!imageMap[baseName]) {
        imageMap[baseName] = {
          formats: {}
        };
      }
      
      if (!imageMap[baseName].formats[format]) {
        imageMap[baseName].formats[format] = [];
      }
      
      imageMap[baseName].formats[format].push({
        size: parseInt(size),
        path: `/optimized/${file}`
      });
    }
  }
  
  // Sort sizes for each format
  for (const image in imageMap) {
    for (const format in imageMap[image].formats) {
      imageMap[image].formats[format].sort((a, b) => a.size - b.size);
    }
  }
  
  // Generate srcset strings for each image and format
  for (const image in imageMap) {
    for (const format in imageMap[image].formats) {
      const srcset = imageMap[image].formats[format]
        .map(item => `${item.path} ${item.size}w`)
        .join(', ');
      
      imageMap[image].formats[format] = {
        srcset,
        sizes: imageMap[image].formats[format].map(item => item.size)
      };
    }
  }
  
  // Write the helper file
  fs.writeFileSync(
    helperPath,
    JSON.stringify(imageMap, null, 2)
  );
  
  console.log(`Created image srcset helper at ${helperPath}`);
}

// Find all images and process them
async function processAllImages() {
  console.log('Starting image optimization...');
  
  try {
    // Find all images in public directory
    const imagePaths = [];
    
    function findImagesInDir(dir) {
      const files = fs.readdirSync(dir);
      
      for (const file of files) {
        const filePath = path.join(dir, file);
        const stats = fs.statSync(filePath);
        
        if (stats.isDirectory() && file !== 'optimized') {
          findImagesInDir(filePath);
        } else if (stats.isFile() && isImage(file)) {
          imagePaths.push(filePath);
        }
      }
    }
    
    findImagesInDir(publicDir);
    
    console.log(`Found ${imagePaths.length} images to process`);
    
    // Process each image
    let processed = 0;
    for (const imagePath of imagePaths) {
      const result = await processImage(imagePath);
      if (result) processed++;
    }
    
    console.log(`Successfully processed ${processed} images`);
    
    // Create srcset helper
    await createSrcsetHelper();
    
    console.log('Image optimization complete!');
  } catch (err) {
    console.error('Error during image optimization:', err);
    process.exit(1);
  }
}

// Run the main function
processAllImages(); 