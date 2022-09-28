from tkinter import messagebox
from azure.storage.blob import BlobClient
import tkinter
from tkinter import filedialog
import os
from pathlib import Path


Connection_String = "DefaultEndpointsProtocol=https;AccountName=choppercharlie;AccountKey=Bcrvc/ix8TmB/hoEE2fmp44iHAqEWeiZ1fr7Fml9Z0+Q7RI8NvX2kbqzeufPKHRY54hk+wFgE/+a+AStzl2qTw==;EndpointSuffix=core.windows.net"

def blob_upload(file,filename,container):


            Temp = container.replace('@', '')
            Temp = Temp.replace('.', '')
            Temp = Temp.replace('_', '')
      
        
            

           
            
            blob = BlobClient.from_connection_string(conn_str= Connection_String, container_name= Temp, blob_name= filename)
            

            blob.upload_blob(file)
            
            
    

#Input Image Name And Container Name (ALSO MAKE SURE IMAGE IS IN CHOPPER CHARLIE DIRECTORY!)        
#blob_upload("media")