const CACHE = 'meet-v9';
const AUDIO_CACHE = 'meet-audio-v1';

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
];

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE).then(async cache => {
      for (const asset of ASSETS) {
        try { await cache.add(asset); } catch(err) {}
      }
    })
  );
  self.skipWaiting();
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.filter(k => k !== CACHE && k !== AUDIO_CACHE)
            .map(k => caches.delete(k))
      )
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', e => {
  const url = e.request.url;

  // Audio: soporte Range Requests desde cache
  if (url.includes('/audio/')) {
    e.respondWith(handleAudio(e.request));
    return;
  }

  // Tailwind CDN: cache dinámico
  if (url.startsWith('https://cdn.tailwindcss.com')) {
    e.respondWith(
      caches.match(e.request).then(cached => {
        if (cached) return cached;
        return fetch(e.request).then(response => {
          const clone = response.clone();
          caches.open(CACHE).then(c => c.put(e.request, clone));
          return response;
        });
      })
    );
    return;
  }

  // Todo lo demás: cache first
  e.respondWith(
    caches.match(e.request).then(cached => cached || fetch(e.request))
  );
});

async function handleAudio(request) {
  const cache = await caches.open(AUDIO_CACHE);
  const rangeHeader = request.headers.get('range');

  // Buscar en cache
  const cachedResponse = await cache.match(request.url);

  if (cachedResponse) {
    // Si el navegador pide un rango, construimos la respuesta parcial
    if (rangeHeader) {
      const arrayBuffer = await cachedResponse.clone().arrayBuffer();
      const bytes = new Uint8Array(arrayBuffer);
      const total = bytes.byteLength;

      // Parsear range: bytes=start-end
      const match = rangeHeader.match(/bytes=(\d+)-(\d*)/);
      const start = parseInt(match[1]);
      const end = match[2] ? parseInt(match[2]) : total - 1;
      const chunk = bytes.slice(start, end + 1);

      return new Response(chunk, {
        status: 206,
        statusText: 'Partial Content',
        headers: {
          'Content-Type': cachedResponse.headers.get('Content-Type') || 'audio/ogg',
          'Content-Range': `bytes ${start}-${end}/${total}`,
          'Content-Length': chunk.byteLength,
          'Accept-Ranges': 'bytes',
        }
      });
    }
    return cachedResponse;
  }

  // No está en cache: fetch y guardar
  try {
    const response = await fetch(request);
    if (response.ok) {
      cache.put(request.url, response.clone());
    }
    return response;
  } catch (e) {
    return new Response('Audio no disponible offline', { status: 503 });
  }
}
