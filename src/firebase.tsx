import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";


// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCEZqPGpTbQjsYd4Aqzs-dcFx3qLDjcgw8",
  authDomain: "chatapp-2f9c3.firebaseapp.com",
  projectId: "chatapp-2f9c3",
  storageBucket: "chatapp-2f9c3.appspot.com",
  messagingSenderId: "1004412321000",
  appId: "1:1004412321000:web:75146d3f7e0ddc91039d5d",
  measurementId: "G-TCZML1SL62"
};

  // Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);