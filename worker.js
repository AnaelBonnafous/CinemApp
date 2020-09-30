const cacheName = "static";
self.addEventListener('install', function(event) {
    event.waitUntil(
        caches.open(cacheName).then(function(cache) {
            return cache.addAll(
                [
                    'index.html',
                    'css/bootstrap.min.css',
                    'css/lux.min.css',
                    'css/font-awesome.min.css',
                    'css/style.css',
                    'js/bootstrap.min.js',
                    'js/jquery.min.js',
                    'js/script.js'
                ]
            );
        })
    );
});

self.addEventListener('fetch', function(event) {
    event.respondWith(
        caches.match(event.request)
        .then(function(response) {
            if(response) {
                return response;
            }
            return fetch(event.request)
            .then(function(response) {
                return caches.open(cacheName)
                .then(function(cache) {
                    cache.put(event.request, response.clone());
                    return response;
                });
            });
        })
    );
});