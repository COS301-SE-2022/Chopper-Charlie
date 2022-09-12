import React, { useState } from "react";
import {useAuthValue} from './AuthContext'
import CloudDownloadRoundedIcon from '@mui/icons-material/CloudDownloadRounded';
import './profile.css'
//import { replaceReact } from "replace-react";






function Download() {
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


	//myuserstring = myuserstring.replace(/@/g,"");
	//console.log(myuserstring);
	//myuserstring = myuserstring.replace(".","");

	//const search = '@';
	//const replaceWith = '';
	//const result = myuserstring.split(search).join(replaceWith);
	 // => 'duck-duck-go'
	

	

	// Using useEffect for single rendering
	
		// Using fetch to fetch the api from
		// flask server it will be redirected to proxy
		
		fetch("/mydatapage/"+currentUser?.email).then((res) =>
			res.json().then((data) => {
				// Setting a data from api
				
				setdata(data);
                console.log(data);
				

			}),
			
		);
		
	
	

	 
		
		
		
	 

	function genData(str){
		fetch("/lol/"+str+"/"+currentUser?.email)
		

		}


	return (
		
		
    
		 <div   >    
 
<div><a   href="/"><button type='button' id='back'>Back</button></a></div>

<h1>Download Media </h1>
	
			 {(typeof data.mydata === 'undefined')?(
				//  <p>Loading...</p>
				
				<div class="lds-ring"><div></div><div></div><div></div><div></div></div>
			 ) : (
				 data.mydata.map((thedata, i)=>(
					 
					 
					// <center><br></br><div><button   type="button" onClick={()=>genData(thedata)}   style={{height: "50px", width: "200px"}} key={i}  >{thedata}</button></div></center>
					

					<div className='Vd'>
        
      					  <center>
			
					<div className='Vids'>
					<div className='tx'>
						<p2>{thedata}<br/>
						<hr/>
						<img src={('https://choppercharlie.blob.core.windows.net/'+replace()+'/'+thedata)} width="90px" height="60px" alt="Logo"/> <br/>

						<a download href= {('https://choppercharlie.blob.core.windows.net/'+replace()+'/'+thedata)}><button id="down"  type="button" onClick={()=>genData(thedata)}  key={i}  ><CloudDownloadRoundedIcon sx={{ fontSize: 20}}/></button></a>
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
