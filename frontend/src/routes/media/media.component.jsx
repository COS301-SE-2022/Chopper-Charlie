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

	const imgUrl =
		'https://choppercharlie.blob.core.windows.net/nfhcof5vbgto0v51txchd8xkfx82/443573.webp?se=2022-09-20T19%3A18%3A05Z&sp=rwdl&sv=2021-08-06&sr=c&sig=v6n0ylHpJYpskdlbDhLI6l5nN%2BD0rLGJNjqAQxwMDq0%3D';

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

			<MediaGrid files={files} handleDelete={handleDelete} />
		</>
	);
};

export default Media;
