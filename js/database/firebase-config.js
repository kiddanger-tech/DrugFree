/* ==========================================
   DRUGFREE QUEST
   Firebase Configuration
   ========================================== */


/*
   Replace the values below with your
   Firebase project configuration.

   Get them from:

   Firebase Console
   >
   Project Settings
   >
   Web App
*/


const firebaseConfig = {


    apiKey:
    "YOUR_FIREBASE_API_KEY",


    authDomain:
    "YOUR_PROJECT.firebaseapp.com",


    projectId:
    "YOUR_PROJECT_ID",


    storageBucket:
    "YOUR_PROJECT.appspot.com",


    messagingSenderId:
    "YOUR_MESSAGING_SENDER_ID",


    appId:
    "YOUR_FIREBASE_APP_ID"


};






/* =========================
   INITIALIZE FIREBASE
========================= */



firebase.initializeApp(
    firebaseConfig
);






/* =========================
   FIREBASE SERVICES
========================= */



const auth =
firebase.auth();



const database =
firebase.firestore();



const storage =
firebase.storage();







/* =========================
   CONNECTION TEST
========================= */


console.log(
    "🔥 Firebase Connected"
);






/* =========================
   EXPORT SERVICES
========================= */


window.FirebaseService = {


    auth:
    auth,


    database:
    database,


    storage:
    storage


};

