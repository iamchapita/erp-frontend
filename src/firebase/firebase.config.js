// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
    getAuth,
    GoogleAuthProvider,
    onAuthStateChanged,
    signInWithEmailAndPassword,
    signInWithPopup,
    updateProfile,
    createUserWithEmailAndPassword,
    sendEmailVerification,
} from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyC25HguiflhoR2NqXvdA6srtXYiYnz21-Y",
    authDomain: "syncpro-66baa.firebaseapp.com",
    projectId: "syncpro-66baa",
    storageBucket: "syncpro-66baa.appspot.com",
    messagingSenderId: "1039611119652",
    appId: "1:1039611119652:web:7212581c77faebf839f0b1",
    measurementId: "G-Q7D6L1Y5HD"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const provider = new GoogleAuthProvider();

export {
    app,
    auth,
    provider,
    signInWithEmailAndPassword,
    signInWithPopup,
    onAuthStateChanged,
    createUserWithEmailAndPassword,
    updateProfile,
    sendEmailVerification
}