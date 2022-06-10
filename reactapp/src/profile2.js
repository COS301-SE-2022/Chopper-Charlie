import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import LogoutIcon from '@mui/icons-material/Logout';
import HomeIcon from '@mui/icons-material/Home';
import AnalyticsIcon from '@mui/icons-material/Analytics';
import SettingsIcon from '@mui/icons-material/Settings';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Paper from '@mui/material/Paper';
import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';
import ContentCut from '@mui/icons-material/ContentCut';
import ContentCopy from '@mui/icons-material/ContentCopy';
import ContentPaste from '@mui/icons-material/ContentPaste';
import Cloud from '@mui/icons-material/Cloud';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import ListSubheader from '@mui/material/ListSubheader';
import IconButton from '@mui/material/IconButton';
import InfoIcon from '@mui/icons-material/Info';

const drawerWidth = 240;




export default function profile2() {
  return (




    <Box sx={{ display: 'flex' }}>

      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{ width: `calc(100% - ${drawerWidth}px)`, mr: `${drawerWidth}px` }}
      >
        <Toolbar>
          <Typography variant="h6" noWrap component="div">
            Chopper Charlie
          </Typography>
        </Toolbar>
      </AppBar>
      <Box
        component="main"
        sx={{ flexGrow: 1, bgcolor: 'background.default', p: 3 }}
      >
        <Toolbar />


        <Paper sx={{ width: 320, maxWidth: '100%' }}>
      <MenuList>
      <MenuItem>
          <ListItemIcon>
            <ContentCut fontSize="small" />
          </ListItemIcon>
          <ListItemText>Cut</ListItemText>
          <Typography variant="body2" color="text.secondary">
            ⌘X
          </Typography>
        </MenuItem>
        <MenuItem>
          <ListItemIcon>
            <ContentCopy fontSize="small" />
          </ListItemIcon>
          <ListItemText>Copy</ListItemText>
          <Typography variant="body2" color="text.secondary">
            ⌘C
          </Typography>
        </MenuItem>
        <Divider />
        <MenuItem>
          <ListItemIcon>
            <Cloud fontSize="small" />
          </ListItemIcon>
          <ListItemText>Web Clipboard</ListItemText>
        </MenuItem>
      </MenuList>
    </Paper>


    <ImageList sx={{ }}>
      <ImageListItem key="Subheader" cols={3}>
        <ListSubheader component="div">Media</ListSubheader>
      </ImageListItem>

      {itemData.map((item) => (
        <ImageListItem key={item.img}>
        <Card sx={{ maxWidth: 300, minWidth:300 }}>
      <CardMedia
        component="img"
        alt="green iguana"
        height="140"
        image="https://wallpaperaccess.com/full/154009.jpg"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          DRONE-FOOTAGE-1
        </Typography>
        <Typography variant="body2" color="text.secondary">
          2022-05-22
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Watch</Button>
        <Button size="small">Analyse</Button>
      </CardActions>
    </Card>
        </ImageListItem>
      ))}
    </ImageList>

        <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        component="img"
        alt="green iguana"
        height="140"
        image="https://wallpaperaccess.com/full/154009.jpg"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          DRONE-FOOTAGE-1
        </Typography>
        <Typography variant="body2" color="text.secondary">
          2022-05-22
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Watch</Button>
        <Button size="small">Analyse</Button>
      </CardActions>
    </Card>

    <br/>

<Card sx={{ maxWidth: 345 }}>
  <CardMedia
    component="img"
    alt="green iguana"
    height="140"
    image="https://wallpaperaccess.com/full/154009.jpg"
  />
  <CardContent>
    <Typography gutterBottom variant="h5" component="div">
      DRONE-FOOTAGE-2
    </Typography>
    <Typography variant="body2" color="text.secondary">
      2022-05-22
    </Typography>
  </CardContent>
  <CardActions>
    <Button size="small">Watch</Button>
    <Button size="small">Analyse</Button>
  </CardActions>
</Card>


<br/>

<Card sx={{ maxWidth: 345 }}>
  <CardMedia
    component="img"
    alt="green iguana"
    height="140"
    image="https://wallpaperaccess.com/full/154009.jpg"
  />
  <CardContent>
    <Typography gutterBottom variant="h5" component="div">
      DRONE-FOOTAGE-2
    </Typography>
    <Typography variant="body2" color="text.secondary">
      2022-05-22
    </Typography>
  </CardContent>
  <CardActions>
    <Button size="small">Watch</Button>
    <Button size="small">Analyse</Button>
  </CardActions>
</Card>


      </Box>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        variant="permanent"
        anchor="right"
      >
                <Card sx={{ maxWidth: 345 }}>
  <CardMedia
    component="img"
    alt="green iguana"
    height="140"
    image="/logo.png"
  />

</Card>
        <Toolbar />
        <ListItem button>
          <ListItemIcon>
            <AccountCircleIcon />
          </ListItemIcon>
          <ListItemText primary="Profile" />
        </ListItem>
        <Divider />

        <List>
        <ListItem button>
          <ListItemIcon>
            <HomeIcon />
          </ListItemIcon>
          <ListItemText primary="Home" />
        </ListItem>

        <ListItem button>
          <ListItemIcon>
            <AnalyticsIcon />
          </ListItemIcon>
          <ListItemText primary="Analytics" />
        </ListItem>

        <ListItem button>
          <ListItemIcon>
            <SettingsIcon />
          </ListItemIcon>
          <ListItemText primary="Settings" />
        </ListItem>

        </List>

        <Divider />
        <List>
        <ListItem button>
          <ListItemIcon>
            <LogoutIcon />
          </ListItemIcon>
          <ListItemText primary="Logout" />
        </ListItem>
        </List>

  <Card sx={{ maxWidth: 345 }}>
  <CardMedia
    component="img"
    alt="green iguana"
    height="140"
    image="https://zenprospect-production.s3.amazonaws.com/uploads/pictures/61f39f34a1bdb10001658261/picture"
  />
  </Card>

      </Drawer>
    </Box>
  );
}


const itemData = [
  {
    img: 'https://images.unsplash.com/photo-1551963831-b3b1ca40c98e',
    title: 'Breakfast',
    author: '@bkristastucchio',
    rows: 2,
    cols: 2,
    featured: true,
  },
  {
    img: 'https://images.unsplash.com/photo-1551782450-a2132b4ba21d',
    title: 'Burger',
    author: '@rollelflex_graphy726',
  },
  {
    img: 'https://images.unsplash.com/photo-1522770179533-24471fcdba45',
    title: 'Camera',
    author: '@helloimnik',
  },
  {
    img: 'https://images.unsplash.com/photo-1444418776041-9c7e33cc5a9c',
    title: 'Coffee',
    author: '@nolanissac',
    cols: 2,
  },
  {
    img: 'https://images.unsplash.com/photo-1533827432537-70133748f5c8',
    title: 'Hats',
    author: '@hjrc33',
    cols: 2,
  },
  {
    img: 'https://images.unsplash.com/photo-1558642452-9d2a7deb7f62',
    title: 'Honey',
    author: '@arwinneil',
    rows: 2,
    cols: 2,
    featured: true,
  },
  {
    img: 'https://images.unsplash.com/photo-1516802273409-68526ee1bdd6',
    title: 'Basketball',
    author: '@tjdragotta',
  },
  {
    img: 'https://images.unsplash.com/photo-1518756131217-31eb79b20e8f',
    title: 'Fern',
    author: '@katie_wasserman',
  },
  {
    img: 'https://images.unsplash.com/photo-1597645587822-e99fa5d45d25',
    title: 'Mushrooms',
    author: '@silverdalex',
    rows: 2,
    cols: 2,
  },
  {
    img: 'https://images.unsplash.com/photo-1567306301408-9b74779a11af',
    title: 'Tomato basil',
    author: '@shelleypauls',
  },
  {
    img: 'https://images.unsplash.com/photo-1471357674240-e1a485acb3e1',
    title: 'Sea star',
    author: '@peterlaster',
  },
  {
    img: 'https://images.unsplash.com/photo-1589118949245-7d38baf380d6',
    title: 'Bike',
    author: '@southside_customs',
    cols: 2,
  },
];