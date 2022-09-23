import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import AccountCard from '../../components/account-card/account-card.component';
import { auth, getUsers } from '../../firebase';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import SettingsRoundedIcon from '@mui/icons-material/SettingsRounded';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import './admin-page.styles.css';
import { selectCurrentUser } from '../../store/user/user.selector';
import { useSelector } from 'react-redux';
import { signOut } from 'firebase/auth';

const Admin = () => {
	const [accounts, setAccounts] = useState([]);
	const currentUser = useSelector(selectCurrentUser);
	useEffect(() => {
		const loadAccounts = async () => {
			const usr = await getUsers();
			setAccounts(usr);
			console.log('users stuff', usr);
		};
		loadAccounts();
	}, []);
	return (
		<div className='admin-wrapper'>
			<h2>User Accounts</h2>
			<div className='accounts-grid'>
				{accounts.map((account) => {
					return (
						<Link to={`${account.email}`} key={account.email}>
							<AccountCard account={account} />
						</Link>
					);
				})}
			</div>
			<div className='profile'>
				<img src={require('../../logo.png')} width='80%' height='17%' alt='Logo' />

				<br />
				<AccountCircleRoundedIcon sx={{ fontSize: 45 }} />

				<br />
				<h4 id='user-id'>
					<strong> </strong>
					{currentUser?.email}
				</h4>
				<br />
				<hr />
				<br />

				<div>
					<button type='button' id='home'>
						<HomeRoundedIcon id='icon' />
						<p>Home</p>
					</button>

					<a id='pagelinks' href='/pipeline'>
						<button type='button' id='home'>
							<FiberManualRecordIcon id='icon' />
							<p>Pipelines</p>
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
							<SettingsRoundedIcon id='icon' />
							<p>Admin</p>
						</button>
					</a>
					<br />
				</div>

				<hr />

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
