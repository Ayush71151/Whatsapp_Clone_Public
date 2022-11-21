import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCigvuk2tK8aV7FGTUtEZ66TVOAz61omX8",
  authDomain: "whatsapp-clone-79d39.firebaseapp.com",
  projectId: "whatsapp-clone-79d39",
  storageBucket: "whatsapp-clone-79d39.appspot.com",
  messagingSenderId: "398893059560",
  appId: "1:398893059560:web:de41545310df4a5e52285d"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);


export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);
