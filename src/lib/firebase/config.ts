import { initializeApp, getApps, getApp } from "firebase/app";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDZ6mVP-ezcsJNQYFKava6eS8KmzXIxSqM",
  authDomain: "holacompa-lea.firebaseapp.com",
  projectId: "holacompa-lea",
  storageBucket: "holacompa-lea.firebasestorage.app",
  messagingSenderId: "915825747850",
  appId: "1:915825747850:web:c19d9829e7b949e7ebca73"
};

// Initialize Firebase for Client Side
const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);

export { app, firebaseConfig };
