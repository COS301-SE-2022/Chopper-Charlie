# Import flask and datetime module for showing date and time
from crypt import methods
from flask import Flask, request
import os
import sys
import inspect

currentdir = os.path.dirname(os.path.abspath(inspect.getfile(inspect.currentframe())))
parentdir = os.path.dirname(currentdir)
sys.path.insert(0, parentdir) 

from AzureBlobRetrieve.azureblobretrieve import blob_retrieve
from AzureContainerRetrieve.azurecontainerretrieve import list_blobs_in_container
app = Flask(__name__)

# Route for seeing a data
@app.route('/mydatapage')
def Show_Containers_Blobs():

	# Returning an api for showing in reactjs

	return {"mydata":list_blobs_in_container("media")}

@app.route("/lol/<index_no>")
def download_blobs(index_no):

		return blob_retrieve(index_no,"media")

	
# Running app
if __name__ == '__main__':
	app.run(debug=True)
