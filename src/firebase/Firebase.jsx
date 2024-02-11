// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore'
import {getAuth} from 'firebase/auth'


const firebaseConfig = {
  apiKey: "AIzaSyBKddTdqg8PuLnUSDJld_1KxIfyIkBc2tQ",
  authDomain: "cursoide-1a9ac.firebaseapp.com",
  projectId: "cursoide-1a9ac",
  storageBucket: "cursoide-1a9ac.appspot.com",
  messagingSenderId: "1059166084276",
  appId: "1:1059166084276:web:5be574be260f54e3310be1",
  measurementId: "G-2P5PRF2P3K"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth =  getAuth(app)

export {db, auth}
