import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectCurrentUser, selectSasUrl } from '../../store/user/user.selector';
import {
	deleteFile,
	deleteFileInAccount,
	listFiles,
	listFilesInAccouunt,
	uploadFiles,
	uploadFilesToAccount,
} from '../../utils/azure/azure.utils';
import { selectPipelines } from '../../store/pipelines/pipelines.selector';
import Button, { BUTTON_TYPE_CLASSES } from '../../components/button/button.component';

const Account = () => {
    const params = useParams();
	const { accountName } = params;
	const [selectedFiles, setSelectedFiles] = useState([]);
	const [isFilePicked, setIsFilePicked] = useState(false);
	const [files, setFiles] = useState([]);
	const inputRef = useRef(null);
	const sasURL = useSelector(selectSasUrl);
	const pipelines = useSelector(selectPipelines);
    const [showPopup, setShowPopup] = useState(false)

	useEffect(() => {
		const loadFiles = async () => {
			const arr = await listFilesInAccouunt(accountName, sasURL);
			console.log('thius is an arr', arr);
			setFiles(arr);
		};
		loadFiles();
	}, []);

	const handleChange = (event) => {
		setSelectedFiles(event.target.files);
		if (event.target.files) {
			setIsFilePicked(true);
		}
	};

	const handleUpload = async () => {
		await uploadFilesToAccount(selectedFiles, accountName, sasURL);
		const arr = await listFilesInAccouunt(accountName, sasURL);
		console.log('thius is an arr', arr);
		setFiles(arr);
		setSelectedFiles([]);
		inputRef.current.value = null;
	};

	const handleDelete = async (fileName) => {
		await deleteFileInAccount(fileName, accountName, sasURL);
		const arr = await listFilesInAccouunt(accountName, sasURL);
		console.log('thius is an arr', arr);
		setFiles(arr);
	};

    // const handleAnalyse = async (fileName, accountName) => {
    //     console.log('analyse')
    // }


	return (
		<>
			<div>Account Details</div>
			<div>Files</div>


            <div>
			<h1>Files</h1>
			<br />
			<hr />
			<input
				name='file-input'
				type='file'
				multiple
				onChange={handleChange}
				ref={inputRef}
			/>
			<button disabled={!isFilePicked} onClick={handleUpload}>
				Upload
			</button>
			<Link to='/admin'>
				<button>Delete Account</button>
			</Link>
			<hr />
			<br />

			{files?.map((file) => {
				return (
					<div key={file.name}>
						{/* {console.log(file.url)} */}
						{/* <p>{file.url}</p> */}
						<img
							src={`${files.url}`}
							alt='image here'
							width='250px'
							height='160px'
						/>{' '}
						<br />
						<div>
							<span>{file.name}</span> <br />
							<span>{file.size}</span> <br />
							<span>{file.date}</span> <br />
							<button onClick={() => handleDelete(file.name)}>
								Delete File
							</button>
							{/* <button onClick={() => handleAnalyse(file.name)}>
								Analyse File
							</button> */}
							<Button fileName={file.name} items={pipelines} buttonType={BUTTON_TYPE_CLASSES.menu}>
								Analyse
							</Button>
							<a href={file.url} download>
								<button>Download</button>
							</a>
							<br />
							<br />
						</div>
					</div>
				);
			})}
		</div>

		</>
	);
};

export default Account;
