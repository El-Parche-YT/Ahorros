const CACHE_NAME = 'ahorro-pro-cache-v1';
// Lista de archivos para guardar en caché.
const urlsToCache = [
  '/',
  'index.html',
  'Login.html',
  'mapa.jpeg', // Fondo de la página de login
  'imagen/icon-192x192.png',
  'imagen/icon-512x512.png'
];

// Evento de instalación: se abre el caché y se guardan los archivos.
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Cache abierto');
        return cache.addAll(urlsToCache);
      })
  );
});

// Evento de fetch: intercepta las peticiones de red.
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Si el recurso está en caché, lo devuelve.
        if (response) {
          return response;
        }
        // Si no, lo busca en la red.
        return fetch(event.request);
      })
  );
});

// Evento de activación: limpia cachés antiguos.
self.addEventListener('activate', event => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
