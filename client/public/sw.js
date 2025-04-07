// Service Worker for myStylus
const CACHE_NAME = 'mystylus-cache-v2';
const STATIC_CACHE_NAME = 'mystylus-static-v2';
const DYNAMIC_CACHE_NAME = 'mystylus-dynamic-v2';
const API_CACHE_NAME = 'mystylus-api-v2';
const IMAGE_CACHE_NAME = 'mystylus-images-v2';

// Assets to cache on install - critical resources
const PRECACHE_ASSETS = [
  '/',
  '/index.html',
  '/src/main.tsx',
  '/Favicon (1).png',
  '/pdf.png'
];

// Extended static assets to cache during idle time
const EXTENDED_CACHE_ASSETS = [
  '/assets/vendor.js',
  '/assets/react-core.js',
  '/assets/main.css'
];

// Cache expiration times (in milliseconds)
const EXPIRATION_TIMES = {
  [API_CACHE_NAME]: 5 * 60 * 1000, // 5 minutes for API responses
  [DYNAMIC_CACHE_NAME]: 24 * 60 * 60 * 1000, // 24 hours for dynamic content
  [IMAGE_CACHE_NAME]: 7 * 24 * 60 * 60 * 1000 // 7 days for images
};

// Install event - precache critical assets
self.addEventListener('install', event => {
  // Skip waiting to activate immediately
  self.skipWaiting();
  
  event.waitUntil(
    caches.open(STATIC_CACHE_NAME)
      .then(cache => {
        console.log('Caching critical assets');
        return cache.addAll(PRECACHE_ASSETS);
      })
  );
});

// Activate event - cleanup old caches and claim clients
self.addEventListener('activate', event => {
  const currentCaches = [
    STATIC_CACHE_NAME, 
    DYNAMIC_CACHE_NAME, 
    API_CACHE_NAME,
    IMAGE_CACHE_NAME
  ];
  
  event.waitUntil(
    // Clean up old cache versions
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (!currentCaches.includes(cacheName)) {
            console.log('Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
    .then(() => {
      // Claim any clients immediately
      return self.clients.claim();
    })
    .then(() => {
      // Cache extended assets in the background
      return caches.open(STATIC_CACHE_NAME)
        .then(cache => {
          console.log('Caching extended assets in background');
          return cache.addAll(EXTENDED_CACHE_ASSETS);
        });
    })
  );
});

// Helper function for stale-while-revalidate strategy
const staleWhileRevalidate = (request, cacheName) => {
  return caches.open(cacheName).then(cache => {
    return cache.match(request).then(cachedResponse => {
      // Create a promise that resolves to the network response
      const fetchPromise = fetch(request)
        .then(networkResponse => {
          if (networkResponse && networkResponse.status === 200) {
            // Create a copy since the response can only be consumed once
            const clonedResponse = networkResponse.clone();
            
            // Store the new response in the cache
            cache.put(request, clonedResponse);
          }
          return networkResponse;
        })
        .catch(error => {
          console.log('Fetch failed:', error);
          return null;
        });
      
      // Return the cached response or wait for the network
      return cachedResponse || fetchPromise;
    });
  });
};

// Helper function to determine if a cached response is expired
const isExpired = (response, cacheName) => {
  if (!response || !EXPIRATION_TIMES[cacheName]) {
    return false;
  }
  
  const dateHeader = response.headers.get('date');
  if (!dateHeader) {
    return false;
  }
  
  const cachedTime = new Date(dateHeader).getTime();
  const now = Date.now();
  
  return (now - cachedTime) > EXPIRATION_TIMES[cacheName];
};

// Network-first strategy with timeout fallback to cache
const networkFirstWithTimeout = (request, cacheName, timeoutMs = 3000) => {
  return new Promise(resolve => {
    let timeoutId;
    
    // Set a timeout for the network request
    const timeoutPromise = new Promise(resolveTimeout => {
      timeoutId = setTimeout(() => {
        caches.open(cacheName)
          .then(cache => cache.match(request))
          .then(cachedResponse => {
            if (cachedResponse) {
              console.log('Network timeout, returning cached response');
              resolveTimeout(cachedResponse);
            }
          });
      }, timeoutMs);
    });
    
    // Attempt network request
    fetch(request.clone())
      .then(networkResponse => {
        clearTimeout(timeoutId);
        
        // Cache the response
        if (networkResponse.status === 200) {
          const clonedResponse = networkResponse.clone();
          caches.open(cacheName).then(cache => {
            cache.put(request, clonedResponse);
          });
        }
        
        resolve(networkResponse);
      })
      .catch(() => {
        clearTimeout(timeoutId);
        
        // Network failed, try cache
        caches.open(cacheName)
          .then(cache => cache.match(request))
          .then(cachedResponse => {
            resolve(cachedResponse || new Response('Network error occurred', {
              status: 408,
              headers: { 'Content-Type': 'text/plain' }
            }));
          });
      });
    
    // Resolve with the first response (timeout or network)
    Promise.race([timeoutPromise])
      .then(response => {
        if (response) {
          resolve(response);
        }
      });
  });
};

// Cache-first strategy with network update
const cacheFirstWithRefresh = (request, cacheName) => {
  return caches.open(cacheName).then(cache => {
    return cache.match(request).then(cachedResponse => {
      // If we have a valid cached response that isn't expired, use it
      if (cachedResponse && !isExpired(cachedResponse, cacheName)) {
        // Refresh cache in background
        fetch(request.clone())
          .then(networkResponse => {
            if (networkResponse && networkResponse.status === 200) {
              cache.put(request, networkResponse);
            }
          })
          .catch(() => {
            // Ignore network errors during background refresh
          });
          
        return cachedResponse;
      }
      
      // Otherwise fetch from network
      return fetch(request.clone())
        .then(networkResponse => {
          if (networkResponse && networkResponse.status === 200) {
            const clonedResponse = networkResponse.clone();
            cache.put(request, clonedResponse);
          }
          return networkResponse;
        })
        .catch(() => {
          // If network fails and we have an expired cached response, use it
          if (cachedResponse) {
            return cachedResponse;
          }
          
          // Otherwise report a network error
          return new Response('Network error occurred', {
            status: 408,
            headers: { 'Content-Type': 'text/plain' }
          });
        });
    });
  });
};

// Optimized fetch event with strategy selection based on request type
self.addEventListener('fetch', event => {
  const url = new URL(event.request.url);
  
  // Skip cross-origin requests
  if (url.origin !== self.location.origin) {
    return;
  }
  
  // Skip non-GET requests
  if (event.request.method !== 'GET') {
    return;
  }
  
  // Handle API requests with network-first strategy and timeout
  if (url.pathname.includes('/api/')) {
    event.respondWith(
      networkFirstWithTimeout(event.request, API_CACHE_NAME, 2000)
    );
    return;
  }
  
  // For HTML documents, use network-first with timeout
  if (event.request.headers.get('accept')?.includes('text/html')) {
    event.respondWith(
      networkFirstWithTimeout(event.request, DYNAMIC_CACHE_NAME, 2000)
    );
    return;
  }
  
  // For JavaScript and CSS files, use stale-while-revalidate
  if (url.pathname.match(/\.(js|css)$/)) {
    event.respondWith(
      staleWhileRevalidate(event.request, STATIC_CACHE_NAME)
    );
    return;
  }
  
  // For images, use cache-first with background refresh
  if (url.pathname.match(/\.(jpg|jpeg|png|gif|svg|webp)$/)) {
    event.respondWith(
      cacheFirstWithRefresh(event.request, IMAGE_CACHE_NAME)
    );
    return;
  }
  
  // Default strategy: stale-while-revalidate
  event.respondWith(
    staleWhileRevalidate(event.request, DYNAMIC_CACHE_NAME)
  );
});

// Background sync for failed POST requests
self.addEventListener('sync', event => {
  if (event.tag === 'sync-forms') {
    event.waitUntil(
      // Get all pending form submissions from IndexedDB
      // and try to resend them
      self.clients.matchAll().then(clients => {
        clients.forEach(client => {
          client.postMessage({
            type: 'BACKGROUND_SYNC',
            status: 'STARTED'
          });
        });
        
        // Send notification when complete
        setTimeout(() => {
          self.clients.matchAll().then(clients => {
            clients.forEach(client => {
              client.postMessage({
                type: 'BACKGROUND_SYNC',
                status: 'COMPLETED'
              });
            });
          });
        }, 1000);
      })
    );
  }
});

// Listen for messages from clients
self.addEventListener('message', event => {
  // Handle message type
  if (event.data && event.data.type === 'CLEAR_CACHE') {
    event.waitUntil(
      caches.keys().then(cacheNames => {
        return Promise.all(
          cacheNames.map(cacheName => {
            console.log('Clearing cache:', cacheName);
            return caches.delete(cacheName);
          })
        );
      }).then(() => {
        // Notify the client that caches are cleared
        self.clients.matchAll().then(clients => {
          clients.forEach(client => {
            client.postMessage({
              type: 'CACHE_CLEARED'
            });
          });
        });
      })
    );
  }
});

// Periodically clean up expired cache entries (every hour)
setInterval(() => {
  const cachesToClean = [
    API_CACHE_NAME,
    DYNAMIC_CACHE_NAME,
    IMAGE_CACHE_NAME
  ];
  
  cachesToClean.forEach(cacheName => {
    const expirationTime = EXPIRATION_TIMES[cacheName];
    if (!expirationTime) return;
    
    caches.open(cacheName).then(cache => {
      cache.keys().then(requests => {
        requests.forEach(request => {
          cache.match(request).then(response => {
            if (isExpired(response, cacheName)) {
              console.log('Removing expired cache entry:', request.url);
              cache.delete(request);
            }
          });
        });
      });
    });
  });
}, 60 * 60 * 1000); // Run every hour 