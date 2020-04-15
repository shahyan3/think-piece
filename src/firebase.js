import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

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

// authentication - sign in
export const auth = firebase.auth; // authentication setup
export const provider = new firebase.auth.GoogleAuthProvider(); // names of auth providers used
export const signInWithGoogle = () => auth().signInWithPopup(provider); // sign in function to be used

// sign out
export const signOut = () => {
  auth().signOut();
};

/* Saving user document - Authenticating a user via Firestore both via email/pass or google sign in doesn't create
a document in the db. We must manually call this function everything authentication happends 
with user's returned object passed in to save to db. */
export const createUserProfileDocument = async (user, additionalData) => {
  if (!user) {
    // of no user don't do anything
    return;
  }
  // get a reference in db where a user profile might be
  const userRef = firestore.doc(`users/${user.uid}`); // get user from db

  // Go and fetch document from that location
  const snapshot = await userRef.get(); // gets that document (user row) from db

  if (!snapshot.exists) {
    // if snapshot exists; set photoUrl (manual email login may not have this vs google sign in)
    // update user doc with new fields added
    const { displayName, email, photoURL } = user;

    const createdAt = new Date();

    try {
      await userRef.set({
        displayName,
        email,
        photoURL,
        createdAt,
        ...additionalData,
      });
    } catch (error) {
      console.error("Error creating user : ", error.message);
    }
  }

  return getUserDocument(user.uid); // snap does exist, just get it
};

export const getUserDocument = async (uid) => {
  if (!uid) {
    return null;
  }

  try {
    const userDocument = await firestore.collection("users").doc(uid).get();

    return { uid, ...userDocument.data() };
  } catch (error) {
    console.error("Error fetching user...", error.message);
  }
};

window.firebase = firebase; // enable use to debug test firebase on the chrome dev tools (bad practice)

export default firebase;
