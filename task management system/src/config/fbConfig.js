import { initializeApp } from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const config = {
  apiKey: "AIzaSyDAF9Nmozypl39xhQQi3KVF9kkibZTftGs",
  authDomain: "project-share-system.firebaseapp.com",
  projectId: "project-share-system",
  storageBucket: "project-share-system.firebasestorage.app",
  messagingSenderId: "127397604917",
  appId: "1:127397604917:web:e483a76a1c6d1c2307cb7c",
};

const app = initializeApp(config);

export const db = getFirestore(app);

export const auth = getAuth(app);
