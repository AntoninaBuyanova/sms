import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path, { dirname } from "path";
import { fileURLToPath } from "url";
import viteCompression from 'vite-plugin-compression';
import viteImagemin from 'vite-plugin-imagemin';
import { splitVendorChunkPlugin } from 'vite';
import { visualizer } from 'rollup-plugin-visualizer';
import { createHtmlPlugin } from 'vite-plugin-html';
import legacy from '@vitejs/plugin-legacy';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Detect environment
const isDevelopment = process.env.NODE_ENV === 'development';

export default defineConfig({
  plugins: [
    react({
      // Improve tree-shaking by using the modern JSX transform
      jsxRuntime: 'automatic',
    }),
    // Add code splitting
    splitVendorChunkPlugin(),
    // HTML optimization and resource injection
    createHtmlPlugin({
      minify: true,
      inject: {
        data: {
          injectScript: isDevelopment 
            ? '' 
            : '<link rel="modulepreload" href="/assets/vendor.js" /><link rel="modulepreload" href="/assets/react-core.js" />',
        },
      },
    }),
    // Legacy browser support
    legacy({
      targets: ['defaults', 'not IE 11'],
    }),
    // Analyze bundle size in production
    process.env.ANALYZE === 'true' && visualizer({
      filename: './dist/stats.html',
      gzipSize: true,
      brotliSize: true,
      open: true
    }),
    // Add Gzip compression
    viteCompression({
      verbose: true,
      algorithm: 'gzip',
      ext: '.gz',
    }),
    // Add Brotli compression (higher compression ratio than gzip)
    viteCompression({
      verbose: true,
      algorithm: 'brotliCompress',
      ext: '.br',
      compressionOptions: {
        level: 11,
      },
    }),
    // Optimize images
    viteImagemin({
      gifsicle: {
        optimizationLevel: 7,
        interlaced: false,
      },
      optipng: {
        optimizationLevel: 7,
      },
      mozjpeg: {
        quality: 80,
        progressive: true,
      },
      pngquant: {
        quality: [0.7, 0.8],
        speed: 4,
      },
      webp: {
        quality: 75,
      },
      svgo: {
        plugins: [
          {
            name: 'removeViewBox',
          },
          {
            name: 'removeEmptyAttrs',
            active: false,
          },
        ],
      },
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "client", "src"),
      "@shared": path.resolve(__dirname, "shared"),
      "@assets": path.resolve(__dirname, "attached_assets"),
    },
  },
  root: path.resolve(__dirname, "client"),
  server: {
    host: '0.0.0.0',
    port: 3000,
  },
  build: {
    outDir: path.resolve(__dirname, "dist/public"),
    emptyOutDir: true,
    // Add build optimizations
    cssCodeSplit: true, // Split CSS into smaller chunks
    minify: 'terser', // Use terser for better minification
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
        pure_funcs: ['console.log', 'console.debug', 'console.info'],
        passes: 2, // Multiple passes for better optimization
      },
      mangle: {
        safari10: true,
      },
      format: {
        comments: false, // Remove all comments
      },
    },
    rollupOptions: {
      output: {
        // More aggressive code splitting based on modules
        manualChunks: (id) => {
          // Create a chunk for core React libraries
          if (id.includes('node_modules/react/') || id.includes('node_modules/react-dom/')) {
            return 'react-core';
          }
          
          // Create a chunk for specific large libraries
          if (id.includes('node_modules/@tanstack/react-query')) {
            return 'tanstack-query';
          }
          
          // Create a chunk for Radix UI components
          if (id.includes('node_modules/@radix-ui/')) {
            return 'radix-ui';
          }
          
          // Create a chunk for Lucide icons
          if (id.includes('node_modules/lucide-react')) {
            return 'icons';
          }
          
          // Create a chunk for utility libraries
          if (id.includes('node_modules/lodash') || 
              id.includes('node_modules/date-fns') ||
              id.includes('node_modules/ramda')) {
            return 'utils';
          }
          
          // Group all other node_modules
          if (id.includes('node_modules/')) {
            return 'vendor';
          }
        },
        // Improve chunk naming to enable better caching
        chunkFileNames: 'assets/[name]-[hash:8].js',
        entryFileNames: 'assets/[name]-[hash:8].js',
        assetFileNames: 'assets/[name]-[hash:8].[ext]',
      },
      // Optimize tree-shaking
      treeshake: {
        moduleSideEffects: false,
        propertyReadSideEffects: false,
        tryCatchDeoptimization: false
      },
    },
    // Disable sourcemaps in production to reduce bundle size
    sourcemap: process.env.NODE_ENV !== 'production',
    // Enable modern JavaScript features
    target: 'es2020',
    // Use modulepreload instead of old approaches
    modulePreload: {
      polyfill: true,
    },
    // Improve CSS handling
    cssTarget: 'chrome80',
  },
  optimizeDeps: {
    // Force include specific dependencies for better optimization
    include: [
      'react', 
      'react-dom', 
      'react-router-dom',
      '@tanstack/react-query'
    ],
    // Disable processing of these dependencies if they're causing issues
    exclude: [],
    // Improve tree-shaking
    esbuildOptions: {
      // Mark packages as side-effect free for better tree shaking
      pure: ['console.log', 'console.debug', 'console.info']
    }
  },
  // Enable some experimental features
  experimental: {
    // Enables renderBuiltUrl to generate absolute URLs for assets
    renderBuiltUrl(filename, { hostType }) {
      if (hostType === 'js') {
        return { runtime: `window.__assetsBaseUrl + ${JSON.stringify(filename)}` };
      }
    }
  }
});