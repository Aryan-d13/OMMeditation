// Import the functions you need from the SDKs you need
const { initializeApp } = require('firebase/app');
const { getFirestore } = require('firebase/firestore');
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAnCVlDvAVU5yL-q_t3YLeqG9bEG4u19eE",
  authDomain: "ommeditation-a71cc.firebaseapp.com",
  databaseURL: "https://ommeditation-a71cc-default-rtdb.firebaseio.com",
  projectId: "ommeditation-a71cc",
  storageBucket: "ommeditation-a71cc.firebasestorage.app",
  messagingSenderId: "260504287597",
  appId: "1:260504287597:web:e7e862ee68f4f2b6b0c264",
  measurementId: "G-R06N5WC66H"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
module.exports = { db };