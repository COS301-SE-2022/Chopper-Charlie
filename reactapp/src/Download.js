import React, { useState, useEffect } from "react";
import {useAuthValue} from './AuthContext'
import CloudDownloadRoundedIcon from '@mui/icons-material/CloudDownloadRounded';
import './profile.css'


function Download() {
	const {currentUser} = useAuthValue()
	// object for storing and using data
	const [data, setdata] = useState({
		
	});
	

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
		fetch("/lol/"+str+"/"+currentUser?.email)
		}


	return (
		
		
    
		 <div   >    
 
<div><a   href="/"><button type='button' id='back'>Back</button></a></div>

<h1>Media </h1>
	
			 {(typeof data.mydata === 'undefined')?(
				 <p>Loading...</p>
			 ) : (
				 data.mydata.map((thedata, i)=>(
					 
					// <center><br></br><div><button   type="button" onClick={()=>genData(thedata)}   style={{height: "50px", width: "200px"}} key={i}  >{thedata}</button></div></center>


					<div className='Vd'>
        
      					  <center>
			
					<div className='Vids'>
					<div className='tx'>
						<p2>{thedata}<br/>
						<hr/>
						<img src={require('./play.png')} width="90px" height="60px" alt="Logo"/> <br/>

						<button id="down"  type="button" onClick={()=>genData(thedata)}  key={i}  ><CloudDownloadRoundedIcon sx={{ fontSize: 20}}/></button>
						</p2>
						</div>
						</div>
						
						</center> 

         			</div>
					

















				 ))
			 )
			 }
				

		</div>
	);
}

export default Download;
