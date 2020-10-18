const CACHE_NAME = "firstpwa";
var urlsToCache = [
  "/",
  "/nav.html",
  "/index.html",
  "/pages/home.html",
  "/pages/about.html",
  "/pages/contact.html",
  "/pages/team.html",
  "/assets/css/materialize.min.css",
  "/assets/js/materialize.min.js",
  "/assets/js/script.js",
  "/assets/image/Icon.png",
  "/assets/image/Juventus.png",
  "/assets/image/liverpool.png",
  "/assets/image/milan.png",
  "/assets/image/mu.png",
  "/assets/image/rm.png"
];
 
self.addEventListener("install", function(event) {
  event.waitUntil(
    caches.open(CACHE_NAME).then(function(cache) {
      return cache.addAll(urlsToCache);
    })
  );
});

self.addEventListener("fetch", function(event) {
  event.respondWith(
    caches
      .match(event.request, { cacheName: CACHE_NAME })
      .then(function(response) {
        if (response) {
          console.log("ServiceWorker: Gunakan aset dari cache: ", response.url);
          return response;
        }
 
        console.log(
          "ServiceWorker: Memuat aset dari server: ",
          event.request.url
        );
        return fetch(event.request);
      })
  );
});



