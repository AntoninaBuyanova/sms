#!/bin/bash

# Deploy script for myStylus with optimization
# This script builds the application with optimization and compression

set -e # Exit on any error

echo "Starting deployment with optimization..."

# Install dependencies
echo "Installing dependencies..."
npm install

# Install optimization dependencies if not already installed
echo "Checking for optimization dependencies..."
if ! npm list --depth=0 | grep -q "vite-plugin-compression"; then
  echo "Installing optimization dependencies..."
  npm install --save-dev vite-plugin-compression vite-plugin-imagemin terser
fi

# Build the application with optimization
echo "Building optimized application..."
NODE_ENV=production npm run build

# Make sure scripts directory exists
mkdir -p scripts

# Run compression script
echo "Running additional compression..."
node scripts/compress.js

# Print compression stats
echo "Checking compression results..."
ORIGINAL_SIZE=$(du -sh dist/public | cut -f1)
COMPRESSED_SIZE_GZIP=$(find dist/public -name "*.gz" | xargs du -ch 2>/dev/null | tail -1 | cut -f1)
COMPRESSED_SIZE_BR=$(find dist/public -name "*.br" | xargs du -ch 2>/dev/null | tail -1 | cut -f1)

echo "Original size: $ORIGINAL_SIZE"
echo "Gzip compressed size: $COMPRESSED_SIZE_GZIP"
echo "Brotli compressed size: $COMPRESSED_SIZE_BR"

# Create or update .env file with compression flag
echo "Updating environment configuration..."
touch .env
if grep -q "ENABLE_COMPRESSION" .env; then
  sed -i 's/ENABLE_COMPRESSION=.*/ENABLE_COMPRESSION=true/' .env
else
  echo "ENABLE_COMPRESSION=true" >> .env
fi

echo "Deployment complete! The application is optimized and ready to serve."
echo ""
echo "To test the optimized build locally, run: npm run preview"
echo "To deploy to production, follow your normal deployment process."
echo ""
echo "For best results, use the provided nginx.conf with your production server."
echo "This will ensure proper serving of compressed files and optimal caching." 