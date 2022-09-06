// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
	apiKey: "AIzaSyAO3vLRyaVEUyqEOPCtLpxzMB5matICH-s",
	authDomain: "pasword-afcbd.firebaseapp.com",
	projectId: "pasword-afcbd",
	storageBucket: "pasword-afcbd.appspot.com",
	messagingSenderId: "1047206012692",
	appId: "1:1047206012692:web:5bb4d7f91a05c375100401",
	measurementId: "G-MT766QFJ07",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const database = getFirestore(app);
