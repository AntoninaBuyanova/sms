import express, { Request, Response, NextFunction } from "express";
import { registerRoutes } from "./routes";
import { setupVite, serveStatic, log } from "./vite";
import { enhancedCompression, setCacheHeaders } from "./compression-middleware";
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { createServer } from 'vite';

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Enable enhanced compression for all responses
// Apply compression to all routes before other middleware
app.use(enhancedCompression());

// Set proper cache headers
app.use(setCacheHeaders);

// Log and add headers
app.use((req, res, next) => {
  // Set compression-related headers
  res.setHeader('X-Content-Type-Options', 'nosniff');
  
  // Ensure content is properly encoded
  if (!res.getHeader('Content-Encoding') && 
      req.headers['accept-encoding'] && 
      (req.headers['accept-encoding'].includes('gzip') || req.headers['accept-encoding'].includes('br'))) {
    res.setHeader('Vary', 'Accept-Encoding');
  }

  // Remove any restrictive headers
  res.removeHeader('X-Robots-Tag');
  res.removeHeader('X-Frame-Options');

  // Add SEO-friendly headers
  res.setHeader('X-Robots-Tag', 'index, follow');
  res.setHeader('X-Frame-Options', 'SAMEORIGIN');

  const start = Date.now();
  const path = req.path;
  let capturedJsonResponse: Record<string, any> | undefined = undefined;

  const originalResJson = res.json;
  res.json = function (bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };

  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path.startsWith("/api")) {
      let logLine = `${req.method} ${path} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }

      if (logLine.length > 80) {
        logLine = logLine.slice(0, 79) + "…";
      }

      log(logLine);
    }
  });

  next();
});

(async () => {
  const server = await registerRoutes(app);

  app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";

    res.status(status).json({ message });
    throw err;
  });

  // importantly only setup vite in development and after
  // setting up all the other routes so the catch-all route
  // doesn't interfere with the other routes
  if (app.get("env") === "development") {
    await setupVite(app, server);
  } else {
    serveStatic(app);
  }

  // ALWAYS serve the app on port 5000
  // this serves both the API and the client.
  // It is the only port that is not firewalled.
  const port = 5000;
  server.listen({
    port,
    host: "0.0.0.0",
    reusePort: true,
  }, () => {
    log(`serving on port ${port} with enhanced compression`);
  });
})();

// Serve static files with improved cache headers
app.use(express.static('dist/public', {
  maxAge: '1y',
  etag: true,
  lastModified: true,
  immutable: true,
  setHeaders: (res: Response, path: string) => {
    // Ensure proper content types for better compression
    if (path.endsWith('.js')) {
      res.setHeader('Content-Type', 'application/javascript; charset=utf-8');
    } else if (path.endsWith('.css')) {
      res.setHeader('Content-Type', 'text/css; charset=utf-8');
    } else if (path.endsWith('.html')) {
      res.setHeader('Content-Type', 'text/html; charset=utf-8');
    } else if (path.endsWith('.json')) {
      res.setHeader('Content-Type', 'application/json; charset=utf-8');
    } else if (path.endsWith('.svg')) {
      res.setHeader('Content-Type', 'image/svg+xml');
    }
    
    // Add additional headers for HTTP/2 push if needed
    if (path.endsWith('.html')) {
      res.setHeader('Link', '</pdf.png>; rel=preload; as=image');
    }
  }
}));

// Handle all other routes
app.get('*', (req: Request, res: Response) => {
  res.sendFile(join(process.cwd(), 'dist/public/index.html'));
});

// Error handling
app.use((err: Error, req: Request, res: Response, next: express.NextFunction) => {
  console.error(err.stack);
  const message = err.message || "Internal Server Error";
  res.status(500).send(message);
});
