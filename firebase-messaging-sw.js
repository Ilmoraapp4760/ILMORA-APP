/* ILMORA Push Notifications — background handler (FCM web) */
importScripts('https://www.gstatic.com/firebasejs/10.12.2/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.12.2/firebase-messaging-compat.js');
try{
  firebase.initializeApp({
    apiKey: "AIzaSyA7a0stQCOCW9CtmQkViNXD6oxFQpuFlcc",
    authDomain: "ilmora-app-f84e8.firebaseapp.com",
    projectId: "ilmora-app-f84e8",
    storageBucket: "ilmora-app-f84e8.firebasestorage.app",
    messagingSenderId: "861917892107",
    appId: "1:861917892107:web:c5ea30c3927eb1dcddc10e"
  });
  var messaging = firebase.messaging();
  messaging.onBackgroundMessage(function(payload){
    var t=(payload.notification&&payload.notification.title)||'ILMORA';
    var b=(payload.notification&&payload.notification.body)||'';
    self.registration.showNotification(t,{body:b,icon:'icon-300.png',badge:'icon-300.png',tag:'ilmora-push'});
  });
}catch(e){}
self.addEventListener('notificationclick',function(e){
  e.notification.close();
  e.waitUntil(clients.matchAll({type:'window',includeUncontrolled:true}).then(function(cs){
    for(var i=0;i<cs.length;i++){var c=cs[i];if('focus' in c)return c.focus()}
    return clients.openWindow('./');
  }));
});
