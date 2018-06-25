let staticCacheName = 'restaurant-cache-v1';

let urlToCache = [
   '/',
   './restaurant.html',
    './css/styles.css',
    './data/restaurants.json',
    './img/1.jpg',
    './img/2.jpg',
    './img/3.jpg',
    './img/4.jpg',
    './img/5.jpg',
    './img/6.jpg',
    './img/7.jpg',
    './img/8.jpg',
    './img/9.jpg',
    './img/10.jpg',
    './js/main.js',
    './js/restaurant_info.js',
    './js/dbhelper.js'
];

self.addEventListener('install', (event) => {
   event.waitUntil(
      //caches API
      caches.open(staticCacheName).then((cache) => {
         console.log(cache);
         return cache.addAll(urlToCache);
      }).catch(err => {
         console.log(err);
      })
   );
});

self.addEventListener('activate', (event) => {
   event.waitUntil(
      caches.keys().then((cacheNames) => {
         return promise.all(
            cacheNames.filter((cacheName) => {
               return cacheName.startsWith('restaurant-') && cacheName !== staticCacheName;
            }).map((cacheName) => {
               return caches.delete(cacheName);
            })
         );
      })
   );
});

// Return cache
self.addEventListener('fetch', (event) => {
   event.respondWith(
      caches.match(event.request).then(function (response) {
         return response || fetch(event.request);
         })
   );
});