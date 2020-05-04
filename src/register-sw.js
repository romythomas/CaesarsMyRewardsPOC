const registerServiceWorker = () => {

    console.log("inside registerServiceWorker");
    if ("serviceWorker" in navigator) {
      window.addEventListener("load", () => {
      navigator.serviceWorker
        .register("./sw.js")
        .then(function(registration) {
          console.log("Registration successful, scope is:", registration.scope);
        })
        .catch(function(err) {
          console.log("Service worker registration failed, error:", err);
        });
      })
    }
  };
  
  export default registerServiceWorker ;