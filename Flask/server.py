# Import flask and datetime module for showing date and time
from flask import Flask
import os
import sys
import inspect

currentdir = os.path.dirname(os.path.abspath(inspect.getfile(inspect.currentframe())))
parentdir = os.path.dirname(currentdir)
sys.path.insert(0, parentdir) 



from AzureContainerRetrieve.azurecontainerretrieve import list_blobs_in_container
app = Flask(__name__)

# Route for seeing a data
@app.route('/data')
def get_time():

	# Returning an api for showing in reactjs

	return {"data":list_blobs_in_container("media")}

	
# Running app
if __name__ == '__main__':
	app.run(debug=True)
