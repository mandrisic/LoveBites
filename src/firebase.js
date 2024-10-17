import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyCD-YAV0IBn-HIAhtRfGPercCz4qPMT5xg",
  authDomain: "lovebites-19e05.firebaseapp.com",
  databaseURL: "https://lovebites-1999-default-rtdb.europe-west1.firebasedatabase.app/",
  projectId: "lovebites-19e05",
  storageBucket: "lovebites-19e05.appspot.com",
  messagingSenderId: "1068390673754",
  appId: "1:1068390673754:web:59399ce7683844cc131763"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app, 'https://lovebites-1999-default-rtdb.europe-west1.firebasedatabase.app');

export { db };