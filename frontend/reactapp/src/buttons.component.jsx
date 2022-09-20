import { styled } from '@mui/material/styles';
import { purple } from '@mui/material/colors';
import Button from '@mui/material/Button';

export const CreateButton = styled(Button)(({ theme }) => ({
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
