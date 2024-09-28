// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: process.env.FIREBASE_WEB_APP_API,
    authDomain: "waltr-authentication.firebaseapp.com",
    projectId: "waltr-authentication",
    storageBucket: "waltr-authentication.appspot.com",
    messagingSenderId: "577462383007",
    appId: "1:577462383007:web:f4fe0b5d66d7c8f988cdaa"
};

// Initialize Firebase
const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
export { app };

