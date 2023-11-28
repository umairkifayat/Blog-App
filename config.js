

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-firestore.js";
import { getStorage } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-storage.js";


const firebaseConfig = {
    apiKey: "AIzaSyDB5qeXi2UDiqQ9VcD3I66op50FP87wJpQ",
    authDomain: "blog-app-add4a.firebaseapp.com",
    projectId: "blog-app-add4a",
    storageBucket: "blog-app-add4a.appspot.com",
    messagingSenderId: "605574230818",
    appId: "1:605574230818:web:a8117560cb486929f5ab7b",
    measurementId: "G-M26SB5Y69J"
  };


export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
