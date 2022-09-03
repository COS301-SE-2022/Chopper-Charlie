import './profile.css'
import {useAuthValue} from './AuthContext'
import { signOut } from 'firebase/auth' 
import { auth } from './firebase'
import React, { useState } from "react";
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import SettingsRoundedIcon from '@mui/icons-material/SettingsRounded';
import AnalyticsRoundedIcon from '@mui/icons-material/AnalyticsRounded';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import CloudUploadRoundedIcon from '@mui/icons-material/CloudUploadRounded';
import DeleteIcon from '@mui/icons-material/Delete';
import CloudDownloadRoundedIcon from '@mui/icons-material/CloudDownloadRounded';
import PlayCircleRoundedIcon from '@mui/icons-material/PlayCircleRounded';
import AnalyticsIcon from '@mui/icons-material/Analytics';





//change
function Profile() {
    const {currentUser} = useAuthValue()
	// object for storing and using data
	const [data, setdata] = useState({
		
	});

	let str = currentUser?.email;

	function replace (){
		var string = "";
		var chart = "";
		for(let i=0; i < str.length; i++){  //fixed spelling from 'str.lenght'
			if (str.charAt(i) === "@"||str.charAt(i) === "." ) {
				chart = "";
				string = string + chart;
			}
			else {
				chart = str.charAt(i);
				string = string + chart;
			}
		}
		console.log(string);
		return string
		
	}
	

	// Using useEffect for single rendering
	
		// Using fetch to fetch the api from
		// flask server it will be redirected to proxy
		
		fetch("/mydatapage/"+currentUser?.email).then((res) =>
			res.json().then((data) => {
				// Setting a data from api
				setdata(data);
                console.log(data);

			})
		);
		
		
	

	function genData(str){
		fetch("/db/"+str+"/"+currentUser?.email)
		}


	return (






        
		
	
   
      <div className='center'>
    <h1>Media</h1>





     <div className='Content'>
       
      </div>

         
        <div className='profile'>

        <img src={require('./logo.png')} width="80%" height="20%" alt="Logo"/>
               
          <h1>    </h1>
          
          
          <AccountCircleRoundedIcon sx={{ fontSize: 45 }}/>
          
          <br/>
          <p1 id="user-id"><strong> </strong>{currentUser?.email}</p1>
          <br/>
          <hr/>
          <br/>
        
          <div>
           <button type='button' id='home'><HomeRoundedIcon id='icon'/><p3>Home</p3></button>
           
           <a id='pagelinks' href="/analytics"><button type='button' id='home'><FiberManualRecordIcon id='icon'/><p3>Pipelines</p3></button></a>
           <a id='pagelinks' href="/settings"><button type='button' id='home'><SettingsRoundedIcon id='icon'/><p3>Settings</p3></button></a>
           
           </div>
           
           <br/>
          <hr/>


                    
          <a href="/login" ><button type='button' id='homelogout'  onClick={() => signOut(auth)}   ><LogoutRoundedIcon id='iconlo'/><p3>Logout</p3></button></a>
         
          
        <div className='sub_div'> <img id='ABlogo'  src={require('./AB.png')} width="35%" height="40%" alt="Logo"/></div> 

        </div>






      </div>
      



     
  )
}

export default Profile