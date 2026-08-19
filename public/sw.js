/**
 * SMART-AI.ID Progressive Web App (PWA) Service Worker
 * Version: 1.0.0
 * Architecture: Stale-While-Revalidate + Network-First (API) + Offline Resilience
 */

const CACHE_NAME = 'smart-ai-pwa-v1.0.0';
const DYNAMIC_CACHE = 'smart-ai-dynamic-v1.0.0';

// Essential core shell assets for instant offline booting
const PRECACHE_ASSETS = [
  '/',
  '/index.html',
  '/manifest.json',
  '/manifest.webmanifest',
  '/icons/icon.svg'
];

// Install Event: Precaching App Shell
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(PRECACHE_ASSETS).catch((err) => {
        console.warn('[PWA SW] Precache warning (non-fatal):', err);
      });
    }).then(() => {
      return self.skipWaiting();
    })
  );
});

// Activate Event: Cleanup Old Cache Generations
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache !== CACHE_NAME && cache !== DYNAMIC_CACHE) {
            console.log('[PWA SW] Deleting obsolete cache:', cache);
            return caches.delete(cache);
          }
        })
      );
    }).then(() => {
      return self.clients.claim();
    })
  );
});

// Fetch Event: Intelligent Strategy Routing
self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url);

  // Skip non-GET requests (e.g. POST, PUT, DELETE)
  if (event.request.method !== 'GET') {
    return;
  }

  // 1. API Endpoints Strategy: Network-First with Offline Fallback
  if (url.pathname.startsWith('/api/')) {
    event.respondWith(
      fetch(event.request)
        .then((response) => {
          // Clone and cache successful GET responses
          if (response && response.status === 200) {
            const resClone = response.clone();
            caches.open(DYNAMIC_CACHE).then((cache) => {
              cache.put(event.request, resClone);
            });
          }
          return response;
        })
        .catch(() => {
          return caches.match(event.request).then((cachedResponse) => {
            if (cachedResponse) {
              return cachedResponse;
            }
            // Return synthetic offline response for API queries
            return new Response(
              JSON.stringify({
                offline: true,
                message: 'Anda sedang berada dalam mode offline. Data akan disinkronkan saat koneksi internet kembali.',
                timestamp: new Date().toISOString()
              }),
              {
                status: 200,
                headers: { 'Content-Type': 'application/json' }
              }
            );
          });
        })
    );
    return;
  }

  // 2. Static Images & Fonts: Cache-First Strategy
  if (
    url.pathname.match(/\.(png|jpg|jpeg|svg|webp|gif|ico|woff|woff2|ttf|eot)$/) ||
    url.hostname.includes('fonts.googleapis.com') ||
    url.hostname.includes('fonts.gstatic.com') ||
    url.hostname.includes('images.unsplash.com')
  ) {
    event.respondWith(
      caches.match(event.request).then((cachedResponse) => {
        if (cachedResponse) {
          return cachedResponse;
        }
        return fetch(event.request)
          .then((networkResponse) => {
            if (networkResponse && networkResponse.status === 200) {
              const resClone = networkResponse.clone();
              caches.open(DYNAMIC_CACHE).then((cache) => {
                cache.put(event.request, resClone);
              });
            }
            return networkResponse;
          })
          .catch(() => {
            // Fallback for missing images
            return caches.match('/icons/icon.svg');
          });
      })
    );
    return;
  }

  // 3. App Shell Navigation & Pages: Stale-While-Revalidate with SPA Fallback
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      const fetchPromise = fetch(event.request)
        .then((networkResponse) => {
          if (networkResponse && networkResponse.status === 200) {
            const resClone = networkResponse.clone();
            caches.open(DYNAMIC_CACHE).then((cache) => {
              cache.put(event.request, resClone);
            });
          }
          return networkResponse;
        })
        .catch(() => {
          // If offline and request is an HTML page navigation, fallback to root SPA shell
          if (event.request.mode === 'navigate') {
            return caches.match('/index.html').then((indexCached) => {
              return indexCached || caches.match('/');
            });
          }
        });

      return cachedResponse || fetchPromise;
    })
  );
});

// Message Listener for manual update skip waiting
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});
