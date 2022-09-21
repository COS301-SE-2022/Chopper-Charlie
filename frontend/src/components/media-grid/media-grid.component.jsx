import React from 'react'
import Grid from '@mui/material/Grid';
import MediaCard from '../media-card/media-card.component';

const MediaGrid = ({files}) => {
  return (
    <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
        {files?.map((file) => (
          <Grid item xs={2} sm={4} md={4} key={file.name}>
            <MediaCard file={file} />
          </Grid>
        ))}
      </Grid>
  )
}

export default MediaGrid