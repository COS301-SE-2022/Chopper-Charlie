import React from 'react';
import Stack from '@mui/material/Stack';
import AddIcon from '@mui/icons-material/Add';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
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

import './pipeline-form.styles.css';

import styled from 'styled-components';
import { styled as muiStyled } from '@mui/material/styles';
import { purple } from '@mui/material/colors';
// import Button from '@mui/material/Button';
import Button, { BUTTON_TYPE_CLASSES } from './button.component';

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

	const defaultProps = {
		options: objectTypes,
		getOptionLabel: (option) => option.title,
	};

	const [type, setType] = useState('');

	const resetFormFields = () => {
		setFormFields(defaultFormFields);
		setType('');
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
					classes: type,
					// classes: vehicle,
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
		<form onSubmit={handleSubmit} className='pipe-form'>
			<Stack
				spacing={2}
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
				justifyContent='space-between'
				sx={{
					height: '2.5em',
					width: '70%',
					backgroundColor: '#1a1a1a',
					// backgroundColor: 'black',
					padding: '1em',
					borderRadius: '10px',
					marginLeft: '3%',
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

				{/* <FormControl sx={{ m: 1, minWidth: 120 }}>
          <Select
            name="vehicle"
            value={vehicle}
            onChange={handleChange}
            displayEmpty
            inputProps={{ "aria-label": "Without label" }}
            sx={{
              height: "2.5em",
              color: "#fff",
              backgroundColor: "#rgba(47, 62, 83, 0.36)",
              "&:before": {
                borderColor: "#fff",
              },
              "&:after": {
                borderColor: "#fff",
              },
            }}
          >
            <MenuItem value="">
              <em>Select Class</em>
            </MenuItem>
            <MenuItem value="car">Cars</MenuItem>
            <MenuItem value="bus">Buses</MenuItem>
            <MenuItem value="truck">Trucks</MenuItem>
            <MenuItem value="motorbike">Motorbike</MenuItem>
            <MenuItem value="person">Person</MenuItem>
            <MenuItem value="train">Train</MenuItem>
            <MenuItem value="boat">Boat</MenuItem>
            <MenuItem value="aeroplane">Aeroplane</MenuItem>
            <MenuItem value="bird">Bird</MenuItem>
            <MenuItem value="horse">Horse</MenuItem>
            <MenuItem value="sheep">Sheep</MenuItem>
            <MenuItem value="cow">Cow</MenuItem>
            <MenuItem value="elephant">Elephant</MenuItem>
            <MenuItem value="zebra">Zebra</MenuItem>
            <MenuItem value="giraffe">Giraffe</MenuItem>
          </Select>
        </FormControl> */}

				<Stack sx={{ width: 250, height: '2.5em', padding: -2 }}>
					<Autocomplete
						{...defaultProps}
						id='clear-on-escape'
						clearOnEscape
						onChange={(event, newValue) => {
							setType(newValue?.obj);
						}}
						sx={{
							'& label': {
								color: 'rgba(255, 255, 255, 0.6)',
								paddingBottom: 5,
							},
							backgroundColor: '#rgba(47, 62, 83, 0.36)',
							marginBottom: '10px',
						}}
						renderInput={(params) => (
							<TextField
								hiddenLabel
								required
								{...params}
								id='filled-hidden-label-small'
								variant='filled'
								size='small'
								placeholder='Choose Object'
								sx={{
									width: '15em',
									height: '2.5em',
									backgroundColor: '#rgba(47, 62, 83, 0.36)',
									input: {
										color: '#fff',
										'&::placeholder': {
											color: '#fff',
										},
									},
								}}
							/>
						)}
					/>
				</Stack>

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
				<Button
					variant='contained'
					startIcon={<AddIcon />}
					type='submit'
					buttonType={BUTTON_TYPE_CLASSES.create}>
					create pipeline
				</Button>
				{/* <CreateButton variant='contained' startIcon={<AddIcon />} type='submit'>
					create pipeline
				</CreateButton> */}
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

// Object classes that can be identified by the model
const objectTypes = [
	{ title: 'Cars', obj: 'car' },
	{ title: 'Buses', obj: 'bus' },
	{ title: 'Trucks', obj: 'truck' },
	{ title: 'Motorbikes', obj: 'motorbike' },
	{ title: 'Trains', obj: 'train' },
	{ title: 'Boats', obj: 'boat' },
	{ title: 'Aeroplanes', obj: 'aeroplane' },
	{ title: 'People', obj: 'person' },
	{ title: 'Birds', obj: 'bird' },
	{ title: 'Horses', obj: 'horse' },
	{ title: 'Sheep', obj: 'sheep' },
	{ title: 'Cows', obj: 'cow' },
	{ title: 'Elephants', obj: 'elephant' },
	{ title: 'Zebras', obj: 'zebra' },
	{ title: 'Giraffes', obj: 'giraffe' },
];
