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


	const uploadFile = async (e) => {
		const file = e.target.files[0];
		if (file != null) {
		  const data = new FormData();
		  data.append('file_from_react', file);
	  
		  fetch("/ur/"+currentUser?.email,
			{
			  method: 'post',
			  body: data,
			}
		  ).then((res) =>
		  res.json().then((data) => {
			  // Setting a data from api
			  setdata(data.Message);
			  console.log(JSON.stringify(data.Message));
			  alert(JSON.stringify(data.Message));
	  })
		  );
  

		//   let res = await response.json();
		//   if (res.status !== 1){
		// 	alert('Error uploading file');
		//   }
		}
	  };
    


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

			<form>
  <input
    type="file"
    onChange={uploadFile}>
  </input>
</form>

		</div>
	);
}

export default Upload;
