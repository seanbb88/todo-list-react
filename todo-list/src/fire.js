import firebase from 'firebase'
var config = { /* COPY THE ACTUAL CONFIG FROM FIREBASE CONSOLE */
  apiKey: "AIzaSyCxq26CPdkZGxSVnv4YveCJRznI1mu9ZXk",
  authDomain: "todolistdatabase-d4590.firebaseapp.com",
  databaseURL: "https://todolistdatabase-d4590.firebaseio.com",
  projectId: "todolistdatabase-d4590",
  storageBucket: "todolistdatabase-d4590.appspot.com",
  messagingSenderId: "72780569699"
};
var fire = firebase.initializeApp(config);
console.log("connected")
export default fire;