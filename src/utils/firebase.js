// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB3kCfjW-23ieTWF22eXC7Y_Sg58d4-Wt0",
  authDomain: "personal-project-cab9a.firebaseapp.com",
  projectId: "personal-project-cab9a",
  storageBucket: "personal-project-cab9a.firebasestorage.app",
  messagingSenderId: "320373563043",
  appId: "1:320373563043:web:6af97cf81f55221e846916",
  measurementId: "G-CTP9WYZ8X0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = typeof window !== "undefined" ? getAnalytics(app) : null;
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

export { app, analytics, auth, googleProvider };

