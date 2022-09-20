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

