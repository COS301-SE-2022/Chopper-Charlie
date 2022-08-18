from dataclasses import replace
from azure.storage.blob import ContainerClient
Connection_String = "DefaultEndpointsProtocol=https;AccountName=choppercharlie;AccountKey=Bcrvc/ix8TmB/hoEE2fmp44iHAqEWeiZ1fr7Fml9Z0+Q7RI8NvX2kbqzeufPKHRY54hk+wFgE/+a+AStzl2qTw==;EndpointSuffix=core.windows.net"



def create_container(Containers_Name):
    Temp = Containers_Name.replace('@', '')
    Temp = Temp.replace('.', '')
    Temp = Temp.replace('_', '')
    container_client = ContainerClient.from_connection_string(conn_str=Connection_String, container_name=Temp)
    container_client.create_container(public_access = "blob")

#create_container("test_lol@gmail.com")