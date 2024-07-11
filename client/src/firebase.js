// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "goodservice-5195e.firebaseapp.com",
  projectId: "goodservice-5195e",
  storageBucket: "goodservice-5195e.appspot.com",
  messagingSenderId: "1061685008047",
  appId: "1:1061685008047:web:367bb53203a443a57c665a"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);