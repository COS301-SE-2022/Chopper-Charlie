from azure.storage.blob import BlobClient

blobname ="unaizah.png"
Connection_String = "DefaultEndpointsProtocol=https;AccountName=choppercharlie;AccountKey=Bcrvc/ix8TmB/hoEE2fmp44iHAqEWeiZ1fr7Fml9Z0+Q7RI8NvX2kbqzeufPKHRY54hk+wFgE/+a+AStzl2qTw==;EndpointSuffix=core.windows.net"
Containers_Name = "media"
blob = BlobClient.from_connection_string(conn_str= Connection_String, container_name= Containers_Name, blob_name= blobname)

with open("unaizah.png", "rb") as data:
    blob.upload_blob(data)
    
    
