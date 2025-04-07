/**
 * Performance monitoring utilities
 */

// Interface for window global
declare global {
  interface Window {
    __assetsBaseUrl: string;
  }
}

// Performance optimization utilities for myStylus

// Interface for web vitals metrics
interface Metric {
  name: string;
  value: number;
  id?: string;
  delta?: number;
}

// Image lazy loading observer
const setupImageLazyLoading = () => {
  if (!('IntersectionObserver' in window)) return;

  const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target as HTMLImageElement;
        
        // Set the src from data-src
        if (img.dataset.src) {
          img.src = img.dataset.src;
        }
        
        // Try to load a higher resolution version if available
        if (img.dataset.srcset) {
          img.srcset = img.dataset.srcset;
        }
        
        // Apply fade-in animation
        img.classList.add('loaded');
        
        // Stop observing once loaded
        imageObserver.unobserve(img);
      }
    });
  }, {
    rootMargin: '50px 0px',
    threshold: 0.01
  });

  // Find all images with data-src attribute and observe them
  document.querySelectorAll('img[data-src]').forEach(img => {
    imageObserver.observe(img);
  });
};

// Font loading optimization
const optimizeFontLoading = () => {
  // Check if the browser supports the Font Loading API
  if ('fonts' in document) {
    Promise.all([
      document.fonts.load('1em Aeonik Pro'),
      document.fonts.load('700 1em Aeonik Pro')
    ]).then(() => {
      document.documentElement.classList.add('fonts-loaded');
    }).catch(() => {
      // If font loading fails, use system fonts as fallback
      document.documentElement.classList.add('fonts-failed');
    });
  } else {
    // Fallback for browsers without Font Loading API
    // Just mark as loaded after a timeout
    setTimeout(() => {
      document.documentElement.classList.add('fonts-loaded');
    }, 1000);
  }
};

// Send performance metrics to analytics
const sendToAnalytics = (metric: Metric) => {
  // In production, you would send to your analytics service
  if (process.env.NODE_ENV === 'production') {
    // Example implementation:
    // Using navigator.sendBeacon for non-blocking network request
    const url = '/api/analytics';
    const data = JSON.stringify({
      name: metric.name,
      value: metric.value,
      id: metric.id,
      timestamp: Date.now()
    });
    
    if (navigator.sendBeacon) {
      navigator.sendBeacon(url, data);
    } else {
      // Fallback to fetch
      fetch(url, {
        method: 'POST',
        body: data,
        keepalive: true,
        headers: {
          'Content-Type': 'application/json'
        }
      }).catch(() => {/* Ignore errors */});
    }
  } else {
    console.log('Performance metric:', metric);
  }
};

// Detect low-end device for different optimization strategies
const detectDeviceCapabilities = () => {
  const deviceInfo = {
    isLowEndDevice: false,
    isLowMemoryDevice: false,
    hasSlowConnection: false,
    isMobileDevice: /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
  };
  
  // Check device memory
  if ('deviceMemory' in navigator) {
    deviceInfo.isLowMemoryDevice = (navigator as any).deviceMemory < 4;
  }
  
  // Check processor count
  if ('hardwareConcurrency' in navigator) {
    deviceInfo.isLowEndDevice = navigator.hardwareConcurrency <= 4;
  }
  
  // Check connection quality
  if ('connection' in navigator) {
    const connection = (navigator as any).connection;
    deviceInfo.hasSlowConnection = connection.saveData || 
      ['slow-2g', '2g', '3g'].includes(connection.effectiveType);
  }
  
  // Add classes to the document for CSS targeting
  if (deviceInfo.isLowEndDevice || deviceInfo.isLowMemoryDevice || deviceInfo.hasSlowConnection) {
    document.documentElement.classList.add('low-end-device');
  }
  
  if (deviceInfo.isMobileDevice) {
    document.documentElement.classList.add('mobile-device');
  }
  
  return deviceInfo;
};

// Initialize critical path optimization
const initializeCriticalPathOpt = () => {
  // Mark above-the-fold content for priority
  const markLCPElements = () => {
    // Mark potential LCP candidates
    const lcpSelectors = [
      'header img', 
      'header h1', 
      '.hero-section img',
      '.hero-section h1',
      'main > section:first-child img'
    ];
    
    lcpSelectors.forEach(selector => {
      document.querySelectorAll(selector).forEach(el => {
        el.setAttribute('fetchpriority', 'high');
        el.setAttribute('loading', 'eager');
        el.setAttribute('data-lcp', 'true');
      });
    });
  };
  
  // Only execute after DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', markLCPElements);
  } else {
    markLCPElements();
  }
};

// Measure Core Web Vitals with the Performance API
const measureCoreWebVitals = () => {
  if (
    typeof window !== 'undefined' &&
    'PerformanceObserver' in window
  ) {
    try {
      // LCP - Largest Contentful Paint
      const lcpObserver = new PerformanceObserver((entryList) => {
        const entries = entryList.getEntries();
        const lastEntry = entries[entries.length - 1];
        
        // Report LCP
        console.log('LCP:', lastEntry.startTime);
        
        // Mark the LCP element
        const lcpElement = (lastEntry as any).element;
        if (lcpElement) {
          lcpElement.setAttribute('data-lcp', 'true');
        }
      });
      lcpObserver.observe({ type: 'largest-contentful-paint', buffered: true });

      // FID - First Input Delay
      const fidObserver = new PerformanceObserver((entryList) => {
        const entries = entryList.getEntries();
        entries.forEach(entry => {
          // Report FID
          console.log('FID:', (entry as any).processingStart - entry.startTime);
        });
      });
      fidObserver.observe({ type: 'first-input', buffered: true });

      // CLS - Cumulative Layout Shift
      let cumulativeLayoutShift = 0;
      const clsObserver = new PerformanceObserver((entryList) => {
        for (const entry of entryList.getEntries()) {
          // Only count CLS if user hasn't interacted
          if (!(entry as any).hadRecentInput) {
            cumulativeLayoutShift += (entry as any).value;
          }
        }
        // Report CLS
        console.log('CLS:', cumulativeLayoutShift);
      });
      clsObserver.observe({ type: 'layout-shift', buffered: true });

      // Disconnect observers after 30s (page should be fully loaded by then)
      setTimeout(() => {
        lcpObserver.disconnect();
        fidObserver.disconnect();
        clsObserver.disconnect();
        
        // Final CLS report
        console.log('Final CLS:', cumulativeLayoutShift);
      }, 30000);
    } catch (e) {
      console.error('Error measuring performance:', e);
    }
  }
};

/**
 * Main performance measurement function
 * Combines all optimization and measurement strategies
 */
export const measurePerformance = () => {
  // Set up loading optimizations
  const deviceCapabilities = detectDeviceCapabilities();
  
  // Initialize critical path optimization
  initializeCriticalPathOpt();
  
  // Setup lazy loading for images
  setupImageLazyLoading();
  
  // Optimize font loading
  optimizeFontLoading();
  
  // Measure performance with built-in API
  measureCoreWebVitals();
  
  // Import web-vitals library asynchronously in production
  if (process.env.NODE_ENV === 'production') {
    // Dynamic import for better code splitting
    // Use the correct web-vitals API (v3+)
    import(/* webpackChunkName: "web-vitals" */ 'web-vitals')
      .then((webVitals) => {
        webVitals.onCLS(sendToAnalytics);
        webVitals.onFID(sendToAnalytics);
        webVitals.onLCP(sendToAnalytics);
        webVitals.onFCP(sendToAnalytics);
        webVitals.onTTFB(sendToAnalytics);
      })
      .catch(error => {
        console.error('Error loading web-vitals:', error);
      });
  }
  
  // Return device capabilities for use elsewhere
  return deviceCapabilities;
};

/**
 * Mark a specific timing point for performance measurement
 */
export const markPerformanceTimestamp = (name: string): void => {
  if (typeof performance !== 'undefined' && performance.mark) {
    performance.mark(name);
  }
};

/**
 * Measure time between two performance marks
 */
export const measurePerformanceDuration = (startMark: string, endMark: string, name: string): void => {
  if (typeof performance !== 'undefined' && performance.measure) {
    try {
      performance.measure(name, startMark, endMark);
      const measure = performance.getEntriesByName(name)[0];
      console.log(`${name}: ${measure.duration.toFixed(2)}ms`);
    } catch (e) {
      console.error('Error measuring performance duration:', e);
    }
  }
};

// Export utility functions
export { 
  setupImageLazyLoading,
  optimizeFontLoading,
  detectDeviceCapabilities,
  initializeCriticalPathOpt
}; 