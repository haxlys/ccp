/**
 * Implement Gatsby's Browser APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/browser-apis/
 */

// You can delete this file if you're not using it
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

import "./src/styles/style.css";

const firebaseConfig = {
  apiKey: "AIzaSyCmjWe3ggLhn0gRHAXRavJhA1JoHiUrZgA",
  authDomain: "cryto-coin-2bd10.firebaseapp.com",
  databaseURL: "https://cryto-coin-2bd10.firebaseio.com",
  projectId: "cryto-coin-2bd10",
  storageBucket: "cryto-coin-2bd10.appspot.com",
  messagingSenderId: "327777964990",
  appId: "1:327777964990:web:9f984378b17c6798749fef",
  measurementId: "G-BNBSP9G6ZK",
};

firebase.initializeApp(firebaseConfig);
