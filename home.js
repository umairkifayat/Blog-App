import { auth, db } from './config.js';
import { collection, getDocs,where } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-firestore.js";
import { onAuthStateChanged ,signOut} from "https://www.gstatic.com/firebasejs/9.10.0/firebase-auth.js";

const home = document.querySelector('.home-div2');
const logout = document.querySelector('#loged')

onAuthStateChanged(auth,(user) => {
    if (!user) {
        console.log('not a user')
        home.innerHTML=`<button><a href="log.html"><i class="ri-login-box-line"></i></a></button>`
        console.log (logout)
        
    }
});



logout.addEventListener('click', () => {
    signOut(auth).then(() => {
        console.log('logout successfully');
        window.location = 'log.html';
    }).catch((error) => {
        console.log(error);
    });
});



const currentTime = new Date();
const currentHour = currentTime.getHours();

const render = document.querySelector('.rendering');

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
    
});
console.log(arr);

// let imgs ;
// let name;

arr.map( async(item)=>{
    console.log(item.userobj.profileUrl);
    const usersQuerySnapshot = await getDocs(collection(db, "users"),where('uid', '==',item.userobj.uid));
    console.log(usersQuerySnapshot);
            const timestamp = Math.floor(new Date().getTime() / 1000); // Get current Unix timestamp in seconds
            const date = new Date(timestamp * 1000); // Convert Unix timestamp to JavaScript Date object
            const daterender = date.toLocaleDateString(); // Format the date as a string
        render.innerHTML +=`<div class = "rendermain">
        <div class = "render">
        <img src="${item.userobj.profileUrl}" alt="" class="img">
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<P><b class = 'rendertitle'> ${item.Title}</b><br>
        &nbsp;&nbsp;&nbsp;${daterender}&nbsp;&nbsp;${item.userobj.firstName}</P> 
</div>


<p>${item.Description}<p><br><br>`

});










