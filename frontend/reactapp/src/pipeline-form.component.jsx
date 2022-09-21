import React from 'react';
import Stack from '@mui/material/Stack';
import AddIcon from '@mui/icons-material/Add';
import TextField from '@mui/material/TextField';
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';
import Divider from '@mui/material/Divider';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import { addItemToPipelines } from './store/pipelines/pipelines.action';
import { useState } from 'react';
import { selectCurrentUser } from './store/user/user.selector';
import { useDispatch, useSelector } from 'react-redux';
import { selectPipelines } from './store/pipelines/pipelines.selector';
import { CreateButton } from './buttons.component'; 
import './pipeline-form.styles.css';

// const CreateButton = styled(Button)(({ theme }) => ({ lol
// 	width: '14em',
// 	borderRadius: '10px',
// 	color: theme.palette.getContrastText(purple[500]),
// 	backgroundColor: purple[500],
// 	'&:hover': {
// 		backgroundColor: purple[700],
// 	},
// 	'&:focus': {
// 		boxShadow: 'none',
// 	},
// }));

const defaultFormFields = {
	title: '',
	vehicle: 'car',
	outline: false,
	count: false,
};

const PipelineForm = () => {
	const dispatch = useDispatch();

	const currentUser = useSelector(selectCurrentUser);
	const pipelines = useSelector(selectPipelines);

	const [formFields, setFormFields] = useState(defaultFormFields);
	const { title, vehicle, outline, count } = formFields;

	const resetFormFields = () => {
		setFormFields(defaultFormFields);
	};

	const handleChange = (event) => {
		const { name, value } = event.target;
		setFormFields({ ...formFields, [name]: value });
	};

	const handleCheck = (event) => {
		const { name } = event.target;
		setFormFields({ ...formFields, [name]: event.target.checked });
	};

	const handleSubmit = async (event) => {

		event.preventDefault();
console.log("this is the curr user fro pipelines", currentUser);
		try {
			let val = true;
			for (var pipeline of Object.keys(pipelines)) {
				if (pipeline.title === title) {
					val = false;
					return;
				}
			}

			if (val) {
				const pipelineToAdd = {
					title: title,
					classes: vehicle,
					outline: outline,
					count: count,
				};
				dispatch(addItemToPipelines(pipelines, pipelineToAdd, currentUser));
				resetFormFields();
			} else {
				throw new Error('Name already exists');
			}
		} catch (error) {
			console.log('Error adding pipeline', error);
		}
	};

	return (
		<form onSubmit={handleSubmit} className="pipe-form">
			
			<Stack
				spacing={1}
				direction='row'
				divider={
					<Divider
						orientation='vertical'
						flexItem
						sx={{
							borderColor: 'rgba(43, 40, 95, 0.8)',
						}}
					/>
				}
				
				sx={{
					height: '2.5em',
					width: '90%',
					backgroundColor: '#1a1a1a',
					// backgroundColor: 'black',
					padding: '1em',
					borderRadius: '10px',
					
				}}>
				<TextField
					name='title'
					hiddenLabel
					required
					onChange={handleChange}
					value={title}
					id='filled-hidden-label-small'
					variant='filled'
					size='small'
					placeholder='Pipeline Name'
					sx={{
						width: '15em',
						backgroundColor: '#rgba(47, 62, 83, 0.36)',
						input: {
							color: '#fff',
							'&::placeholder': {
								color: '#fff',
							},
						},
					}}
				/>

				<FormControl sx={{ m: 1, minWidth: 120 }}>
					<Select
						name='vehicle'
						value={vehicle}
						onChange={handleChange}
						displayEmpty
						inputProps={{ 'aria-label': 'Without label' }}
						sx={{
							height: '2.5em',
							color: '#fff',
							backgroundColor: '#rgba(47, 62, 83, 0.36)',
							'&:before': {
								borderColor: '#fff',
							},
							'&:after': {
								borderColor: '#fff',
							},
						}}>
						<MenuItem value=''>
							<em>Select Class</em>
						</MenuItem>
						<MenuItem value='car'>Cars</MenuItem>
						<MenuItem value='bus'>Buses</MenuItem>
						<MenuItem value='truck'>Trucks</MenuItem>
					</Select>
				</FormControl>

				<FormControlLabel
					value='start'
					control={
						<Switch
							color='primary'
							checked={outline}
							onChange={handleCheck}
							name='outline'
						/>
					}
					label='Outline'
					labelPlacement='start'
				/>

				<FormControlLabel
					value='start'
					control={
						<Switch
							color='primary'
							checked={count}
							onChange={handleCheck}
							name='count'
						/>
					}
					label='Count'
					labelPlacement='start'
				/>

				<CreateButton variant='contained' startIcon={<AddIcon />} type='submit'>
					create pipeline
				</CreateButton>
			</Stack>
		</form>
	);
};

export default PipelineForm;

// BootstrapButton
// const BootstrapButton = styled(Button)({
// 	boxShadow: 'none',
// 	textTransform: 'none',
// 	fontSize: 16,
// 	padding: '6px 12px',
// 	border: '1px solid',
// 	lineHeight: 1.5,
// 	backgroundColor: '#0063cc',
// 	borderColor: '#0063cc',
// 	fontFamily: [
// 		'-apple-system',
// 		'BlinkMacSystemFont',
// 		'"Segoe UI"',
// 		'Roboto',
// 		'"Helvetica Neue"',
// 		'Arial',
// 		'sans-serif',
// 		'"Apple Color Emoji"',
// 		'"Segoe UI Emoji"',
// 		'"Segoe UI Symbol"',
// 	].join(','),
// 	'&:hover': {
// 		backgroundColor: '#0069d9',
// 		borderColor: '#0062cc',
// 		boxShadow: 'none',
// 	},
// 	'&:active': {
// 		boxShadow: 'none',
// 		backgroundColor: '#0062cc',
// 		borderColor: '#005cbf',
// 	},
// 	'&:focus': {
// 		boxShadow: '0 0 0 0.2rem rgba(0,123,255,.5)',
// 	},
// });
