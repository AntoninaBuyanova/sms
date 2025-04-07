import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
import "./utils/critical.css"; // Critical CSS for faster initial rendering

// Mark document as still loading fonts
document.documentElement.classList.add('fonts-loading');

// Connection speed detection for optimization
if ('connection' in navigator) {
  const connection = (navigator as any).connection;
  if (connection) {
    // Set connection attributes for CSS targeting
    document.documentElement.setAttribute('data-connection', connection.effectiveType || 'unknown');
    
    if (connection.saveData) {
      document.documentElement.setAttribute('data-save-data', 'true');
    }
    
    // For slow connections, optimize loading
    if (connection.saveData || connection.effectiveType === 'slow-2g' || connection.effectiveType === '2g') {
      // Set low-data mode attribute for CSS targeting
      document.documentElement.setAttribute('data-connection', 'slow');
      document.documentElement.classList.add('optimize-loading');
      
      // For slow connections, defer non-critical resources
      const style = document.createElement('style');
      style.textContent = `
        img:not([loading="eager"]):not([data-lcp="true"]) {
          content-visibility: auto;
        }
        .animation, .transition {
          animation: none !important;
          transition: none !important;
        }
      `;
      document.head.appendChild(style);
    }
  }
}

// Performance metrics
const reportWebVitals = (metric: any) => {
  // In production, send to analytics
  if (process.env.NODE_ENV === 'production') {
    console.log(metric);
  }
};

// Polyfill for requestIdleCallback
if (!('requestIdleCallback' in window)) {
  (window as any).requestIdleCallback = (callback: Function) => {
    return setTimeout(() => {
      const start = Date.now();
      callback({
        didTimeout: false,
        timeRemaining: () => Math.max(0, 50 - (Date.now() - start))
      });
    }, 1);
  };
}

// Helper to load non-critical resources when idle
const loadWhenIdle = (callback: Function) => {
  if ('requestIdleCallback' in window) {
    (window as any).requestIdleCallback(callback);
  } else {
    setTimeout(callback, 200);
  }
};

// Base asset URL for static files
window.__assetsBaseUrl = process.env.NODE_ENV === 'production' 
  ? window.location.origin
  : '';

// Initialize the app with hydration
const rootElement = document.getElementById("root");
if (!rootElement) throw new Error('Root element not found');

const root = createRoot(rootElement);
root.render(<App />);

// Load performance monitoring and optimizations when idle
loadWhenIdle(() => {
  import('./utils/performance').then(({ measurePerformance }) => {
    const deviceCapabilities = measurePerformance();
    
    // Apply additional optimizations based on device capabilities
    if (deviceCapabilities.isLowEndDevice || deviceCapabilities.hasSlowConnection) {
      // Defer loading of non-critical images
      document.querySelectorAll('img:not([data-lcp="true"]):not([loading="eager"])').forEach(img => {
        img.setAttribute('loading', 'lazy');
      });
      
      // Disable heavy animations
      document.querySelectorAll('[data-animate="heavy"]').forEach(el => {
        el.setAttribute('data-animate', 'disabled');
      });
    }
  });
});
