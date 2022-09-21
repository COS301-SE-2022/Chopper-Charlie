import React from 'react';
import Grid from '@mui/material/Grid';
import MediaCard from '../media-card/media-card.component';
import { deleteFile } from '../../utils/azure/azure.utils';

const MediaGrid = ({ files, handleDelete, handleAnalyse }) => {
	return (
		<Grid
			container
			// spacing={{ xs: 1, md: 4 }}
			justifyContent='start'
			columns={{ xs: 4, sm: 8, md: 12 }}
			rowSpacing={{ xs: 1, md: 3 }}
			columnSpacing={{ xs: 1, md: -20 }}>
			{files?.map((file) => (
				<Grid item xs={4} sm={4} md={4} key={file.name}>
					<MediaCard
						file={file}
						handleDelete={handleDelete}
						handleAnalyse={handleAnalyse}
					/>
				</Grid>
			))}
		</Grid>
	);
};

export default MediaGrid;
