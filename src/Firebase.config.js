import { getApp, getApps, initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBKfG0NenQ_k04pM65svHdAAHLDQ7nqSF0",
  authDomain: "restaurant-10db5.firebaseapp.com",
  databaseURL: "https://restaurant-10db5-default-rtdb.firebaseio.com",
  projectId: "restaurant-10db5",
  storageBucket: "restaurant-10db5.appspot.com",
  messagingSenderId: "300010125210",
  appId: "1:300010125210:web:89c30515f5e70c88abac23",
};

const app = getApps.length > 0 ? getApp() : initializeApp(firebaseConfig);

const firestore = getFirestore(app);
const storage = getStorage(app);

export { app, firestore, storage };
