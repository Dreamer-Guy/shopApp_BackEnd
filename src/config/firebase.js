// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getStorage} from "firebase/storage";
import dotenv from 'dotenv';
dotenv.config();
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: "my-app-4c221.firebaseapp.com",
  projectId: "my-app-4c221",
  storageBucket: "my-app-4c221.appspot.com",
  messagingSenderId: "322787987102",
  appId: "1:322787987102:web:0e0b71c9133e9bc79d358f",
  measurementId: "G-TDCBEVYT0B"
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
export {app,storage};