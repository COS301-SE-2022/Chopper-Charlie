import os
import subprocess

def thisfunct(inpt,outpt,type, box, count):
# Run detections on all files in the inputVideos directory
	lol = os.getcwd()
	os.chdir(lol + "/backend/VideoAI/")
	for fileName in os.listdir("inputVideos/"):
		lastDotIndex = fileName.rfind(".")
		# print(fileName[:lastDotIndex])
		# print("python3 yolo_video.py --input inputVideos/" + fileName + " --output outputVideos/" + \
		# 	fileName[:lastDotIndex] + ".avi --yolo yolo-coco --use-gpu 1")
		cmd = "python3 yolo_video.py --input inputVideos/" + inpt + " --output outputVideos/" + \
			outpt+ " --yolo yolo-coco --list_of_vehicles " + type + " --yn " +box + " --a " + count + " --use-gpu 1"
		print("Running command:\n" + cmd)
		subprocess.run(cmd, shell=True)
