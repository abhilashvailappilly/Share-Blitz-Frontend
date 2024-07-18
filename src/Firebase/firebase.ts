// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getMessaging } from "firebase/messaging";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAXmS3E7LTG90-S9R6NApe9e0maW5FzpYc",
  authDomain: "shareblitz-693a5.firebaseapp.com",
  projectId: "shareblitz-693a5",
  storageBucket: "shareblitz-693a5.appspot.com",
  messagingSenderId: "652318165634",
  appId: "1:652318165634:web:e0807e5ebd29049d29029b",
  measurementId: "G-07NXND3EVK"
};
const app = initializeApp(firebaseConfig);

// Messaging service
export const messaging = getMessaging(app);