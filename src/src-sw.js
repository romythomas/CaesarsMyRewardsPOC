importScripts(
  "https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.24.0/moment.min.js"
);
console.log("Service worker Loaded ");
//workbox.precaching.precacheAndRoute(self.__precacheManifest);

self.addEventListener("push", (e) => {
  const data = e.data.json();
  console.log("Push Received ");
  console.log(data);
  const { title, id, status, start, end } = data.data;
  const notificationTitle = "New Offer : " + id + " Title : " + title;
  const body =
    "Start Date : " + formatDate(start) + " End Date : " + formatDate(end);

  e.waitUntil(
    self.registration.showNotification(notificationTitle, {
      body: body
    })
  );
});

const formatDate = (dateToFormat) => {
  try {
    let formattedDate = new Date(dateToFormat);
    formattedDate = moment(formattedDate).format("MMM-DD-YYYY");
    return formattedDate;
  } catch (e) {
    console.log("Error in date conversion is " + e);
    throw e;
  }
};
