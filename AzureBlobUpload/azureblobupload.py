from azure.storage.blob import BlobClient

Connection_String = "DefaultEndpointsProtocol=https;AccountName=choppercharlie;AccountKey=Bcrvc/ix8TmB/hoEE2fmp44iHAqEWeiZ1fr7Fml9Z0+Q7RI8NvX2kbqzeufPKHRY54hk+wFgE/+a+AStzl2qTw==;EndpointSuffix=core.windows.net"

def blob_upload(Blob_Name, Containers_Name):
    try:
        blob = BlobClient.from_connection_string(conn_str= Connection_String, container_name= Containers_Name, blob_name= Blob_Name)

        with open(Blob_Name, "rb") as data:
            blob.upload_blob(data)
    except:
        print('Error! Try Renaming The Image or Video')
        

#Input Image Name And Container Name (ALSO MAKE SURE IMAGE IS IN CHOPPER CHARLIE DIRECTORY!)        
blob_upload("Test88.jpg", "media")