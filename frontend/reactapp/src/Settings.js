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


//change
function Profile() {


  const [color, changeColor] = useState('#242424');

	document.body.style.backgroundColor = color;
  
  const {currentUser} = useAuthValue()

  const SendEmail= e => {
    sendPasswordResetEmail(auth, currentUser?.email)
    .then(() => {
      alert("An email has been sent to, Change your password with link")
    })
  }

 




  return (
   
      <div className='center'>

<div id="HomeContent">
        
<h2 id='settingsHeading'>Settings</h2>
     
         
      
        <div id='settings'>
            
        <AccountCircleRoundedIcon sx={{ fontSize: 70 ,padding:2}}/>
        <p1><strong> </strong>{currentUser?.email}</p1><br></br>
        <button id="changepass" type='button'  onClick={SendEmail}>Change password</button> <br></br>
       
        </div>

        


        
         
      </div>
     

         
      <div className='profile'>
				<img src={require('./logo.png')} width='70%' height='15%' alt='Logo' />

				<br />
				<br />
				<AccountCircleRoundedIcon sx={{ fontSize: 35 }} />

				<br />
				<h4 id='user-id'>
					<strong> </strong>
					{currentUser?.email}
				</h4>

				{/* <hr /> */}

				<div><a id='pagelinks' href='/home'>
					<button type='button' id='home'>
						<HomeRoundedIcon id='icon' />
						<p>Home</p>
					</button></a>

					<a id='pagelinks' href='/pipeline'>
						<button type='button' id='home'>
							<TuneIcon id='icon' />
							<p>Pipelines</p>
						</button>
					</a>
					<a id='pagelinks' href='/results'>
						<button type='button' id='home'>
							<AssessmentIcon id='icon' />
							<p>Results</p>
						</button>
					</a>
					<a id='pagelinks' href='/settings'>
						<button type='button' id='home'>
							<SettingsRoundedIcon id='icon' />
							<p>Settings</p>
						</button>
					</a>

					<a id='pagelinks' href='/admin'>
						<button type='button' id='home'>
							<AdminPanelSettingsIcon id='icon' />
							<p>Admin</p>
						</button>
					</a>
				</div>
				<br />
				{/* <hr /> */}

				<br />

				<a href='/login'>
					<button type='button' id='homelogout' onClick={() => signOut(auth)}>
						<LogoutRoundedIcon id='iconlo' />
						<p>Logout</p>
					</button>
				</a>

				<div className='sub_div'>
					{' '}
					<img
						id='ABlogo'
						src={require('./AB.png')}
						width='35%'
						height='40%'
						alt='Logo'
					/>
				</div>
			</div>





      </div>
      



     
  )
}

export default Profile