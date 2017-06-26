var CACHE_NAME = 'my-site-cache-v1';
var urlsToCache = [
	'/zkfragment-pwa-demo/',
	'/zkfragment-pwa-demo/index.html',
	'/zkfragment-pwa-demo/index.html?home=1',
	'/zkfragment-pwa-demo/demo.zul',
	'/zkfragment-pwa-demo/zkau/web/923f7c77/js/zk.wpd',
	'/zkfragment-pwa-demo/zkau/web/923f7c77/js/zul.lang.wpd',
	'/zkfragment-pwa-demo/zkau/web/923f7c77/js/zkbind.wpd',
	'/zkfragment-pwa-demo/zkau/web/923f7c77/zul/css/zk.wcs',
	'/zkfragment-pwa-demo/zkau/web/js/zkmax.wgt.wpd',
	'/zkfragment-pwa-demo/zkau/web/js/zul.utl.wpd',
	'/zkfragment-pwa-demo/zkau/web/js/zk.fmt.wpd',
	'/zkfragment-pwa-demo/css/FragmentDemo.css'
];

self.addEventListener('install', function (event) {
	event.waitUntil(
		caches.open(CACHE_NAME).then(function(cache) {
			return cache.addAll(urlsToCache);
		})
	);
});

self.addEventListener('activate', function (event) {
	event.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', function (event) {
	console.log('fetch', event.request.url);
	var res = event.request;
	var url = new URL(res.url);
	var pos = url.pathname.indexOf(';jsessionid=');
	if (pos > -1) {
		url.pathname = url.pathname.substring(0, pos);
		res = url;
	}

	if (/\.(zul|zhtml)$/.test(res.url)) {
		event.respondWith(
			fetch(res).catch(function() {
				return caches.match(res);
			})
		);
		return;
	}

	event.respondWith(
		caches.match(res).then(function(response) {
			return response || fetch(event.request);
		})
	);
});
