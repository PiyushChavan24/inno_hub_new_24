# backend/models/plagiarism_report.py
from pymongo import MongoClient
import os
from dotenv import load_dotenv
from datetime import datetime

load_dotenv()
client = MongoClient(os.getenv("MONGO_URI") or "mongodb://localhost:27017/spp_flask")
db = client.get_default_database()


class PlagiarismReportModel:
    collection = db["plagiarismreports"]

    @staticmethod
    def create_report(project_id, compared_with, similarity_percentage, report_details):
        report = {
            "projectId": project_id,
            "comparedWith": compared_with,
            "similarityPercentage": similarity_percentage,
            "report": report_details,
            "createdAt": datetime.utcnow(),
        }
        res = PlagiarismReportModel.collection.insert_one(report)
        return str(res.inserted_id)

    @staticmethod
    def get_reports_for_project(project_id):
        return list(
            PlagiarismReportModel.collection.find({"projectId": project_id})
        )

    @staticmethod
    def get_all_reports():
        return list(PlagiarismReportModel.collection.find())
