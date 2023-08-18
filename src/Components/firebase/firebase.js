// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD4fbxbUzkcI4G4de41ZoNrapzZR-f5lyI",
  authDomain: "bringin-admin.firebaseapp.com",
  projectId: "bringin-admin",
  storageBucket: "bringin-admin.appspot.com",
  messagingSenderId: "364418079079",
  appId: "1:364418079079:web:e639d1bc3b87507dffb7c2",
  measurementId: "G-7N9DBMW8KZ",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export default app;
