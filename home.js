import { auth, db } from './config.js';
import { collection, getDocs } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-firestore.js";
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-auth.js";

const currentTime = new Date();
const currentHour = currentTime.getHours();

const render = document.querySelector('.rendering');
const img = document.querySelector('.img');
const name = document.querySelector('.username');
let arr = [];

let docimage;
let docnam;

onAuthStateChanged(auth, async (user) => {
    if (user) {
        console.log(user);
        const uid = user.uid;
        console.log(uid);
        const q = collection(db, "users");
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            console.log(doc.data());
            img.src = doc.data().profileUrl;
            name.innerHTML = doc.data().firstName;
            docimage = doc.data().profileUrl;
            docnam = doc.data().firstName;
        });
        getDataFromFirestore();
    }
});

let greeting;
if (currentHour >= 5 && currentHour < 12) {
    greeting = 'Good Morning';
} else if (currentHour >= 12 && currentHour < 17) {
    greeting = 'Good Afternoon';
} else if (currentHour >= 17 && currentHour < 21) {
    greeting = 'Good Evening';
} else {
    greeting = 'Good Night';
}

const div = document.querySelector('.home-nav');
div.innerHTML = `<h2 class='div-h2'>${greeting} Readers!</h2>`;

async function getDataFromFirestore() {
    arr = []; // Clear the existing data in arr before fetching new data

    // Fetch all blog posts from the "posts" collection
    const postsQuery = (collection(db, "posts"));
    const querySnapshot = await getDocs(postsQuery);

    querySnapshot.forEach((doc) => {
        arr.push(doc.data());
    });

    renderpost();
}

function renderpost() {
    render.innerHTML = ""; // Clear existing content before rendering

    arr.forEach((item) => {
        let date = item.postDate.seconds;
        let daterender = new Date(date * 1000).toDateString();
        console.log(daterender);
        console.log(item);
        render.innerHTML += `<div class="rendermain">
            <div class="render">
                <img src="${docimage}" alt="" class="img">
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <p><b class='rendertitle'> ${item.Title}</b><br>
                &nbsp;&nbsp;&nbsp;${daterender}&nbsp;&nbsp;${docnam}</p> 
            </div>
            <p>${item.Description}</p><br><br>
        </div>`;
    });
}
