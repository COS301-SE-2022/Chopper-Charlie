import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectPipelines } from './store/pipelines/pipelines.selector';

import Chip from '@mui/material/Chip';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import Stack from '@mui/material/Stack';
import { selectCurrentUser } from './store/user/user.selector';
import { removeItemFromPipelines } from './store/pipelines/pipelines.action';
import './pipeline-item.styles.css';

const PipelineItem = ({ pipelineItem }) => {
	const currentUser = useSelector(selectCurrentUser);
	const dispatch = useDispatch();
	const pipelines = useSelector(selectPipelines);
	const remover = () => {

		if (window.confirm("Are you sure you want to delete this pipeline?") === true) {
			dispatch(removeItemFromPipelines(pipelines, pipelineItem, currentUser));
		}
	};


	return (
		<Stack
			spacing={2}
			direction='row'
			justifyContent='space-between'
			sx={{
				margin: '1em',
				marginLeft:"5.15%",
				width: '65%',
				border: '1px solid transparent',
				position: 'relative',
				backgroundClip: 'padding-box',
				backgroundColor: '#1a1a1a',
				padding: '0.5em',
				paddingRight: '0.15em',
				paddingLeft: '1.5em',
				borderRadius: '35px',
				height: '3em',
				alignItems: 'center',
				textTransform: 'capitalize',
				// justifyContent='space-between',
				'&:after': {
					position: 'absolute',
					top: -2,
					left: -2,
					right: -2,
					bottom: -2,
					// background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
					background: 'linear-gradient(45deg, #C738E7 30%, #27CAF6 90%)',
					content: '""',
					zIndex: -1,
					borderRadius: '35px',
				},
			}}>
			<div className='title-div'>
				<h3 className='pipe-title'>{pipelineItem.title}</h3>
			</div>

			<Stack direction='row' spacing={1}>
				{/* Chip displaying the Vehicle */}
				<Chip
					label={pipelineItem.classes}
					color='primary'
					sx={{
						width: '6em',
						// backgroundColor: 'white',
						textTransform: 'capitalize'
						///added by mumi
					}}
				/>

				{pipelineItem.outline ? (
					<Chip
						label='Outline'
						sx={{
							width: '6em',
							backgroundColor: 'white',
						}}
					/>
				) : (
					<Chip
						label='Outline'
						variant='outlined'
						sx={{
							width: '6em',
							color: '#fff',
							textDecoration: 'line-through',
						}}
					/>
				)}

				{pipelineItem.count ? (
					<Chip
						label='Count'
						sx={{
							width: '6em',
							backgroundColor: 'white',
						}}
					/>
				) : (
					<Chip
						label='Count'
						variant='outlined'
						sx={{
							width: '6em',
							color: '#fff',
							textDecoration: 'line-through',
						}}
					/>
				)}

				{/* <Chip
					label='Outline'
					sx={{
						width: '6em',
						backgroundColor: 'white',
					}}
				/>
				<Chip
					label='Count'
					variant='outlined'
					sx={{
						color: '#fff',
						width: '6em',
					}}
				/> */}
			</Stack>

			<IconButton
				aria-label='delete'
				size='large'
				sx={{
					'&:hover': {
						// backgroundColor: 'rgba(39,202,246, 0.75)',
						// backgroundColor: 'rgba(39,202,246, 0.1)',
					},
				}}
				onClick={remover}>
				<DeleteIcon   fontSize='inherit' sx={{ fontSize: 35, color: 'white' }} />
			</IconButton>
		</Stack>
	);
};

export default PipelineItem;
