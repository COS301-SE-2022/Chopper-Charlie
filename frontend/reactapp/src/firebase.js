// src.firebase.js
import { initializeApp } from "firebase/app"
import { getAuth } from "firebase/auth"

const firebaseConfig = {

    apiKey: "AIzaSyDa59D4r_NLTztsm7hHL_5ZHjNkzwv-S-U",
  
    authDomain: "fir-user-reg-auth-50349.firebaseapp.com",
  
    projectId: "fir-user-reg-auth-50349",
  
    storageBucket: "fir-user-reg-auth-50349.appspot.com",
  
    messagingSenderId: "287221721322",
  
    appId: "1:287221721322:web:83e17a088f333253a2cf93"
  
  };

// Initialize Firebase and Firebase Authentication
const app = initializeApp(firebaseConfig)
const auth = getAuth(app)
export {auth}