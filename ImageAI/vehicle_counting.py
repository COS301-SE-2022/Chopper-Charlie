import os
import cv2
from ImageAI.vehicle_detector import VehicleDetector
from pathlib import Path
from azure.storage.blob import BlobClient

Connection_String = "DefaultEndpointsProtocol=https;AccountName=choppercharlie;AccountKey=Bcrvc/ix8TmB/hoEE2fmp44iHAqEWeiZ1fr7Fml9Z0+Q7RI8NvX2kbqzeufPKHRY54hk+wFgE/+a+AStzl2qTw==;EndpointSuffix=core.windows.net"

def blob_retrievee(Blob_Name, Containers_Name):
    try:
        Temp = Containers_Name.replace('@', '')
        Temp = Temp.replace('.', '')
        Temp = Temp.replace('_', '')
        blob = BlobClient.from_connection_string(conn_str=Connection_String, container_name=Temp, blob_name=Blob_Name)

        with open("ImageAI/"+Blob_Name, "wb") as my_blob:
            stream = blob.download_blob()
            data = stream.readall()
            my_blob.write(data)
        imageai("ImageAI/"+Blob_Name)
    except:
        print('Error!')

def imageai(img_name):
    path1 = os.getcwd()
 
    path1 = Path(path1)
    path1 = path1.parent


    vd = VehicleDetector()


    vehicles_folder_count = 0



    img = cv2.imread(img_name)

    vehicle_boxes = vd.detect_vehicles(img)
    vehicle_count = len(vehicle_boxes)

    vehicles_folder_count += vehicle_count

    for box in vehicle_boxes:
        x, y, w, h = box

        cv2.rectangle(img, (x, y), (x + w, y + h), (25, 0, 180), 3)

        cv2.putText(img, "Cars: " + str(vehicle_count), (20, 50), 0, 2, (100, 200, 0), 3)

    cv2.imshow("Car Recognition", img)
    cv2.waitKey(0)

    print("Cars: ", vehicles_folder_count)
    os.remove(img_name)
#imageai("ImageAI/carss.jpg")