import firebase from "firebase";
import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/storage'

const firebaseConfig = {
    apiKey: "AIzaSyDtiJ7JhDPvA4lGEo85PtMcGzQcCVQQ8iI",
    authDomain: "fir-6b50d.firebaseapp.com",
    projectId: "fir-6b50d",
    storageBucket: "fir-6b50d.appspot.com",
    messagingSenderId: "12637561392",
    appId: "1:12637561392:web:941abf1f6c2011e16383f5",
    measurementId: "G-4274C9KJMG"
  };

  
export default firebase.initializeApp(firebaseConfig)