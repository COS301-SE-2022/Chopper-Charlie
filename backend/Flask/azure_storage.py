
from azure.storage.blob import ContainerClient
from datetime import datetime, timedelta
import os
from dotenv import load_dotenv

load_dotenv()


Connection_String = os.getenv("AZURE_STORAGE_CONNECTION_STRING")
key = os.getenv("AZURE_STORAGE_KEY")
account_name = os.getenv("AZURE_STORAGE_ACCOUNT_NAME")    
    
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
        
def get_account_sas(user_name):
    from azure.storage.blob import ResourceTypes, AccountSasPermissions, generate_account_sas
    try:
        create_user_container(user_name)
    except:
        print("Container Already Exists")
    print('sending admin user sas')
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
    print('sending normal user sas')
    token = generate_container_sas(
        account_name=account_name,
        container_name=user_name,
        account_key=key,
        permission=ContainerSasPermissions(read=True, write=True, delete=True, list=True, _spr=True),
        expiry=datetime.utcnow() + timedelta(hours=2)
    )
    url = "https://{}.blob.core.windows.net/{}?{}".format(account_name, user_name, token)
    return {"sas": url}