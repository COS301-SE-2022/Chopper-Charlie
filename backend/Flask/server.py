# Import flask and datetime module for showing date and time
from flask import Flask, request
import os
import sys
import inspect


currentdir = os.path.dirname(os.path.abspath(inspect.getfile(inspect.currentframe())))
parentdir = os.path.dirname(currentdir)
sys.path.insert(0, parentdir) 
from AzureContainerCreate.azurecreatecontainer import create_container
from AzureBlobRetrieve.azureblobretrieve import blob_retrieve
from AzureContainerRetrieve.azurecontainerretrieve import list_blobs_in_container
from AzureBlobDelete.azureblobdelete import delete_blob
from AzureBlobUpload.azureblobupload import blob_upload
#from ImageAI.vehicle_counting import blob_retrievee
#from ImageAI.vehicle_detector import VehicleDetector
from VideoAI.inputVideos.downdel import blob_retrieveee

app = Flask(__name__)

# Route for seeing a data
@app.route('/mydatapage/<index_boo>')
def Show_Containers_Blobs(index_boo):

	# Returning an api for showing in reactjs

	return {"mydata":list_blobs_in_container(index_boo)}

@app.route("/lol/<index_no>/<index_glo>")
def download_blobs(index_no,index_glo):
	blob_retrieve(index_no,index_glo)
	return "True" 


@app.route("/cc/<index_noo>")
def create_thecontainer(index_noo):

		return create_container(index_noo)

@app.route("/db/<index_clo>/<index_cloo>")
def blob_deletion(index_clo,index_cloo):

		return delete_blob(index_clo,index_cloo)

@app.route("/ub/<index_ubloo>")
def b_upload(index_ubloo):
	blob_upload(index_ubloo)
	return "True"

# @app.route("/ai/<index_sno>/<index_snoo>")
# def ai_image(index_sno,index_snoo):
# 	blob_retrievee(index_sno,index_snoo)
# 	return "True"

@app.route("/ai/video/<index_snot>/<index_snoot>/<index_snooot>/<index_snoooot>/<index_snooooot>")
def ai_video(index_snot,index_snoot,index_snooot,index_snoooot,index_snooooot):
	blob_retrieveee(index_snot,index_snoot,index_snooot,index_snoooot,index_snooooot)
	return "True"


# Running app
if __name__ == '__main__':
	app.run(debug=True)
