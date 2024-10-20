// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCqDj7hM7fEO-dS1l3dEEBA7Bje_qWVEbs",
  authDomain: "clone-6fd21.firebaseapp.com",
  projectId: "clone-6fd21",
  storageBucket: "clone-6fd21.appspot.com",
  messagingSenderId: "1093783711194",
  appId: "1:1093783711194:web:a0b7f32f780252e68fa4e3",
  measurementId: "G-CCKHCXHB4W"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);



export const auth = getAuth(app);









