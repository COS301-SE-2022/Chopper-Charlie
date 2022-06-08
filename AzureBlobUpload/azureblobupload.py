from azure.storage.blob import BlobClient
import tkinter
from tkinter import filedialog
import os
from pathlib import Path


Connection_String = "DefaultEndpointsProtocol=https;AccountName=choppercharlie;AccountKey=Bcrvc/ix8TmB/hoEE2fmp44iHAqEWeiZ1fr7Fml9Z0+Q7RI8NvX2kbqzeufPKHRY54hk+wFgE/+a+AStzl2qTw==;EndpointSuffix=core.windows.net"

def blob_upload(Containers_Name):
    
        thetemp = os.getcwd()
       # root.mainloop()
       
        root = tkinter.Tk()
        root.withdraw()
        try:
            file_path = filedialog.askopenfilename()
        
            Blob_Name = (file_path)
            Temp = Containers_Name.replace('@', '')
            Temp = Temp.replace('.', '')
            Temp = Temp.replace('_', '')
            path1 = Path(Blob_Name)
            path1 = path1.parent
            print(path1)
            

            path = os.path.basename(os.path.normpath(Blob_Name))
            print(path)
            os.chdir(path1)
            print(os.getcwd())
            blob = BlobClient.from_connection_string(conn_str= Connection_String, container_name= Temp, blob_name= path)
            

            with open(path, "rb") as data:
                blob.upload_blob(data)
            
            os.chdir(thetemp)
            root.destroy()
    
        except:
            root.destroy()

#Input Image Name And Container Name (ALSO MAKE SURE IMAGE IS IN CHOPPER CHARLIE DIRECTORY!)        
#blob_upload("media")