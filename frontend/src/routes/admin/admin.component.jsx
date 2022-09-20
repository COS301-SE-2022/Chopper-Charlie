import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import AccountCard from '../../components/account-card/account-card.component';
import { setAccounts } from '../../store/accounts/accounts.action';
import { selectAccounts } from '../../store/accounts/accounts.selector';
import { getUsers } from '../../utils/firebase/firebase.utils';
import './admin.styles.css';
import Drawer from '../../components/drawer/drawer.component';

const AdminPortal = () => {
	const [accounts, setAccounts] = useState([]);
	useEffect(() => {
		const loadAccounts = async () => {
			const usr = await getUsers();
			setAccounts(usr);
			// console.log('users stuff', usr);
		};
		loadAccounts();
	}, []);

	// const accounts = [
	// 	{
	// 		displayName: 'John Does',
	// 		email: 'uhsdfsdfdf@iugdf.com',
	// 		role: 'admin',
	// 		photo: 'https://i.pravatar.cc/310',
	// 		date: new Date(),
	// 	},
	// 	{
	// 		displayName: 'Jane Doe',
	// 		email: 'uhfhfgf@iugdf.com',
	// 		role: 'super',
	// 		photo: 'https://i.pravatar.cc/300',
	// 		date: new Date(),
	// 	},
	// 	{
	// 		displayName: 'Jack Doe',
	// 		email: 'usdfdsff@iugdf.com',
	// 		role: 'user',
	// 		photo: 'https://i.pravatar.cc/290',
	// 		date: new Date(),
	// 	},
	// 	{
	// 		displayName: 'Jack Doe',
	// 		email: 'usdfdsff@iugdf.com',
	// 		role: 'user',
	// 		photo: 'https://i.pravatar.cc/190',
	// 		date: new Date(),
	// 	},
	// ];
	// const accounts = useSelector(selectAccounts);
	return (
		<div className='admin-wrapper'>
			<div className='accounts-grid'>
				{accounts.map((account) => {
					return <AccountCard account={account} key={account.email} />;
				})}
			</div>
		</div>
	);
};

export default AdminPortal;
