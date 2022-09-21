import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
	selectCurrentUser,
	selectSasUrl,
} from '../../store/user/user.selector';
import {
	deleteFile,
	deleteFileInAccount,
	listFiles,
	listFilesInAccouunt,
	uploadFiles,
	uploadFilesToAccount,
} from '../../utils/azure/azure.utils';
import { setFiles } from '../../store/files/files.action';
import { selectFiles } from '../../store/files/files.selector';
import { selectPipelines } from '../../store/pipelines/pipelines.selector';
import Button, {
	BUTTON_TYPE_CLASSES,
} from '../../components/button/button.component';
import { onAuthStateChangedListener } from '../../utils/firebase/firebase.utils';
import MediaCard from '../../components/media-card/media-card.component';
import MediaGrid from '../../components/media-grid/media-grid.component';
import { MenuButton } from '../../components/button/button.styles';

const Media = () => {
	const dispatch = useDispatch();
	const sasURL = useSelector(selectSasUrl);
	const files = useSelector(selectFiles);
	const pipelines = useSelector(selectPipelines);
	const currentUser = useSelector(selectCurrentUser);
	const [selectedFiles, setSelectedFiles] = useState([]);
	const [isFilePicked, setIsFilePicked] = useState(false);
	const inputRef = useRef(null);
	const [admin, setAdmin] = useState(false);
	const loadAdminFiles = async () => {
		const response = await listFilesInAccouunt(
			currentUser.uid.toLowerCase(),
			sasURL
		);
		dispatch(setFiles(response));
		console.log(response);
	};
	const loadUserFiles = async () => {
		const response = await listFiles(sasURL);
		dispatch(setFiles(response));
		console.log(response);
	};
	useEffect(() => {
		const unsubscribe = onAuthStateChangedListener((user) => {
			if (user) {
				user
					.getIdTokenResult()
					.then((idTokenResult) => {
						if (!!idTokenResult.claims.admin) {
							setAdmin(true);
							loadAdminFiles();
							console.log('this is an admin user');
						} else {
							loadUserFiles();
							console.log('this is not an admin user');
						}
					})
					.catch((error) => {
						console.log(error);
					});
			}
		});
		return unsubscribe;
	}, []);

	const handleChange = (event) => {
		setSelectedFiles(event.target.files);
		if (event.target.files) {
			setIsFilePicked(true);
		}
	};

	const handleUpload = async () => {
		console.log('calling upload');
		if (admin) {
			await uploadFilesToAccount(
				selectedFiles,
				currentUser.uid.toLowerCase(),
				sasURL
			);
			loadAdminFiles();
		} else {
			await uploadFiles(selectedFiles, sasURL);
			loadUserFiles();
		}
		setSelectedFiles([]);
		inputRef.current.value = null;
	};

	const handleDelete = async (fileName) => {
		console.log('calling delete');
		if (admin) {
			await deleteFileInAccount(
				fileName,
				currentUser.uid.toLowerCase(),
				sasURL
			);
			loadAdminFiles();
			return;
		}
		await deleteFile(fileName, sasURL);
		loadUserFiles();
	};

	const handleAnalyse = async (fileName, classes, count, outline) => {
		// console.log('calling analyse' + currentUser.uid + fileName + count + outline + classes);
		fetch(
			`/server/ai/video/${fileName}/${currentUser.uid.toLowerCase()}/${
				count ? 'y' : 'n'
			}/${outline ? 'y' : 'n'}/${classes}`
		)
			.then((res) => res.json())
			.then((data) => {
				console.log('this is the analysis response', data);
				if (admin) {
					loadAdminFiles();
					return;
				}
				loadUserFiles();
			})
			.catch((err) => {
				console.log(err);
			});
	};

	return (
		<>
			<h1>Media</h1>
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
			<hr />
			<br />

			<MediaGrid
				files={files}
				handleDelete={handleDelete}
				handleAnalyse={handleAnalyse}
			/>
		</>
	);
};

export default Media;
