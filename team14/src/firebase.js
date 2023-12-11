import { initializeApp } from "firebase/app";
import {Storage} from "./firebase";

const firebaseConfig = {
  apiKey: "AIzaSyCnbgcE6lHib_ZUgAJpH7CWXvzlT9tEOtQ",
  authDomain: "team14-122.firebaseapp.com",
  projectId: "team14-122",
  storageBucket: "team14-122.appspot.com",
  messagingSenderId: "821168664069",
  appId: "1:821168664069:web:8feaf24b97c51955cd366c"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const firebase = Storage(app);
