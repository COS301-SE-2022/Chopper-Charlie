from ast import Try
from azure.storage.blob import BlobServiceClient, ContainerClient, BlobClient
from datetime import datetime, timedelta
from dataclasses import replace
from tkinter import messagebox
import tkinter
from tkinter import filedialog
import os
from pathlib import Path
from tkinter import messagebox
from dotenv import load_dotenv

load_dotenv()


Connection_String = os.getenv("AZURE_STORAGE_CONNECTION_STRING")
key = os.getenv("AZURE_STORAGE_KEY")
account_name = os.getenv("AZURE_STORAGE_ACCOUNT_NAME")


def list_blobs_in_container(Containers_Name):
    try:
        Temp = Containers_Name.replace("@", "")
        Temp = Temp.replace(".", "")
        Temp = Temp.replace("_", "")
        print(Temp)
        # Instantiate a BlobServiceClient using a connection string
        blob_service_client = BlobServiceClient.from_connection_string(
            Connection_String
        )
        mylist = []
        # Instantiate a ContainerClient
        container_client = blob_service_client.get_container_client(Temp)

        # [START list_blobs_in_container]
        blobs_list = container_client.list_blobs()
        for blob in blobs_list:
            # print(blob.name + '\n')
            mylist.append(blob.name)
        print(mylist)
        return mylist
    except:
        errlist = ["Loading..."]
        print(errlist)
        return errlist


# Call Function with parameter
# list_blobs_in_container("tariqcarrim@gmail.com")


def create_container(Containers_Name):
    Temp = Containers_Name.replace("@", "")
    Temp = Temp.replace(".", "")
    Temp = Temp.replace("_", "")
    container_client = ContainerClient.from_connection_string(
        conn_str=Connection_String, container_name=Temp
    )
    container_client.create_container(public_access="blob")


# create_container("test_lol@gmail.com")


def blob_upload(Containers_Name):

    thetemp = os.getcwd()
    # root.mainloop()

    root = tkinter.Tk()
    root.withdraw()
    try:
        file_path = filedialog.askopenfilename()

        Blob_Name = file_path
        Temp = Containers_Name.replace("@", "")
        Temp = Temp.replace(".", "")
        Temp = Temp.replace("_", "")
        path1 = Path(Blob_Name)
        path1 = path1.parent
        print(path1)

        path = os.path.basename(os.path.normpath(Blob_Name))
        print(path)
        os.chdir(path1)
        print(os.getcwd())
        blob = BlobClient.from_connection_string(
            conn_str=Connection_String, container_name=Temp, blob_name=path
        )

        with open(path, "rb") as data:
            blob.upload_blob(data, content_type="image")

        messagebox.showinfo("Success", "Successfully uploaded media")  # added now
        os.chdir(thetemp)
        root.destroy()

    except:
        root.destroy()


# Input Image Name And Container Name (ALSO MAKE SURE IMAGE IS IN CHOPPER CHARLIE DIRECTORY!)
# blob_upload("media")


def blob_retrieve(Blob_Name, Containers_Name):
    try:
        Temp = Containers_Name.replace("@", "")
        Temp = Temp.replace(".", "")
        Temp = Temp.replace("_", "")
        blob = BlobClient.from_connection_string(
            conn_str=Connection_String, container_name=Temp, blob_name=Blob_Name
        )

        with open("backend/AzureBlobRetrieve/" + Blob_Name, "wb") as my_blob:
            stream = blob.download_blob()
            data = stream.readall()
            my_blob.write(data)
            messagebox.showinfo("Success", "Successfully Downloaded media")  # added now

    except:
        print("Error!")


#
# Input Image Name And Container Name
# blob_retrieve("Test88.jpg","media")


def delete_blob(Blob_Name, Containers_Name):
    blob_service_client = BlobServiceClient.from_connection_string(Connection_String)
    Temp = Containers_Name.replace("@", "")
    Temp = Temp.replace(".", "")
    Temp = Temp.replace("_", "")
    container_client = blob_service_client.get_container_client(Temp)
    blob_client = container_client.get_blob_client(Blob_Name)
    blob_client.delete_blob()
    messagebox.showinfo("Success", "Successfully Deleted media")  # added now
    
    
    ####################### ADMIN FUNCTIONS ########################################################

# Delete User Container
def delete_container(Container_Name):
    try:
        container_client = ContainerClient.from_connection_string(conn_str=Connection_String, container_name=Container_Name)
        container_client.delete_container()
    except:
        print("Could Not Delete Container")

# Create User Container
def create_user_container(uid):
    try:
        container_client = ContainerClient.from_connection_string(conn_str=Connection_String, container_name=uid.lower())
        container_client.create_container()
    except:
        print("Could Not Create Container")
        
def get_account_sas():
    from azure.storage.blob import ResourceTypes, AccountSasPermissions, generate_account_sas
    
    sas_token = generate_account_sas(
        account_name=account_name,
        account_key=key,
        resource_types=ResourceTypes(service=True, container=True, object=True),
        permission=AccountSasPermissions(read=True, write=True, delete=True, list=True, _spr=True),
        expiry=datetime.utcnow() + timedelta(hours=2)
    )
    url = "https://{}.blob.core.windows.net/?{}".format(account_name, sas_token)
    return {"sas": url}   


def get_container_sas(user_name):
    from azure.storage.blob import generate_container_sas, ContainerSasPermissions    
    try:
        create_user_container(user_name)
    except:
        print("Container Already Exists")
    
    token = generate_container_sas(
        account_name=account_name,
        container_name=user_name,
        account_key=key,
        permission=ContainerSasPermissions(read=True, write=True, delete=True, list=True, _spr=True),
        expiry=datetime.utcnow() + timedelta(hours=2)
    )
    url = "https://{}.blob.core.windows.net/{}?{}".format(account_name, user_name, token)
    return {"sas": url}