import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyCIIWlD4q-aKJkysTxlIaJVTGiZ8w7aNUU",
  authDomain: "first-react-app-816cc.firebaseapp.com",
  projectId: "first-react-app-816cc",
  storageBucket: "first-react-app-816cc.appspot.com",
  messagingSenderId: "382621281326",
  appId: "1:382621281326:web:7b0551af0e9d50e5e3c3bf",
  measurementId: "G-ZYV4S59VJJ",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const analytics = getAnalytics(app);

export { app, auth };
