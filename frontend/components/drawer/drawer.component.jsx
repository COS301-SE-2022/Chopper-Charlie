import React from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import { Outlet, Link } from 'react-router-dom';
import { ReactComponent as Logo } from '../../assets/react.svg';
import SettingsIcon from '@mui/icons-material/Settings';
import AccountTreeIcon from '@mui/icons-material/AccountTree';
import ExploreIcon from '@mui/icons-material/Explore';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import NavItem from '../nav-item/nav-item.component';
import HomeIcon from '@mui/icons-material/Home';
import './drawer.styles.css'

const Item = styled(Paper)(({ theme }) => ({
	backgroundColor: '#1a1a1a',
	...theme.typography.body2,
	padding: theme.spacing(1),
	textAlign: 'center',
	color: '#fff',
	height: '2.5em',
	// justifyContent: 'space-between',
	alignItems: 'center',
	// padding: '1em',
}));

const Drawer = () => {
	return (
		<div className='test-container'>
			<Outlet />
			<Box
				sx={{
					width: '30vh',
					height: '100vhem',
					backgroundColor: 'rgba(0, 0, 0, 0.59)',
					padding: '0.5em',
					borderRadius: '5px',
					position: 'fixed',
					float: 'right',
					right: '0%',
					top: '0',
					margin: '2vh',
					zIndex: '100',
				}}>
					
				<Stack
					spacing={2}
					sx={{
						justifyContent: 'space-between',
						// backgroundColor: 'green',
						height: '95vh',
						minHeight: '45em',
					}}>
					<Link to='/'>
						<div className='logo'>
							<Logo />
							{/* <img
								src='../../assets/react.svg'
								alt='chopper-charlie'
								height='50px'
								width='50px'
							/> */}
						</div>
					</Link>

					<div>
						<Item>CREDENTIALS</Item>
					</div>

					<Stack
						spacing={0.5}
						sx={{
							justifyContent: 'space-between',
							alignItems: 'center',
							// backgroundColor: 'green',
							// height: '90vh',
							// minHeight: '45em',
						}}>
						<Link to='media'>
							<NavItem icon={<HomeIcon />}>Home</NavItem>
						</Link>
						<Link to='analytics'>
							<NavItem icon={<AccountTreeIcon />}>Analytics</NavItem>
						</Link>
						<Link to='settings'>
							<NavItem icon={<SettingsIcon />}>Settings</NavItem>
						</Link>
						<Link to='explore'>
							<NavItem icon={<ExploreIcon />}>Explore</NavItem>
						</Link>

						<Link to='admin'>
							<NavItem icon={<AdminPanelSettingsIcon />}>Admin</NavItem>
						</Link>
					</Stack>
					<Item>LOGOUT</Item>
					<div className='ab-logo'>
						<Logo />
						{/* <img
							src='../../assets/AB.png'
							alt='agile-bridge'
							height='100px'
							width='50px'
						/> */}
					</div>
				</Stack>
			</Box>
			
		</div>
	);
};

export default Drawer;
