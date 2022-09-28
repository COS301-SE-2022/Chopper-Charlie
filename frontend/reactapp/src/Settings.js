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
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import { purple } from '@mui/material/colors';
import Switch from '@mui/material/Switch';
import { alpha, styled } from '@mui/material/styles';
import TuneIcon from '@mui/icons-material/Tune';
import AssessmentIcon from '@mui/icons-material/Assessment';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import React, { useState } from 'react';
import SideBar from './components/sidebar/sidebar.component';


//change
function Profile() {


  const [color, changeColor] = useState('#242424');

	document.body.style.backgroundColor = color;
  
  const {currentUser} = useAuthValue()

  const SendEmail= e => {
    sendPasswordResetEmail(auth, currentUser?.email)
    .then(() => {
      alert("A link has been sent to your email, Please use the link to change your password. ")
    })
  }

 




  return (
   
      <div className='center'>

<div id="HomeContent">
        
<h2 id='settingsHeading'>Settings</h2>
     
         
      
        <div id='settings'>
            
        <AccountCircleRoundedIcon sx={{ fontSize: 70 ,padding:2}}/><br></br><br></br>
        <p1><strong> </strong>{currentUser?.email}</p1><br></br><br></br>
        <button id="changepass" type='button'  onClick={SendEmail}>Change password</button> <br></br>
       
        </div>

        


        
         
      </div>
     

         
     <SideBar/>





      </div>
      



     
  )
}

export default Profile