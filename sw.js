// Incrémente la version du cache pour forcer la mise à jour
const CACHE_NAME = 'push-up-odyssey-cache-v2.1';

// Liste de tous les fichiers qu’on veut précacher
const urlsToCache = [
  '/',            // racine (si tu sers depuis la racine du site)
  'index.html',
  'manifest.json',
  'icon-192.png',
  'icon-512.png',
  // Ajoute tes 5 images
  'pushup1.png',
  'pushup2.png',
  'pushup3.png',
  'pushup4.png',
  'pushup5.png'
];

// ----------------------------------------------------------
// Phase d’installation : on ouvre le cache et on stocke ces fichiers
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(urlsToCache);
    })
  );
});

// ----------------------------------------------------------
// Phase d’activation : on supprime les anciens caches (versions précédentes)
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

// ----------------------------------------------------------
// Interception des requêtes : on répond avec ce qui est en cache si disponible
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      // Si la ressource est en cache, on la sert; sinon on fait un fetch réseau
      return response || fetch(event.request);
    })
  );
});
