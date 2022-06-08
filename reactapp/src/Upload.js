import React, { useState, useEffect, useRef } from "react";
//added useref
import {useAuthValue} from './AuthContext'

import FileBase64 from "react-file-base64";




function Upload() {
	const {currentUser} = useAuthValue()
    

    const getInputValue = (event)=>{
        // show the user input value to console
        const userValue = event.target.value;

        console.log(userValue);
    };


	// object for storing and using data
	const [data, setdata] = useState({
		
	});
	

	// Using useEffect for single rendering
	
		// Using fetch to fetch the api from
		// flask server it will be redirected to proxy
	
		
	

	function genData(str){
		fetch("/db/"+str+"/"+currentUser?.email)
		}


	return (
		
		
		 <div >    
 
            <div><a   href="/"><button type='button' id='reg'>Back</button></a></div>
	
		
              <FileBase64 > type="file"  multiple={false} onDone={}   onChange={getInputValue} </FileBase64>



		</div>
	);
}

export default Upload;
