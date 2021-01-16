const { assets } = serviceWorkerOption

const CACHE_NAME = 'Asteroids-v1';

let assetsToCache = [...assets, './']

assetsToCache = assetsToCache.map(path => {
  return new URL(path, location).toString()
})

self.addEventListener('install', event => {
  event.waitUntil(
    caches
      .open(CACHE_NAME)
      .then(cache => {
        return cache.addAll(assetsToCache)
      })
      .catch(error => {
        console.error(error)
        throw error
      })
  )
})

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName.indexOf(CACHE_NAME) === 0) {
            return null
          }

          return caches.delete(cacheName)
        })
      )
    })
  )
})

self.addEventListener('message', event => {
  switch (event.data.action) {
    case 'skipWaiting':
      if (self.skipWaiting) {
        self.skipWaiting()
        self.clients.claim()
      }
      break;
    default:
      break;
  }
})

self.addEventListener('fetch', event => {
  const request = event.request

  if (request.method !== 'GET') {
    return;
  }

  const requestUrl = new URL(request.url);

  if (requestUrl.origin !== location.origin) {
    return;
  }

  const resource = caches.match(request).then(response => {
    if (response) {
      return response;
    }

    // Load and cache known assets.
    return fetch(request)
      .then(responseNetwork => {
        if (!responseNetwork || !responseNetwork.ok) {
          return responseNetwork
        }

        const responseCache = responseNetwork.clone()

        caches
          .open(CACHE_NAME)
          .then(cache => {
            return cache.put(request, responseCache)
          });

        return responseNetwork;
      })
      .catch(() => {
        if (event.request.mode === 'navigate') {
          return caches.match('./')
        }

        return null
      })
  })

  event.respondWith(resource)
})