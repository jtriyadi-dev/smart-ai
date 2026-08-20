/**
 * SMART-AI.ID Progressive Web App (PWA) Service Worker
 * Version: 1.0.2 - High Resilience & Mobile Fix
 */

const CACHE_NAME = 'smart-ai-cache-v1.0.2';
const DYNAMIC_CACHE = 'smart-ai-dyn-v1.0.2';

// Essential core shell assets
const PRECACHE_ASSETS = [
  '/',
  '/index.html',
  '/manifest.json',
  '/manifest.webmanifest',
  '/icons/icon.svg',
  '/icons/favicon.png'
];

// Install Event: Precaching App Shell safely
self.addEventListener('install', (event) => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(PRECACHE_ASSETS).catch((err) => {
        console.warn('[PWA SW] Precache warning:', err);
      });
    })
  );
});

// Activate Event: Cleanup Old Caches and take immediate control
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache !== CACHE_NAME && cache !== DYNAMIC_CACHE) {
            console.log('[PWA SW] Clearing old cache:', cache);
            return caches.delete(cache);
          }
        })
      );
    }).then(() => {
      return self.clients.claim();
    })
  );
});

// Fetch Event: Robust Multi-Device Strategy
self.addEventListener('fetch', (event) => {
  const request = event.request;

  // Only handle GET requests
  if (request.method !== 'GET') {
    return;
  }

  const url = new URL(request.url);

  // 1. NEVER intercept Vite / Dev Server / WebSocket / Extension scripts
  if (
    url.pathname.startsWith('/@') ||
    url.pathname.startsWith('/src/') ||
    url.pathname.startsWith('/node_modules/') ||
    url.pathname.includes('hot-update') ||
    url.pathname.endsWith('.tsx') ||
    url.pathname.endsWith('.ts') ||
    url.pathname.endsWith('.jsx') ||
    url.protocol.startsWith('chrome-extension') ||
    url.protocol.startsWith('ws')
  ) {
    return; // Pass through directly to browser network
  }

  // 2. Navigation Request (HTML page loads) - Network-First with Cache Fallback
  if (request.mode === 'navigate') {
    event.respondWith(
      fetch(request)
        .then((networkResponse) => {
          if (networkResponse && networkResponse.status === 200) {
            const resClone = networkResponse.clone();
            caches.open(CACHE_NAME).then((cache) => {
              cache.put(request, resClone);
            });
          }
          return networkResponse;
        })
        .catch(async () => {
          // If network fails (offline), load cached app shell
          const cachedIndex = await caches.match('/index.html');
          if (cachedIndex) return cachedIndex;
          const cachedRoot = await caches.match('/');
          if (cachedRoot) return cachedRoot;
          return caches.match(request);
        })
    );
    return;
  }

  // 3. API Requests - Network First with JSON Offline Fallback
  if (url.pathname.startsWith('/api/')) {
    event.respondWith(
      fetch(request)
        .then((response) => {
          if (response && response.status === 200) {
            const resClone = response.clone();
            caches.open(DYNAMIC_CACHE).then((cache) => {
              cache.put(request, resClone);
            });
          }
          return response;
        })
        .catch(async () => {
          const cached = await caches.match(request);
          if (cached) return cached;
          return new Response(
            JSON.stringify({
              offline: true,
              message: 'Mode offline aktif.',
              timestamp: new Date().toISOString()
            }),
            {
              status: 200,
              headers: { 'Content-Type': 'application/json' }
            }
          );
        })
    );
    return;
  }

  // 4. Static Images, Fonts, and Compiled Assets (/assets/*)
  if (
    url.pathname.startsWith('/assets/') ||
    url.pathname.startsWith('/icons/') ||
    url.pathname.match(/\.(png|jpg|jpeg|svg|webp|gif|ico|woff|woff2|ttf|css)$/) ||
    url.hostname.includes('fonts.googleapis.com') ||
    url.hostname.includes('fonts.gstatic.com') ||
    url.hostname.includes('images.unsplash.com')
  ) {
    event.respondWith(
      caches.match(request).then((cachedResponse) => {
        if (cachedResponse) {
          // Return cached, but revalidate in background if online
          fetch(request)
            .then((networkRes) => {
              if (networkRes && networkRes.status === 200) {
                caches.open(DYNAMIC_CACHE).then((cache) => cache.put(request, networkRes));
              }
            })
            .catch(() => {});
          return cachedResponse;
        }

        return fetch(request)
          .then((networkResponse) => {
            if (networkResponse && networkResponse.status === 200) {
              const resClone = networkResponse.clone();
              caches.open(DYNAMIC_CACHE).then((cache) => {
                cache.put(request, resClone);
              });
            }
            return networkResponse;
          })
          .catch(() => {
            if (url.pathname.match(/\.(png|jpg|jpeg|svg|webp|gif)$/)) {
              return caches.match('/icons/icon.svg');
            }
            return new Response('', { status: 404, statusText: 'Not found offline' });
          });
      })
    );
    return;
  }

  // 5. Default Fallback - Pass-through with Network Safety
  event.respondWith(
    fetch(request).catch(() => {
      return caches.match(request).then((res) => {
        if (res) return res;
        return new Response('', { status: 503, statusText: 'Service Unavailable' });
      });
    })
  );
});

// Skip waiting message listener
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});
