// import { auth, db } from './config.js';
// import { collection, getDocs,where } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-firestore.js";
// import { onAuthStateChanged ,signOut} from "https://www.gstatic.com/firebasejs/9.10.0/firebase-auth.js";

// const home = document.querySelector('.home-div2');
// const logout = document.querySelector('#loged')

// onAuthStateChanged(auth,(user) => {
//     if (!user) {
//         console.log('not a user')
//         home.innerHTML=`<button><a href="log.html"><i class="ri-login-box-line"></i></a></button>`
//         console.log (logout)
        
//     }
// });



// logout.addEventListener('click', () => {
//     signOut(auth).then(() => {
//         console.log('logout successfully');
//         window.location = 'log.html';
//     }).catch((error) => {
//         console.log(error);
//     });
// });



// const currentTime = new Date();
// const currentHour = currentTime.getHours();

// const render = document.querySelector('.rendering');

// let greeting;
// if (currentHour >= 5 && currentHour < 12) {
//     greeting = 'Good Morning';
// } else if (currentHour >= 12 && currentHour < 17) {
//     greeting = 'Good Afternoon';
// } else if (currentHour >= 17 && currentHour < 21) {
//     greeting = 'Good Evening';
// } else {
//     greeting = 'Good Night';
// }

// const div = document.querySelector('.home-nav');
// div.innerHTML = `<h2 class='div-h2'>${greeting} Readers!</h2>`;

// let arr = [];


// const postsQuerySnapshot = await getDocs(collection(db, "posts"));
// postsQuerySnapshot.forEach((doc) => {
//     // console.log(doc.data());
//     arr.push({ ...doc.data(), docId: doc.id });
    
// });
// console.log(arr);

// let imgs ;
// let name;

// arr.map( async(item)=>{
//     console.log(item);
//     const usersQuerySnapshot = await getDocs(collection(db, "users"),where('uid', '==',item.docId));
//     // console.log(item.uid);
//     // console.log(item.docId);
//     console.log(usersQuerySnapshot .data);
    
//     usersQuerySnapshot.forEach((user) => {
//         // console.log(item.uid);
//         // console.log(user.data());
//         // const obj = {
            
//             name= user.data().firstName,
//             imgs= user.data().profileUrl
//             // }
//         })
//             console.log(item.data);
//             console.log(name);
            
//             const timestamp = Math.floor(new Date().getTime() / 1000); // Get current Unix timestamp in seconds
//             const date = new Date(timestamp * 1000); // Convert Unix timestamp to JavaScript Date object
//             const daterender = date.toLocaleDateString(); // Format the date as a string
            
//             // console.log(daterender);
            
            
            
            
//             render.innerHTML = ''
//         render.innerHTML +=`<div class = "rendermain">
//         <div class = "render">
//         <img src="${imgs}" alt="" class="img">
//         &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<P><b class = 'rendertitle'> ${item.Title}</b><br>
//         &nbsp;&nbsp;&nbsp;${daterender}&nbsp;&nbsp;${name}</P> 
// </div>


// <p>${item.Description}<p><br><br>`

// });















import { auth, db } from './config.js';
import { collection, getDocs, where } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-firestore.js";
import { onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-auth.js";

const home = document.querySelector('.home-div2');
const logout = document.querySelector('#loged');

onAuthStateChanged(auth, (user) => {
    if (!user) {
        console.log('not a user');
        home.innerHTML = `<button><a href="log.html"><i class="ri-login-box-line"></i></a></button>`;
        console.log(logout);
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

const fetchData = async () => {
    try {
        render.innerHTML = ''; // Clear previous content
        
        const postsQuerySnapshot = await getDocs(collection(db, "posts"));
        // console.log(postsQuerySnapshot.userdata);
        const promises = postsQuerySnapshot.docs.map(async (postDoc) => {
            // console.log(postDoc.data());
            const post = postDoc.data();
            const usersQuerySnapshot = await getDocs(collection(db, "users"))
            // console.log(post.uid);
            
            const userPromises = usersQuerySnapshot.docs.map(async (userDoc) => {
                console.log(userDoc.data());
                const user = userDoc.data();
                const timestamp = Math.floor(new Date().getTime() / 1000);
                const date = new Date(timestamp * 1000);
                const daterender = date.toLocaleDateString();
                console.log(post.Title);
                // post.Title = ''
                render.innerHTML += `<div class="rendermain">
                <div class="render">
                <img src="${user.profileUrl}" alt="" class="img">
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<p><b class='rendertitle'> ${post.Title}</b><br>
                &nbsp;&nbsp;&nbsp;${daterender}&nbsp;&nbsp;${user.firstName}</p> 
                </div>
                <p>${post.Description}</p><br><br>
                </div>`;
            });
                
                // await Promise.all(userPromises);
        });

        // await Promise.all(promises);
    } catch (error) {
        console.error("Error fetching data:", error);
    }
};

// Call fetchData to start fetching and rendering data
fetchData();
