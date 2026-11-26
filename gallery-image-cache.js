const cachePrefix = 'bti-gallery-images:' + self.registration.scope + ':';
const cacheName = cachePrefix + 'v1';
const imageURLs = [
  './gallery-architectural-screens.webp',
  './gallery-outdoor-surfaces.webp'
].map(path => new URL(path, self.registration.scope).href);

self.addEventListener('install', event => {
  event.waitUntil(caches.open(cacheName).then(cache => cache.addAll(imageURLs)));
});

self.addEventListener('activate', event => {
  event.waitUntil((async () => {
    const names = await caches.keys();
    await Promise.all(names.filter(name => name.startsWith(cachePrefix) && name !== cacheName)
      .map(name => caches.delete(name)));
    await self.clients.claim();
  })());
});

self.addEventListener('fetch', event => {
  const { request } = event;
  if (request.method !== 'GET' || request.destination !== 'image' || !imageURLs.includes(request.url)) return;

  const cache = caches.open(cacheName);
  const network = fetch(request).then(response => {
    if (response.ok && response.headers.get('content-type')?.startsWith('image/')) {
      const copy = response.clone();
      return { response, stored: cache.then(store => store.put(request, copy)).catch(() => {}) };
    }
    return { response };
  });

  event.waitUntil(network.then(result => result.stored).catch(() => {}));
  event.respondWith(cache.then(store => store.match(request)).catch(() => undefined)
    .then(cached => cached || network.then(result => result.response).catch(() => Response.error())));
});
