import './profile.css'
import {useAuthValue} from './AuthContext'
import { signOut } from 'firebase/auth' 
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





//change
function Profile() {
  
  const {currentUser} = useAuthValue()

  return (
   
      <div className='center'>

     <div className='Content'>
        {/* <div className='Lv'>
        <img src={require('./play.png')} width="30%" height="40%" alt="Logo"/>
        <h4>Watch Live Stream</h4>
        </div> */}
        
        <div className='Vd'>
        <h1>Media </h1>
        <center><a  href="/upload"><div className='Vid'><div className='tx'><p2><CloudUploadRoundedIcon sx={{ fontSize: 50 }}/><br/>Upload</p2></div></div></a></center>  
        <center><a  href="/delete"><div className='Vid'><div className='tx'><p2><DeleteIcon sx={{ fontSize: 50 }}/><br/>Delete</p2></div></div></a></center> 
        <center> <a  href="/download"><div className='Vid'><div className='tx'><p2><CloudDownloadRoundedIcon sx={{ fontSize: 50 }}/><br/>Download</p2></div></div></a></center>
        <center><a  href="/analyse"><div className='Vid'><div className='tx'><p2><AnalyticsIcon sx={{ fontSize: 50 }}/><br/>Analyse Image</p2></div></div></a></center>    
        <center><a  href="/analysevideo"><div className='Vid'><div className='tx'><p2><AnalyticsIcon sx={{ fontSize: 50 }}/><br/>Analyse <br></br>Video</p2></div></div></a></center>    

         </div>
          {/* <div className='Vid'></div><div className='Vid'></div>
        </div>
        <div className='imga'>
        <h2>Images</h2>
        <div className='theImage'></div>
        </div> */}
      </div>

         
        <div className='profile'>

        <img src={require('./logo.png')} width="235px" height="115px" alt="Logo"/>
               
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
           <button type='button' id='home'><HomeRoundedIcon id='icon'/><p3>Home</p3></button>
           
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