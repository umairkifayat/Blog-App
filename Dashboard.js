import { onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-auth.js";
import { collection, addDoc, Timestamp, getDocs, orderBy, where, query, doc, deleteDoc, updateDoc } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-firestore.js";
import { auth, db } from './config.js';

let userobj;
let docimage;
let docnam;
console.log(docimage);

// on auth function start 
onAuthStateChanged(auth, async (user) => {
    if (user) {
        console.log(user);
        const uid = user.uid;
        console.log(uid);
        const q = query(collection(db, "users"), where("uid", "==", uid));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            console.log(doc.data());
            userobj = doc.data()
            docimage = doc.data().profileUrl;
            docnam = doc.data().firstName;
        })
        getDataFromFirestore(uid);
        console.log(userobj);
    }else{
        window.location = 'index.html'
    }
});


// on auth function end 







// variables
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
        window.location = 'log.html';
    }).catch((error) => {
        console.log(error);
    });
});











// render function 
function renderpost() {

    div.innerHTML = "";
    arr.forEach((item) => {
        let date = item.postDate.seconds;
        let daterender = new Date(date * 1000).toDateString()
        div.innerHTML += `<div class = 'main-render'>
        <img class = 'img' src=${docimage} alt='image'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <div class = 'render-2'>
        <h3 class='r-name'>${item.Title}</h3>


            <p class='r-title'>${docnam}&nbsp;${daterender}</p>
<p class='r-description'>${item.Description}</p>
</div>
</div>
    
        
        
       
          
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
            console.log("Edit Called", arr[index]);
            const updatedTitle = prompt('Enter new Title', arr[index].Title)
            const updateDes = prompt('Enter new Description', arr[index].Description)
            await updateDoc(doc(db, "posts", arr[index].docId), {
                title: updatedTitle,
                description: updateDes,
                time: Timestamp.fromDate(new Date())
            });
            arr[index].Title = updatedTitle;
            arr[index].Description = updateDes
            renderpost()
        })

    })
}











// get data on firestore 
async function getDataFromFirestore(uid) {
    arr.length = 0;

    const querySnapshot = await getDocs(query(collection(db, "posts"), orderBy('postDate', 'desc'), where('uid', '==', uid)));
    querySnapshot.forEach((doc) => {
        arr.push({ ...doc.data(), docId: doc.id });

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
        userobj,
    };

    try {
        await addDoc(collection(db, "posts"), obj);
        console.log('User registered successfully');

        getDataFromFirestore(auth.currentUser.uid);
    } catch (error) {
        console.error(error);
    }
});
Title.value = '';
Description.value = '';

console.log(userobj);