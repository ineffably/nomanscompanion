self.addEventListener('install', function (e) {
  e.waitUntil(
    caches.open('nomanscompanion').then(function (cache) {
      return cache.addAll([
        '/nomanscompanion/#/',
        '/nomanscompanion/#/crafting',
        '/nomanscompanion/#/refinement',
        '/nomanscompanion/#/table',
        '/nomanscompanion/dist/bundle.js',
        '/nomanscompanion/icons/PRODUCT.CAVECRAFT.png',
        '/nomanscompanion/icons/PRODUCT.UPGRADE.SHIP.png'
      ]);
    })
  );
});
