const CACHE_NAME = 'circular-cache-v.0.2.0';
const ASSETS_TO_CACHE = [
  '/',
  '/index.html',
  '/logo.svg',
  '/audio/metronome/ping/high.mp3',
  '/audio/metronome/ping/low.mp3',
  '/audio/metronome/block/high.mp3',
  '/audio/metronome/block/low.mp3',
  '/audio/metronome/seiko/high.mp3',
  '/audio/metronome/seiko/low.mp3',
  '/audio/metronome/tongue/high.mp3',
  '/audio/metronome/tongue/low.mp3',
  '/audio/metronome/synth/high.mp3',
  '/audio/metronome/synth/low.mp3',
  '/audio/metronome/keyboard/high.mp3',
  '/audio/metronome/keyboard/low.mp3',
];

// Install Service Worker
self.addEventListener('install', (event) => {
  self.skipWaiting()
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS_TO_CACHE);
    })
  );
});

// Activate Service Worker
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName); // Clean up old caches
          }
        })
      );
    })
  );
  self.clients.claim();
});

// Fetch assets (serve from cache or network)
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      // Return cached response if available, otherwise fetch from network
      return cachedResponse || fetch(event.request);
    })
  );
});