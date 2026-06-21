self.addEventListener('install', function(){ self.skipWaiting(); });
self.addEventListener('activate', function(e){
  e.waitUntil((async function(){
    try { await self.registration.unregister(); } catch(err) {}
    try {
      var keys = await caches.keys();
      await Promise.all(keys.map(function(k){ return caches.delete(k); }));
    } catch(err) {}
    try {
      var cs = await self.clients.matchAll();
      cs.forEach(function(c){ c.navigate(c.url); });
    } catch(err) {}
  })());
});
self.addEventListener('fetch', function(e){ /* pass-through: let the network/Cloudflare handle it */ });