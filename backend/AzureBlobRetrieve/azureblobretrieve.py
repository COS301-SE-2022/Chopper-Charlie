from azure.storage.blob import BlobClient
from tkinter import messagebox
import tkinter
from tkinter import filedialog

Connection_String = "DefaultEndpointsProtocol=https;AccountName=choppercharlie;AccountKey=Bcrvc/ix8TmB/hoEE2fmp44iHAqEWeiZ1fr7Fml9Z0+Q7RI8NvX2kbqzeufPKHRY54hk+wFgE/+a+AStzl2qTw==;EndpointSuffix=core.windows.net"

def blob_retrieve(Blob_Name, Containers_Name):
    try:
         Temp = Containers_Name.replace('@', '')
         Temp = Temp.replace('.', '')
         Temp = Temp.replace('_', '')
        # blob = BlobClient.from_connection_string(conn_str=Connection_String, container_name=Temp, blob_name=Blob_Name)

        # with open("backend/AzureBlobRetrieve/"+Blob_Name, "wb") as my_blob:
        #     stream = blob.download_blob()
        #     data = stream.readall()
        #     my_blob.write(data)
        #     messagebox.showinfo("Success","Successfully Downloaded media")  #added now

    except:
        print('Error!')
    
#
#Input Image Name And Container Name
#blob_retrieve("Test88.jpg","media")