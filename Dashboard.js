import { onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-auth.js";
import { collection, addDoc, Timestamp, getDocs, orderBy, where, query, doc, deleteDoc, updateDoc } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-firestore.js";
import { auth, db } from './config.js';

let docimage;
let docnam;
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
            docimage = doc.data().profileUrl;
            docnam =  doc.data().firstName;
        });
        
        // console.log(docnam);
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
        let date = item.postDate.seconds;
        let daterender = new Date(date * 1000).toDateString()
        // console.log(daterender);
        // console.log(item);
        div.innerHTML += `<div class = "rendermain">
        <div class = "render">
        <img src="${docimage}" alt="" class="img">
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<P><b class = 'rendertitle'> ${item.Title}</b><br>
        &nbsp;&nbsp;&nbsp;${daterender}&nbsp;&nbsp;${docnam}</P> 
        </div>
        
       
          <p>${item.Description}<p><br><br>

         <button type="button" id="delete">Delete</button>
         <button type="button" id="update" >Edit</button><br>
         <div>`
    });
    const del = document.querySelectorAll('#delete');
    const upd = document.querySelectorAll('#update');

    del.forEach((btn, index) => {
        btn.addEventListener('click', async () => {
            console.log('delete called', arr[index]);
            await deleteDoc(doc(db, "posts", arr[index].docId))
                .then(() => {
                    console.log('post deleted');
                    arr.splice(index, 1);
                    renderpost()
                });
        })
    })
    upd.forEach((btn, index) => {
        btn.addEventListener('click', async () => {
            console.log('update called', arr[index]);
            const updatedTitle = prompt('enter new Title');
            await updateDoc(doc(db, "posts", arr[index].docId), {
                Title: updatedTitle
            });
            arr[index].title = updatedTitle;
            renderpost()

        })
    })
}

// get data on firestore 
async function getDataFromFirestore(uid) {
    // Clear the existing data in the array before fetching new data
    arr.length = 0;

    const querySnapshot = await getDocs(query(collection(db, "posts"), orderBy('postDate', 'desc'), where('uid', '==', uid)));
    querySnapshot.forEach((doc) => {
        arr.push({ ...doc.data(), docId: doc.id});
        
        console.log(arr);
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
        postDate: Timestamp.fromDate(new Date()),
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
