import React, { useState } from "react";
import {useAuthValue} from './AuthContext'
import './profile.css'
import DeleteIcon from '@mui/icons-material/Delete';

//i hope it worked

function Delete() {
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
		fetch("/db/"+str+"/"+currentUser?.email).then((res) =>
		res.json().then((data) => {
			// Setting a data from api
			setdata(data.Message);
			console.log(JSON.stringify(data.Message));
			alert(JSON.stringify(data.Message));
	})
		);
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
						<img src={('https://choppercharlie.blob.core.windows.net/'+replace()+'/'+thedata)} width="90px" height="60px" alt="Logo"/> <br/>

						<button id="del" name={thedata} type="button" onClick={()=>genData(thedata)}  key={i}  ><DeleteIcon sx={{ fontSize: 20}}/></button>
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
