const webPush = require("web-push");

const publicVapidKey =
  "BLFCSc50K2ekDAB1Tpzkfzha2cs89PIwWpc344fxza_amHzubDx4ECvnYJjE_8Tht93SXuqkDLi2Lfathl9KKoM";
const privateVapidKey = "HHOf_ltYQdWTmnBRNyfSTIIoJWsgKyC3aXmp060kur4";
const registerServiceWorker = () => {
  if ("PushManager" in window) {
    console.log("Browser supports PushManager ");
  }
  if ("serviceWorker" in navigator) {
    console.log("Browser supports serviceWorker ");
  }
  if ("serviceWorker" in navigator) {
    send().catch((err) => console.log(err));

    window.addEventListener("load", () => {
      console.log("Load fired");
      if (navigator.standalone) {
        console.log("Launched: Installed (iOS)");
      } else if (matchMedia("(display-mode: standalone)").matches) {
        console.log("Launched: Installed");
      } else {
        console.log("Launched: Browser Tab");
      }
    });
  }
  async function send() {
    //Regsiter Service Worker
    console.log("Registering Service Worker ");
    const regsiter = await navigator.serviceWorker.register("/src.sw.js", {
      scope: "/"
    });
    console.log("Service worker Registered ");

    //Regsiter Push
    console.log("Regsitering Push ... ");
    const subscription = await regsiter.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: urlBase64ToUint8Array(publicVapidKey)
    });
    console.log("Push Regsitered... ");

    //send Push Notification
    console.log("Sending Push... ");

    webPush.setVapidDetails(
      "mailto:test@test.com",
      publicVapidKey,
      privateVapidKey
    );
    console.log("Push notification sent....");
  }

  function urlBase64ToUint8Array(base64String) {
    const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
    const base64 = (base64String + padding)
      .replace(/-/g, "+")
      .replace(/_/g, "/");

    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);

    for (let i = 0; i < rawData.length; ++i) {
      outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
  }
};

export default registerServiceWorker;
