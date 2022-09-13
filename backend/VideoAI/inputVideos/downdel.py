from pathlib import Path
from azure.storage.blob import BlobClient
from VideoAI.runDetections import thisfunct
Connection_String = "DefaultEndpointsProtocol=https;AccountName=choppercharlie;AccountKey=Bcrvc/ix8TmB/hoEE2fmp44iHAqEWeiZ1fr7Fml9Z0+Q7RI8NvX2kbqzeufPKHRY54hk+wFgE/+a+AStzl2qTw==;EndpointSuffix=core.windows.net"

def blob_retrieveee(Blob_Name, Containers_Name, type, box, count):
    
        Temp = Containers_Name.replace('@', '')
        Temp = Temp.replace('.', '')
        Temp = Temp.replace('_', '')
        Helper = str(Temp)
        print(Helper)
        blob = BlobClient.from_connection_string(conn_str=Connection_String, container_name=Temp, blob_name=Blob_Name)
        with open("backend/VideoAI/inputVideos/"+Blob_Name, "wb") as my_blob:
            stream = blob.download_blob()
            data = stream.readall()
            my_blob.write(data)
        thisfunct(Blob_Name,Blob_Name, type,box,count, Helper)
        #