/* ILMORA premium service worker v26 — fresh updates guaranteed */
const CACHE='ilmora-v39';
const CORE=['./','./manifest.json','./icon-300.png'];

self.addEventListener('install',function(e){
  e.waitUntil(caches.open(CACHE).then(function(c){return c.addAll(CORE)}).then(function(){return self.skipWaiting()}));
});

self.addEventListener('activate',function(e){
  e.waitUntil(
    caches.keys().then(function(ks){
      return Promise.all(ks.filter(function(k){return k!==CACHE}).map(function(k){return caches.delete(k)}));
    }).then(function(){return self.clients.claim()})
  );
});

/* Adhan notification ka "Stop" button — tap karte hi open tabs ko bata do adhan band karo */
self.addEventListener('notificationclick', function(e){
  var isStop = e.action === 'stop';
  e.notification.close();
  e.waitUntil(
    self.clients.matchAll({type:'window', includeUncontrolled:true}).then(function(cs){
      if(isStop){
        cs.forEach(function(c){ c.postMessage({type:'STOP_ADHAN'}); });
        return;
      }
      for(var i=0;i<cs.length;i++){ if('focus' in cs[i]) return cs[i].focus(); }
      return self.clients.openWindow('./');
    })
  );
});

self.addEventListener('fetch',function(e){
  if(e.request.method!=='GET')return;
  var u=new URL(e.request.url);

  /* Sirf apne origin cache karo (Firebase API/QR service network par jaaye) */
  if(u.origin!==location.origin)return;

  /* Navigation requests: cache-first, background refresh (stale-while-revalidate) */
  if(e.request.mode==='navigate'){
    e.respondWith(
      fetch(e.request).then(function(res){
        var cp=res.clone();
        caches.open(CACHE).then(function(c){c.put('./',cp)});
        return res;
      }).catch(function(){
        return caches.match('./');
      })
    );
  }


  /* Baaki assets: cache-first with fallback */
  e.respondWith(
    caches.match(e.request).then(function(hit){
      if(hit)return hit;
      return fetch(e.request).then(function(res){
        if(res.ok){var cp=res.clone();caches.open(CACHE).then(function(c){c.put(e.request,cp)})}
        return res;
      }).catch(function(){return caches.match('./')});
    })
  );
});
