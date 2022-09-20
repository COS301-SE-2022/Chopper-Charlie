import { ContainerClient, BlobServiceClient } from '@azure/storage-blob';


const sasURL =
	'https://react1app2media.blob.core.windows.net/testcontainer?sp=racwdl&st=2022-09-11T19:03:28Z&se=2022-09-22T03:03:28Z&sv=2021-06-08&sr=c&sig=Apzxrm3MiWxL6ATCm2VQACeL%2B2bIBcRg%2FPmIoSqYn9E%3D';
const containerClient = new ContainerClient(sasURL);


export const listFiles = async () => {
	try {
		console.log('fetching file list');
		const filesArray = [];
		// let i = 1;
		let blobs = containerClient.listBlobsFlat();
		for await (const blob of blobs) {
			//   console.log(`Blob ${i}: ${blob.name}`);
			//   console.log(`Blob ${i}: ${blob.properties.contentLength}`);

			let obj = {
				name: blob.name,
				size: blob.properties.contentLength,
				date: blob.properties.createdOn
					.toISOString()
					.slice(0, 10)
					.replace(/-/g, '-'),
				url: containerClient.getBlobClient(blob.name).url,
			};
			filesArray.push(obj);
			// i++;
		}
		// console.log("this is the array: ", filesArray);
		return filesArray;
	} catch (error) {
		console.log('error in azure list function', error);
	}
};

export const uploadFiles = async (files) => {
	try {
		const promises = [];
		for (const file of files) {
			const blockBlobClient = containerClient.getBlockBlobClient(file.name);
			promises.push(blockBlobClient.uploadBrowserData(file));
		}
		await Promise.all(promises);
		console.log('Done Uploading');
	} catch (error) {
		console.log('error in azure upload', error);
	}
};