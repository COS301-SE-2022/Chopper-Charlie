import { useState } from 'react';
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Analytics from './routes/analytics/analytics.component';
import Authentication from './routes/auth/authentication.component';

import './App.css';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import {
	createUserDocumentFromAuth,
	getPipelines,
	onAuthStateChangedListener,
} from './utils/firebase/firebase.utils';
import { selectCurrentUser } from './store/user/user.selector';
import { getUsers } from './utils/firebase/firebase.utils';
import { setCurrentUser } from './store/user/user.action';
import { setPipelinesArray } from './store/pipelines/pipelines.action';
import Drawer from './components/drawer/drawer.component';
import Media from './routes/media/media.component';
import Settings from './routes/settings/settings.component';
import AdminPortal from './routes/admin/admin.component';
import Explore from './routes/explore/explore.component';
import Home from './routes/home/home.component';
import { setAccounts } from './store/accounts/accounts.action';


function App() {
	const dispatch = useDispatch();
	useEffect(() => {
		const unsubscribe = onAuthStateChangedListener((user) => {
			if (user) {
				createUserDocumentFromAuth(user);
				const loadPipelines = async () => {
					const data = await getPipelines(user);
					dispatch(setPipelinesArray(data.pipelines));
				};
				loadPipelines();
				// const loadUsers = async () => {
				// 	console.log('loading users');
				// 	const data = await getUsers();
				// 	console.log('This is the users data', data);
				// 	dispatch(setAccounts(data.users));
				// }
				// loadUsers();
			}
			dispatch(setCurrentUser(user));
		});
		return unsubscribe;
	}, []);

	return (
		<>
			<Routes>
				{/* Add route: user ? dashboard : home */}
				<Route path='/' element={<Home />} />
				
				
				<Route path='/portal' element={<Drawer />}>
					<Route index path='media' element={<Media />} />
					<Route path='analytics' element={<Analytics />} />
					<Route path='settings' element={<Settings />} />
					{/* Add route: admin ? admin-portal : access denied */}
					<Route path='admin' element={<AdminPortal />} />
					<Route path='explore' element={<Explore />} />
				</Route>


				<Route path='auth' element={<Authentication />} />
			</Routes>
		</>
	);
}

export default App;
