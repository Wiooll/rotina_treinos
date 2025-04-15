// Service worker para funcionalidade offline
const CACHE_NAME = 'workout-tracker-v1';

// Instalação do service worker
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        return cache.addAll([
          '/',
          '/index.html',
          '/manifest.json'
        ]);
      })
  );
});

// Estratégia Cache First, depois Network
self.addEventListener('fetch', (event) => {
  // Não intercepta requisições não-GET
  if (event.request.method !== 'GET') return;

  // Não intercepta requisições de extensões do Chrome
  if (event.request.url.startsWith('chrome-extension://')) return;

  // Não intercepta requisições de outros domínios
  if (!event.request.url.startsWith(self.location.origin)) return;

  event.respondWith(
    caches.match(event.request)
      .then((cachedResponse) => {
        if (cachedResponse) {
          // Retorna do cache e atualiza em segundo plano
          const fetchPromise = fetch(event.request)
            .then((response) => {
              // Atualiza o cache apenas se a resposta for válida
              if (response && response.status === 200) {
                const responseToCache = response.clone();
                caches.open(CACHE_NAME)
                  .then((cache) => {
                    cache.put(event.request, responseToCache);
                  })
                  .catch(() => {
                    // Ignora erros de cache
                  });
              }
            })
            .catch(() => {
              // Ignora erros de rede
            });

          return cachedResponse;
        }

        // Se não está no cache, tenta buscar da rede
        return fetch(event.request)
          .then((response) => {
            // Retorna imediatamente se a resposta não for válida
            if (!response || response.status !== 200) {
              return response;
            }

            // Armazena no cache
            const responseToCache = response.clone();
            caches.open(CACHE_NAME)
              .then((cache) => {
                cache.put(event.request, responseToCache);
              })
              .catch(() => {
                // Ignora erros de cache
              });

            return response;
          });
      })
  );
});

// Limpa caches antigos
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames
            .filter((cacheName) => cacheName !== CACHE_NAME)
            .map((cacheName) => caches.delete(cacheName))
        );
      })
  );
}); 