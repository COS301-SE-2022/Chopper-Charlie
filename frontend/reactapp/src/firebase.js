// src.firebase.js

import {
	getAuth,
	signInWithPopup,
	GoogleAuthProvider,
	onAuthStateChanged,
} from 'firebase/auth';
import {
	getFirestore,
	doc,
	getDoc,
	setDoc,
	collection,
	query,
	getDocs,

} from 'firebase/firestore';

import { initializeApp } from 'firebase/app';

const firebaseConfig = {
	apiKey: 'AIzaSyDa59D4r_NLTztsm7hHL_5ZHjNkzwv-S-U',

	authDomain: 'fir-user-reg-auth-50349.firebaseapp.com',

	projectId: 'fir-user-reg-auth-50349',

	storageBucket: 'fir-user-reg-auth-50349.appspot.com',

	messagingSenderId: '287221721322',

	appId: '1:287221721322:web:83e17a088f333253a2cf93',
};

// Initialize Firebase and Firebase Authentication
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export { auth };

export const db = getFirestore();


const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
	prompt: 'select_account',
});

export const signInWithGooglePopup = () =>
	signInWithPopup(auth, googleProvider);


export const getPipelines = async (user) => {
	console.log('Entering pipeline');
	const docRef = doc(db, 'pipelines', user.uid);
	const docSnap = await getDoc(docRef);
	if (docSnap.exists()) {
		return docSnap.data();
	} else {
		console.log('No such document!');
	}
};

export const setPipelines = async (
	pipelines,
	user,
	additionalInformation = {}
) => {
	// console.log("kkkkkkkkkkk   ", user.uid)

	const pipeDocRef = doc(db, 'pipelines', user.uid);
	try {
		console.log('adding pipelines to FireStore');
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

export const onAuthStateChangedListener = (callback) =>
	onAuthStateChanged(auth, callback);

export const getUsers = async () => {
	const usersRef = collection(db, 'users');
	const q = query(usersRef);
	const querySnapshot = await getDocs(q);
	return querySnapshot.docs.map((doc) => doc.data());
};

export const getFileResult = async (user) => {
	console.log('Entering results');
	const docRef = doc(db, 'results', user.uid);
	const docSnap = await getDoc(docRef);
	if (docSnap.exists()) {
		return docSnap.data();
	} else {
		console.log('No such document!');
	}
};

export const deleteFileResult = async (user, filename) => {
	console.log('Entering deleting results');
	try {
		const docRef = doc(db, 'results', user.uid);

		// Remove the 'capital' field from the document
		// await updateDoc(docRef, {
		// 	[filename]: deleteField(),
		// });
		await setDoc(docRef, { [filename]: null }, { merge: true });
	} catch (error) {
		console.log('Error removing result: ', error);
	}
};


export const getRole = async (user) => {
	const docRef = doc(db, 'users', user.uid);
	const docSnap = await getDoc(docRef);
	if (docSnap.exists()) {
		return docSnap.data().role;
	} else {
		console.log('No such document!');
	}
}