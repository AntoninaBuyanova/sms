import { Request, Response, NextFunction } from 'express';
import compression from 'compression';
import zlib from 'zlib';

/**
 * Enhanced compression middleware for better performance
 * - Uses highest compression level
 * - Implements brotli compression when supported
 * - Sets proper cache headers
 * - Only compresses responses above threshold
 */
export const enhancedCompression = () => {
  // Check if brotli is supported
  const hasBrotli = !!zlib.createBrotliCompress;

  return compression({
    // Use highest level of compression for Gzip
    level: 9,
    // Set higher threshold for small responses
    threshold: 500, // Only compress responses larger than 500 bytes
    // Implement brotli compression when available
    filter: (req: Request, res: Response) => {
      // Don't compress if client explicitly opted out
      if (req.headers['x-no-compression']) {
        return false;
      }
      
      // Don't compress already compressed responses
      const contentEncoding = res.getHeader('Content-Encoding');
      if (contentEncoding && contentEncoding !== 'identity') {
        return false;
      }
      
      // Use standard compression filter
      return compression.filter(req, res);
    },
    // Set brotli options when available
    ...hasBrotli && {
      brotli: { 
        params: {
          [zlib.constants.BROTLI_PARAM_QUALITY]: 11, // Maximum quality
          [zlib.constants.BROTLI_PARAM_MODE]: zlib.constants.BROTLI_MODE_TEXT
        }
      }
    }
  });
};

/**
 * Additional middleware to set proper cache headers
 */
export const setCacheHeaders = (req: Request, res: Response, next: NextFunction) => {
  // Set Vary header for proper content negotiation
  res.setHeader('Vary', 'Accept-Encoding');
  
  // Check if this is a static resource
  const path = req.path;
  
  if (path.match(/\.(js|css|svg|woff2?|ttf|eot)$/i)) {
    // Long cache for static assets with version hashes
    res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
  } else if (path.match(/\.(jpe?g|png|gif|webp|avif)$/i)) {
    // Long cache for images
    res.setHeader('Cache-Control', 'public, max-age=604800'); // 1 week
  } else if (path.match(/\.(html|json)$/i)) {
    // No cache for HTML and JSON
    res.setHeader('Cache-Control', 'no-cache, max-age=0');
  } else if (!path.startsWith('/api/')) {
    // Default cache policy for other resources
    res.setHeader('Cache-Control', 'public, max-age=3600'); // 1 hour
  }
  
  next();
}; 