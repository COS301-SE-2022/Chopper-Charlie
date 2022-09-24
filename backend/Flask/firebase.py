import firebase_admin
from firebase_admin import auth
from firebase_admin import firestore
from firebase_admin import credentials
from azure_storage import create_user_container, delete_container
import json

cred = credentials.Certificate("firebasePrivateKey.json")
default_app = firebase_admin.initialize_app(cred)
db = firestore.client()


# Setting a Super User
# auth.set_custom_user_claims('nfHcof5vbgTO0V51tXChD8xkFX82', {'admin': True, 'super': True})

# Setting a Admin User
# auth.set_custom_user_claims('Wz0QluNMCSVClm13Vyd4jpc225X2', {'admin': True})


# user1 = auth.get_user('nfHcof5vbgTO0V51tXChD8xkFX82')
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
    
    
    # Make a User an Admin
def make_admin(uid, email):
    try:
        admin = auth.get_user(uid)
        user = auth.get_user_by_email(email)
        city_ref = db.collection(u'users').document(user.uid)
        if  admin.custom_claims.get('super') == True:
            if user.custom_claims == None or user.custom_claims.get('admin') == False or user.custom_claims.get('admin') == None:
                auth.set_custom_user_claims(user.uid, {'admin': True})
                city_ref.update({u'role': 'admin'})
                # IF ACTION IS SUCCESSFUL
                return {"SUCCESS": {"code": 200, "message": "User is now an Admin"}}
            # IF ACTION HAS ALREADY BEEN DONE
            return {"SUCCESS": {"code": 202, "message": "User is already an Admin"}}
        # IF REQUESTING USER IS NOT A SUPER USER
        return {"ERROR": {"code": 403, "message": "FORBIDDEN - You do not have permission"}}
    except:
        # IF REQUESTING USER IS NOT A USER
        return {"ERROR": {"code": 401, "message": "UNAUTHORIZED"}}
    
    
    # Make an Admin a User    
def remove_admin(uid, email):
    try:
        admin = auth.get_user(uid)
        user = auth.get_user_by_email(email)
        city_ref = db.collection(u'users').document(user.uid)
        if  admin.custom_claims.get('super') == True:
            not_super = user.custom_claims.get('super') == None or user.custom_claims.get('super') == False
            if user.custom_claims.get('admin') == True  and not_super:
                auth.set_custom_user_claims(user.uid, {'admin': False})
                city_ref.update({u'role': 'user'})
                # IF ACTION IS SUCCESSFUL
                return {"SUCCESS": {"code": 200, "message": "User removed as Admin"}}       
            # IF ACTION HAS ALREADY BEEN DONE
            return {"ERROR": {"code": 202, "message": "Action could not be completed"}}
        # IF REQUESTING USER IS NOT A SUPER USER
        return {"ERROR": {"code": 403, "message": "FORBIDDEN - You do not have permission"}}
    except: 
        # IF REQUESTING USER IS NOT A USER
        return {"ERROR": {"code": 401, "message": "UNAUTHORIZED"}}
    
    
def delete_user(uid, email):
    try:
        admin = auth.get_user(uid)
        user = auth.get_user_by_email(email)
        
        conatainer = email
        conatainer = conatainer.replace('@', '')
        conatainer = conatainer.replace('.', '')
        conatainer = conatainer.replace('_', '')
        na = user.custom_claims.get('admin') == None or user.custom_claims.get('admin') == False
        ss = admin.custom_claims.get('admin') == True and na
        aa = admin.custom_claims.get('super') == True and user.custom_claims.get('super') == None
        # IF (SUPER DELETING NOT SUPER) OR (ADMIN DELETING NOT ADMIN)
        if ss or aa:
            delete_container(conatainer)                                # Delete the AzureStorage Container ---> move to server
            db.collection(u'users').document(user.uid).delete()          # Delete the User from Firestore
            db.collection(u'pipelines').document(user.uid).delete()      # Delete the User's Pipeline from Firestore
            auth.delete_user(user.uid)                                  # Delete the User from Firebase
            return {"SUCCESS": {"code": 200, "message": "User account deleted"}}

        return {"ERROR": {"code": 403, "message": "FORBIDDEN - You do not have permission"}}
    except:
        return {"ERROR": {"code": 401, "message": "UNAUTHORIZED"}}
    
    # Return user role
def get_type(uid):
    try:
        user = auth.get_user(uid)
        print(user.custom_claims)
        print('the user is' + user.uid)
        if (not user.custom_claims) or user.custom_claims.get('admin') == None or user.custom_claims.get('admin') == False:
            print('user is verified')
            return "USER"
        # if user.custom_claims.get('admin') == True:
        return "ADMIN"
    except:
        return "UNAUTHORIZED"


def get_type_email(email):
    try:
        user = auth.get_user_by_email(email)
        print(user.custom_claims)
        print('the user is' + user.uid)
        if (not user.custom_claims) or user.custom_claims.get('admin') == None or user.custom_claims.get('admin') == False:
            print('user is verified')
            return {"role": "user"}
        if user.custom_claims.get('super') == True:
            print('user is verified')
            return {"role": "super"}
        # if user.custom_claims.get('admin') == True:
        return{"role": "admin"}
    except:
        return {"role": "UNAUTHORIZED"}
    
    
def add_results(email ,filename, count, obj):
    try:
        print('adding results')
        user = auth.get_user_by_email(email)
        print('user found')
        doc_ref = db.collection(u'results').document(user.uid)
        print('doc ref found')
        doc_ref.set({filename: {obj : count}}, merge=True) 
        # doc_ref.set({[{filename: [{obj : count}]}]}, merge=True) 
    except Exception as e:
        print(e)
        
# add_results('bitcoders7860@gmail.com', 'test.jpg', 5, 'car')
# add_results('bitcoders7860@gmail.com', 'test.jpg', 5, 'truck')
# add_results('bitcoders7860@gmail.com', 'test2.jpg', 4, 'person')
# add_results('bitcoders7860@gmail.com', 'test2.jpg', 2, 'cow')
# add_results('bitcoders7860@gmail.com', 'test3.jpg', 12, 'bus')
# add_results('bitcoders7860@gmail.com', 'test3.jpg', 11, 'sheep')
# add_results('bitcoders7860@gmail.com', 'test4.jpg', 12, 'person')
# add_results('bitcoders7860@gmail.com', 'test4.jpg', 15, 'boat')