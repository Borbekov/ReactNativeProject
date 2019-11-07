import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import "firebase/storage";

// Initialize Firebase
var config = {
  apiKey: "AIzaSyCvo0HatofnY97vwYfeoZ3nHWh0rAe9HsM",
  authDomain: "net-diploma.firebaseapp.com",
  databaseURL: "https://net-diploma.firebaseio.com",
  projectId: "net-diploma",
  storageBucket: "net-diploma.appspot.com",
  messagingSenderId: "579179232065"
};

firebase.initializeApp(config);
firebase.firestore();
firebase.storage();

export default firebase;
