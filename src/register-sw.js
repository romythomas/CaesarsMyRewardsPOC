import * as firebase from "firebase/app";
import "firebase/messaging";
import { config } from "../src/init-fcm";

const registerServiceWorker = () => {
  if ("serviceWorker" in navigator && "PushManager" in window) {
    window.addEventListener("load", () => {
      navigator.serviceWorker
        .register("/firebase-messaging-sw.js", { scope: "/" })
        .then(function (registration) {
          console.log("Service Worker Registration successful");
          return registration;
        })
        .catch(function (err) {
          console.log("Service worker registration failed, error:", err);
        });
    });
  }

  navigator.serviceWorker.ready.then(function (registration) {
    registration.pushManager
      .subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(
          "BEMaBW-HTkop1ycEiqJXwLgLBODxjRRkrmvfxqy__RXjDYm_UwtzPJLGshpxpSgvB2sMlkmFEcYb5hfFAaCecr4"
        )
      })
      .then(function (subscription) {
        //successfull
        console.log(
          "push service subscription successfull: " +
            JSON.stringify(subscription)
        );
        return subscription;
      })
      .catch(function (e) {
        console.error(e);
      });
  });

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
