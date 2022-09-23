import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import AccountCard from '../../components/account-card/account-card.component';
import { getUsers } from '../../firebase';
import './admin-page.styles.css';

const Admin = () => {
	const [accounts, setAccounts] = useState([]);
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
			<div className='accounts-grid'>
				{accounts.map((account) => {
					return (
						<Link to={`${account.email}`} key={account.email}>
							<AccountCard account={account} />
						</Link>
					);
				})}
			</div>
		</div>
	);
};

export default Admin;
