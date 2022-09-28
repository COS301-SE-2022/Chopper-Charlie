# Import flask and datetime module for showing date and time



from flask import jsonify, request
from io import BytesIO
from flask import Flask, request
import os
import sys
import inspect

currentdir = os.path.dirname(os.path.abspath(
    inspect.getfile(inspect.currentframe())))
parentdir = os.path.dirname(currentdir)
sys.path.insert(0, parentdir)
from AzureContainerCreate.azurecreatecontainer import create_container
from AzureBlobRetrieve.azureblobretrieve import blob_retrieve
from AzureContainerRetrieve.azurecontainerretrieve import list_blobs_in_container
from AzureBlobDelete.azureblobdelete import delete_blob
from AzureBlobUpload.azureblobupload import blob_upload
from VideoAI.inputVideos.downdel import blob_retrieveee
# from ImageAI.vehicle_counting import blob_retrievee
# from ImageAI.vehicle_detector import VehicleDetector
from firebase import *
from azure_storage import *

# from ImageAI.vehicle_counting import blob_retrievee
# from ImageAI.vehicle_detector import VehicleDetector

app = Flask(__name__)

# Route for seeing a data


@app.route('/mydatapage/<index_boo>')
def Show_Containers_Blobs(index_boo):

    l_s = list_blobs_in_container(index_boo)
    
    data = list(filter(lambda x: "Analyse" not in x, l_s))
    
    return {"mydata": data }


@app.route('/mydatapageall/<index_boo>')
def Show_Containers_Blobsss(index_boo):

    data = list_blobs_in_container(index_boo)
    
    
    
    return {"mydata": data }

@app.route('/mydatapageanalyse/<index_boo>')
def Show_Containers_Blobss(index_boo):
    l_s = list_blobs_in_container(index_boo)
    
    data = list(filter(lambda x: "Analyse" in x, l_s))
    
    return {"mydata": data }


@app.route("/lol/<index_no>/<index_glo>")
def download_blobs(index_no, index_glo):
    blob_retrieve(index_no, index_glo)
    return "True"


@app.route("/cc/<index_noo>")
def create_thecontainer(index_noo):

    return create_container(index_noo)


@app.route("/db/<index_clo>/<index_cloo>")
def blob_deletion(index_clo, index_cloo):
    try:
        delete_blob(index_clo, index_cloo)
    except Exception as e:
        return {"Message": "Error Deleting Media"}
    return {"Message": "Succesfully Deleted!"}


@app.route("/ub/<index_ubloo>")
def b_upload(index_ubloo):
    blob_upload(index_ubloo)
    return "True"

# @app.route("/ai/<index_sno>/<index_snoo>")
# def ai_image(index_sno,index_snoo):
# 	blob_retrievee(index_sno,index_snoo)
# 	return "True"


@app.route("/ai/video/<index_snot>/<index_snoot>/<index_snooot>/<index_snoooot>/<index_snooooot>")
def ai_video(index_snot, index_snoot, index_snooot, index_snoooot, index_snooooot):
    try:
        blob_retrieveee(index_snot, index_snoot, index_snooot,
                        index_snoooot, index_snooooot)
        Temp = index_snoot.replace('@', '')
        Temp = Temp.replace(".", "")
        Temp = Temp.replace("_", "")

        with open("backend/count.txt", "r") as file:
            data = file.read().rstrip()
        
        email = index_snoot
        fileName = "Analysed"+index_snot
        obj = index_snooot    
        add_results(email, fileName, data, obj) 
    
            
    except Exception as e:
        return {"Message": "Error Analysing Media"}
    return {"Count": "Object Count: "+str(data), "Message": "Succesfully Analysed!", "Link": "https://choppercharlie.blob.core.windows.net/"+Temp+"/Analysed"+index_snot}


@app.route("/ur/<containername>", methods=['POST'])
def upload_file(containername):

    file = request.files['file_from_react']
    filename = file.filename
        
                    

    if "(" not in filename:
        if ")" not in filename:
            if " " not in filename:
                if "-" not in filename:
                    if ".mp4"  in filename:
                        file_bytes = file.read()
                        blob_upload(file_bytes, filename, containername)
                        return {"Message": "Success"}
                    elif ".jpg"  in filename:
                        file_bytes = file.read()
                        blob_upload(file_bytes, filename, containername)
                        return {"Message": "Success"}
                    elif ".jpeg"  in filename:
                        file_bytes = file.read()
                        blob_upload(file_bytes, filename, containername)
                        return {"Message": "Success"}
                    else:
                        return {"Message": "Incorrect FileType"}
                    
                else:
                    return {"Message": "Filename can only contain Letters And Numbers and NO SPACES"}
            else:
                return {"Message": "Filename can only contain Letters And Numbers and NO SPACES"}
        else:
            return {"Message": "Filename can only contain Letters And Numbers and NO SPACES"}
    else:
        return {"Message": "Filename can only contain Letters And Numbers and NO SPACES"}





########################################### ADMIN FUNCTIONS ###########################################

# Return list of all users
@app.route('/accounts/<uid>')
def accounts(uid):
	return list_accounts(uid)

# Delete User Account
@app.route('/delete-user/<uid>/<email>')
def delete_account(uid, email):
	return delete_user(uid, email)

# MAke User Admin
@app.route('/make-admin/<uid>/<email>')
def make_user_admin(uid, email):
	return make_admin(uid, email)

# Make Admin a User
@app.route('/remove-admin/<uid>/<email>')
def make_admin_user(uid, email):
	return remove_admin(uid, email)

# Get SAS URL
@app.route('/get-sas/<uid>')
def get_sas(uid):
	type = get_type(uid)
	if type == "ADMIN":
		return get_account_sas(uid.lower())
	if type == "USER":
		return get_container_sas(uid.lower())
	return {"ERROR": {"code": 401, "message": "UNAUTHORIZED"}}


@app.route('/get-type/<email>')
def get_account_type(email):
    return get_type_email(email)


# Running app
if __name__ == '__main__':
    app.run(debug=True)
