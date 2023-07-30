// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth}from 'firebase/auth';
import {getFirestore} from '@firebase/firestore';
// TODO: Add SD Ks for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBOEWVH05QigQWHANS2L6mBW84mcgimzws",
  authDomain: "chatapp-f7ee9.firebaseapp.com",
  projectId: "chatapp-f7ee9",
  storageBucket: "chatapp-f7ee9.appspot.com",
  messagingSenderId: "827387201630",
  appId: "1:827387201630:web:f86afa6a330889255fcccf",
  measurementId: "G-D6NZQ381JV"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth=getAuth(app);
export const firestore=getFirestore(app);
