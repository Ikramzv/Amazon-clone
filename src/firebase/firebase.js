import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyDbtyNYDDU-6ANbpQ8M9WYaW056J4lm04Y",
  authDomain: "clone-e3c83.firebaseapp.com",
  projectId: "clone-e3c83",
  storageBucket: "clone-e3c83.appspot.com",
  messagingSenderId: "161999598470",
  appId: "1:161999598470:web:dcfecaf83a46f90e79b207"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app)

export { auth }