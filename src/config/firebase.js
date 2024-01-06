// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCuGg2yHbv0goBaxn2kKE9sEr6rgQvgjHU",
  authDomain: "cointracker-c86f1.firebaseapp.com",
  projectId: "cointracker-c86f1",
  storageBucket: "cointracker-c86f1.appspot.com",
  messagingSenderId: "1096021904149",
  appId: "1:1096021904149:web:cafdd93cc3935ac5d0371c",
  measurementId: "G-CCFRVPLXLX",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
