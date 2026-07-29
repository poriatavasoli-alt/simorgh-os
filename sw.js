/* Simorgh OS 11.0 Quantum — Service Worker */
const CACHE = 'simorgh-os-11-quantum-v1';
const ASSETS = [
  './index.html',
  './manifest.json',
  './payload0.js',
  './payload1.js',
  './sw.js'
];

self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(CACHE).then((c) => c.addAll(ASSETS)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then((r) => r || fetch(e.request).catch(() => caches.match('./index.html')))
  );
});
