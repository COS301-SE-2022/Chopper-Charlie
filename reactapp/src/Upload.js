import React, { useState, useEffect, useRef } from "react";
import {useAuthValue} from './AuthContext'





function Upload() {
	const {currentUser} = useAuthValue()
	// object for storing and using data
	const [data, setdata] = useState({
		
	});
    


	function genData(){
		fetch("/ub/"+currentUser?.email)
		}

		
	

	


	return (
		
		
		 <div >    
            
			<button id="up" type='button'       onClick={()=>genData()} >Upload</button>


		</div>
	);
}

export default Upload;
