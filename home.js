import { auth, db } from './config.js';
import { collection, getDocs,where,Timestamp } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-firestore.js";
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-auth.js";

const currentTime = new Date();
const currentHour = currentTime.getHours();

const render = document.querySelector('.rendering');
let img ;
let name;

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

let arr = [];


const postsQuerySnapshot = await getDocs(collection(db, "posts"));
postsQuerySnapshot.forEach((doc) => {
    // console.log(doc.data());
    arr.push({ ...doc.data(), docId: doc.id });
    // console.log(arr);

});

arr.map( async(item)=>{

    const postsQuerySnapshot = await getDocs(collection(db, "users"),where('docId', '=','item.docId'));
    console.log(item.docId);
    postsQuerySnapshot.forEach((doc) => {
        // console.log(doc.data());
        name = doc.data().firstName
        img = doc.data().profileUrl
        // console.log(name);
        
        const timestamp = Math.floor(new Date().getTime() / 1000); // Get current Unix timestamp in seconds
        const date = new Date(timestamp * 1000); // Convert Unix timestamp to JavaScript Date object
        const daterender = date.toLocaleDateString(); // Format the date as a string
        
        console.log(daterender);
        
        
        
    
render.innerHTML +=`<div class = "rendermain">
<div class = "render">
<img src="${img}" alt="" class="img">
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<P><b class = 'rendertitle'> ${item.Title}</b><br>
&nbsp;&nbsp;&nbsp;${daterender}&nbsp;&nbsp;${name}</P> 
</div>


<p>${item.Description}<p><br><br>`

})
});