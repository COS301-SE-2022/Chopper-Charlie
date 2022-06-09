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
