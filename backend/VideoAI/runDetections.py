import os
import subprocess
import sys
from azure.storage.blob import BlobClient
Connection_String = "DefaultEndpointsProtocol=https;AccountName=choppercharlie;AccountKey=Bcrvc/ix8TmB/hoEE2fmp44iHAqEWeiZ1fr7Fml9Z0+Q7RI8NvX2kbqzeufPKHRY54hk+wFgE/+a+AStzl2qTw==;EndpointSuffix=core.windows.net"


def thisfunct(inpt,outpt,type, box, count, cn):
# Run detections on all files in the inputVideos directory
	outpt = "Analysed"+outpt
	lol = os.getcwd()
	os.chdir(lol + "/backend/VideoAI/")
	# print(fileName[:lastDotIndex])
	# print("python3 yolo_video.py --input inputVideos/" + fileName + " --output outputVideos/" + \
	# 	fileName[:lastDotIndex] + ".avi --yolo yolo-coco --use-gpu 1")
	
	cmd = "python3 yolo_video.py --input inputVideos/" + inpt + " --output outputVideos/" + \
		outpt+ " --yolo yolo-coco --list_of_vehicles " + type +  " --yn " +box + " --a " + count + " --tc " + cn + " --ct " + outpt +" --use-gpu 1"
	print("Running command:\n" + cmd)
	
	subprocess.run(cmd, shell=True)
	blob = BlobClient.from_connection_string(conn_str= Connection_String, container_name= cn, blob_name= outpt) 
	print("ssssssssssssssssssssssssssssssssssssssssssssssssssssssss")

	with open("outputVideos/"+outpt, "rb") as data:
		blob.upload_blob(data,overwrite = True)
		print("balllllllllllllllllllllllllllllllllllllllllllsssssssssssssssssssssssssssssssssssssssssssssssssssss")
	
	os.remove("inputVideos/"+inpt)
	os.remove("outputVideos/"+outpt)
	os.chdir(lol)
	print("ppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppp")
