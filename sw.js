const CACHE = 'meet-v3';
const ASSETS = [
  './index.html',
  './app.js',
  './style.css',
  './manifest.json',
  './fonts/CormorantGaramond.woff2',
  './fonts/Jost.woff2',
  './fonts/SpaceMono.woff2'
];

const EXTERNAL = [
  'https://cdn.tailwindcss.com'
];

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE).then(c => c.addAll(ASSETS))
  );
  self.skipWaiting();
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(cached => {
      if (cached) return cached;
      return fetch(e.request).then(response => {
        if (EXTERNAL.some(url => e.request.url.startsWith(url))) {
          const clone = response.clone();
          caches.open(CACHE).then(c => c.put(e.request, clone));
        }
        return response;
      }).catch(() => cached);
    })
  );
});
