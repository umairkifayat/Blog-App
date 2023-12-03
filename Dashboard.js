


import { onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-auth.js";
import { collection, addDoc, Timestamp, getDocs, orderBy, where, query } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-firestore.js";
import { auth, db } from './config.js';

onAuthStateChanged(auth, async (user) => {
    if (user) {
        console.log(user);
        const uid = user.uid;
        console.log(uid);
        const q = query(collection(db, "users"), where("uid", "==", uid));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            console.log(doc.data());
            img.src = doc.data().profileUrl;
            name.innerHTML = doc.data().firstName;
        });

        // Fetch and render user-specific posts
        getDataFromFirestore(uid);
    }
});

const title = document.querySelector('.title');
const des = document.querySelector('.description');
const btn = document.querySelector('.btn');
const div = document.querySelector('.render');
const img = document.querySelector('.img');
const name = document.querySelector('.username');

const logout = document.querySelector('.logout');
let arr = [];

// logout function 
logout.addEventListener('click', () => {
    signOut(auth).then(() => {
        console.log('logout successfully');
        window.location = 'index.html';
    }).catch((error) => {
        console.log(error);
    });
});

// render function 
function renderpost() {
    // Clear the div before rendering to avoid appending content
    div.innerHTML = "";

    // Use forEach instead of map
    arr.forEach((item) => {
        console.log(item);
        div.innerHTML += `Title:${item.Title}<br>
         DesCription: ${item.Description}<br>`;
    });
}

// get data on firestore 
async function getDataFromFirestore(uid) {
    // Clear the existing data in the array before fetching new data
    arr.length = 0;

    const querySnapshot = await getDocs(query(collection(db, "posts"), orderBy('postDate', 'desc'), where('uid', '==', uid)));
    querySnapshot.forEach((doc) => {
        arr.push({ ...doc.data(), docId: doc.id });
    });

    renderpost();
}

// data post on firestore 
btn.addEventListener('click', async (event) => {
    event.preventDefault();

    const obj = {
        Title: title.value,
        Description: des.value,
        uid: auth.currentUser.uid,
        postDate: Timestamp.fromDate(new Date())
    };

    try {
        await addDoc(collection(db, "posts"), obj);
        console.log('User registered successfully');
        
        // After posting, fetch and render the updated posts
        getDataFromFirestore(auth.currentUser.uid);
    } catch (error) {
        console.error(error);
        // Handle errors, show messages, etc.
    }
});
