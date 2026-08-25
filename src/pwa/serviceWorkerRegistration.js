export function register() {
  if ("serviceWorker" in navigator) {
    window.addEventListener("load", () => {
      navigator.serviceWorker
        .register("/service-worker.js")
        .then((registration) => {
          console.log(
            "SahajoMart Service Worker registered:",
            registration.scope
          );
        })
        .catch((error) => {
          console.error(
            "SahajoMart Service Worker registration failed:",
            error
          );
        });
    });
  }
}