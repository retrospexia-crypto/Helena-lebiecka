import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBCKXaAVLpQy2C_0Ofiu6Zr0WXAUr3SINE",
  authDomain: "helena-lebiecka-gallery.firebaseapp.com",
  projectId: "helena-lebiecka-gallery",
  storageBucket: "helena-lebiecka-gallery.firebasestorage.app",
  messagingSenderId: "616262065816",
  appId: "1:616262065816:web:490963ed5aefc86cabfaed",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
