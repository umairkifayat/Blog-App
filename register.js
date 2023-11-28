import { createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-auth.js";
import { auth, db, storage } from './config.js';
import { collection,addDoc } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-firestore.js";
import {  ref, uploadBytes } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-storage.js";


const email = document.querySelector('.email');
const password = document.querySelector('.password');
const confirmpassword = document.querySelector('.c-password');
const username = document.querySelector('.username');
const btn = document.querySelector('.btn');
const file = document.querySelector('.img');



// console.log(auth);
btn.addEventListener('click', (event) => {
    event.preventDefault();

    if (confirmpassword.value === password.value) {
            const photo = file.files[0];
        const storageRef = ref(storage,username.value)    
        uploadBytes(storageRef, photo).then((snapshot) => {
            console.log('Uploaded an array!');
        createUserWithEmailAndPassword(auth, email.value, password.value)    
            .then((userCredential) => {
                const user = userCredential.user;
                console.log(user);
                try {
                        addDoc(collection(db, "posts"), {
                                firstName: username.value,
                                email: email.value,
                                uid: user.uid,
                                profileUrl: url
                            });    
        
                            console.log("Document written with ID: ", user.uid);
                        } catch (e) {
                                console.error("Error adding document: ", e);
                            }    
            
                        });    
                            window.location = 'index.html';
                        })    
                        .catch((error) => {
                                Swal.fire({
                                        icon: 'error',
                                        title: 'Oops...',
                    text: error,                    
                    footer: '<a href="#">Why do I have this issue?</a>'
                });    
            });    

    } else {    
        // alert('Please enter correct password.');
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Password are not same',
            footer: '<a href="#">Why do I have this issue?</a>'
        });    

    }    
});    













// import { createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-auth.js";
// import { auth, db, storage } from './config.js';
// import { collection, addDoc } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-firestore.js";
// import { ref, uploadBytes } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-storage.js";







// // ... (your import statements)

// btn.addEventListener('click', async (event) => {
//     event.preventDefault();

//     if (confirmpassword.value === password.value) {
//         const photo = file.files[0];
//         const storageRef = ref(storage, username.value);

//         try {
//             const snapshot = await uploadBytes(storageRef, photo);
//             const downloadURL = await snapshot.ref.getDownloadURL();

//             const userCredential = await createUserWithEmailAndPassword(auth, email.value, password.value);
//             const user = userCredential.user;

//             await addDoc(collection(db, "posts"), {
//                 firstName: username.value,
//                 email: email.value,
//                 uid: user.uid,
//                 profileUrl: downloadURL // Use the download URL from storage
//             });

//             console.log("Document written with ID: ", user.uid);
//             window.location = 'index.html';
//         } catch (error) {
//             Swal.fire({
//                 icon: 'error',
//                 title: 'Oops...',
//                 text: error.message,
//                 footer: '<a href="#">Why do I have this issue?</a>'
//             });
//         }
//     } else {
//         Swal.fire({
//             icon: 'error',
//             title: 'Oops...',
//             text: 'Passwords are not the same',
//             footer: '<a href="#">Why do I have this issue?</a>'
//         });
//     }
// });
