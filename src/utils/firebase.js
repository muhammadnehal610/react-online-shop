// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyD_dTm02g_JQ5sE-n38fCZ9lRJyyEaM5zM",
  authDomain: "ecomarce-2cf65.firebaseapp.com",
  databaseURL: "https://ecomarce-2cf65-default-rtdb.firebaseio.com",
  projectId: "ecomarce-2cf65",
  storageBucket: "ecomarce-2cf65.appspot.com",
  messagingSenderId: "467509250885",
  appId: "1:467509250885:web:ff4d5359d7c67e0ecd8c2c",
  measurementId: "G-DHS13KJLZX",
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { auth, db, storage };
