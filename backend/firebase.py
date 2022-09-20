import firebase_admin
from firebase_admin import auth
from firebase_admin import firestore
from firebase_admin import credentials
from azure_storage import create_user_container, delete_container
import json

cred = credentials.Certificate("")
default_app = firebase_admin.initialize_app(cred)
db = firestore.client()


# Setting a Super User
# auth.set_custom_user_claims('g9wNesaQm4cJTfIozQjFilS2HTg2', {'admin': True, 'super': True})

# Setting a Admin User
# auth.set_custom_user_claims('Wz0QluNMCSVClm13Vyd4jpc225X2', {'admin': True})


# user1 = auth.get_user('g9wNesaQm4cJTfIozQjFilS2HTg2')
# print('isAdmin ' + str(user1.custom_claims.get('admin')) + ', isSuper ' + str(user1.custom_claims.get('super')))
# user2 = auth.get_user('Wz0QluNMCSVClm13Vyd4jpc225X2')
# print('isAdmin ' + str(user2.custom_claims.get('admin')) + ', isSuper ' + str(user2.custom_claims.get('super')))
# user3 = auth.get_user('cyC2i2MrJeQDE3UveMoaFGQ8lcH3')
# print('isAdmin ' + str(user3.custom_claims.get('admin')) + ', isSuper ' + str(user3.custom_claims.get('super')))

# List All the Users in the Database
def list_accounts(uid):
    try:
        admin = auth.get_user(uid)
        docs = db.collection("users").stream()
        accounts = []
        
        # IF REQUESTING USER IS A SUPER USER
        if admin.custom_claims.get('super') == True:
            for doc in docs:
                try:
                    if auth.get_user(doc.id):
                        if auth.get_user(doc.id).custom_claims == None or auth.get_user(doc.id).custom_claims.get('admin') == False:
                            user = doc.to_dict()
                            user['type'] = 'user'
                            accounts.append(user)
                            continue
                        if auth.get_user(doc.id).custom_claims.get('super') == True:
                            user = doc.to_dict()
                            user['type'] = 'super'
                            accounts.append(user)
                            continue
                        if auth.get_user(doc.id).custom_claims.get('admin') == True:
                            user = doc.to_dict()
                            user['type'] = 'admin'
                            accounts.append(user)
                            continue
                except:
                    print(doc.id + ' is not a user\n')

            return {'accounts': accounts}
        
        # IF REQUESTING USER IS AN ADMIN USER
        if admin.custom_claims.get('admin') == True:
            for doc in docs:
                try:
                    if auth.get_user(doc.id):
                        if auth.get_user(doc.id).custom_claims == None or auth.get_user(doc.id).custom_claims.get('admin') == False:
                            user = doc.to_dict()
                            user['type'] = 'user'
                            accounts.append(user)
                            continue
                        if auth.get_user(doc.id).custom_claims.get('super') == True:
                            user = doc.to_dict()
                            user['type'] = 'super'
                            user['containerName'] = None
                            accounts.append(user)
                            continue
                        if auth.get_user(doc.id).custom_claims.get('admin') == True:
                            user = doc.to_dict()
                            user['type'] = 'admin'
                            user['containerName'] = None
                            accounts.append(user)
                            continue
                except:
                    print(doc.id + ' is not a user\n')
            return {'accounts': accounts}
        
        # IF REQUESTING USER IS A NORMAL USER
        return {"ERROR": {"code": 403, "message": "FORBIDDEN - You do not have permission"}}
    except:
        
        # IF REQUESTING USER IS NOT A USER
        return {"ERROR": {"code": 401, "message": "UNAUTHORIZED"}}