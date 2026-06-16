import { initializeApp } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyAso1SxJOewGiupa2zXmOGgVb8ODocHO_M",
    authDomain: "seguimiento-soloicitudes.firebaseapp.com",
    projectId: "seguimiento-soloicitudes",
    storageBucket: "seguimiento-soloicitudes.firebasestorage.app",
    messagingSenderId: "997277522258",
    appId: "1:997277522258:web:453ab8b8e7d720856e428b"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
