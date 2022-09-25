import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Profile from './Profile';
import Register from './Register';
import VerifyEmail from './VerifyEmail';
import Login from './Login';
import { useState, useEffect } from 'react';
import { AuthProvider } from './AuthContext';
import {
	auth,
	createUserDocumentFromAuth,
	getFileResult,
	getRole,
} from './firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { Navigate } from 'react-router-dom';
import Download from './Download';
import Delete from './Delete';
import Upload from './Upload'; //added by mumi
import Pipeline from './Pipeline'; //added by mumi
import Settings from './Settings'; //added by mumi
import AnalyseVideo from './AnalyseVideo'; //added by mumi
import Home from './Home'; //added by mumi
import Homelist from './Homelist'; //added by mumi
import Results from './Results'; //added by mumi
import ResultsList from './ResultsList'; //added by mumi
import { useDispatch, useSelector } from 'react-redux';
import Admin from './routes/admin/admin-page.component';
import { getPipelines, onAuthStateChangedListener } from './firebase';

import { setPipelinesArray } from './store/pipelines/pipelines.action';
import Account from './routes/account-page/account-page.component';
import { selectCurrentUser } from './store/user/user.selector';
import { setCurrentUser } from './store/user/user.action';
import { setFiles } from './store/files/files.action';
import { AdminRoute, PrivateRoute } from './routes/admin-route';

function App() {
	// const [currentUser, setCurrentUser] = useState(null)
	const currentUser = useSelector(selectCurrentUser);
	const [timeActive, setTimeActive] = useState(false);

	// useEffect(() => {
	//   onAuthStateChanged(auth, (user) => {
	//     setCurrentUser(user)
	//   })
	// }, [])

	const dispatch = useDispatch();
	useEffect(() => {
		const unsubscribe = onAuthStateChangedListener((user) => {
			if (user) {
				createUserDocumentFromAuth(user);
				const loadPipelines = async () => {
					const data = await getPipelines(user);
					// console.log("ffdvfvbdfx");
					// console.log(data);
					dispatch(setPipelinesArray(data.pipelines));
				};
				loadPipelines();
				getRole(user).then((role) => {
					console.log('this is the users role', role);
					dispatch(setCurrentUser({ ...user, role }));
				});
			}
			dispatch(setCurrentUser(user));
		});
		return unsubscribe;
	}, []);

	useEffect(() => {
		getFileResult(currentUser).then((data) => {
			console.log('this is the results data: ', data);
			dispatch(setFiles(data));
			// let filename =  'test.jpg'
			// console.log('This is the first file', data[filename]);
		});
	}, []);

	return (
		<AuthProvider value={{ currentUser, timeActive, setTimeActive }}>
			<Routes>
				<Route
					exact
					index
					path='/'
					element={
						<PrivateRoute user={currentUser}>
							<Home />
						</PrivateRoute>
					}
				/>
				<Route
					path='/login'
					element={
						!currentUser?.emailVerified ? (
							<Login />
						) : (
							<Navigate to='/' replace />
						)
					}
				/>
				<Route
					path='/register'
					element={
						!currentUser?.emailVerified ? (
							<Register />
						) : (
							<Navigate to='/' replace />
						)
					}
				/>
				<Route path='/verify-email' element={<VerifyEmail />} />
				<Route path='/download' element={<Download />} />
				<Route path='/delete' element={<Delete />} />
				<Route path='/upload' element={<Upload />} /> {/*    added by mumi */}
				<Route
					path='/pipeline'
					element={
						<PrivateRoute user={currentUser}>
							<Pipeline />
						</PrivateRoute>
					}
				/>{' '}
				{/*    added by mumi */}
				<Route
					path='/settings'
					element={
						<PrivateRoute user={currentUser}>
							<Settings />
						</PrivateRoute>
					}
				/>{' '}
				{/*    added by mumi */}
				<Route
					path='/analysevideo'
					element={
						<PrivateRoute user={currentUser}>
							<Settings />
						</PrivateRoute>
					}
				/>
				<Route
					path='/Home'
					element={
						<PrivateRoute user={currentUser}>
							<Home />
						</PrivateRoute>
					}
				/>{' '}
				<Route
					path='/admin'
					element={
						<AdminRoute user={currentUser}>
							<Admin />
						</AdminRoute>
					}
				/>{' '}
				{/*    added by mumi */}
				<Route
					path='admin/:accountName'
					element={
						<AdminRoute user={currentUser}>
							<Account />
						</AdminRoute>
					}
				/>
				<Route
					path='/Homelist'
					element={
						<PrivateRoute user={currentUser}>
							<Homelist />
						</PrivateRoute>
					}
				/>{' '}
				{/*    added by mumi */}
				<Route
					path='/Results'
					element={
						<PrivateRoute user={currentUser}>
							<Results />
						</PrivateRoute>
					}
				/>{' '}
				{/*    added by mumi */}
				<Route
					path='/ResultsList'
					element={
						<PrivateRoute user={currentUser}>
							<ResultsList />
						</PrivateRoute>
					}
				/>{' '}
				{/*    added by mumi */}
			</Routes>
		</AuthProvider>
	);
}

export default App;
