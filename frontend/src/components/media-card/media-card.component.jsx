import React from 'react';
import Stack from '@mui/material/Stack';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import { CardActionArea, CardActions } from '@mui/material';
import {
	AnalyseButton,
	DeleteButton,
	DownloadButton,
} from '../button/button.styles';


const MediaCard = ({file}) => {
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
					image={file.url}
					alt='green iguana'
				/>
				<CardContent
					sx={{
						margin: 0,
					}}>
					<Typography
						gutterBottom
						variant='h6'
						component='div'
            noWrap={true}
						sx={{
							textAlign: 'start',
              flexShrink: 0

						}}>
						{file.name}
					</Typography>
					<Stack
						direction='row'
						spacing={1}
						sx={{
							justifyContent: 'space-between',
							margin: 0,
							alignItems: 'center',
              backgroundColor: 'red',
              padding: 0,
              height: '0px',
						}}>
						{/* <p>22-05-2021</p>
						<p>22-05-2021</p> */}
						<Typography
							variant='body2'
							color='white'
							sx={{
								margin: 0,
							}}>
							{file.date}
						</Typography>
						<Typography
							variant='body2'
							color='white'
							sx={{
								margin: 0,
							}}>
							{`${file.size} MB`}
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
				<Stack direction='row' spacing={1} sx={{
          zIndex: 1,
        }}>
					<DeleteButton />
					<AnalyseButton />
					<DownloadButton />
				</Stack>
			</CardActions>
		</Card>
	);
};

export default MediaCard;
