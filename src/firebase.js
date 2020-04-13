import firebase from "firebase/app";
import "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDQVoPOljth9kROej7yeoE1gqam-Lh6Gnc",
  authDomain: "think-piece-live-c3b73.firebaseapp.com",
  databaseURL: "https://think-piece-live-c3b73.firebaseio.com",
  projectId: "think-piece-live-c3b73",
  storageBucket: "think-piece-live-c3b73.appspot.com",
  messagingSenderId: "315305356843",
  appId: "1:315305356843:web:6a769f8bbcb901ede1846e",
  measurementId: "G-3W0CR6EXXD",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
// firebase.analytics();

export const firestore = firebase.firestore(); // our database i.e. firestore

window.firebase = firebase; // enable use to debug test firebase on the chrome dev tools (bad practice)

export default firebase;
