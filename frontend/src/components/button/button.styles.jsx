import React from 'react';
import styled from 'styled-components';
import { styled as muiStyled } from '@mui/material/styles';
import { purple } from '@mui/material/colors';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Fade from '@mui/material/Fade';

import Fab from '@mui/material/Fab';
import DeleteIcon from '@mui/icons-material/Delete';
import DownloadIcon from '@mui/icons-material/Download';
import DataUsageIcon from '@mui/icons-material/DataUsage';
import Typography from '@mui/material/Typography';




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
};

export const ActionButton = ({ children, colour, icon }) => {
	return (
		<Fab
			variant='extended'
			sx={{
				width: '7em',
				height: '7em',
				display: 'flex',
				flexDirection: 'column',
				alignItems: 'center',
				justifyContent: 'space-between',
				padding: '1.5em',
				backgroundColor: colour,
				borderRadius: 2,
				color: 'white',
			}}>
			{icon}

			<Typography
				variant='body2'
				color='white'
				sx={{
					marginTop: 1,
				}}>
				{children}
			</Typography>
		</Fab>
	);
};

export const DeleteButton = ({ children }) => {
	return (
		<ActionButton
			colour='rgba(255, 66, 66, 1)'
			icon={
				<DeleteIcon
					sx={{
						fontSize: 30,
					}}
				/>
			}>
			Delete
		</ActionButton>
	);
};

export const DownloadButton = () => {
	return (
		<ActionButton
			colour='rgba(255, 125, 66, 1)'
			icon={
				<DownloadIcon
					sx={{
						fontSize: 30,
					}}
				/>
			}>
			Download
		</ActionButton>
	);
};

export const AnalyseButton = () => {
	return (
		<ActionButton
			colour='rgba(66, 192, 255, 1)'
			icon={
				<DataUsageIcon
					sx={{
						fontSize: 30,
					}}
				/>
			}>
			Analyse
		</ActionButton>
	);
};
