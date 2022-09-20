# Import flask and datetime module for showing date and time
from flask import Flask, request
from flask_cors import CORS
import os
import sys
import inspect


currentdir = os.path.dirname(os.path.abspath(inspect.getfile(inspect.currentframe())))
parentdir = os.path.dirname(currentdir)
sys.path.insert(0, parentdir) 
from azure_storage import *
from firebase import *

app = Flask(__name__)
cors = CORS(app, resources={r"/*": {"origins": "*"}})

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

# @app.route("/ai/video/<index_snot>/<index_snoot>/<index_snooot>/<index_snoooot>/<index_snooooot>")
# def ai_video(index_snot,index_snoot,index_snooot,index_snoooot,index_snooooot):
# 	blob_retrieveee(index_snot,index_snoot,index_snooot,index_snoooot,index_snooooot)
# 	return "True"


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
@app.route('/make-admin', methods=['PUT'])
def make_user_admin():
	return make_admin(request.json['uid'], request.json['email'])

# Make Admin a User
@app.route('/remove-admin', methods=['PUT'])
def make_admin_user():
	return remove_admin(request.json['uid'], request.json['email'])

# Get SAS URL
@app.route('/get-sas/<uid>')
def get_sas(uid):
	type = get_type(uid)
	if type == "ADMIN":
		return get_account_sas()
	if type == "USER":
		return get_container_sas(uid.lower())
	return {"ERROR": {"code": 401, "message": "UNAUTHORIZED"}}

# Running app
if __name__ == '__main__':
	app.run(debug=True)
