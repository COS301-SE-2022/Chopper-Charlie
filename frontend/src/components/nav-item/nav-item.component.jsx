import React from 'react';
import Stack from '@mui/material/Stack';

const NavItem = ({ children, icon }) => {
	return (
		<Stack
			spacing={2}
			direction='row'
			justifyContent='center'
			sx={{
				// margin: '1em',
				width: '26vh',
				border: '1px solid transparent',
				position: 'relative',
				backgroundClip: 'padding-box',
				backgroundColor: '#1a1a1a',
				padding: '1.5vh',
				paddingRight: '0.15em',
				paddingLeft: '1.5em',
				borderRadius: '5px',
				// height: '2.5em',
				alignItems: 'center',
				// justifyContent='space-between',
				'&:hover': {
					width: '27vh',
					// color: 'blue',
					// padding: '1.6vh',
					'&:after': {
						position: 'absolute',
						top: -1,
						left: -1,
						right: -1,
						bottom: -1,
						// background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
						background: 'linear-gradient(45deg, #C738E7 30%, #27CAF6 90%)',
						content: '""',
						zIndex: -1,
						borderRadius: '5px',
						transition: 'all 0.3s ease-in-out',
					},
				},
			}}>
			{icon}
			<div className='title-div'>
				{/* <h3 className='pipe-title'>Hello</h3> */}
				{children}
			</div>
		</Stack>
	);
};

export default NavItem;
