'use strict';

const prefix = 'wolf-haven-mobile:' + self.registration.scope + ':';
const version = prefix + '2';
const shell = [
  './index.html','./style.css','./defaults.js','./app.js','./manifest.webmanifest',
  './assets/moonlit-wolf.webp','./assets/icon-180.png','./assets/icon-192.png','./assets/icon-512.png'
];

self.addEventListener('install',event => {
  event.waitUntil(caches.open(version).then(cache => cache.addAll(shell)));
});

self.addEventListener('activate',event => {
  event.waitUntil(caches.keys().then(keys => Promise.all(
    keys.filter(key => key.startsWith(prefix) && key !== version).map(key => caches.delete(key))
  )).then(() => self.clients.claim()));
});

self.addEventListener('fetch',event => {
  const request = event.request;
  if (request.method !== 'GET' || !request.url.startsWith(self.registration.scope)) return;
  event.respondWith(caches.open(version).then(async cache => {
    if (request.mode === 'navigate') {
      return await cache.match('./index.html') || fetch(request);
    }
    return await cache.match(request) || fetch(request);
  }));
});
