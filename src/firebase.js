import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDvK4KkzJZOyyW-8MCRibLqpcoYGHAAPY4",
  authDomain: "ringcrm-cd17d.firebaseapp.com",
  databaseURL: "https://ringcrm-cd17d-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "ringcrm-cd17d",
  storageBucket: "ringcrm-cd17d.appspot.com",
  messagingSenderId: "485674297973",
  appId: "1:485674297973:web:0adee494a5a40deadea63c",
  measurementId: "G-Z0LT562HBD"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth();
export const storage = getStorage(app);