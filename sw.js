const CACHE = 'meet-v8';
const ASSETS = [
  '/index.html',
  '/app.js',
  '/style.css',
  '/manifest.json',
  '/icon-192.png',
  '/icon-512.png',
  '/fonts/CormorantGaramond.woff2',
  '/fonts/Jost.woff2',
  '/fonts/SpaceMono.woff2',
  '/img/kundalini.webp',
  '/audio/audiolibros/marco.opus',
  '/audio/audiolibros/epicteto.opus',
  '/audio/audiolibros/poder_ahora.opus',
  '/audio/audiolibros/habitos.opus',
  '/audio/audiolibros/frankl.opus',
  '/audio/audiolibros/kybalion.opus',
  '/audio/sonidos/cuencos.opus',
  '/audio/sonidos/grillos.opus',
  '/audio/sonidos/lluvia.opus',
  '/audio/sonidos/mantra.opus',
  '/audio/sonidos/mar.opus',
  '/audio/sonidos/pajaros.opus',
  '/audio/sonidos/viento.opus',
  '/audio/yoga/saludo.opus',
  '/audio/yoga/guerrero.opus',
  '/audio/yoga/restauracion.opus',
  '/audio/yoga/kundalini.opus',
];

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE).then(async cache => {
      for (const asset of ASSETS) {
        try {
          await cache.add(asset);
        } catch(err) {
          console.warn('SW cache failed:', asset, err);
        }
      }
    })
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
        // Cachear audios y recursos dinámicos
        if (
          e.request.url.includes('/audio/') ||
          e.request.url.includes('/img/') ||
          e.request.url.startsWith('https://cdn.tailwindcss.com')
        ) {
          const clone = response.clone();
          caches.open(CACHE).then(c => c.put(e.request, clone));
        }
        return response;
      }).catch(() => cached);
    })
  );
});
