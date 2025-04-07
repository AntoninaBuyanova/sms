/**
 * Enhanced LCP Optimization Script
 * 
 * This script improves Largest Contentful Paint (LCP) by:
 * 1. Identifying and preloading critical resources
 * 2. Using resource hints more effectively
 * 3. Ensuring proper priorities with fetchpriority attribute
 * 4. Better handling of font loading
 */

(function() {
  // Configuration
  const config = {
    // Critical resources to preload
    criticalResources: {
      // Main page assets
      images: ['/pdf.png', '/optimized/pdf-768.webp'],
      fonts: ['/assets/Orbikular (1)-DSOKtIy0.ttf', '/assets/aeonikpro-regular-CMBO2ckX.otf'],
      scripts: ['/assets/index-pGMQx8hB.js', '/assets/vendor-l0sNRNKZ.js'],
      styles: ['/assets/index-BycsqLtb.css', '/critical.css']
    },
    // Connection timeouts
    connectionTimeout: 2000, // 2 seconds
    // Critical URLs to prefetch for common navigation paths
    prefetchURLs: ['/'],
    // DNS domains to preconnect
    preconnectDomains: ['https://fonts.googleapis.com', 'https://fonts.gstatic.com'],
  };
  
  /**
   * Dynamically add a preload link to the head
   */
  function preloadResource(url, type, importance = 'high', loadMode = '', media = '') {
    if (!url) return;
    
    // Skip if already preloaded
    if (document.querySelector(`link[rel="preload"][href="${url}"]`)) {
      return;
    }
    
    // Create preload link
    const preload = document.createElement('link');
    preload.rel = 'preload';
    preload.href = url;
    
    // Set as attribute to avoid security issues with cross-origin
    preload.setAttribute('crossorigin', 'anonymous');
    
    // Set appropriate type and other attributes
    switch (type) {
      case 'image':
        preload.as = 'image';
        if (url.endsWith('.webp')) preload.type = 'image/webp';
        if (url.endsWith('.avif')) preload.type = 'image/avif';
        if (media) preload.media = media;
        break;
      case 'font':
        preload.as = 'font';
        if (url.endsWith('.woff2')) preload.type = 'font/woff2';
        if (url.endsWith('.woff')) preload.type = 'font/woff';
        if (url.endsWith('.ttf')) preload.type = 'font/ttf';
        if (url.endsWith('.otf')) preload.type = 'font/otf';
        break;
      case 'script':
        preload.as = 'script';
        break;
      case 'style':
        preload.as = 'style';
        break;
    }
    
    // Set importance
    if (importance === 'high') {
      preload.setAttribute('fetchpriority', 'high');
    }
    
    // Set loading mode for images
    if (type === 'image' && loadMode) {
      preload.setAttribute('loading', loadMode);
    }
    
    // Append to head
    document.head.appendChild(preload);
    
    return preload;
  }
  
  /**
   * Add preconnect for external domains
   */
  function addPreconnect(url) {
    // Skip if already added
    if (document.querySelector(`link[rel="preconnect"][href="${url}"]`)) {
      return;
    }
    
    const preconnect = document.createElement('link');
    preconnect.rel = 'preconnect';
    preconnect.href = url;
    preconnect.setAttribute('crossorigin', 'anonymous');
    document.head.appendChild(preconnect);
    
    // Also add dns-prefetch as fallback for browsers that don't support preconnect
    const dnsPrefetch = document.createElement('link');
    dnsPrefetch.rel = 'dns-prefetch';
    dnsPrefetch.href = url;
    document.head.appendChild(dnsPrefetch);
  }
  
  /**
   * Find potential LCP element and optimize it
   */
  function optimizeLCPElement() {
    // Common LCP selectors
    const potentialLCPSelectors = [
      'img[src$="pdf.png"]',
      'img[src*="pdf"]',
      'h1',
      'h2:first-of-type',
      '.hero img',
      '.banner img',
      'img[width][height]'
    ];
    
    // Try to find potential LCP element
    let lcpElement = null;
    for (const selector of potentialLCPSelectors) {
      const element = document.querySelector(selector);
      if (element && isInViewport(element)) {
        lcpElement = element;
        break;
      }
    }
    
    // If found, optimize it
    if (lcpElement) {
      // Mark it for easier identification
      lcpElement.setAttribute('data-lcp', 'true');
      
      // If it's an image
      if (lcpElement.tagName === 'IMG') {
        // Set fetchpriority
        lcpElement.setAttribute('fetchpriority', 'high');
        
        // Set loading eager
        lcpElement.setAttribute('loading', 'eager');
        
        // Preload its source
        preloadResource(lcpElement.src, 'image', 'high', 'eager');
        
        // If it has a srcset, preload the first one (likely smallest)
        if (lcpElement.srcset) {
          const firstSrcSet = lcpElement.srcset.split(',')[0].trim().split(' ')[0];
          preloadResource(firstSrcSet, 'image', 'high', 'eager');
        }
      }
    }
  }
  
  /**
   * Check if element is in viewport
   */
  function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
  }
  
  /**
   * Apply media queries to image preloads to avoid preloading unnecessary images
   */
  function applyMediaQueriesToImagePreloads() {
    const preloadResources = config.criticalResources.images;
    
    // Apply media queries based on image naming conventions
    preloadResources.forEach(url => {
      // Extract size from the filename pattern (e.g., image-320.webp, image-768.webp)
      const match = url.match(/-(\d+)\.(webp|avif|png|jpg|jpeg)$/);
      if (match) {
        const size = parseInt(match[1], 10);
        let media = '';
        
        // Apply media queries based on size
        if (size <= 320) {
          media = '(max-width: 320px)';
        } else if (size <= 640) {
          media = '(min-width: 321px) and (max-width: 640px)';
        } else if (size <= 768) {
          media = '(min-width: 641px) and (max-width: 768px)';
        } else if (size <= 1024) {
          media = '(min-width: 769px) and (max-width: 1024px)';
        } else if (size <= 1366) {
          media = '(min-width: 1025px) and (max-width: 1366px)';
        } else {
          media = '(min-width: 1367px)';
        }
        
        preloadResource(url, 'image', 'high', 'eager', media);
      } else {
        // No size in filename, preload normally
        preloadResource(url, 'image', 'high', 'eager');
      }
    });
  }
  
  /**
   * Handle font preloading and optimization
   */
  function optimizeFonts() {
    // Preload critical fonts
    config.criticalResources.fonts.forEach(font => {
      preloadResource(font, 'font', 'high');
    });
    
    // Add preconnect for external font providers
    config.preconnectDomains.forEach(addPreconnect);
    
    // Apply font-display: swap to all @font-face rules
    if (document.styleSheets) {
      try {
        for (let i = 0; i < document.styleSheets.length; i++) {
          const styleSheet = document.styleSheets[i];
          try {
            // Access may throw error for cross-origin stylesheets
            const rules = styleSheet.cssRules || styleSheet.rules;
            if (!rules) continue;
            
            for (let j = 0; j < rules.length; j++) {
              const rule = rules[j];
              if (rule.type === CSSRule.FONT_FACE_RULE && !rule.style.fontDisplay) {
                rule.style.fontDisplay = 'swap';
              }
            }
          } catch (e) {
            // Ignore cross-origin errors
          }
        }
      } catch (e) {
        // Ignore errors
      }
    }
  }
  
  /**
   * Main initialization function
   */
  function initialize() {
    // Add preconnects immediately
    config.preconnectDomains.forEach(addPreconnect);
    
    // Optimize based on loading phase
    if (document.readyState === 'loading') {
      // During initial HTML parsing
      
      // Preload critical scripts
      config.criticalResources.scripts.forEach(script => {
        preloadResource(script, 'script', 'high');
      });
      
      // Preload critical styles
      config.criticalResources.styles.forEach(style => {
        preloadResource(style, 'style', 'high');
      });
      
      // Handle the rest when DOM is interactive
      document.addEventListener('DOMContentLoaded', function() {
        // Apply media queries to image preloads
        applyMediaQueriesToImagePreloads();
        
        // Optimize LCP element
        optimizeLCPElement();
        
        // Font optimization
        optimizeFonts();
      });
    } else {
      // If the script runs after page has started loading
      // Preload critical resources immediately
      config.criticalResources.scripts.forEach(script => {
        preloadResource(script, 'script', 'high');
      });
      
      config.criticalResources.styles.forEach(style => {
        preloadResource(style, 'style', 'high');
      });
      
      // Apply media queries to image preloads
      applyMediaQueriesToImagePreloads();
      
      // Optimize LCP element
      optimizeLCPElement();
      
      // Font optimization
      optimizeFonts();
    }
  }
  
  // Run initialization
  initialize();
})(); 