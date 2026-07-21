import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY ,
  authDomain: "beitmatanel-animalrescue.firebaseapp.com",
  projectId: "beitmatanel-animalrescue",
  storageBucket: "beitmatanel-animalrescue.firebasestorage.app",
  messagingSenderId: "561238471358",
  appId: "1:561238471358:web:7578edd11b5d5ba01a64ef",
  measurementId: "G-PNKBWLN7K9"
};

// אתחול האפליקציה 
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);

export default app;
