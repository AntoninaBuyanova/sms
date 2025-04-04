/**
 * Loading strategy optimization for myStylus
 * This script adapts loading behavior based on network conditions and device capabilities
 */

(function() {
  // Connection quality detection
  let connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
  let isSlowConnection = false;
  
  // Check if we're on a slow connection
  if (connection) {
    isSlowConnection = connection.saveData || 
                       connection.effectiveType === 'slow-2g' || 
                       connection.effectiveType === '2g' ||
                       connection.effectiveType === '3g';
    
    // Add connection info to the document for CSS targeting
    document.documentElement.setAttribute('data-connection', connection.effectiveType || 'unknown');
    
    if (connection.saveData) {
      document.documentElement.setAttribute('data-save-data', 'true');
    }
  }
  
  // Detect device memory constraints
  let isLowMemory = false;
  if (navigator.deviceMemory) {
    isLowMemory = navigator.deviceMemory < 4; // Less than 4GB RAM
    document.documentElement.setAttribute('data-memory', navigator.deviceMemory + 'gb');
  }
  
  // Detect if device is likely mobile/low-powered
  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  if (isMobile) {
    document.documentElement.setAttribute('data-mobile', 'true');
  }
  
  // Combined strategy based on connection & device
  const shouldOptimizeHeavily = isSlowConnection || isLowMemory || isMobile;
  
  if (shouldOptimizeHeavily) {
    // For slow connections or low-memory devices
    document.documentElement.classList.add('optimize-loading');
    
    // Apply data-saving optimizations
    const style = document.createElement('style');
    style.textContent = `
      /* Reduce quality of background images */
      .optimize-loading .bg-image {
        background-image: none !important;
      }
      
      /* Prevent animation */
      .optimize-loading .animate {
        animation: none !important;
        transition: none !important;
      }
      
      /* Load lower quality images */
      .optimize-loading img:not([loading="eager"]) {
        filter: blur(0px);
      }
      
      /* Lower resolution for non-critical images */
      .optimize-loading img:not([data-lcp="true"]) {
        image-rendering: pixelated;
      }
    `;
    document.head.appendChild(style);
    
    // Convert high-resolution images to lower resolution
    if (window.IntersectionObserver) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const img = entry.target;
            
            // Skip LCP images
            if (img.getAttribute('data-lcp') === 'true' || 
                img.getAttribute('fetchpriority') === 'high') {
              return;
            }
            
            // Replace with low-res version if available
            if (img.dataset.lowSrc) {
              img.src = img.dataset.lowSrc;
            }
            
            observer.unobserve(img);
          }
        });
      });
      
      // Observe all images that could be optimized
      document.querySelectorAll('img:not([data-lcp="true"])').forEach(img => {
        observer.observe(img);
      });
    }
  }
  
  // Listen for network changes and adapt accordingly
  if (connection) {
    connection.addEventListener('change', () => {
      // Update connection attributes when network changes
      document.documentElement.setAttribute('data-connection', connection.effectiveType || 'unknown');
      document.documentElement.setAttribute('data-save-data', connection.saveData ? 'true' : 'false');
      
      // Re-evaluate optimization strategy
      const newShouldOptimize = connection.saveData || 
                               connection.effectiveType === 'slow-2g' || 
                               connection.effectiveType === '2g' ||
                               connection.effectiveType === '3g';
      
      if (newShouldOptimize && !document.documentElement.classList.contains('optimize-loading')) {
        document.documentElement.classList.add('optimize-loading');
      } else if (!newShouldOptimize && document.documentElement.classList.contains('optimize-loading')) {
        document.documentElement.classList.remove('optimize-loading');
      }
    });
  }
})(); 