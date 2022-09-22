import './profile.css'
import { useAuthValue } from './AuthContext'
import { signOut } from 'firebase/auth'
import { auth } from './firebase'
import React, { useState } from "react";
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import SettingsRoundedIcon from '@mui/icons-material/SettingsRounded';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import DeleteIcon from '@mui/icons-material/Delete';
import CloudDownloadRoundedIcon from '@mui/icons-material/CloudDownloadRounded';
import AnalyticsIcon from '@mui/icons-material/Analytics';
import SearchIcon from '@mui/icons-material/Search';
import ViewListOutlinedIcon from '@mui/icons-material/ViewListOutlined';
import GridViewIcon from '@mui/icons-material/GridView';
import { useSelector } from 'react-redux';
import { selectPipelines } from './store/pipelines/pipelines.selector';



//change
function Profile() {
	const { currentUser } = useAuthValue()
	// object for storing and using data
	const [data, setdata] = useState({

	});

	let str = currentUser?.email;

	function replace() {
		var string = "";
		var chart = "";
		for (let i = 0; i < str.length; i++) {  //fixed spelling from 'str.lenght'
			if (str.charAt(i) === "@" || str.charAt(i) === ".") {
				chart = "";
				string = string + chart;
			}
			else {
				chart = str.charAt(i);
				string = string + chart;
			}
		}
		// console.log(string);
		return string

	}


	// Using useEffect for single rendering

	// Using fetch to fetch the api from
	// flask server it will be redirected to proxy

	fetch("/mydatapage/" + currentUser?.email).then((res) =>
		res.json().then((data) => {
			// Setting a data from api
			setdata(data);
			// console.log(data);

		})
	);




	function delData(str) {


		if (window.confirm("Are you sure you want to delete media?") === true) {
			fetch("/db/" + str + "/" + currentUser?.email).then((res) =>
			res.json().then((data) => {
				// Setting a data from api
				setdata(data.Message);
				console.log(JSON.stringify(data.Message));
				alert(JSON.stringify(data.Message));
		})
			);;
		}

	}


	function downData(str) {
		fetch("/lol/" + str + "/" + currentUser?.email)


	}


	// function upData() {
	// 	fetch("/ub/" + currentUser?.email)


	// }

	
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
			  setdata(data);
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



	const pipelines = useSelector(selectPipelines);


	function openForm(thedata) {
		document.getElementById("myForm").style.display = "block";
		window.name=thedata;
	}


	  
	window.ress=" ";
	function analyse(pipelineSelected){
		
		var media= window.name;
		
		var p =pipelineSelected;
		var typeAnalysis= p.classes;
		var count = p.count?"y":"n";
		var outline = p.outline?"y":"n";
		document.getElementById("myForm").style.display = "none";


		document.getElementById("ResultmyForm").style.display = "block";
		document.getElementById("textResults").innerHTML="Analysing...";



		fetch("/ai/video/"+media+"/"+currentUser?.email+"/"+typeAnalysis+"/"+outline+"/"+count).then((res) =>
		res.json().then((data) => {
			// Setting a data from api
			setdata(data);
			//console.log(JSON.stringify(data.Message));

			let countt = JSON.stringify(data.Count);
			let mes = JSON.stringify(data.Message);
			let link = JSON.stringify(data.Link)
			// alert(mes+"\n"+countt+"\n"+link);
			// document.getElementById("textResults").innerHTML=window.countt;
			// document.getElementById("ResultmyForm").style.display = "block";
			resultsDiv(countt);
	} 
	 
	)
		);

		document.getElementById("ResultmyForm").style.display = "block";
		
		
	


}

	function closeForm() {
		document.getElementById("myForm").style.display = "none";
	}

	function closeResultForm() {
		document.getElementById("ResultmyForm").style.display = "none";
	}
	
	function resultsDiv(tt){
			
		document.getElementById("ResultmyForm").style.display = "block";
		document.getElementById("textResults").innerHTML=tt;
	}



	return (


		<div >

			<div id="Searchbar">
				<input id='searchhh'></input><button id='searchbuttonn' ><SearchIcon sx={{ fontSize: 12 }} /></button>
				<a id='pagelinks' href="/homelist"><button id="viewList"  ><ViewListOutlinedIcon id="listOption" /></button></a>
				<button id="viewGrid"><GridViewIcon id="listOptionactive" /></button>
				{/* <button id='uploadButton' onClick={() => upData()}   >Upload</button> */}
				
					{/* <input id='uploadInput'
						type="file"
						onChange={uploadFile}>
					</input> */}

				<div id='uploadInput'><label for="fileInput" class="btn">Upload</label></div>
				<input id="fileInput"  type="file" onChange={uploadFile}  ></input>
					




			</div>

			{(typeof data.mydata === 'undefined') ? (
				<div className="lds-ring"><div></div><div></div><div></div><div></div></div>



			) : (
				data.mydata.map((thedata, i) => (








					<div className='center'>



						<div id="HomeContent">

							<div id="MediaBlock">


								<p><img id="preview" src={('https://choppercharlie.blob.core.windows.net/' + replace() + '/' + thedata)} width="240px" height="220px" alt="img" onError={event => {
									event.target.src = require('./vidImg.png')
									event.onerror = null
								}} />
									&nbsp;{thedata}
									{/* <h5>dd/mm/yyyy</h5> */}
									<br></br>
									<br></br>
									<hr></hr>
									&nbsp;
									<div id='ButtonDiv'><a href={('https://choppercharlie.blob.core.windows.net/' + replace() + '/' + thedata)}><button id="DownloadButton"   ><CloudDownloadRoundedIcon sx={{ fontSize: 24 }} /><br></br>Download</button></a>&nbsp;
										<button id="AnalyseButton" onClick={() => openForm(thedata)} ><AnalyticsIcon sx={{ fontSize: 24 }} /><br></br>Analyse</button>&nbsp;
										<button id="DeleteButton" onClick={() => delData(thedata)}    ><DeleteIcon sx={{ fontSize: 24 }} /><br></br>Delete</button></div>
								</p>


								<div className="form-popup" id="myForm">
				<div className="form-container">
					<h1>Select Pipeline</h1>

					{/* <label className="pipelinee"><p>Choose you pipeline for analysis:</p></label><br /> */}


					{pipelines.map((pipelineItem) => {
						
						return (
							<div key1={pipelineItem.title}>
					
					
					<button type="button" id="pipelineChosen" className="pipelineChosen" name='pipelineChosen' onClick={() => analyse(pipelineItem)} >{pipelineItem.title}</button>

					</div>
						);
					})}

					{/* <button type="button" className="done" onSubmit={() => analyse()}>Done</button> */}
					<button type="button" onClick={() => closeForm()} className="cancel">Cancel</button>
				</div>
			</div>



			











							</div>
						</div>
					</div>

				))
			)
			}






			{/* <button class="open-button" onclick="openForm()">Open Form</button> */}


			<div className="Resultform-popup" id="ResultmyForm">
				<div className="Resultform-container">
					<h1>Results:</h1>
					<div id="textResults"></div>
					<button type="button" onClick={() => closeResultForm()} className="cancel">Cancel</button>
				</div>
			</div>








			<div className='profile'>

				<img src={require('./logo.png')} width="80%" height="17%" alt="Logo" />



				<br />
				<AccountCircleRoundedIcon sx={{ fontSize: 45 }} />

				<br />
				<h4 id="user-id"><strong> </strong>{currentUser?.email}</h4>
				<br />
				<hr />
				<br />

				<div>
					<button type='button' id='home'><HomeRoundedIcon id='icon' /><p>Home</p></button>

					<a id='pagelinks' href="/pipeline"><button type='button' id='home'><FiberManualRecordIcon id='icon' /><p>Pipelines</p></button></a>
					<a id='pagelinks' href="/settings"><button type='button' id='home'><SettingsRoundedIcon id='icon' /><p>Settings</p></button></a>
					<br />

				</div>

				<hr />

				<br />

				<a href="/login" ><button type='button' id='homelogout' onClick={() => signOut(auth)}   ><LogoutRoundedIcon id='iconlo' /><p>Logout</p></button></a>


				<div className='sub_div'> <img id='ABlogo' src={require('./AB.png')} width="35%" height="40%" alt="Logo" /></div>

			</div>










		</div>







	);
}

export default Profile