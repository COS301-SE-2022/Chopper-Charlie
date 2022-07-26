import { Alert } from "@mui/material";
import React, { useState, useEffect, useRef } from "react";
import {useAuthValue} from './AuthContext'
import CloudUploadRoundedIcon from '@mui/icons-material/CloudUploadRounded';
import './profile.css'




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

		<div><a   href="/"><button type='button' id='back'>Back</button></a></div>

		<h1>Upload Media </h1>



		<div className="upp">


            <p> Select file to upload : </p>
			<button id="up" type='button' onClick={()=>genData()} >Upload <CloudUploadRoundedIcon sx={{ fontSize: 14 }}/>   </button>
			</div>

		</div>
	);
}

export default Upload;
