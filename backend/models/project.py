# backend/models/project.py
from pymongo import MongoClient
import os
from dotenv import load_dotenv
from datetime import datetime

load_dotenv()
client = MongoClient(os.getenv("MONGO_URI") or "mongodb://localhost:27017/spp_flask")
db = client.get_default_database()


class ProjectModel:
    collection = db["projects"]

    @staticmethod
    def upload_project(title, description, uploaded_by, file_path):
        project = {
            "title": title,
            "description": description,
            "uploadedBy": uploaded_by,
            "filePath": file_path,
            "uploadDate": datetime.utcnow(),
            "approved": False,  # admin can approve later
        }
        res = ProjectModel.collection.insert_one(project)
        return str(res.inserted_id)

    @staticmethod
    def get_all_projects():
        return list(ProjectModel.collection.find())

    @staticmethod
    def get_project_by_id(project_id):
        from bson.objectid import ObjectId
        return ProjectModel.collection.find_one({"_id": ObjectId(project_id)})

    @staticmethod
    def approve_project(project_id):
        from bson.objectid import ObjectId
        res = ProjectModel.collection.update_one(
            {"_id": ObjectId(project_id)}, {"$set": {"approved": True}}
        )
        return res.modified_count > 0
