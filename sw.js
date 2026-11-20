self.addEventListener('install',e=>self.skipWaiting());
self.addEventListener('activate',e=>e.waitUntil(self.clients.claim()));
self.addEventListener('fetch',e=>{});

self.addEventListener('push',e=>{
  let d={};
  try{d=e.data.json()}catch(_){d={title:'Lagarto Reels',body:e.data?e.data.text():''}}
  e.waitUntil((async()=>{
    // Com o app aberto na tela, o próprio app já avisa; só chamadas tocam sempre.
    const cs=await self.clients.matchAll({type:'window',includeUncontrolled:true});
    if(!d.call&&cs.some(c=>c.visibilityState==='visible'))return;
    await self.registration.showNotification(d.title||'Lagarto Reels',{
      body:d.body||'',
      icon:'icon-192.png',
      badge:'icon-192.png',
      tag:d.tag||undefined,
      renotify:!!d.tag,
      vibrate:d.call?[400,200,400,200,400]:[150],
      requireInteraction:!!d.call,
      data:{url:d.url||'./index.html'}
    });
  })());
});

self.addEventListener('notificationclick',e=>{
  e.notification.close();
  const url=(e.notification.data&&e.notification.data.url)||'./index.html';
  e.waitUntil(self.clients.matchAll({type:'window',includeUncontrolled:true}).then(cs=>{
    for(const c of cs){if('focus' in c)return c.focus()}
    return self.clients.openWindow(url);
  }));
});
