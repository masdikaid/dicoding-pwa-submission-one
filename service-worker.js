const CACHE_NAME = "firstpwa";
const urlsToCache = [
  "/",
  "/nav.html",
  "/manifest.json",
  "/index.html",
  "/pages/home.html",
  "/pages/about.html",
  "/pages/contact.html",
  "/pages/team.html",
  "/assets/css/materialize.min.css",
  "/assets/css/styles.css",
  "/assets/js/materialize.min.js",
  "/assets/js/script.js",
  "/assets/image/Icon.png",
  "/assets/image/Juventus.png",
  "/assets/image/liverpool.png",
  "/assets/image/milan.png",
  "/assets/image/mu.png",
  "/assets/image/rm.png",
  "https://fonts.googleapis.com/icon?family=Material+Icons",
  "https://fonts.gstatic.com/s/materialicons/v55/flUhRq6tzZclQEJ-Vdg-IuiaDsNc.woff2"
];
 
self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then( cache => {
      return cache.addAll(urlsToCache);
    })
  );
});

self.addEventListener("fetch", event => {
  event.respondWith(
    caches
      .match(event.request, { cacheName: CACHE_NAME })
      .then( response => {
        if (response) {
          console.log(`ServiceWorker: Gunakan aset dari cache: ${response.url}`);
          return response;
        }
 
        console.log(
          `ServiceWorker: Memuat aset dari server: ${event.request.url}`
        );
        return fetch(event.request);
      })
  );
});



