import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import 'firebase/compat/firestore'
import 'firebase/compat/storage'
import { getAuth, onAuthStateChanged, getRedirectResult } from 'firebase/auth';


    // For Firebase JS SDK v7.20.0 and later, measurementId is optional
    const firebaseConfig = {
        apiKey: "AIzaSyAkw4Z1CvsRe3vnRz3C182kKHF6u8VEKw8",
        authDomain: "cafebay-2d251.firebaseapp.com",
        databaseURL: "https://cafebay-2d251-default-rtdb.europe-west1.firebasedatabase.app",
        projectId: "cafebay-2d251",
        storageBucket: "cafebay-2d251.appspot.com",
        messagingSenderId: "1029075827678",
        appId: "1:1029075827678:web:6dc43c1629e002af19bb4f",
        measurementId: "G-XD0DH3RYX9"
    };


const app = firebase.initializeApp(firebaseConfig);
const auth = app.auth();
const fs = firebase.firestore();
const storage = firebase.storage();
export {auth, fs, storage}

export default app