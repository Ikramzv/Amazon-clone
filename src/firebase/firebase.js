import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyBIwrjwPyKxWukv0p3drFl5qgcx9yKSQw0",
  authDomain: "clone-e456f.firebaseapp.com",
  projectId: "clone-e456f",
  storageBucket: "clone-e456f.appspot.com",
  messagingSenderId: "1092258434632",
  appId: "1:1092258434632:web:540c3b39d5027d7794d27d"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const db = getFirestore(app)

export { auth }
export default db