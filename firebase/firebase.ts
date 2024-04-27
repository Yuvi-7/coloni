// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAb2OTbMAM-KEnFl6AbaOjXVZWk-CNrMJg",
  authDomain: "coloni-app.firebaseapp.com",
  projectId: "coloni-app",
  storageBucket: "coloni-app.appspot.com",
  messagingSenderId: "955206986448",
  appId: "1:955206986448:web:a8761f878600a57cf0ccd5",
  measurementId: "G-V5YPC79RZ9",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
