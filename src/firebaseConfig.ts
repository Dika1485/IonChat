import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyDg-iDp9VP0G67n3dZ7qKSnsUzU7VEP71M",
    authDomain: "ionchat-dbff3.firebaseapp.com",
    projectId: "ionchat-dbff3",
    storageBucket: "ionchat-dbff3.appspot.com",
    messagingSenderId: "557295454798",
    appId: "1:557295454798:web:4d388b407605c2e060911f",
    databaseURL: "https://ionchat-dbff3-default-rtdb.asia-southeast1.firebasedatabase.app/",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

// Initialize Realtime Database and get a reference to the service
export function getDB() {
    const app = initializeApp(firebaseConfig);
    const database = getDatabase(app);
    return database;
}
export function getFirebaseStorage() {
    const app = initializeApp(firebaseConfig);
    const storage = getStorage(app);
    return storage;
}