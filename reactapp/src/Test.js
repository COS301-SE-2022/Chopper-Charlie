// Importing modules
import React, { useState, useEffect } from "react";

function Test() {
	// usestate for setting a javascript
	// object for storing and using data
	const [data, setdata] = useState({
		/* name: "",
		age: 0,
		date: "",
		programming: "", */
	});

	// Using useEffect for single rendering
	useEffect(() => {
		// Using fetch to fetch the api from
		// flask server it will be redirected to proxy
		fetch("/data").then((res) =>
			res.json().then((data) => {
				// Setting a data from api
				setdata(data);
                console.log(data);

			})
		);
	}, []);

	return (
        
		 <div>
			 {(typeof data.data === 'undefined')?(
				 <p>Loading...</p>
			 ) : (
				 data.data.map((data, i)=>(
					 <p key={i}>{data}</p>
				 ))
			 )
			 }
		</div>
	);
}

export default Test;
