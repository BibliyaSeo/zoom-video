// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { collection, getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAS3s5_7S-YSD6oqM7w9eN5u5blmVJz_NY",
  authDomain: "zoom-video-9dcf3.firebaseapp.com",
  projectId: "zoom-video-9dcf3",
  storageBucket: "zoom-video-9dcf3.appspot.com",
  messagingSenderId: "495887245882",
  appId: "1:495887245882:web:34348e8b8f2d3244010b03",
  measurementId: "G-QVJQMH6Z03",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const firebaseAuth = getAuth(app);
export const firebaseDB = getFirestore(app);

export const userRef = collection(firebaseDB, "users");
