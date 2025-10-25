# backend/models/user.py
from pymongo import MongoClient
import os
from dotenv import load_dotenv
from werkzeug.security import generate_password_hash, check_password_hash

load_dotenv()
client = MongoClient(os.getenv("MONGO_URI") or "mongodb://localhost:27017/spp_flask")
db = client.get_default_database()


class UserModel:
    collection = db["users"]

    @staticmethod
    def create_user(name, email, password, role="Student"):
        hashed_password = generate_password_hash(password)
        user = {"name": name, "email": email, "password": hashed_password, "role": role}
        res = UserModel.collection.insert_one(user)
        return str(res.inserted_id)

    @staticmethod
    def find_by_email(email):
        return UserModel.collection.find_one({"email": email})

    @staticmethod
    def verify_password(hashed_password, password):
        return check_password_hash(hashed_password, password)

    @staticmethod
    def get_all_users():
        return list(UserModel.collection.find({}, {"password": 0}))  # exclude password
