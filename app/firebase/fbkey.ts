// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCK2pxkKbPlLbj3lhxIUUY5sjYW0E5cb4I",
  authDomain: "pce-tools.firebaseapp.com",
  projectId: "pce-tools",
  storageBucket: "pce-tools.firebasestorage.app",
  messagingSenderId: "933577835998",
  appId: "1:933577835998:web:8506ae7a6bb2473907894f",
  measurementId: "G-TQ2G5285CP"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);  