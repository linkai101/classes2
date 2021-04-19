import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

const config = {
  apiKey: "AIzaSyD-tPiyrBc7yKkIwece5ElneRVwOgFERxw",
  authDomain: "study-dev-450ba.firebaseapp.com",
  projectId: "study-dev-450ba",
  storageBucket: "study-dev-450ba.appspot.com",
  messagingSenderId: "65712258251",
  appId: "1:65712258251:web:8323bacea40d3e1ce7ef4e"
};

export default function initFirebase() {
  if (!firebase.apps.length) {
    firebase.initializeApp(config);
  }
}