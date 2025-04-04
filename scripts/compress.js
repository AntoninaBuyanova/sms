import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import zlib from 'zlib';
import brotli from 'brotli';
import { promisify } from 'util';

// Convert callbacks to promises
const readdir = promisify(fs.readdir);
const stat = promisify(fs.stat);
const readFile = promisify(fs.readFile);
const writeFile = promisify(fs.writeFile);

// Get directory name
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const distDir = path.resolve(__dirname, '../dist/public');

// File extensions to compress
const COMPRESS_EXTENSIONS = ['.js', '.css', '.html', '.json', '.svg', '.xml', '.txt', '.md'];
// Size threshold (only compress files larger than this)
const SIZE_THRESHOLD = 1024; // 1KB

/**
 * Check if a file should be compressed based on extension and size
 */
async function shouldCompress(filePath) {
  try {
    const stats = await stat(filePath);
    const ext = path.extname(filePath).toLowerCase();
    
    // Only compress files above threshold and with appropriate extensions
    return stats.size > SIZE_THRESHOLD && COMPRESS_EXTENSIONS.includes(ext);
  } catch (error) {
    console.error(`Error checking file ${filePath}:`, error);
    return false;
  }
}

/**
 * Compress a file with Gzip
 */
async function compressWithGzip(filePath) {
  try {
    const content = await readFile(filePath);
    const compressedContent = zlib.gzipSync(content, {
      level: 9, // Max compression level
      memLevel: 9, // Max memory usage (for better compression)
    });
    
    await writeFile(`${filePath}.gz`, compressedContent);
    const savings = (1 - (compressedContent.length / content.length)) * 100;
    
    return {
      original: content.length,
      compressed: compressedContent.length,
      savings: savings.toFixed(2),
    };
  } catch (error) {
    console.error(`Error compressing file with Gzip ${filePath}:`, error);
    return null;
  }
}

/**
 * Compress a file with Brotli
 */
async function compressWithBrotli(filePath) {
  try {
    const content = await readFile(filePath);
    const compressedContent = Buffer.from(brotli.compress(content, {
      mode: 1, // Text mode
      quality: 11, // Max quality (0-11)
      lgwin: 24, // Max window size
    }));
    
    await writeFile(`${filePath}.br`, compressedContent);
    const savings = (1 - (compressedContent.length / content.length)) * 100;
    
    return {
      original: content.length,
      compressed: compressedContent.length,
      savings: savings.toFixed(2),
    };
  } catch (error) {
    console.error(`Error compressing file with Brotli ${filePath}:`, error);
    return null;
  }
}

/**
 * Find all files in a directory recursively
 */
async function findFiles(dir) {
  const files = [];
  const entries = await readdir(dir, { withFileTypes: true });
  
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    
    if (entry.isDirectory()) {
      const subFiles = await findFiles(fullPath);
      files.push(...subFiles);
    } else {
      files.push(fullPath);
    }
  }
  
  return files;
}

/**
 * Main compression function
 */
async function compressAssets() {
  console.log('Starting asset compression...');
  const startTime = Date.now();
  
  try {
    const files = await findFiles(distDir);
    let totalSaved = 0;
    let totalOriginal = 0;
    
    console.log(`Found ${files.length} files to process`);
    
    for (const file of files) {
      if (await shouldCompress(file)) {
        console.log(`Compressing ${path.relative(distDir, file)}`);
        
        // Compress with Gzip
        const gzipResult = await compressWithGzip(file);
        if (gzipResult) {
          console.log(`  Gzip: ${gzipResult.original} → ${gzipResult.compressed} bytes (${gzipResult.savings}% saved)`);
          totalSaved += (gzipResult.original - gzipResult.compressed);
          totalOriginal += gzipResult.original;
        }
        
        // Compress with Brotli
        const brotliResult = await compressWithBrotli(file);
        if (brotliResult) {
          console.log(`  Brotli: ${brotliResult.original} → ${brotliResult.compressed} bytes (${brotliResult.savings}% saved)`);
        }
      }
    }
    
    const totalSavingsPct = totalOriginal ? ((totalSaved / totalOriginal) * 100).toFixed(2) : 0;
    const endTime = Date.now();
    console.log(`Compression complete! Total time: ${(endTime - startTime) / 1000}s`);
    console.log(`Total savings: ${(totalSaved / 1024).toFixed(2)}KB (${totalSavingsPct}%)`);
    
  } catch (error) {
    console.error('Error during compression:', error);
    process.exit(1);
  }
}

// Run the compression
compressAssets(); 