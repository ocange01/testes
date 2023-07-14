import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCJn5hDKErE-ZQTDd_IsY9V1BcR35tI_-I",
  authDomain: "formpendaftarantsc.firebaseapp.com",
  databaseURL: "https://formpendaftarantsc-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "formpendaftarantsc",
  storageBucket: "formpendaftarantsc.appspot.com",
  messagingSenderId: "182736279417",
  appId: "1:182736279417:web:721f02a44e7b753dd281a8"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };