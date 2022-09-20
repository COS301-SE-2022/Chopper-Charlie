import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectSasUrl } from '../../store/user/user.selector';
import { deleteFile, listFiles, uploadFiles } from '../../utils/azure/azure.utils';
import { setFiles } from '../../store/files/files.action';
import { selectFiles } from '../../store/files/files.selector';

const Media = () => {
	const dispatch = useDispatch();
	const sasURL = useSelector(selectSasUrl);
	const files = useSelector(selectFiles);
  const [selectedFiles, setSelectedFiles] = useState([]);
	const [isFilePicked, setIsFilePicked] = useState(false);
  const inputRef = useRef(null);

	useEffect(() => {
		const loadMedia = async () => {
			const response = await listFiles(sasURL);
			dispatch(setFiles(response));
			console.log(response);
		};
		loadMedia();
	}, []);

  const handleChange = (event) => {
		setSelectedFiles(event.target.files);
		if (event.target.files) {
			setIsFilePicked(true);
		}
	};

  const handleUpload = async () => {
		await uploadFiles(selectedFiles, sasURL);
		const arr = await listFiles(sasURL);
		dispatch(setFiles(arr));
		setSelectedFiles([]);
		inputRef.current.value = null;
	};

  const handleDelete = async (fileName) => {
		await deleteFile(fileName, sasURL);
		const arr = await listFiles(sasURL);
		dispatch(setFiles(arr));
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
						<div key={file.name}>
							<span>{file.name}</span> <br />
							<span>{file.size}</span> <br />
							<span>{file.date}</span> <br />
							<button onClick={() => handleDelete(file.name)}>
								Delete File
							</button>
							<a href={file.url} download>
								<button>Download</button>
							</a>
							<br />
							<br />
						</div>
					</div>
				);
			})}
		</>
	);
};

export default Media;
