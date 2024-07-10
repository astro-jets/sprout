// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAM41kApurqBsuDN8yeSpJyKaRIB_pPNG0",
  authDomain: "esp32-7db8c.firebaseapp.com",
  databaseURL:
    "https://esp32-7db8c-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "esp32-7db8c",
  storageBucket: "esp32-7db8c.appspot.com",
  messagingSenderId: "947572653029",
  appId: "1:947572653029:web:4444cb1c53144122410d0c",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
export { database };
