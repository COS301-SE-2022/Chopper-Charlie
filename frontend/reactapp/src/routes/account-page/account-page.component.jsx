import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
	deleteFileInAccount,
	listFilesInAccount,
	uploadFilesToAccount,
} from '../../utils/azure/azure.utils';
// import { selectSasUrl } from '../../store/user/user.selector';
import '../../profile.css';
import { signOut } from 'firebase/auth';
// import { auth } from './firebase';
import { auth } from '../../firebase';
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
import { selectPipelines } from '../../store/pipelines/pipelines.selector';
import { selectCurrentUser } from '../../store/user/user.selector';

const Account = () => {
	const currentUser = useSelector(selectCurrentUser);
	const params = useParams();
	const { accountName } = params;
	const [files, setFiles] = useState([]);
	const [data, setdata] = useState({});
	const [userRole, setUserRole] = useState('');
	const [adminRole, setAdminRole] = useState('');

	useEffect(() => {
		fetch('/mydatapage/' + accountName).then((res) =>
			res.json().then((data) => {
				// Setting a data from api
				setFiles(data);
				// console.log(data);
			})
		);
	}, [data]);

	useEffect(() => {
		fetch('/get-type/' + accountName).then((res) =>
			res.json().then((data) => {
				// Setting a data from api
				console.log('The user is of role: ' + data.role);
				setUserRole(data.role);
				// console.log(data);
			})
		);

		try {
			currentUser
				.getIdTokenResult()
				.then((idTokenResult) => {
					// Confirm the user is an Admin.
					if (!!idTokenResult.claims.admin) {
						// Show admin UI.
						setAdminRole('admin');
						console.log('This is an admin user');
					} 
					if (!!idTokenResult.claims.super) {
						// Show admin UI.
						setAdminRole('super');
						console.log('This is a super user');
					} 
					else {
						// Show regular user UI.
						console.log('This is not admin user');
					}
				})
				.catch((error) => {
					console.log(error);
				});
		} catch (error) {
			console.log('Error getting custom claims: ', error);
		}
	}, []);

	let str = accountName;

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

	function delData(str) {
		if (window.confirm('Are you sure you want to delete media?') === true) {
			fetch('/db/' + str + '/' + accountName).then((res) =>
				res.json().then((data) => {
					// Setting a data from api
					setdata(data.Message);
					console.log(JSON.stringify(data.Message));
					alert(JSON.stringify(data.Message));
					setFiles([]);
				})
			);
		}
	}

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
			fetch('/ur/' + accountName, {
				method: 'post',
				body: data,
			}).then((res) =>
				res.json().then((data) => {
					// Setting a data from api
					setdata(data);
					console.log(JSON.stringify(data.Message));
					//   alert(JSON.stringify(data.Message));
					uploadingPopup(JSON.stringify(data.Message));
					document.getElementById('Uploadcancel').style.display = 'block';
					setFiles([]);
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
		document.getElementById('textResults').innerHTML = 'Analysing...';

		fetch(
			'/ai/video/' +
				media +
				'/' +
				accountName +
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
			"><button id= analysedMed'><CloudDownloadRoundedIcon sx={{ fontSize: 24 }} /><br></br>Download</button></a>";
		document.getElementById('textResults').innerHTML = a + b + h;
	}

	return (
		<div>
			<h2>Accont: {accountName}</h2>
			{(adminRole === "super" && !(userRole === "super")) && <button>Delete Account</button>}
			{(adminRole === "super" && userRole === "user") && <button>Make Admin</button>}
			{(adminRole === "super" && userRole === "admin") && <button>Remove Admin</button>}
			<div id='Searchbar'>
				<input id='searchhh'></input>
				<button id='searchbuttonn'>
					<SearchIcon sx={{ fontSize: 12 }} />
				</button>
				<a id='pagelinks' href='/homelist'>
					<button id='viewList'>
						<ViewListOutlinedIcon id='listOption' />
					</button>
				</a>
				<button id='viewGrid'>
					<GridViewIcon id='listOptionactive' />
				</button>
				{/* <button id='uploadButton' onClick={() => upData()}   >Upload</button> */}

				{/* <input id='uploadInput'
					type="file"
					onChange={uploadFile}>
				</input> */}

				<div id='uploadInput'>
					<label for='fileInput' class='btn'>
						Upload
					</label>
				</div>
				<input id='fileInput' type='file' onChange={uploadFile}></input>
			</div>

			{typeof files.mydata === 'undefined' ? (
				<div className='lds-ring'>
					<div></div>
					<div></div>
					<div></div>
					<div></div>
				</div>
			) : (
				files.mydata.map((thedata, i) => (
					<div className='center'>
						<div id='HomeContent'>
							<div id='MediaBlock'>
								<p>
									<img
										id='preview'
										src={
											'https://choppercharlie.blob.core.windows.net/' +
											replace() +
											'/' +
											thedata
										}
										width='240px'
										height='220px'
										alt='img'
										onError={(event) => {
											event.target.src = require('../../vidImg.png');
											event.onerror = null;
										}}
									/>
									&nbsp;{thedata}
									{/* <h5>dd/mm/yyyy</h5> */}
									<br></br>
									<br></br>
									<hr></hr>
									&nbsp;
									<div id='ButtonDiv'>
										<a
											href={
												'https://choppercharlie.blob.core.windows.net/' +
												replace() +
												'/' +
												thedata
											}>
											<button id='DownloadButton'>
												<CloudDownloadRoundedIcon sx={{ fontSize: 24 }} />
												<br></br>Download
											</button>
										</a>
										&nbsp;
										<button
											id='AnalyseButton'
											onClick={() => openForm(thedata)}>
											<AnalyticsIcon sx={{ fontSize: 24 }} />
											<br></br>Analyse
										</button>
										&nbsp;
										<button id='DeleteButton' onClick={() => delData(thedata)}>
											<DeleteIcon sx={{ fontSize: 24 }} />
											<br></br>Delete
										</button>
									</div>
								</p>

								<div className='form-popup' id='myForm'>
									<div className='form-container'>
										<h1>Select Pipeline</h1>

										{/* <label className="pipelinee"><p>Choose you pipeline for analysis:</p></label><br /> */}

										{pipelines.map((pipelineItem) => {
											return (
												<div key1={pipelineItem.title}>
													<button
														type='button'
														id='pipelineChosen'
														className='pipelineChosen'
														name='pipelineChosen'
														onClick={() => analyse(pipelineItem)}>
														{pipelineItem.title}
													</button>
												</div>
											);
										})}

										{/* <button type="button" className="done" onSubmit={() => analyse()}>Done</button> */}
										<button
											type='button'
											onClick={() => closeForm()}
											className='cancel'>
											Cancel
										</button>
									</div>
								</div>
							</div>
						</div>
					</div>
				))
			)}

			{/* <button class="open-button" onclick="openForm()">Open Form</button> */}

			<div className='Resultform-popup' id='ResultmyForm'>
				<div className='Resultform-container'>
					<h1>Results:</h1>
					<div id='textResults'></div>
					<button
						id='resultcancel'
						type='button'
						onClick={() => closeResultForm()}
						className='cancel'>
						Cancel
					</button>
				</div>
			</div>

			<div className='Uploadform-popup' id='UploadmyForm'>
				<div className='Uploadform-container'>
					<div id='textUpload'>Uploading...</div>
					<button
						id='Uploadcancel'
						type='button'
						onClick={() => closeUploadForm()}
						className='cancel'>
						Cancel
					</button>
				</div>
			</div>

			<div className='profile'>
				<img
					src={require('../../logo.png')}
					width='80%'
					height='17%'
					alt='Logo'
				/>

				<br />
				<AccountCircleRoundedIcon sx={{ fontSize: 45 }} />

				<br />
				<h4 id='user-id'>
					<strong> </strong>
					{currentUser?.email}
				</h4>
				<br />
				<hr />
				<br />

				<div>
					<button type='button' id='home'>
						<HomeRoundedIcon id='icon' />
						<p>Home</p>
					</button>

					<a id='pagelinks' href='/pipeline'>
						<button type='button' id='home'>
							<FiberManualRecordIcon id='icon' />
							<p>Pipelines</p>
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
							<SettingsRoundedIcon id='icon' />
							<p>Admin</p>
						</button>
					</a>
					<br />
				</div>

				<hr />

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
						src={require('../../AB.png')}
						width='35%'
						height='40%'
						alt='Logo'
					/>
				</div>
			</div>
		</div>
	);
};

export default Account;
