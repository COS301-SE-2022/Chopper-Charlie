import './profile.css'
import {useAuthValue} from './AuthContext'
import { signOut } from 'firebase/auth' 
import { auth } from './firebase'
import React, { useEffect, useState } from "react";
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
import UploadIcon from '@mui/icons-material/Upload';
import ReorderIcon from '@mui/icons-material/Reorder';
import TuneIcon from '@mui/icons-material/Tune';
import AssessmentIcon from '@mui/icons-material/Assessment';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import { selectCurrentUser } from './store/user/user.selector';

//change
function Profile() {
	

	
	const [color, changeColor] = useState("#242424");

	document.body.style.backgroundColor = color;



	
	const currentUser = useSelector(selectCurrentUser)
	// const { currentUser } = useAuthValue();
	// object for storing and using data
	const [data, setdata] = useState({});
	const [isAdmin, setIsAdmin] = useState(false);
	const [role, setRole] = useState('user')

	useEffect(() => {
		try {
			currentUser
				.getIdTokenResult()
				.then((idTokenResult) => {
					// Confirm the user is an Admin.
					if (!!idTokenResult.claims.admin) {
						// Show admin UI.
						setIsAdmin(true);
						setRole('Admin')
						console.log('This is an admin user');
					}
				})
				.catch((error) => {
					console.log(error);
				});
		} catch (error) {
			console.log('Error getting custom claims: ', error);
		}
	}, []);

	let str = currentUser?.email;

	function replace() {
		var string = '';
		var chart = '';
		for (let i = 0; i < str.length; i++) {
			//fixed spelling from 'str.lenght'
			if (str.charAt(i) === '@' || str.charAt(i) === '.') {
				chart = '';
				string = string + chart;
			} else {
				chart = str.charAt(i);
				string = string + chart;
			}
		}
		// console.log(string);
		return string;
	}

	// Using useEffect for single rendering

	// Using fetch to fetch the api from
	// flask server it will be redirected to proxy

	fetch('/mydatapage/' + currentUser?.email).then((res) =>
		res.json().then((data) => {
			// Setting a data from api
			setdata(data);
			//  console.log(data);
		})
	);

	function delData(str) {
		if (window.confirm('Are you sure you want to delete media?') === true) {
			fetch('/db/' + str + '/' + currentUser?.email).then((res) =>
				res.json().then((data) => {
					// Setting a data from api
					setdata(data.Message);
					console.log(JSON.stringify(data.Message));
					alert(JSON.stringify(data.Message));
				})
			);
		}
	}

	function downData(str) {
		fetch('/lol/' + str + '/' + currentUser?.email);
	}

	// function upData() {
	// 	fetch("/ub/" + currentUser?.email)

	// }

	function uploadingPopup(a) {
		document.getElementById('UploadmyForm').style.display = 'block';
		document.getElementById('textUpload').innerHTML = a;
	}

	const uploadFile = async (e) => {
		const file = e.target.files[0];
		if (file != null) {
			const data = new FormData();
			data.append('file_from_react', file);
			document.getElementById('UploadmyForm').style.display = 'block';
			document.getElementById('uploader').style.display='block';
			document.getElementById('textUpload').innerHTML= "Uploading..";
			fetch('/ur/' + currentUser?.email, {
				method: 'post',
				body: data,
			}).then((res) =>
				res.json().then((data) => {
					// Setting a data from api
					setdata(data);
					console.log(JSON.stringify(data.Message));
					//   alert(JSON.stringify(data.Message));
					document.getElementById('uploader').style.display='none';
					uploadingPopup(JSON.stringify(data.Message));
					
					document.getElementById('Uploadcancel').style.display = 'block';
					
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
		document.getElementById('myForm').style.display = 'block';
		window.name = thedata;
	}

	window.ress = ' ';
	function analyse(pipelineSelected) {
		var media = window.name;

		var p = pipelineSelected;
		var typeAnalysis = p.classes;
		var count = p.count ? 'y' : 'n';
		var outline = p.outline ? 'y' : 'n';
		document.getElementById('myForm').style.display = 'none';
		document.getElementById('ResultmyForm').style.display = 'block';
		document.getElementById('loader').style.display='block';
		document.getElementById('textResults').innerHTML = 'Analysing...';

		fetch(
			'/ai/video/' +
				media +
				'/' +
				currentUser?.email +
				'/' +
				typeAnalysis +
				'/' +
				outline +
				'/' +
				count
		).then((res) =>
			res.json().then((data) => {
				// Setting a data from api
				setdata(data);
				//console.log(JSON.stringify(data.Message));

				let countt = JSON.stringify(data.Count);
				let mes = JSON.stringify(data.Message);
				let link = JSON.stringify(data.Link);
				// alert(mes+"\n"+countt+"\n"+link);
				// document.getElementById("textResults").innerHTML=window.countt;
				// document.getElementById("ResultmyForm").style.display = "block";
				resultsDiv(countt, mes, link);
				document.getElementById('loader').style.display="none";
				document.getElementById('resultcancel').style.display = 'block';
			})
		);

		document.getElementById('ResultmyForm').style.display = 'block';
	}

	function closeForm() {
		document.getElementById('myForm').style.display = 'none';
	}

	function closeResultForm() {
		document.getElementById('ResultmyForm').style.display = 'none';
	}

	function closeUploadForm() {
		document.getElementById('UploadmyForm').style.display = 'none';
	}

	function resultsDiv(a, b, linkk) {
		document.getElementById('ResultmyForm').style.display = 'block';
		var h =
			'<a href=' +
			linkk +
			"><br></br><button id= 'analysedMed'><CloudDownloadRoundedIcon sx={{ fontSize: 12 }} />Download</button></a><br></br>";
		document.getElementById('textResults').innerHTML = a + "<br/>"+b + h;
	}



	return (


		<div > 

			<div id='Searchbar'>
				
				<div>
				<div id='ConSearch'><input id='searchhh' placeholder="Search"></input>
				<button id='searchbuttonn'>
					<SearchIcon sx={{ fontSize: 14 }} />
				</button>
				


				<a id='pagelinks' href='/homelist'>
					<button id='viewList'>
						<ReorderIcon id='listOptionactive' />
					</button>
				</a>
				<a id='pagelinks' href='/home'>
				<button id='viewGrid'>
					<GridViewIcon id='listOption' />
				</button>
				</a>


				</div>


					<div id='uploadInput'><label   for='fileInput' class='btn'>
					<UploadIcon id="upIcon" sx={{ fontSize: 20 }} />Upload
					</label></div>
				
				<input id='fileInput' type='file' onChange={uploadFile}></input>
			</div>
			</div>
			<div className='Resultform-popup' id='ResultmyForm'>
				<div className='Resultform-container'>
					<h1>Results</h1>
					<div id='textResults'></div>
					<div id= "loader"  className="loader"></div>
					<button
						id='resultcancel'
						type='button'
						onClick={() => closeResultForm()}
						className='cancel'>
						Close
					</button>
				</div>
			</div>

			<div className='Uploadform-popup' id='UploadmyForm'>
				<div className='Uploadform-container'>
					<div id='textUpload'>Uploading...</div>
					<div id= "uploader"  className="uploader"></div>
					<button
						id='Uploadcancel'
						type='button'
						onClick={() => closeUploadForm()}
						className='cancel'>
						Close
					</button>
				</div>
			</div>









		 {(typeof data.mydata === 'undefined')?(
			<div class="lds-ring"><div></div><div></div><div></div><div></div></div>



		 ) : (
			 data.mydata.map((thedata, i)=>(
				



        
		
	
   
      <div className='center'>
 


    <div id="HomeContentList">
<div id="MediaBlockList">
<img id="previewList" src={('https://choppercharlie.blob.core.windows.net/'+replace()+'/'+thedata)}  width="80px" height="80px" alt="img"  onError={event => {
          event.target.src = require('./vidImg.png')
          event.onerror = null
        }}    /><h2>{thedata}</h2>
		<a href= {('https://choppercharlie.blob.core.windows.net/'+replace()+'/'+thedata)}><button id="DownloadButtonList"  ><CloudDownloadRoundedIcon sx={{ fontSize: 23 }}/>Download</button></a>
		<button id="AnalyseButtonList" onClick={() => openForm(thedata)} ><AnalyticsIcon sx={{ fontSize: 24 }}/><br></br>Analyse</button>&nbsp;
		<button id="DeleteButtonList" onClick={()=>delData(thedata)}    ><DeleteIcon sx={{ fontSize: 24 }}/><br></br>Delete</button>




		
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







<div className='profile'>
				<img src={require('./logo.png')} width='70%' height='15%' alt='Logo' />

				<br />
				<br />
				<AccountCircleRoundedIcon sx={{ fontSize: 35 }} />

				<br />
				<h4 id='user-id'>
					<strong> </strong>
					{currentUser?.email}
					
				</h4>
				
				{/* <hr /> */}
				

				<div>
				<a id='pagelinks' href='/pipeline'><button type='button' id='home'>
						<HomeRoundedIcon id='icon' />
						<p>Home</p>
					</button></a>

					<a id='pagelinks' href='/pipeline'>
						<button type='button' id='home'>
							<TuneIcon id='icon' />
							<p>Pipelines</p>
						</button>
					</a>
					<a id='pagelinks' href='/results'>
						<button type='button' id='home'>
							<AssessmentIcon id='icon' />
							<p>Results</p>
						</button>
					</a>
					<a id='pagelinks' href='/settings'>
						<button type='button' id='home'>
							<SettingsRoundedIcon id='icon' />
							<p>Settings</p>
						</button>
					</a>

					<a id='pagelinks' href='/admin'>
						<button type='button' id='home'>
							<AdminPanelSettingsIcon id='icon' />
							<p>Admin</p>
						</button>
					</a>
					

				</div>
				<br />
				{/* <hr /> */}

				<br />

				<a href='/login'>
					<button type='button' id='homelogout' onClick={() => signOut(auth)}>
						<LogoutRoundedIcon id='iconlo' />
						<p>Logout</p>
					</button>
				</a>

				<div className='sub_div'>
					{' '}
					<img
						id='ABlogo'
						src={require('./AB.png')}
						width='35%'
						height='40%'
						alt='Logo'
					/>
				</div>
			</div>










		</div>









);
}

export default Profile