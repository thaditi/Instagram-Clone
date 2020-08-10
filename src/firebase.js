import firebase from "firebase";

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyBDFIUUOis__66y1_dz4CoC41qSPvKahAQ",
  authDomain: "instagram-clone-fd4b2.firebaseapp.com",
  databaseURL: "https://instagram-clone-fd4b2.firebaseio.com",
  projectId: "instagram-clone-fd4b2",
  storageBucket: "instagram-clone-fd4b2.appspot.com",
  messagingSenderId: "644483085537",
  appId: "1:644483085537:web:fc413b5cd4b8047bbf73a0",
  measurementId: "G-X6REYP7RER",
});

const db = firebaseApp.firestore();
const auth = firebase.auth();
const storage = firebase.storage();

export { db, auth, storage };
