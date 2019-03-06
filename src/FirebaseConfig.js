  import firebase from 'firebase/app'
  import "firebase/firestore"
  import "firebase/auth"
  
  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyDOjHRoCDNulGuaEjFzHXaEDOCmKygPA6M",
    authDomain: "forkbaseauth.firebaseapp.com",
    databaseURL: "https://forkbaseauth.firebaseio.com",
    projectId: "forkbaseauth",
    storageBucket: "forkbaseauth.appspot.com",
    messagingSenderId: "452978914658"
  };
  firebase.initializeApp(config);

  export default firebase