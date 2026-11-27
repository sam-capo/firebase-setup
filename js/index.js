// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/13.4.0/firebase-app.js";
import {
    getDatabase,
    ref,
    child,
    get,
    push,
    set,
    onValue,
    serverTimestamp

} from "https://www.gstatic.com/firebasejs/13.4.0/firebase-database.js"

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyA_yIiRafAwUmO4g5zRfdeKlKCeuJBU9sA",
    authDomain: "gdes208-a03.firebaseapp.com",
    projectId: "gdes208-a03",
    storageBucket: "gdes208-a03.firebasestorage.app",
    messagingSenderId: "269761557865",
    appId: "1:269761557865:web:914fb21c7b9f2a39d7f9f8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const database = getDatabase();

const comments = ref(database, '/comments');

console.log(comments);

onValue(
    comments,
    (snapshot) => {
        let chat = document.getElementById("chat");
        chat.replaceChildren();
        snapshot.forEach((childSnapshot) => {
            const childKey = childSnapshot.key;
            const childData = childSnapshot.val();

            console.log(childData.name);

            chat.innerHTML += `<li>
                ${childData.name} - ${childData.comment}</li>`;
        })
    }
);

const add = document.getElementById("add");

add.addEventListener("click", function(){

    const name = document.getElementById("name");
    const comment = document.getElementById("comment");

    console.log(name.value);

    const newComment = push(comments);

    set(newComment, {
        name: name.value,
        comment: comment.value,
        date: serverTimestamp()
    })
});