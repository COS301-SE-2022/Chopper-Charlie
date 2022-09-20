import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectSasUrl } from '../../store/user/user.selector';
import { listFiles } from '../../utils/azure/azure.utils';
import { setFiles } from '../../store/files/files.action';
import { selectFiles } from '../../store/files/files.selector';

const Media = () => {
	const dispatch = useDispatch();
	const sasURL = useSelector(selectSasUrl);
	const files = useSelector(selectFiles);
	useEffect(() => {
		const loadMedia = async () => {
			const response = await listFiles(sasURL);
			dispatch(setFiles(response));
			console.log(response);
		};
		loadMedia();
	}, []);

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

      
			{files.map((file) => (
				<div key={file.name}>{file.name}</div>
			))}
		</>
	);
};

export default Media;
