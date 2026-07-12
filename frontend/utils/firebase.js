// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider} from "firebase/auth"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_APIKEY,
  authDomain: "loginmentora-116fe.firebaseapp.com",
  projectId: "loginmentora-116fe",
  storageBucket: "loginmentora-116fe.firebasestorage.app",
  messagingSenderId: "544540028754",
  appId: "1:544540028754:web:ff04e0efc7447f8ad4948b"
};
console.log(import.meta.env.VITE_FIREBASE_APIKEY);

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const provider = new GoogleAuthProvider()
export {auth,provider}