// Scripts for firebase and firebase messaging
importScripts("https://www.gstatic.com/firebasejs/8.10.0/firebase-app.js");
importScripts(
  "https://www.gstatic.com/firebasejs/8.10.0/firebase-messaging.js"
);

// Initialize the Firebase app in the service worker
// "Default" Firebase configuration (prevents errors)
const defaultConfig = {
  apiKey: true,
  projectId: true, 
  messagingSenderId: true,
  appId: true,
};
const firebaseConfig = {
  apiKey: "AIzaSyAXmS3E7LTG90-S9R6NApe9e0maW5FzpYc",
  authDomain: "shareblitz-693a5.firebaseapp.com",
  projectId: "shareblitz-693a5",
  storageBucket: "shareblitz-693a5.appspot.com",
  messagingSenderId: "652318165634",
  appId: "1:652318165634:web:e0807e5ebd29049d29029b",
  measurementId: "G-07NXND3EVK"
};
firebase.initializeApp(firebaseConfig);

// Retrieve firebase messaging
const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: payload.notification.image,
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});