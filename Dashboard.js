import { onAuthStateChanged, signOut  } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-auth.js";
import { collection, addDoc , Timestamp} from "https://www.gstatic.com/firebasejs/9.10.0/firebase-firestore.js";
import { auth, db } from './config.js';


onAuthStateChanged(auth, (user) => {
    if (user) {
        console.log(user);
    }
});




const title = document.querySelector('.title')
const des = document.querySelector('.description')
const btn = document.querySelector('.btn');
const logout = document.querySelector('.logout');



// logout function 
logout.addEventListener('click',()=>{
    signOut(auth).then(() => {
        console.log('logout successfully');
        window.location = 'index.html'
    }).catch((error) => {
        console.log(error);
    });

})








let arr = []

btn.addEventListener('click',async(event)=>{
event.preventDefault()
const obj ={
    title: title.value,
    Description: des.value,
    uid:auth.currentUser.uid,
    postDate: Timestamp.fromDate(new Date())
}
try {
    const docRef = await addDoc(collection(db, "posts"),obj);
    console.log("Document written with ID: ", docRef.id);
    console.log(arr);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
  arr.push(obj)
// arr.push(obj)
})

function render() {
    arr.map((item)=>{
console.log(item);
    })
    
}

render()