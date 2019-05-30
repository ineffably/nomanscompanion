self.addEventListener('install', function (e) {
  console.log('==> sw.install');
  if (caches) {
    e.waitUntil(
      caches.open('nomanscompanion').then(function (cache) {
        const allCache = cache.addAll([
          '/nomanscompanion/#/',
          '/nomanscompanion/#/crafting',
          '/nomanscompanion/#/refinement',
          '/nomanscompanion/#/table',
          '/nomanscompanion/dist/bundle.js',
          '/nomanscompanion/icons/PRODUCT.CAVECRAFT.png',
          '/nomanscompanion/icons/PRODUCT.UPGRADE.SHIP.png'
        ]).then(() => self.skipWaiting());
        return allCache;
      }, (e) => { console.log(e); })
    );
  }
});

