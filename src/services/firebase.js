import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAnCVlDvAVU5yL-q_t3YLeqG9bEG4u19eE",
  authDomain: "ommeditation-a71cc.firebaseapp.com",
  projectId: "ommeditation-a71cc",
  storageBucket: "ommeditation-a71cc.appspot.com",
  messagingSenderId: "260504287597",
  appId: "1:260504287597:web:e7e862ee68f4f2b6b0c264",
  measurementId: "G-R06N5WC66H",
};

// Initialize Firebase app
const app = initializeApp(firebaseConfig);

// Initialize Firestore
const db = getFirestore(app);

// Initialize Auth
const auth = getAuth(app);

export { auth, db };
