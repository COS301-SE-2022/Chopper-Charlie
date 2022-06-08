import React, { useState, useEffect } from "react";
import {useAuthValue} from './AuthContext'


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
 
<div><a   href="/"><button type='button' id='reg'>Back</button></a></div>
	
			 {(typeof data.mydata === 'undefined')?(
				 <p>Loading...</p>
			 ) : (
				 data.mydata.map((thedata, i)=>(
					 
					<center><br></br><div><button   type="button" onClick={()=>genData(thedata)}   style={{height: "50px", width: "200px"}} key={i}  >{thedata}</button></div></center>
					
				 ))
			 )
			 }
				

		</div>
	);
}

export default Download;
