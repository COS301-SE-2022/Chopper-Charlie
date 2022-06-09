import React, { useState, useEffect } from "react";
import {useAuthValue} from './AuthContext'
import './profile.css'
import DeleteIcon from '@mui/icons-material/Delete';
import { color } from "@mui/system";



function Delete() {
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
		fetch("/db/"+str+"/"+currentUser?.email)
		}


	return (
		
		
    
		 <div   >    
 
			<div><a   href="/"><button type='button' id='back'>Back</button></a></div>



			<h1>Delete Media </h1>
	
			 {(typeof data.mydata === 'undefined')?(
				//  <p>Loading...</p>
				<div class="lds-ring"><div></div><div></div><div></div><div></div></div>





			 ) : (
				 data.mydata.map((thedata, i)=>(
					<center>
					
					
					<div className='Vd'>
        
      					  <center>
			
					<div className='Vids'>
					<div className='tx'>
						<p2>{thedata}<br/>
						<hr/>
						<img src={require('./play.png')} width="90px" height="60px" alt="Logo"/> <br/>

						<button id="del"  type="button" onClick={()=>genData(thedata)}  key={i}  ><DeleteIcon sx={{ fontSize: 20}}/></button>
						</p2>
						</div>
						</div>
						
						</center> 

         			</div>





					</center>
					
				 ))
			 )
			 }
				

		</div>
	);
}

export default Delete;
