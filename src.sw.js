importScripts("/precache-manifest.5ef50d4bcd157076dda8b4fd98c54179.js", "https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js");


console.log('Service worker Loaded ');
workbox.precaching.precacheAndRoute(self.__precacheManifest);

self.addEventListener('push', e => {
    console.log('Inside Push ');
const data =  e.data.json();
//const data =  e.data;
console.log('Push Received15 ');
console.log(data);
    /* self.registration.showNotification(data.title,{
        body : " Sucess "
    }); */
    self.registration.showNotification(data.data.title,{
        body : " Sucess "
    });
});

