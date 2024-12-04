import app from 'firebase/app'
import firebase from 'firebase'

const firebaseConfig = {
  apiKey: "AIzaSyBd7PD2fiTE2A61Cnr6prPpZ-_Xl6NX3PI",
  authDomain: "programacion3-d0c11.firebaseapp.com",
  projectId: "programacion3-d0c11",
  storageBucket: "programacion3-d0c11.firebasestorage.app",
  messagingSenderId: "115351405494",
  appId: "1:115351405494:web:cc4b06632bfe72c5a9b717",
  measurementId: "G-GX1FGPR74Z"
};

app.initializeApp(firebaseConfig)
export const auth = firebase.auth();
export const storage = app.storage();
export const db = app.firestore();
