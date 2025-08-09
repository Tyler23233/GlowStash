import { initializeApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAyL6xLvdPbIRd6yI8gUYA5qpj0MTV2Ya8",
  authDomain: "glowstash-91058.firebaseapp.com",
  projectId: "glowstash-91058",
  storageBucket: "glowstash-91058.firebasestorage.app",
  messagingSenderId: "103684404200",
  appId: "1:103684404200:web:4414469386f798a091ea5d",
  measurementId: "G-R3FND42V3K"
};

export const app = getApps().length ? getApps()[0] : initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
