// MEET PWA Service Worker
const CACHE = 'meet-v1';
const ASSETS = [
  './index.html',
  './app.js',
  './style.css',
  './manifest.json',
  './fonts/CormorantGaramond.woff2',
  './fonts/Jost.woff2',
  './fonts/SpaceMono.woff2'
];
self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(ASSETS)).catch(() => {}));
  self.skipWaiting();
});

self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))));
  self.clients.claim();
});

self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(cached => cached || fetch(e.request).catch(() => cached))
  );
});
