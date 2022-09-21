import React from 'react';
import styled from 'styled-components';
import { styled as muiStyled } from '@mui/material/styles';
import { purple } from '@mui/material/colors';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Fade from '@mui/material/Fade';

export const BaseButton = styled.button`
	min-width: 165px;
	width: auto;
	height: 50px;
	letter-spacing: 0.5px;
	line-height: 50px;
	padding: 0 35px 0 35px;
	font-size: 15px;
	background-color: black;
	color: white;
	text-transform: uppercase;
	font-family: 'Open Sans Condensed';
	font-weight: bolder;
	border: none;
	cursor: pointer;
	display: flex;
	justify-content: center;

	&:hover {
		background-color: white;
		color: black;
		border: 1px solid black;
	}
`;

export const GoogleSignInButton = styled(BaseButton)`
	background-color: #4285f4;
	color: white;

	&:hover {
		background-color: #357ae8;
		border: none;
	}
`;

export const InvertedButton = styled(BaseButton)`
	background-color: white;
	color: black;
	border: 1px solid black;

	&:hover {
		background-color: black;
		color: white;
		border: none;
	}
`;

export const FacebookButton = styled(BaseButton)`
	background-color: #3b5998;
	color: white;
	border: none;
	&:hover {
		background-color: #2d4373;
		border: none;
	}
`;

export const TwitterButton = styled(BaseButton)`
	background-color: #55acee;
	color: white;
	border: none;
	&:hover {
		background-color: #2795e9;
		border: none;
	}
`;

export const LinkedinButton = styled(BaseButton)`
	background-color: #0077b5;
	color: white;
	border: none;
	&:hover {
		background-color: #0062a3;
		border: none;
	}
`;

export const CreateButton = muiStyled(Button)(({ theme }) => ({
	width: '14em',
	borderRadius: '10px',
	color: theme.palette.getContrastText(purple[500]),
	backgroundColor: purple[500],
	'&:hover': {
		backgroundColor: purple[700],
	},
	'&:focus': {
		boxShadow: 'none',
	},
}));


export const MenuButton = ({ children, fileName, items }) => {
	const [anchorEl, setAnchorEl] = React.useState(null);
	const open = Boolean(anchorEl);
	const handleClick = (event) => {
		setAnchorEl(event.currentTarget);
	};
	const handleClose = (item) => {
		setAnchorEl(null);
		console.log(item.title, fileName);
	};
	return (
		<div>
			<Button
				id='fade-button'
				aria-controls={open ? 'fade-menu' : undefined}
				aria-haspopup='true'
				aria-expanded={open ? 'true' : undefined}
				onClick={handleClick}>
				{children}
			</Button>
			<Menu
				id='fade-menu'
				MenuListProps={{
					'aria-labelledby': 'fade-button',
				}}
				anchorEl={anchorEl}
				open={open}
				onClose={handleClose}
				TransitionComponent={Fade}>
				{items.map((item) => {
					return (
						<MenuItem onClick={() => handleClose(item)}>{item.title}</MenuItem>
					);
				})}
			</Menu>
		</div>
	);
}
