import './profile.css';
import { useAuthValue } from './AuthContext';
import { signOut } from 'firebase/auth';
import { auth, deleteFileResult, getFileResult } from './firebase';
import React, { useEffect, useState } from 'react';
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
import UploadIcon from '@mui/icons-material/Upload';
import ReorderIcon from '@mui/icons-material/Reorder';
import TuneIcon from '@mui/icons-material/Tune';
import AssessmentIcon from '@mui/icons-material/Assessment';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import { useDispatch, useSelector } from 'react-redux';
import { selectPipelines } from './store/pipelines/pipelines.selector';
import { selectCurrentUser } from './store/user/user.selector';
import { setFiles } from './store/files/files.action';
import { selectFiles } from './store/files/files.selector';
import AssignmentIcon from '@mui/icons-material/Assignment';

import { useRef } from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import InputBase from '@mui/material/InputBase';
import { styled, alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import { Link } from 'react-router-dom';
import SideBar from './components/sidebar/sidebar.component';
//change


// ################### Search Bar ###################

const Search = styled('div')(({ theme }) => ({
	position: 'relative',
	borderRadius: theme.shape.borderRadius,
	backgroundColor: alpha(theme.palette.common.white, 0.15),
	'&:hover': {
		backgroundColor: alpha(theme.palette.common.white, 0.25),
	},
	marginRight: theme.spacing(2),
	marginLeft: 0,
	width: '100%',
	[theme.breakpoints.up('sm')]: {
		marginLeft: theme.spacing(3),
		width: 'auto',
	},
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
	padding: theme.spacing(0, 2),
	height: '100%',
	position: 'absolute',
	pointerEvents: 'none',
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
	color: 'inherit',
	'& .MuiInputBase-input': {
		padding: theme.spacing(1, 1, 1, 0),
		// vertical padding + font size from searchIcon
		paddingLeft: `calc(1em + ${theme.spacing(4)})`,
		transition: theme.transitions.create('width'),
		width: '100%',
		[theme.breakpoints.up('md')]: {
			width: '20ch',
		},
	},
}));

// ##################################################

function Profile() {
	// i allowed merges

	const [color, changeColor] = useState('#242424');

	document.body.style.backgroundColor = color;
	const fileUpload = useRef(null);

	const currentUser = useSelector(selectCurrentUser);
	// const { currentUser } = useAuthValue();
	// object for storing and using data
	const [data, setdata] = useState({});
	const [resultNames, setResultNames] = useState([]);
	const [isAdmin, setIsAdmin] = useState(false);
	const [role, setRole] = useState('user');

	useEffect(() => {
		try {
			currentUser
				.getIdTokenResult()
				.then((idTokenResult) => {
					// Confirm the user is an Admin.
					if (!!idTokenResult.claims.admin) {
						// Show admin UI.
						setIsAdmin(true);
						setRole('Admin');
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

	fetch('/mydatapageanalyse/' + currentUser?.email).then((res) =>
		res.json().then((data) => {
			// Setting a data from api
			setdata(data);
			setResultNames(data.mydata);
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
			deleteFileResult(currentUser, str).catch((err) => {
				console.log(err);
			});
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
			document.getElementById('uploader').style.display = 'block';
			document.getElementById('textUpload').innerHTML = 'Uploading..';
			fetch('/ur/' + currentUser?.email, {
				method: 'post',
				body: data,
			}).then((res) =>
				res.json().then((data) => {
					// Setting a data from api
					setdata(data);
					console.log(JSON.stringify(data.Message));
					//   alert(JSON.stringify(data.Message));
					document.getElementById('uploader').style.display = 'none';
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
	const filess = useSelector(selectFiles);

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
		document.getElementById('loader').style.display = 'block';
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
				document.getElementById('loader').style.display = 'none';
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

	function closeResultFormResult() {
		document.getElementById('ResultmyFormResult').style.display = 'none';
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
		document.getElementById('textResults').innerHTML =
			a +
			'<br/>' +
			b +
			'<br/> Download results below and view them on the results page <br/>' +
			h;
	}

	const dispatch = useDispatch();
	const files = useSelector(selectFiles);

	const getFileResultfunction = (filename) => {
		getFileResult(currentUser).then((data) => {
			console.log('this is the results data: ', data);
			dispatch(setFiles(data));
			const results = files[filename];
			document.getElementById('textResultsResult').innerHTML = '';

			document.getElementById('ResultmyFormResult').style.display = 'block';
			Object.entries(results).forEach(([key, value]) => {
				//console.log("Object Type: "+key+"Object Count: "+value)
				document.getElementById('textResultsResult').innerHTML +=
					'Type: ' + key + '     Count: ' + value + '<br>';
			});
		});
	};

	const [query, setQuery] = useState('');

	function removeFileType(fileName) {
		let text = fileName;
		var resultName = text.replace('.jpg', ' ');
		resultName = resultName.replace('.jpeg', ' ');
		resultName = resultName.replace('.mp4', ' ');
		resultName = resultName.replace('Analysed', '');
		return resultName;
	}

	function chooseMedia() {
		document.getElementById('ComparemyForm').style.display = 'block';
		document.getElementById('Comparecancel').style.display = 'block';
	}
	function closeCompareForm() {
		document.getElementById('ComparemyForm').style.display = 'none';
	}


	
	function graph() {
		// console.log("told you so");


		// const data = [{ argument: 'Monday', value: 30 },
		// 			  { argument: 'Tuesday', value: 20 },];
		// document.getElementById('graph').innerHTML="<Paper><Chart data="+{data}+"><ArgumentAxis /><ValueAxis /><BarSeries valueField='value' argumentField='argument' /></Chart></Paper>"


	}

	return (
		<div>
			<Stack
				justifyContent='space-between'
				alignItems='center'
				direction={'row'}
				spacing={{ xs: 1, sm: 2, md: 4 }}
				sx={{
					backgroundColor: '#1a1a1a',
					padding: 1,
					borderRadius: 2,
					color: 'white',
					minHeight: '3em',
					maxHeight: '3.5em',
					maxWidth: '70%',
					minWidth: '15em',
					paddingRight: '20px',
				}}>
				<Search>
					<SearchIconWrapper>
						<SearchIcon />
					</SearchIconWrapper>
					<StyledInputBase
						placeholder='Search…'
						inputProps={{ 'aria-label': 'search' }}
						onChange={(event) => setQuery(event.target.value)}
					/>
				</Search>
				<Box
					sx={{
						width: 200,
						height: 0,
					}}
				/>
				<span>
					<IconButton
						// disabled
						aria-label='grid'
						sx={{
							color: '#51B9D4',
						}}>
						<GridViewIcon />
					</IconButton>
					<a href='/resultslist'>
						<IconButton
							aria-label='list'
							sx={{
								color: 'white',
							}}>
							<ReorderIcon />
						</IconButton>
					</a>
				</span>
				<div>
					<Button
						variant='contained'
						startIcon={<FileUploadIcon />}
						sx={{ minWidth: '100px', backgroundColor: '#007ade' }}
						onClick={() => {
							fileUpload.current.click();
						}}>
						Upload
					</Button>
					<input
						id='fileInput'
						type='file'
						onChange={uploadFile}
						ref={fileUpload}
						style={{ opacity: '0', width: '0', height: '0' }}></input>
				</div>
			</Stack>

			{/* /////////////////////////form////////////////////////// */}
			{/* <div className='Compareform-popup' id='ComparemyForm'>
				<div className='Compareform-container'>
					Select media to compare results:

					{
						resultNames.map((resultName) => {
							return (
								<div key={resultName}>
									<input type="checkbox" id="compareMedia" name={resultName} value={resultName}></input><label for={resultName}> {removeFileType(resultName)}</label><br></br>
								</div>
							);
						})
					}

					<button
						id='Comparecancel'
						type='button'
						onClick={() => closeCompareForm()}
						className='cancel'>
						Close
					</button>
				</div>
			</div> */}
			{/* /////////////////////////form////////////////////////// */}

			<div id='compare'>
				<h1>Compare Media:</h1>
				<div id="graph">
					
				</div>

				<label for="compareObject">Object to compare:</label>

				<select name="compareObject" id="compareObject">
					<option value="car">Car</option>
					<option value="bus">Bus</option>
					<option value="truck">Truck</option>
					<option value="motorbike">Motorbike</option>
					<option value="Train">train</option>
					<option value="Boat">boat</option>
					<option value="aeroplane">Aeroplane</option>
					<option value="person">People</option>
					<option value="bird">Bird</option>
					<option value="sheep">Sheep</option>
					<option value="cow">Cow</option>
					<option value="elephant">Elephant</option>
					<option value="zebra">Zebra</option>
					<option value="giraffe">Giraffe</option>
				</select>
				<br></br>


				Select media to compare results:

				{
					resultNames.map((resultName) => {
						return (
							<div key={resultName}>
								<input type="checkbox" id="compareMedia" name={resultName} value={resultName} onClick={() => graph()}></input><label for={resultName}> {removeFileType(resultName)}</label><br></br>
							</div>
						);
					})
				}











			</div>





			{typeof data.mydata === 'undefined' ? (
				<div className='lds-ring'>
					<div></div>
					<div></div>
					<div></div>
					<div></div>
				</div>
			) : (
				data.mydata
					.filter((post) => {
						if (query === '') {
							return post;
						} else if (post.toLowerCase().includes(query.toLowerCase())) {
							return post;
						}
					})

					.map((thedata, i) => (
						<div className='center'>
							<div id='HomeContent'>
								<div id='MediaBlockResults'>
									<p>
										<img
											id='previewResults'
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
												event.target.src = require('./vidImg.png');
												event.onerror = null;
											}}
										/>
										&nbsp;{removeFileType(thedata)}
										{/* <h5>dd/mm/yyyy</h5> */}
										<br></br>
										<button
											id='ResultButton'
											onClick={() => getFileResultfunction(thedata)}>
											<AssignmentIcon sx={{ fontSize: 14 }} />
											&nbsp;&nbsp;Results
										</button>
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
													<CloudDownloadRoundedIcon sx={{ fontSize: 20 }} />
													<br></br>Download
												</button>
											</a>
											&nbsp;
											<button
												id='AnalyseButton'
												onClick={() => openForm(thedata)}>
												<AnalyticsIcon sx={{ fontSize: 20 }} />
												<br></br>Analyse
											</button>
											&nbsp;
											<button
												id='DeleteButton'
												onClick={() => delData(thedata)}>
												<DeleteIcon sx={{ fontSize: 20 }} />
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
					<h1>Results</h1>
					<div id='textResults'></div>
					<div id='loader' className='loader'></div>
					<button
						id='resultcancel'
						type='button'
						onClick={() => closeResultForm()}
						className='cancel'>
						Close
					</button>
				</div>
			</div>

			<div className='ResultformResult-popup' id='ResultmyFormResult'>
				<div className='ResultformResult-container'>
					<h1>Results</h1>
					<div id='textResultsResult'></div>
					<div id='loader' className='loader'></div>
					<button
						id='resultcancelResult'
						type='button'
						onClick={() => closeResultFormResult()}
						className='cancel'>
						Close
					</button>
				</div>
			</div>

			<div className='Uploadform-popup' id='UploadmyForm'>
				<div className='Uploadform-container'>
					<div id='textUpload'>Uploading...</div>
					<div id='uploader' className='uploader'></div>
					<button
						id='Uploadcancel'
						type='button'
						onClick={() => closeUploadForm()}
						className='cancel'>
						Close
					</button>
				</div>
			</div>

			<SideBar />
		</div>
	);
}

export default Profile;
