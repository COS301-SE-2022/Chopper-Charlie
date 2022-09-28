from azure.storage.blob import BlobServiceClient
from tkinter import messagebox
import tkinter
from tkinter import filedialog
Connection_String = "DefaultEndpointsProtocol=https;AccountName=choppercharlie;AccountKey=Bcrvc/ix8TmB/hoEE2fmp44iHAqEWeiZ1fr7Fml9Z0+Q7RI8NvX2kbqzeufPKHRY54hk+wFgE/+a+AStzl2qTw==;EndpointSuffix=core.windows.net"



def delete_blob(Blob_Name,Containers_Name):
    blob_service_client = BlobServiceClient.from_connection_string(Connection_String)
    Temp = Containers_Name.replace('@', '')
    Temp = Temp.replace('.', '')
    Temp = Temp.replace('_', '')
    container_client = blob_service_client.get_container_client(Temp)
    blob_client = container_client.get_blob_client(Blob_Name)
    blob_client.delete_blob()
    #messagebox.showinfo("Success","Successfully Deleted media")  #added now

