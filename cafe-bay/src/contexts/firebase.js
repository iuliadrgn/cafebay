import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import { getAuth, onAuthStateChanged, getRedirectResult } from 'firebase/auth';

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

export const auth = app.auth();
export default app