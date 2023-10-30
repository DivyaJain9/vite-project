import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDzf0-Mej8YIEZAsYqBUuuslKRG_jzltG4",
  authDomain: "live-chat-application-a4e1d.firebaseapp.com",
  projectId: "live-chat-application-a4e1d",
  storageBucket: "live-chat-application-a4e1d.appspot.com",
  messagingSenderId: "777644663683",
  appId: "1:777644663683:web:4e010082de77a07372ccb6",
  measurementId: "G-T6KCHWDSYP"
};


firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const firestore = firebase.firestore();

export { auth, firestore };