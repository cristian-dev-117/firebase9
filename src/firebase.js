import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCfBQMIxLx0StWCaW4hkjWGEhPERfi-0JI",
  authDomain: "react-ddbef.firebaseapp.com",
  projectId: "react-ddbef",
  storageBucket: "react-ddbef.appspot.com",
  messagingSenderId: "441335038874",
  appId: "1:441335038874:web:1eefd3878077138945f023",
  measurementId: "G-RQ6XN3QL8W"
};
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export {
    auth
};