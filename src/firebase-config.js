// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
import {getAuth, GoogleAuthProvider} from  'firebase/auth';



// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDBZLyfmV-Qw5Rqe9lp8wJCjuU4IpzRZd8",
  authDomain: "lokman-blog.firebaseapp.com",
  projectId: "lokman-blog",
  storageBucket: "lokman-blog.appspot.com",
  messagingSenderId: "189504006380",
  appId: "1:189504006380:web:977571cde229fc2c421dc9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
