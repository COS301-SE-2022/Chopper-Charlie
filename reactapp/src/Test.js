import React, { useState, useEffect } from "react";

function Test() {
	
	// usestate for setting a javascript
	// object for storing and using data
	const [data, setdata] = useState({
		
	});
	

	// Using useEffect for single rendering
	useEffect(() => {
		// Using fetch to fetch the api from
		// flask server it will be redirected to proxy
		fetch("/mydatapage").then((res) =>
			res.json().then((data) => {
				// Setting a data from api
				setdata(data);
                console.log(data);

			})
		);
	}, []);

	function genData(str){
		fetch("/lol/"+str)
		}

		let textInput = React.createRef();
    
	


	return (
		


    
		 <div>

	
			 {(typeof data.mydata === 'undefined')?(
				 <p>Loading...</p>
			 ) : (
				 data.mydata.map((thedata, i)=>(
					 
					<center><br></br><div><button id="button"  ref={textInput} value = {thedata} type="button" onClick={()=>genData(thedata)}   style={{height: "50px", width: "200px"}} key={i}  >{thedata}</button></div></center>
					
				 ))
			 )
			 }
				

		</div>
	);
}

export default Test;
