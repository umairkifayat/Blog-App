

// import { initializeApp } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-app.js";
// import { getAuth } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-auth.js";
// import { getFirestore } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-firestore.js";
// import { getStorage } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-storage.js";


// const firebaseConfig = {
//   apiKey: "AIzaSyD5eIbGdxOV_n7rl8Dd1Z8hQNOXkMgBrpo",
//   authDomain: "blog-app-939ad.firebaseapp.com",
//   projectId: "blog-app-939ad",
//   storageBucket: "blog-app-939ad.appspot.com",
//   messagingSenderId: "633080552688",
//   appId: "1:633080552688:web:8a2a5284ce319a29627635",
//   measurementId: "G-WR3FFHPDSG"
// };


// export const app = initializeApp(firebaseConfig);
// export const auth = getAuth(app);
// export const db = getFirestore(app);
// export const storage = getStorage(app);











import { initializeApp } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-firestore.js";
import { getStorage } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-storage.js";



const firebaseConfig = {
  apiKey: "AIzaSyD5eIbGdxOV_n7rl8Dd1Z8hQNOXkMgBrpo",
  authDomain: "blog-app-939ad.firebaseapp.com",
  projectId: "blog-app-939ad",
  storageBucket: "blog-app-939ad.appspot.com",
  messagingSenderId: "633080552688",
  appId: "1:633080552688:web:8a2a5284ce319a29627635",
  measurementId: "G-WR3FFHPDSG"
};


export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
