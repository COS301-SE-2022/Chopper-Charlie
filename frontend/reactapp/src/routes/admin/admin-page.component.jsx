import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import AccountCard from '../../components/account-card/account-card.component';
import { auth, deleteFileResult, getFileResult, getUsers } from '../../firebase';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import SettingsRoundedIcon from '@mui/icons-material/SettingsRounded';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import './admin-page.styles.css';
import { selectCurrentUser } from '../../store/user/user.selector';
import { useDispatch, useSelector } from 'react-redux';
import { signOut } from 'firebase/auth';
import { addItemToFiles, setFiles } from '../../store/files/files.action';
import { selectFiles } from '../../store/files/files.selector';
import TuneIcon from '@mui/icons-material/Tune';
import AssessmentIcon from '@mui/icons-material/Assessment';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';

const Admin = () => {
	const [color, changeColor] = useState('#242424');
	
	document.body.style.backgroundColor = color;


	const [accounts, setAccounts] = useState([]);
	const currentUser = useSelector(selectCurrentUser);
	const dispatch = useDispatch();
	const files = useSelector(selectFiles)
	const [results, setResults] = useState([]);

	useEffect(() => {
		const loadAccounts = async () => {
			const usr = await getUsers();
			setAccounts(usr);
			// console.log('users stuff', usr);
		};
		loadAccounts();
		// getFileResult(currentUser).then((data) => {
		// 	// console.log(data);
		// 	dispatch(setFiles(data));
		// 	// let filename =  'test.jpg'
		// 	// console.log('This is the first file', data[filename]);
		// })
	}, []);



	return (
		
		<div className='admin-wrapper'>
			<h2 id="AdminAccount">User Accounts</h2>
			<div className='accounts-grid'>
				{accounts?.map((account) => {
					return (
						<Link to={`${account.email}`} key={account.email}>
							<AccountCard account={account} />
						</Link>
					);
				})}
			</div>








			<div className='profile'>
				<img src={require('../../logo.png')} width='70%' height='15%' alt='Logo' />

				<br />
				<br />
				<AccountCircleRoundedIcon sx={{ fontSize: 35 }} />

				<br />
				<h4 id='user-id'>
					<strong> </strong>
					{currentUser?.email}
				</h4>

				{/* <hr /> */}

				<div>
					<a id='pagelinks' href='/home'>
						<button type='button' id='home'>
							<HomeRoundedIcon id='icon' />
							<p>Home</p>
						</button>
					</a>

					<a id='pagelinks' href='/pipeline'>
						<button type='button' id='home'>
							<TuneIcon id='icon' />
							<p>Pipelines</p>
						</button>
					</a>
					<a id='pagelinks' href='/results'>
						<button type='button' id='home'>
							<AssessmentIcon id='icon' />
							<p>Results</p>
						</button>
					</a>
					<a id='pagelinks' href='/settings'>
						<button type='button' id='home'>
							<SettingsRoundedIcon id='icon' />
							<p>Settings</p>
						</button>
					</a>

					<a id='pagelinks' href='/admin'>
						<button type='button' id='home'>
							<AdminPanelSettingsIcon id='icon' />
							<p>Admin</p>
						</button>
					</a>
				</div>
				<br />
				{/* <hr /> */}

				<br />

				<a href='/login'>
					<button type='button' id='homelogout' onClick={() => signOut(auth)}>
						<LogoutRoundedIcon id='iconlo' />
						<p>Logout</p>
					</button>
				</a>

				<div className='sub_div'>
					{' '}
					<img
						id='ABlogo'
						src={require('../../AB.png')}
						width='35%'
						height='40%'
						alt='Logo'
					/>
				</div>
			</div>
		</div>
	);
};

export default Admin;
