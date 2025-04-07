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
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Detect environment
const isDevelopment = process.env.NODE_ENV === 'development';

// Функция проверки пути перед использованием fs.statSync
function isSafePath(id: string): boolean {
  return typeof id === 'string' && !id.includes('\0') && id.trim().length > 0;
}

export default defineConfig({
  plugins: [
    react({
      // Improve tree-shaking by using the modern JSX transform
      jsxRuntime: 'automatic',
      // Enable babel plugins for better optimization
      babel: {
        plugins: [
          !isDevelopment ? 'transform-react-remove-prop-types' : null,
        ].filter(Boolean) as any[],
      },
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
    // Add Gzip compression with improved settings for better compression
    viteCompression({
      verbose: true,
      algorithm: 'gzip',
      ext: '.gz',
      threshold: 0, // Compress all files regardless of size
      compressionOptions: {
        level: 9, // Maximum compression level
      },
      deleteOriginFile: false,
    }),
    // Add Brotli compression (higher compression ratio than gzip)
    viteCompression({
      verbose: true,
      algorithm: 'brotliCompress',
      ext: '.br',
      threshold: 0, // Compress all files regardless of size
      compressionOptions: {
        level: 11, // Maximum compression level
      },
      deleteOriginFile: false,
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
  ].filter(Boolean),
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
        passes: 3, // Increased to 3 passes for better optimization
        ecma: 2020, // Target modern ECMAScript for better minification
        toplevel: true, // Better minification by enabling top level transforms
        unsafe_math: true, // Allow math optimizations for better compression
        unsafe_arrows: true, // Enable arrow function optimizations
        pure_getters: true, // Assume getters are pure for optimization
        unsafe: true, // Allow unsafe optimizations
        unsafe_comps: true, // Allow unsafe comparisons
        unsafe_methods: true, // Allow unsafe method transformations
        unsafe_proto: true, // Allow unsafe prototype access
        keep_infinity: true, // Preserve Infinity for type checking purposes
      },
      mangle: {
        safari10: true,
        properties: {
          regex: /^_/ // Mangle properties starting with underscore
        }
      },
      format: {
        comments: false, // Remove all comments
        ecma: 2020, // Format for modern browsers
        wrap_iife: true, // Wrap IIFEs for optimal minification
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
          
          // Split Radix UI components into separate chunks
          if (id.includes('node_modules/@radix-ui/')) {
            const packageName = id.match(/@radix-ui\/([^/]+)/);
            if (packageName && packageName[1]) {
              // Group small packages together, but split large ones
              const smallPackages = ['react-slot', 'react-label', 'react-separator'];
              if (smallPackages.includes(packageName[1])) {
                return 'radix-ui-small';
              }
              return `radix-ui-${packageName[1]}`;
            }
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
          
          // Split framer-motion into separate chunk
          if (id.includes('node_modules/framer-motion')) {
            return 'animations';
          }
          
          // Break recharts into its own chunk
          if (id.includes('node_modules/recharts')) {
            return 'charts';
          }
          
          // Split zod validation into its own chunk
          if (id.includes('node_modules/zod')) {
            return 'validation';
          }
          
          // Group form-related libraries
          if (id.includes('node_modules/react-hook-form') || 
              id.includes('node_modules/@hookform/')) {
            return 'forms';
          }
          
          // Group all other node_modules based on top-level package
          if (id.includes('node_modules/')) {
            // Проверка безопасности пути перед обработкой
            if (!isSafePath(id)) {
              return 'vendor'; // Возвращаем просто vendor для небезопасных путей
            }
            
            // Extract the package name only (first part after node_modules)
            const matches = id.match(/node_modules\/(?:@[^/]+\/)?[^/]+/);
            if (matches) {
              const packagePath = matches[0].replace('node_modules/', '');
              
              // Group very small packages into 'vendor-misc'
              try {
                const stats = fs.statSync(id);
                if (stats.size < 10 * 1024) { // Less than 10KB
                  return 'vendor-misc';
                }
                
                return `vendor-${packagePath.replace('@', '')}`;
              } catch (err) {
                // В случае ошибки просто возвращаем общий vendor
                return 'vendor';
              }
            }
            return 'vendor';
          }
          
          // Split app code by directory
          if (id.includes('/src/components/')) {
            return 'components';
          }
          
          if (id.includes('/src/utils/') || id.includes('/src/helpers/')) {
            return 'utils-app';
          }
          
          if (id.includes('/src/hooks/')) {
            return 'hooks';
          }
          
          if (id.includes('/src/pages/') || id.includes('/src/views/')) {
            // Extract the page name for dynamic imports
            const pageMatch = id.match(/\/src\/(?:pages|views)\/([^/]+)/);
            if (pageMatch && pageMatch[1]) {
              return `page-${pageMatch[1]}`;
            }
            return 'pages';
          }
        },
        // Improve chunk naming to enable better caching
        chunkFileNames: 'assets/[name]-[hash:8].js',
        entryFileNames: 'assets/[name]-[hash:8].js',
        assetFileNames: 'assets/[name]-[hash:8].[ext]',
        // Compress output with this setting
        compact: true,
      },
      // Optimize tree-shaking
      treeshake: {
        moduleSideEffects: false,
        propertyReadSideEffects: false,
        tryCatchDeoptimization: false,
        preset: 'smallest', // Use the most aggressive tree-shaking preset
        annotations: true, // Consider /*@__PURE__*/ annotations
        unknownGlobalSideEffects: false,
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
    // Compress HTML
    assetsInlineLimit: 4096, // Inline small assets (< 4KB)
  },
  optimizeDeps: {
    // Force include specific dependencies for better optimization
    include: [
      'react', 
      'react-dom', 
      'react-router-dom',
      '@tanstack/react-query',
      'framer-motion',
      'wouter',
      'zod',
      'lucide-react',
      'clsx',
      'tailwind-merge',
    ],
    // Disable processing of these dependencies if they're causing issues
    exclude: [],
    // Improve tree-shaking
    esbuildOptions: {
      // Mark packages as side-effect free for better tree shaking
      pure: ['console.log', 'console.debug', 'console.info'],
      // Enable additional minification
      minify: true,
      target: 'es2020',
      legalComments: 'none', // Remove license comments for smaller bundles
      treeShaking: true,
      ignoreAnnotations: false,
      mangleProps: /^_/,
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