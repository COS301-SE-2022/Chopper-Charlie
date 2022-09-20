// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  connectAuthEmulator,
} from "firebase/auth";
import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  collection,
  writeBatch,
  query,
  getDocs,
  onSnapshot,
  connectFirestoreEmulator,
} from "firebase/firestore";
import { getApp } from "firebase/app";
import {
  getFunctions,
  connectFunctionsEmulator,
  httpsCallable,
} from "firebase/functions";
import { getStorage, connectStorageEmulator } from "firebase/storage";
import { createAccountContainer } from "../azure/azure.utils";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth();
// connectAuthEmulator(auth, "http://localhost:9099");

export const db = getFirestore();
// connectFirestoreEmulator(db, 'localhost', 8080);

// const functions = getFunctions(getApp());
// connectFunctionsEmulator(functions, "localhost", 5001);

const storage = getStorage();
// connectStorageEmulator(storage, "localhost", 9199);

const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
  prompt: "select_account",
});

export const signInWithGooglePopup = () =>
  signInWithPopup(auth, googleProvider);

export const addCollectionAndDocuments = async (
  collectionKey,
  objectsToAdd
) => {
  const collectionRef = collection(db, collectionKey);
  const batch = writeBatch(db);
  objectsToAdd.forEach((obj) => {
    const newDocRef = doc(collectionRef, obj.title.toLowerCase());
    batch.set(newDocRef, obj);
  });
  await batch.commit();
};

export const getUsers = async () => {
	const usersRef = collection(db, 'users');
	const q = query(usersRef);
	const querySnapshot = await getDocs(q);
	return querySnapshot.docs.map((doc) => doc.data());
}