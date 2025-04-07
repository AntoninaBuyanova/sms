/**
 * Early optimization script for LCP
 * This script runs before React initializes to optimize LCP
 */

(function() {
  // Current origin for proper resource paths
  const origin = window.location.origin;
  
  // Track and optimize LCP
  if ('PerformanceObserver' in window) {
    const lcpObserver = new PerformanceObserver((entryList) => {
      for (const entry of entryList.getEntries()) {
        // Improve performance metrics reporting
        console.log('LCP element:', entry.element);
        console.log('LCP time:', entry.startTime);
        
        // Flag the LCP element
        if (entry.element) {
          entry.element.setAttribute('data-lcp', 'true');
          markLCPAsLoaded(entry.element);
        }
      }
    });
    
    lcpObserver.observe({type: 'largest-contentful-paint', buffered: true});
  }
  
  // Preload critical resources with corrected URLs
  preloadCriticalAssets();
  
  // Optimize scrolling behavior
  optimizeScroll();
  
  // Find and mark the main heading immediately
  setTimeout(function() {
    findAndMarkHeadings();
  }, 0);
  
  // Functions for optimization
  function preloadCriticalAssets() {
    // Key images that should be preloaded but need proper URL handling
    const criticalAssets = [
      { url: '/pdf.png', type: 'image' },
    ];
    
    criticalAssets.forEach(asset => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.as = asset.type;
      
      // Important: handle both production and development paths
      // In production, assets might have different paths due to hashing
      const existingImg = document.querySelector(`img[src$="${asset.url.split('/').pop()}"]`);
      if (existingImg && existingImg.src) {
        // If the image is already in the DOM, use its actual src 
        link.href = existingImg.src;
      } else {
        // Otherwise use a best guess
        link.href = asset.url;
      }
      
      link.fetchPriority = 'high';
      document.head.appendChild(link);
      
      // Add an onload handler for preloaded images 
      if (asset.type === 'image') {
        link.onload = function() {
          console.log(`Preloaded ${link.href} successfully`);
          
          // Find matching images in the DOM and mark them as preloaded
          setTimeout(() => {
            const matchingImages = document.querySelectorAll(`img[src$="${asset.url.split('/').pop()}"]`);
            matchingImages.forEach(img => {
              img.setAttribute('data-preloaded', 'true');
            });
          }, 100);
        };
        
        link.onerror = function() {
          console.warn(`Failed to preload ${link.href}`);
        };
      }
    });
  }
  
  function markLCPAsLoaded(element) {
    if (!element) return;
    
    // Add a class that will be used for styling
    element.classList.add('lcp-loaded');
    
    // Set styles directly for immediate effect
    element.style.display = 'block';
    element.style.visibility = 'visible';
    
    // Force render if needed
    setTimeout(() => {
      element.style.transform = 'translateZ(0)';
    }, 0);
    
    // Add a class to the document element to signal LCP is loaded
    document.documentElement.classList.add('main-lcp-loaded');
  }
  
  function optimizeScroll() {
    // Use passive listeners for scroll events
    window.addEventListener('scroll', function() {
      // Throttled scroll handler
    }, { passive: true });
    
    // Add smooth scrolling but only if user doesn't prefer reduced motion
    if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      document.documentElement.style.scrollBehavior = 'smooth';
    }
  }
  
  function findAndMarkHeadings() {
    // Find potential LCP text elements (usually headings)
    const headings = document.querySelectorAll('h1, h2');
    
    if (headings.length > 0) {
      // Mark the first heading as a potential LCP candidate
      const firstHeading = headings[0];
      firstHeading.setAttribute('data-lcp', 'true');
      firstHeading.classList.add('lcp-text');
      
      // Apply optimizations directly
      firstHeading.style.contentVisibility = 'auto';
      firstHeading.style.transform = 'translateZ(0)';
    }
  }
  
  // After DOM is fully loaded, check if we successfully preloaded resources
  window.addEventListener('DOMContentLoaded', function() {
    // Validate that our preloaded images are properly being used
    setTimeout(function() {
      const imgElements = document.querySelectorAll('img');
      const preloadElements = document.querySelectorAll('link[rel="preload"][as="image"]');
      
      // Create a set of preloaded URLs
      const preloadedUrls = new Set();
      preloadElements.forEach(link => {
        preloadedUrls.add(link.href);
      });
      
      // Check if preloaded resources are used
      let unusedPreloads = true;
      imgElements.forEach(img => {
        if (preloadedUrls.has(img.src)) {
          unusedPreloads = false;
          console.log('Successfully using preloaded image:', img.src);
        }
      });
      
      if (unusedPreloads && preloadElements.length > 0) {
        console.warn('Some preloaded resources may not be used. Consider adjusting preload strategy.');
        
        // Clean up unused preloads to avoid warnings
        preloadElements.forEach(link => {
          // Check if this preload is actually used
          const isUsed = Array.from(imgElements).some(img => 
            img.src === link.href || 
            img.src.endsWith(link.href.split('/').pop())
          );
          
          if (!isUsed) {
            console.log('Removing unused preload:', link.href);
            link.remove();
          }
        });
      }
    }, 2000); // Check after 2 seconds
  });
})(); 