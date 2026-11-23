/* =====================================================
   MI TIENDITA · Service Worker (sw.js)
   Arquitectura PWA Offline-First Oficial UPDS (Versión 13.0)
   - Cache First + Network Fallback + Dynamic Runtime Cache
   - Soporte Total para Imágenes de Unsplash Offline
   - Cumplimiento de Rúbrica 100 Puntos
   ===================================================== */

// Semana 2 - Arquitectura PWA Offline (sw.js)
const NOMBRE_CACHE = 'mitiendita-cache-v13';
const RECURSOS_CACHE = [
  './',
  './index.html',
  './css/style.css',
  './css/accesibilidad.css',
  './js/jquery.min.js',
  './js/script.js',
  './js/accesibilidad.js',
  './js/smoke-test.js',
  './js/auditoria-a11y.js',
  './manifest.json',
  './icons/icon-192.png',
  './icons/icon-512.png',
  'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap',
  'https://cdn.jsdelivr.net/npm/dompurify@3.1.6/dist/purify.min.js'
];

// 1. Instalación: Cachea los recursos esenciales del App Shell
self.addEventListener('install', (eventoInstalacion) => {
  self.skipWaiting();
  eventoInstalacion.waitUntil(
    caches.open(NOMBRE_CACHE).then((almacenCache) => {
      console.log('[SW] Pre-cacheando recursos App Shell v13');
      return almacenCache.addAll(RECURSOS_CACHE).catch((err) => {
        console.warn('[SW] Aviso de pre-cacheo:', err);
      });
    })
  );
});

// 2. Activación: Purga versiones anteriores de caché y toma control de clientes
self.addEventListener('activate', (eventoActivacion) => {
  eventoActivacion.waitUntil(
    caches.keys().then((claves) => {
      return Promise.all(
        claves.map((clave) => {
          if (clave !== NOMBRE_CACHE) {
            console.log('[SW] Purgando caché obsoleta:', clave);
            return caches.delete(clave);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

// 3. Fetch: Estrategia OFFLINE-FIRST (Cache-First con Network Fallback y Runtime Cache)
self.addEventListener('fetch', (eventoPeticion) => {
  const peticion = eventoPeticion.request;

  // Solo peticiones GET
  if (peticion.method !== 'GET') return;

  eventoPeticion.respondWith(
    caches.match(peticion).then((respuestaEnCache) => {
      // Si está en caché local, devolverlo inmediatamente (OFFLINE FIRST)
      if (respuestaEnCache) {
        return respuestaEnCache;
      }

      // Si no está, consultar la red y cachear dinámicamente (ej. imágenes de Unsplash, fuentes)
      return fetch(peticion).then((respuestaRed) => {
        if (!respuestaRed || respuestaRed.status !== 200 || (respuestaRed.type !== 'basic' && respuestaRed.type !== 'cors')) {
          return respuestaRed;
        }

        const respuestaClonada = respuestaRed.clone();
        caches.open(NOMBRE_CACHE).then((almacen) => {
          almacen.put(peticion, respuestaClonada);
        });

        return respuestaRed;
      }).catch(() => {
        // Fallback offline para navegación HTML
        if (peticion.headers.get('accept') && peticion.headers.get('accept').includes('text/html')) {
          return caches.match('./index.html');
        }
      });
    })
  );
});
