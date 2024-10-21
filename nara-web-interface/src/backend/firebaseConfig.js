import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
  apiKey: "AIzaSyDMjCj_-jhGdHX5roxZ3Dgow9RQ7b1GjXI",
  authDomain: "xbcad-nara.firebaseapp.com",
  databaseURL: "https://xbcad-nara-default-rtdb.asia-southeast1.firebasedatabase.app/",
  projectId: "xbcad-nara",
  storageBucket: "xbcad-nara.appspot.com",
  messagingSenderId: "320726671795",
  appId: "1:320726671795:web:1c092d5239780bf1882bc6",
  measurementId: "G-NDWV8FY8ZV"
};

const app = initializeApp(firebaseConfig);

// Initialize Firebase Auth
const auth = getAuth(app);

// Initialize Firebase Realtime Database
const db = getDatabase(app);

export { auth, db };