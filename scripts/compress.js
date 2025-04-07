#!/usr/bin/env node

/**
 * Enhanced Compression Script
 * 
 * This script improves the compression of static assets by:
 * 1. Re-compressing JS and CSS files with optimal settings
 * 2. Verifying all text files are properly compressed
 * 3. Setting the appropriate MIME types and compression headers
 */

import fs from 'fs';
import path from 'path';
import { promisify } from 'util';
import zlib from 'zlib';
import { fileURLToPath } from 'url';
import { glob } from 'glob';

// Convert callbacks to promises
const readFile = promisify(fs.readFile);
const writeFile = promisify(fs.writeFile);
const gzip = promisify(zlib.gzip);
const brotliCompress = promisify(zlib.brotliCompress);

// Get directory path for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Set the dist directory path
const distDir = path.join(__dirname, '..', 'dist', 'public');

// Compression options
const gzipOpts = { level: 9 }; // Maximum compression
const brotliOpts = { 
  params: {
    [zlib.constants.BROTLI_PARAM_QUALITY]: 11, // Maximum quality
    [zlib.constants.BROTLI_PARAM_MODE]: zlib.constants.BROTLI_MODE_TEXT, // Optimize for text
    [zlib.constants.BROTLI_PARAM_SIZE_HINT]: 0 // Auto-detect size hint
  }
};

// File extensions to compress
const compressibleExtensions = [
  '.js', '.css', '.html', '.json', '.svg', '.xml', '.txt', '.map', 
  '.woff', '.woff2', '.ttf', '.eot'
];

// Get all compressible files
async function getCompressibleFiles() {
  return new Promise((resolve, reject) => {
    glob(`${distDir}/**/*+(.js|.css|.html|.json|.svg|.xml|.txt|.map)`, {}, (err, files) => {
      if (err) return reject(err);
      resolve(files);
    });
  });
}

// Create .gz version of a file
async function createGzipVersion(filePath) {
  try {
    const content = await readFile(filePath);
    const compressedContent = await gzip(content, gzipOpts);
    
    // Only write if gzipped content is smaller
    if (compressedContent.length < content.length) {
      const gzipPath = `${filePath}.gz`;
      await writeFile(gzipPath, compressedContent);
      
      const savings = ((1 - compressedContent.length / content.length) * 100).toFixed(2);
      console.log(`📦 Gzipped: ${path.basename(filePath)} - Saved ${savings}% (${(content.length - compressedContent.length) / 1024}kb)`);
    }
  } catch (error) {
    console.error(`❌ Error creating gzip for ${filePath}:`, error.message);
  }
}

// Create .br version of a file
async function createBrotliVersion(filePath) {
  try {
    const content = await readFile(filePath);
    const compressedContent = await brotliCompress(content, brotliOpts);
    
    // Only write if brotli content is smaller
    if (compressedContent.length < content.length) {
      const brPath = `${filePath}.br`;
      await writeFile(brPath, compressedContent);
      
      const savings = ((1 - compressedContent.length / content.length) * 100).toFixed(2);
      console.log(`📦 Brotli: ${path.basename(filePath)} - Saved ${savings}% (${(content.length - compressedContent.length) / 1024}kb)`);
    }
  } catch (error) {
    console.error(`❌ Error creating brotli for ${filePath}:`, error.message);
  }
}

// Minify JS if not already minified
async function minifyJsIfNeeded(filePath) {
  // Skip if already minified (.min.js)
  if (filePath.includes('.min.js')) return;
  
  try {
    const content = await readFile(filePath, 'utf8');
    // Process all JS files regardless of size
    
    // Use Terser to minify JavaScript with aggressive settings
    const terser = await import('terser');
    const minified = await terser.minify(content, {
      compress: {
        drop_console: true,
        drop_debugger: true,
        passes: 5, // Increased passes for better optimization
        pure_getters: true,
        unsafe: true,
        unsafe_arrows: true,
        unsafe_comps: true,
        unsafe_math: true,
        unsafe_methods: true,
        unsafe_proto: true,
        unsafe_regexp: true,
        unsafe_undefined: true,
        ecma: 2020,
      },
      mangle: {
        properties: {
          regex: /^_/ // Mangle private properties
        },
        toplevel: true,
      },
      format: {
        comments: false,
        ecma: 2020,
        wrap_iife: true,
        ascii_only: true,
      },
      toplevel: true,
      module: true,
    });
    
    if (minified.code && minified.code.length < content.length) {
      await writeFile(filePath, minified.code);
      console.log(`🔧 Minified JS: ${path.basename(filePath)} - ${(content.length / 1024).toFixed(2)}kb → ${(minified.code.length / 1024).toFixed(2)}kb`);
    }
  } catch (error) {
    console.error(`❌ Error minifying ${filePath}:`, error.message);
  }
}

// Remove unused CSS
async function optimizeCss(filePath) {
  try {
    const content = await readFile(filePath, 'utf8');
    
    // Use lightningcss to optimize CSS
    try {
      const lightningcss = await import('lightningcss');
      const { code } = lightningcss.transform({
        filename: filePath,
        code: Buffer.from(content),
        minify: true,
        sourceMap: false,
      });
      
      if (code.length < content.length) {
        await writeFile(filePath, code);
        console.log(`🔧 Optimized CSS: ${path.basename(filePath)} - ${(content.length / 1024).toFixed(2)}kb → ${(code.length / 1024).toFixed(2)}kb`);
      }
    } catch (e) {
      console.log(`Failed to optimize CSS with lightningcss: ${e.message}`);
    }
  } catch (error) {
    console.error(`❌ Error optimizing CSS ${filePath}:`, error.message);
  }
}

// Generate an .htaccess file with proper compression settings
async function createHtaccessFile() {
  const htaccessContent = `# Compression and cache settings
<IfModule mod_deflate.c>
  # Enable compression
  AddOutputFilterByType DEFLATE text/html text/plain text/xml text/css
  AddOutputFilterByType DEFLATE application/javascript application/x-javascript text/javascript
  AddOutputFilterByType DEFLATE application/json application/xml application/xhtml+xml
  AddOutputFilterByType DEFLATE image/svg+xml image/x-icon
  
  # Exclude older browsers
  BrowserMatch ^Mozilla/4 gzip-only-text/html
  BrowserMatch ^Mozilla/4\\.0[678] no-gzip
  BrowserMatch \\bMSIE !no-gzip !gzip-only-text/html
  
  # Specify proper MIME types
  AddType application/javascript .js
  AddType text/css .css
  AddType image/svg+xml .svg
</IfModule>

# Enable Brotli if available
<IfModule mod_brotli.c>
  AddOutputFilterByType BROTLI_COMPRESS text/html text/plain text/xml text/css
  AddOutputFilterByType BROTLI_COMPRESS application/javascript application/x-javascript text/javascript
  AddOutputFilterByType BROTLI_COMPRESS application/json application/xml
  AddOutputFilterByType BROTLI_COMPRESS image/svg+xml image/x-icon
</IfModule>

# Set proper encoding
<IfModule mod_headers.c>
  # Serve gzip compressed files if they exist and the client accepts gzip
  <FilesMatch "\\.(js|css|html|json|xml|svg|txt|ico)$">
    RewriteCond %{HTTP:Accept-encoding} gzip
    RewriteCond %{REQUEST_FILENAME}\\.gz -f
    RewriteRule ^(.*)$ $1.gz [QSA,L]
    
    # Serve brotli compressed files if they exist and the client accepts br
    RewriteCond %{HTTP:Accept-encoding} br
    RewriteCond %{REQUEST_FILENAME}\\.br -f
    RewriteRule ^(.*)$ $1.br [QSA,L]
    
    # Serve correct content types
    <Files *.js.gz>
      AddType application/javascript .gz
      Header append Vary Accept-Encoding
    </Files>
    <Files *.css.gz>
      AddType text/css .gz
      Header append Vary Accept-Encoding
    </Files>
    <Files *.js.br>
      AddType application/javascript .br
      Header append Vary Accept-Encoding
    </Files>
    <Files *.css.br>
      AddType text/css .br
      Header append Vary Accept-Encoding
    </Files>
    
    # Add Vary: Accept-Encoding header
    Header append Vary Accept-Encoding
    
    # Cache control - 1 week for static assets
    Header set Cache-Control "max-age=604800, public"
  </FilesMatch>
</IfModule>

# Prevent viewing of .htaccess file
<Files .htaccess>
  Order allow,deny
  Deny from all
</Files>
`;

  try {
    await writeFile(path.join(distDir, '.htaccess'), htaccessContent);
    console.log('✅ Generated .htaccess file with compression settings');
  } catch (error) {
    console.error('❌ Error creating .htaccess file:', error.message);
  }
}

// Main function
async function main() {
  try {
    console.log('🚀 Starting enhanced compression...');
    
    // Get all files that should be compressed
    const files = await getCompressibleFiles();
    console.log(`Found ${files.length} compressible files`);
    
    // Process all files
    for (const file of files) {
      const ext = path.extname(file);
      
      // Apply minification to JS files
      if (ext === '.js') {
        await minifyJsIfNeeded(file);
      }
      
      // Optimize CSS files
      if (ext === '.css') {
        await optimizeCss(file);
      }
      
      // Create compressed versions
      await createGzipVersion(file);
      await createBrotliVersion(file);
    }
    
    // Create .htaccess file with proper settings
    await createHtaccessFile();
    
    console.log('✅ Compression completed successfully!');
  } catch (error) {
    console.error('❌ Error during compression:', error);
    process.exit(1);
  }
}

// Run the main function
main(); 