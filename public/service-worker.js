const CACHE_NAME = 'sahajomart-v3';
const APP_SHELL = [
  '/',
  '/index.html',
  '/manifest.json',
  '/icons/icon-192.png',
  '/icons/icon-512.png'
];

// ✅ Static assets cache karne ke liye (build files automatically add hongi)
const STATIC_ASSETS = [
  '/static/css/main.984fcd87.css',
  '/static/js/main.6f063ddd.js'
  // Build ke baad automatic update ho jayega
];

// ✅ Install event
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        // App shell + static assets cache karo
        const allAssets = [...APP_SHELL, ...STATIC_ASSETS];
        return cache.addAll(allAssets);
      })
      .then(() => self.skipWaiting())
  );
});

// ✅ Activate event — purani cache delete
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(
        keys
          .filter((key) => key !== CACHE_NAME)
          .map((key) => caches.delete(key))
      ))
      .then(() => self.clients.claim())
  );
});

// ✅ Fetch event — Smart caching strategy
self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url);

  // 1️⃣ Sirf GET requests handle karo
  if (event.request.method !== 'GET') return;

  // 2️⃣ External APIs ko cache mat karo (hamesha fresh data chahiye)
  if (url.origin !== self.location.origin) {
    // Sirf images/fonts ko cache karo (3rd party)
    if (url.pathname.match(/\.(png|jpg|jpeg|gif|svg|webp|woff|woff2|ttf|eot)$/)) {
      event.respondWith(
        caches.match(event.request)
          .then((cached) => cached || fetch(event.request))
      );
      return;
    }
    // Baaki external requests — direct fetch
    return;
  }

  // 3️⃣ Internal requests — Network first, cache fallback
  event.respondWith(
    fetch(event.request)
      .then((response) => {
        // ✅ Sirf successful responses ko cache karo
        if (response && response.status === 200) {
          const copy = response.clone();
          caches.open(CACHE_NAME)
            .then((cache) => cache.put(event.request, copy));
        }
        return response;
      })
      .catch(() => {
        // ❌ Network fail — cache se serve karo
        return caches.match(event.request)
          .then((cached) => {
            if (cached) return cached;

            // 📱 Agar navigate request hai (page load) toh index.html serve karo
            if (event.request.mode === 'navigate') {
              return caches.match('/index.html');
            }

            // 🖼️ Agar image hai toh fallback image do
            if (event.request.destination === 'image') {
              return caches.match('/icons/icon-192.png');
            }

            return new Response('Offline - Please check your connection', {
              status: 503,
              statusText: 'Service Unavailable'
            });
          });
      })
  );
});