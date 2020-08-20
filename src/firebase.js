import firebase from 'firebase/app';
import 'firebase/firestore';

var firebaseConfig = {
    apiKey: "AIzaSyDasn3Rn_SDVZ8aKnS4IltRzllFuMh_3ik",
    authDomain: "doctorapp-187e7.firebaseapp.com",
    databaseURL: "https://doctorapp-187e7.firebaseio.com",
    projectId: "doctorapp-187e7",
    storageBucket: "doctorapp-187e7.appspot.com",
    messagingSenderId: "259056388269",
    appId: "1:259056388269:web:9174156b160022893f5e24",
  };
  
  const firebaseApp = firebase.initializeApp(firebaseConfig); 
  export const db = firebaseApp.firestore();