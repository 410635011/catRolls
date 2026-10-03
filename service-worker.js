const CACHE_VERSION = 'battle-cats-seed-tracker-pwa-v2';
const BASE = '/catRolls/';

const APP_SHELL = [
  BASE,
  BASE + 'index.html',
  BASE + 'manifest.json',
  BASE + 'favicon.ico',
  BASE + 'icon-16.png',
  BASE + 'icon-32.png',
  BASE + 'icon-64.png',
  BASE + 'icon-192.png',
  BASE + 'icon-512.png',
  BASE + 'apple-touch-icon.png'
];

self.addEventListener('install', event => {
  event.waitUntil((async () => {
    const cache = await caches.open(CACHE_VERSION);

    // Cache files one-by-one so one missing optional asset cannot abort SW installation.
    await Promise.allSettled(
      APP_SHELL.map(url => cache.add(new Request(url, { cache: 'reload' })))
    );
  })());

  self.skipWaiting();
});

self.addEventListener('activate', event => {
  event.waitUntil((async () => {
    const keys = await caches.keys();
    await Promise.all(
      keys
        .filter(key => key !== CACHE_VERSION)
        .map(key => caches.delete(key))
    );
    await self.clients.claim();
  })());
});

self.addEventListener('fetch', event => {
  const request = event.request;
  if (request.method !== 'GET') return;

  const url = new URL(request.url);

  // Keep GitLab and all other cross-origin data requests network-controlled.
  if (url.origin !== self.location.origin) return;

  // Only handle this GitHub Pages project.
  if (!url.pathname.startsWith(BASE)) return;

  if (request.mode === 'navigate') {
    event.respondWith(
      fetch(request)
        .then(async response => {
          if (response.ok) {
            const cache = await caches.open(CACHE_VERSION);
            cache.put(BASE + 'index.html', response.clone());
          }
          return response;
        })
        .catch(async () =>
          (await caches.match(BASE + 'index.html')) ||
          (await caches.match(BASE))
        )
    );
    return;
  }

  event.respondWith(
    caches.match(request).then(cached => {
      if (cached) return cached;

      return fetch(request).then(async response => {
        if (response && response.ok) {
          const cache = await caches.open(CACHE_VERSION);
          cache.put(request, response.clone());
        }
        return response;
      });
    })
  );
});