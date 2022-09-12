import './profile.css'
import {useAuthValue} from './AuthContext'
import { signOut } from 'firebase/auth' 
import { auth } from './firebase'
import React, { useState } from "react";
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import SettingsRoundedIcon from '@mui/icons-material/SettingsRounded';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import DeleteIcon from '@mui/icons-material/Delete';
import CloudDownloadRoundedIcon from '@mui/icons-material/CloudDownloadRounded';
import AnalyticsIcon from '@mui/icons-material/Analytics';
import SearchIcon from '@mui/icons-material/Search';






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
		
		
	

	 function delData(str){

		
		if (window.confirm("Are you sure you want to delete media?") === true) {
			fetch("/db/"+str+"/"+currentUser?.email);
		} 
	 	
	 	}


		 function downData(str){
			fetch("/lol/"+str+"/"+currentUser?.email)
			
	
			}

	
			function upData(){
				fetch("/ub/"+currentUser?.email)
		
				
				}






	return (


		<div >    

		<div id="Searchbar">
			<input id='searchhh'></input><button id='searchbuttonn' ><SearchIcon sx={{ fontSize: 12 }}/></button>
			<button id='uploadButton' onClick={()=>upData()}   >Upload</button>
		 </div>

		 {(typeof data.mydata === 'undefined')?(
			<div class="lds-ring"><div></div><div></div><div></div><div></div></div>



		 ) : (
			 data.mydata.map((thedata, i)=>(
				



        
		
	
   
      <div className='center'>
   
    <div id="HomeContent">
	 
<div id="MediaBlock">
{/* <p4><img id="preview" src={require('./temp.png')} width="240px" height="220px" alt="Logo"  /> */}
<p4><img id="preview" src={('https://choppercharlie.blob.core.windows.net/'+replace()+'/'+thedata)}  width="240px" height="220px" alt="img" />
&nbsp;{thedata} <br></br>
&nbsp;&nbsp;&nbsp;<p5>dd/mm/yyyy</p5>
<br></br>
<hr></hr>
&nbsp;
<div  id='ButtonDiv'><a href= {('https://choppercharlie.blob.core.windows.net/'+replace()+'/'+thedata)}><button id="DownloadButton"  onClick={()=>downData(thedata)}   ><CloudDownloadRoundedIcon sx={{ fontSize: 24 }}/><br></br>Download</button></a>&nbsp;
<button id="AnalyseButton"  ><AnalyticsIcon sx={{ fontSize: 24 }}/><br></br>Analyse</button>&nbsp;
<button id="DeleteButton"  onClick={()=>delData(thedata)}    ><DeleteIcon sx={{ fontSize: 24 }}/><br></br>Delete</button></div>
</p4> 
</div>
	 



	 </div>  
        <div className='profile'>

        <img src={require('./logo.png')} width="80%" height="17%" alt="Logo"/>
               
          <h1>    </h1>
          
          <br/><br/>
          <AccountCircleRoundedIcon sx={{ fontSize: 45 }}/>
          
          <br/>
          <p1 id="user-id"><strong> </strong>{currentUser?.email}</p1>
          <br/>
          <hr/>
          <br/>
		  
          <div>
           <button type='button' id='home'><HomeRoundedIcon id='icon'/><p3>Home</p3></button>
           
           <a id='pagelinks' href="/pipeline"><button type='button' id='home'><FiberManualRecordIcon id='icon'/><p3>Pipelines</p3></button></a>
           <a id='pagelinks' href="/settings"><button type='button' id='home'><SettingsRoundedIcon id='icon'/><p3>Settings</p3></button></a>
		   <br/>
		  
           </div>
           
          <hr/>

		  <br/>
                    
          <a href="/login" ><button type='button' id='homelogout'  onClick={() => signOut(auth)}   ><LogoutRoundedIcon id='iconlo'/><p3>Logout</p3></button></a>
         
          
        <div className='sub_div'> <img id='ABlogo'  src={require('./AB.png')} width="35%" height="40%" alt="Logo"/></div> 

        </div>






      </div>
      


	  ))
	  )
	  }
		 

 </div>
);
}

export default Profile