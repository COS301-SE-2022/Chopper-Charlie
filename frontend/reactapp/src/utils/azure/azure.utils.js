import { ContainerClient, BlobServiceClient } from '@azure/storage-blob';

export const listFiles = async (sasURL) => {
	try {
		const containerClient = new ContainerClient(sasURL);
		console.log('fetching file list');
		const filesArray = [];
		// let i = 1;
		let blobs = containerClient.listBlobsFlat();
		for await (const blob of blobs) {
			let obj = {
				name: blob.name,
				size: blob.properties.contentLength / 1000,
				date: blob.properties.createdOn
				.toISOString()
				.slice(0, 10)
				.replace(/-/g, '-'),
				url: containerClient.getBlobClient(blob.name).url,
			};
			filesArray.push(obj);
		}
		return filesArray;
	} catch (error) {
		console.log('error in azure list function', error);
	}
};

export const uploadFiles = async (files, sasURL) => {
	try {
		const containerClient = new ContainerClient(sasURL);
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

export const deleteFile = async (fileName, sasURL) => {
	try {
		const containerClient = new ContainerClient(sasURL);
		await containerClient.deleteBlob(fileName);
		console.log('File Deleted');
	} catch (error) {
		console.log('error in azure delete', error);
	}
};


/// ADMIN FUNCTIONS
// export const listAccounts = async (blobURL) => {
// 	try {
// 		const blobServiceClient = new BlobServiceClient(blobURL);
// 		// let i = 1;
// 		let containers = blobServiceClient.listContainers();
// 		const accountsArray = [];
// 		for await (const container of containers) {
// 			// console.log(`Container ${i++}: ${container.name}`);
// 			// console.log(`Container ${i}:`, container.properties);
// 			// console.log(`Container ${i}:`, container);
// 			// i++;
// 			let obj = {
// 				name: container.name,
// 			};
// 			accountsArray.push(obj);
// 		}
// 		return accountsArray;
// 	} catch (error) {
// 		console.log('error in azure list accounts', error);
// 	}
// };
// export const listAdminFiles = async (blobURL, containerName) => {
// 	try {
// 		const blobServiceClient = new BlobServiceClient(blobURL);
// 		const containerClient = blobServiceClient.getContainerClient(containerName);
// 		let blobs = containerClient.listBlobsFlat();
// 		const filesArray = [];
// 		for await (const blob of blobs) {
// 			let obj = {
// 				name: blob.name,
// 				size: blob.properties.contentLength / 1000,
// 				date: blob.properties.createdOn
// 					.toISOString()
// 					.slice(0, 10)
// 					.replace(/-/g, '-'),
// 				url: containerClient.getBlobClient(blob.name).url,
// 			};
// 			filesArray.push(obj);
// 		}
// 		return filesArray;
// 	} catch (error) {
// 		console.log('error in azure list admin files', error);
// 	}
// };


// export const deleteAccount = async (containerName, blobURL) => {
// 	try {
// 		const blobServiceClient = new BlobServiceClient(blobURL);
// 		console.log('Deleting account');
// 		await blobServiceClient.deleteContainer(containerName);
// 		return listAccounts();
// 	} catch (error) {
// 		console.log('error in azure delete account', error);
// 	}
// };

// export const createAccountContainer = async (containerName, blobURL) => {
// 	try {
// 		const blobServiceClient = new BlobServiceClient(blobURL);
// 		console.log('Creating account container');
// 		await blobServiceClient.createContainer(containerName);
// 		return listAccounts();
// 	} catch (error) {
// 		console.log('error in azure create account', error);
// 	}
// };


export const listFilesInAccount = async (accountName, blobURL) => {
	try {
		const blobServiceClient = new BlobServiceClient(blobURL);
		console.log('fetching file list');
		const filesArray = [];
		const containerClient = blobServiceClient.getContainerClient(accountName);
		try {
			await containerClient.create();
		} catch (error) {
			console.log('Cannot create container');
		}
		let blobs = containerClient.listBlobsFlat();
		for await (const blob of blobs) {
			let obj = {
				name: blob.name,
				size: blob.properties.contentLength / 1000,
				date: blob.properties.createdOn
					.toISOString()
					.slice(0, 10)
					.replace(/-/g, '-'),
				url: containerClient.getBlobClient(blob.name).url,
			};
			filesArray.push(obj);
		}
		return filesArray;
	} catch (error) {
		console.log('error in azure list function', error);
	}
};

export const uploadFilesToAccount = async (files, accountName, blobURL) => {
	try {
		const blobServiceClient = new BlobServiceClient(blobURL);
		const promises = [];
		const containerClient = blobServiceClient.getContainerClient(accountName);
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

export const deleteFileInAccount = async (fileName, accountName, blobURL) => {
	try {
		const blobServiceClient = new BlobServiceClient(blobURL);
		const containerClient = blobServiceClient.getContainerClient(accountName);
		await containerClient.deleteBlob(fileName);
		console.log('File Deleted');
	} catch (error) {
		console.log('error in azure delete', error);
	}
};