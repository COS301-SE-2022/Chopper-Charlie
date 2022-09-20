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
const firebaseConfig = {
    apiKey: "AIzaSyDa59D4r_NLTztsm7hHL_5ZHjNkzwv-S-U", 
    authDomain: "fir-user-reg-auth-50349.firebaseapp.com",  
    projectId: "fir-user-reg-auth-50349",  
    storageBucket: "fir-user-reg-auth-50349.appspot.com",
    messagingSenderId: "287221721322",
    appId: "1:287221721322:web:83e17a088f333253a2cf93"
};

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

export const getPipelines = async (user) => {
	const docRef = doc(db, 'pipelines', user.uid);
	const docSnap = await getDoc(docRef);
	if (docSnap.exists()) {
		return docSnap.data();
	} else {
		console.log('No such document!');
	}
};

export const setPipelines = async (pipelines, user, additionalInformation = {}) => {
	const pipeDocRef = doc(db, 'pipelines', user.uid);
	try {
		console.log("adding pipelines to FireStore")
		const res = await setDoc(pipeDocRef, {
			pipelines,
			...additionalInformation,
		});
		console.log('this is the response', res);
	} catch (error) {
		console.log('error setting user doc', error.message);
	}
};

export const createUserDocumentFromAuth = async (
	userAuth,
	additionalInformation = {}
) => {
	if (!userAuth) return;
	const userDocRef = doc(db, 'users', userAuth.uid);
	const userSnapshot = await getDoc(userDocRef);

	const pipeDocRef = doc(db, 'pipelines', userAuth.uid);
	const pipeSnapShot = await getDoc(pipeDocRef);

	if (!userSnapshot.exists()) {
		const { displayName, email } = userAuth;
		const createdAt = new Date();
		const role = 'user';
		const containerName = userAuth.uid.toLowerCase();
		const photo = userAuth.photoURL;
		try {
			await setDoc(userDocRef, {
				displayName,
				email,
				createdAt,
				role,
				containerName,
				photo,
				...additionalInformation,
			});
		} catch (error) {
			console.log('error creating the user', error.message);
		}
		// await createAccountContainer(containerName);
	}
	if (!pipeSnapShot.exists()) {
		const pipelines = [
			{
				title: 'Analyse Cars',
				classes: 'car',
				outline: true,
				count: true,
			},
			{
				title: 'Analyse Buses',
				classes: 'bus',
				outline: true,
				count: true,
			},
		];
		try {
			await setDoc(pipeDocRef, {
				pipelines,
				...additionalInformation,
			});
		} catch (error) {
			console.log('error creating the user', error.message);
		}
	}
	return userDocRef;
};

export const createAuthUserWithEmailAndPassword = async (email, password) => {
	if (!email || !password) return;

	return await createUserWithEmailAndPassword(auth, email, password);
};

export const signInAuthUserWithEmailAndPassword = async (email, password) => {
	if (!email || !password) return;

	return await signInWithEmailAndPassword(auth, email, password);
};

export const signOutUser = async () => await signOut(auth);

export const onAuthStateChangedListener = (callback) =>
	onAuthStateChanged(auth, callback);

// firebase.auth().currentUser.getIdTokenResult()
//   .then((idTokenResult) => {
//      // Confirm the user is an Admin.
//      if (!!idTokenResult.claims.admin) {
//        // Show admin UI.
//        console.log('This is an admin user');
//      } else {
//        // Show regular user UI.
// 	   console.log('This is an not admin user');
//      }
//   })
//   .catch((error) => {
//     console.log(error);
//   });