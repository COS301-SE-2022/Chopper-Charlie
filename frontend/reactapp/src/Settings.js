import './profile.css'
import {useAuthValue} from './AuthContext'
import { signOut,sendPasswordResetEmail } from 'firebase/auth' 
import { auth } from './firebase'
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import SettingsRoundedIcon from '@mui/icons-material/SettingsRounded';
import AnalyticsRoundedIcon from '@mui/icons-material/AnalyticsRounded';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';
import CloudUploadRoundedIcon from '@mui/icons-material/CloudUploadRounded';
import DeleteIcon from '@mui/icons-material/Delete';
import CloudDownloadRoundedIcon from '@mui/icons-material/CloudDownloadRounded';
import PlayCircleRoundedIcon from '@mui/icons-material/PlayCircleRounded';
import AnalyticsIcon from '@mui/icons-material/Analytics';
import { Alert, Hidden } from '@mui/material';
import { padding } from '@mui/system';

import { purple } from '@mui/material/colors';
import Switch from '@mui/material/Switch';
import { alpha, styled } from '@mui/material/styles';




//change
function Profile() {
  
  const {currentUser} = useAuthValue()

  const SendEmail= e => {
    sendPasswordResetEmail(auth, currentUser?.email)
    .then(() => {
      alert("An email has been sent to, Change your password with link")
    })
  }

  const GreenSwitch = styled(Switch)(({ theme }) => ({
    '& .MuiSwitch-switchBase.Mui-checked': {
      color: purple[200],
      '&:hover': {
        backgroundColor: alpha(purple[200], theme.palette.action.hoverOpacity),
      },
    },
    '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
      backgroundColor: purple[200],
    },
  }));
  
  const label = { inputProps: { 'aria-label': 'Switch demo' } };




  return (
   
      <div className='center'>

     <div className='Content'>
        
        
        <div className='set'>
        <h1>Settings </h1>
        <div id='settings'>
            
        <AccountCircleRoundedIcon sx={{ fontSize: 70 ,padding:5}}/>
        <p1><strong> </strong>{currentUser?.email}</p1>
         <br></br>
        <button id="changepass" type='button'  onClick={SendEmail}>Change password</button> <br></br>
        <br></br>
        <p4>Push notifications </p4>  <Switch {...label} defaultChecked color="secondary" />



        </div>

         </div>


        
         
      </div>
     

         
        <div className='profile'>

        <img src={require('./logo.png')} width="60%" height="13%" alt="Logo"/>
               
          <h1>    </h1>
          
          <br/><br/>
          <AccountCircleRoundedIcon sx={{ fontSize: 45 }}/>
          {/* <img id='pp'  src={require('./j.png')} width="27%" height="12%" alt="profile"/> */}
          <br/>
          <p1><strong> </strong>{currentUser?.email}</p1>
          <br/>
          <hr/>
          <br/>
          {/* <p1>
            <strong>Email verified: </strong>
            {`${currentUser?.emailVerified}`}
          </p1> */}
          <div>
          <a id='pagelinks' href="\"><button type='button' id='home'><HomeRoundedIcon id='icon'/><p3>Home</p3></button></a>
           
           <a id='pagelinks' href="/analytics"><button type='button' id='home'><AnalyticsRoundedIcon id='icon'/><p3>Analytics</p3></button></a>
           <a id='pagelinks' href="/settings"><button type='button' id='home'><SettingsRoundedIcon id='icon'/><p3>Settings</p3></button></a>
           </div>
           
           <br/>
          <hr/>


          
          
          <a href = "/login"><button type = "button" className='logout' onClick={() => signOut(auth)}  ><LogoutRoundedIcon/  >Logout</button></a>
         
          
        <div className='sub_div'> <img id='ABlogo'  src={require('./AB.png')} width="50%" height="50%" alt="Logo"/></div> 

        </div>






      </div>
      



     
  )
}

export default Profile