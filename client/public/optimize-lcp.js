/**
 * Early optimization script for LCP
 * This script runs before React initializes to optimize LCP
 */

(function() {
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
  
  // Preload expected LCP image
  preloadCriticalAssets();
  
  // Optimize scrolling behavior
  optimizeScroll();
  
  // Find and mark the main heading immediately
  setTimeout(function() {
    findAndMarkHeadings();
  }, 0);
  
  // Functions for optimization
  function preloadCriticalAssets() {
    const criticalAssets = [
      '/pdf.png'
    ];
    
    criticalAssets.forEach(url => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.as = 'image';
      link.href = url;
      link.fetchPriority = 'high';
      document.head.appendChild(link);
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
  }
  
  function findAndMarkHeadings() {
    // Find all h2 headings that could be the LCP element
    const headings = document.querySelectorAll('h2');
    
    headings.forEach(heading => {
      if (heading.textContent && heading.textContent.includes('Smarter way to search')) {
        // This is likely our LCP element
        heading.style.contentVisibility = 'visible';
        heading.style.contain = 'none';
        heading.classList.add('lcp-loaded');
        
        // Force layout calculation
        heading.getBoundingClientRect();
      }
    });
  }
  
  function optimizeScroll() {
    // Use passive scroll listeners to improve scroll performance
    window.addEventListener('scroll', () => {}, {passive: true});
    
    // Defer offscreen image loading
    if ('IntersectionObserver' in window) {
      const lazyImageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const img = entry.target;
            if (img.dataset.src) {
              img.src = img.dataset.src;
              img.removeAttribute('data-src');
              observer.unobserve(img);
            }
          }
        });
      });
      
      // Watch for images that should be lazy loaded
      setTimeout(() => {
        document.querySelectorAll('img[data-src]').forEach(img => {
          lazyImageObserver.observe(img);
        });
      }, 300);
    }
  }
})(); 