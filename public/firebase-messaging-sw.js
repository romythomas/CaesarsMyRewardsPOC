
importScripts('https://www.gstatic.com/firebasejs/7.14.2/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/7.14.2/firebase-messaging.js');
importScripts('https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.24.0/moment.min.js');

workbox.precaching.precacheAndRoute(self.__precacheManifest);
if (firebase.messaging.isSupported()) {
 
firebase.initializeApp({
  apiKey: "AIzaSyCBFYmGO9ObvHa-IDq7TlWfYGj6OgH-i5I",
  authDomain: "pushengageblogexample-245bb.firebaseapp.com",
  databaseURL: "https://pushengageblogexample-245bb.firebaseio.com",
  projectId: "pushengageblogexample-245bb",
  storageBucket: "pushengageblogexample-245bb.appspot.com",
  messagingSenderId: "292347225093",
  appId: "1:292347225093:web:1612ceb09d12b1583fe86c",
  measurementId: "G-ZGTB3H2FYT"
});

const messaging = firebase.messaging();

messaging.usePublicVapidKey(
  "BEMaBW-HTkop1ycEiqJXwLgLBODxjRRkrmvfxqy__RXjDYm_UwtzPJLGshpxpSgvB2sMlkmFEcYb5hfFAaCecr4"
);
 
messaging.setBackgroundMessageHandler(function(payload) {
  
  const {title,id,status,start,end} = payload.data;
  const notificationTitle = 'New Offer : ' + id +' Title : '+title;

  var notificationOptions = {
  body : "Start Date : "+ formatDate(start) + " End Date : " +formatDate(end)
  };

  return self.registration.showNotification(
    notificationTitle,
    notificationOptions
  );
    
  });

  self.addEventListener('notificationclick', function(event) {
    console.log(" !!!inside add EventListener");
    event.notification.close();
  });

}
else{
  console.log("Firebase is not supported ");
}

const formatDate = (dateToFormat) => {
  try{
    let formattedDate = new Date(dateToFormat); 
    formattedDate = moment(formattedDate).format("MMM-DD-YYYY");
    return formattedDate;
  }
  catch(e){
    console.log("Error in date conversion is "+e);
    throw e;
  }
}

