import React from 'react';
import Box from '@mui/material/Box';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import FavoriteIcon from '@mui/icons-material/Favorite';
import DeleteIcon from '@mui/icons-material/Delete';
import NavigationIcon from '@mui/icons-material/Navigation';
import DownloadIcon from '@mui/icons-material/Download';
import DataUsageIcon from '@mui/icons-material/DataUsage';
import Stack from '@mui/material/Stack';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import { CardActionArea, CardActions } from '@mui/material';
import Button, { BUTTON_TYPE_CLASSES } from '../button/button.component';
import {
	AnalyseButton,
	DeleteButton,
	DownloadButton,
} from '../button/button.styles';

const MediaCard = () => {
	return (
		<Card
			sx={{
				maxWidth: 340,
				backgroundColor: 'rgba(0, 31, 45, 1)',
				color: 'white',
				borderRadius: 3,
				paddingBottom: '6px',
				justifyContent: 'space-between',
				alignItems: 'space-between',
			}}>
			<CardActionArea>
				<CardMedia
					component='img'
					height='180'
					image='https://routespartnership.org/industry-resources/images-video-library/free-use-wildlife-images/reptiles/lizard-731336_1920.jpg/@@images/0076275f-747b-438f-8d54-76fe474b12ff.jpeg'
					alt='green iguana'
				/>
				<CardContent
					sx={{
						margin: 0,
					}}>
					<Typography
						gutterBottom
						variant='h5'
						component='div'
						sx={{
							textAlign: 'start',
						}}>
						Lizard
					</Typography>
					<Stack
						direction='row'
						spacing={1}
						sx={{ justifyContent: 'space-between', margin: 0 }}>
						<Typography
							variant='body2'
							color='white'
							sx={{
								margin: 0,
							}}>
							2022-10-10
						</Typography>
						<Typography
							variant='body2'
							color='white'
							sx={{
								margin: 0,
							}}>
							340
						</Typography>
					</Stack>
				</CardContent>
			</CardActionArea>
			<hr />
			<CardActions
				sx={{
					alignItems: 'center',
					justifyContent: 'center',
					float: 'bottom',
				}}>
				<Stack direction='row' spacing={1} sx={{}}>
					<DeleteButton />
					<AnalyseButton />
					<DownloadButton />
				</Stack>
			</CardActions>
		</Card>
	);
};

export default MediaCard;
