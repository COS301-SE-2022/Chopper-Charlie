from azure.storage.blob import BlobServiceClient

Connection_String = "DefaultEndpointsProtocol=https;AccountName=choppercharlie;AccountKey=Bcrvc/ix8TmB/hoEE2fmp44iHAqEWeiZ1fr7Fml9Z0+Q7RI8NvX2kbqzeufPKHRY54hk+wFgE/+a+AStzl2qTw==;EndpointSuffix=core.windows.net"

def list_blobs_in_container(Containers_Name):
    try:
        # Instantiate a BlobServiceClient using a connection string
        blob_service_client = BlobServiceClient.from_connection_string(Connection_String)

        # Instantiate a ContainerClient
        container_client = blob_service_client.get_container_client(Containers_Name)


        # [START list_blobs_in_container]
        blobs_list = container_client.list_blobs()
        for blob in blobs_list:
            print(blob.name + '\n')
    except:
        print('Error!')

# Call Function with parameter
list_blobs_in_container("media")