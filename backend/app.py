
from functools import wraps
from flask import request, jsonify, make_response
import jwt
from jwt import ExpiredSignatureError, InvalidTokenError
import os
import uuid
import datetime
import hashlib
import jwt
import mimetypes
from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS, cross_origin
from werkzeug.utils import secure_filename
from werkzeug.exceptions import BadRequest
from pymongo import MongoClient
from bson.objectid import ObjectId
from dotenv import load_dotenv
from utils.file_parser import extract_text_from_file
from utils.plagiarism_model import compare_with_corpus
from flask import send_file
from utils.plag_report_generator import generate_plagiarism_report

# ============================
# Load environment
# ============================
load_dotenv()
UPLOAD_FOLDER = os.getenv("UPLOAD_FOLDER", "uploads")
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

app = Flask(__name__)
# Configure CORS to handle all requests including preflight
CORS(app, 
     origins="*", 
     allow_headers=["Content-Type", "Authorization"], 
     methods=["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
     supports_credentials=False)

app.config["UPLOAD_FOLDER"] = UPLOAD_FOLDER
app.config["MAX_CONTENT_LENGTH"] = 50 * 1024 * 1024  # 50MB

# ============================
# Error Handlers
# ============================
@app.errorhandler(BadRequest)
def handle_bad_request(e):
    """Handle 400 Bad Request errors, especially JSON parsing errors"""
    if request.path.startswith("/api/"):
        # Try to get more info about the error
        error_msg = str(e.description) if hasattr(e, 'description') else str(e)
        print(f"Bad Request on {request.path}: {error_msg}")
        print(f"Content-Type: {request.content_type}")
        print(f"Method: {request.method}")
        print(f"Headers: {dict(request.headers)}")
        
        # Try to read the raw data
        try:
            raw_data = request.get_data(as_text=True)
            print(f"Raw request data: {raw_data[:200]}")  # First 200 chars
        except:
            pass
        
        return jsonify({
            "msg": "Bad request",
            "error": error_msg,
            "path": request.path
        }), 400
    return e

# ============================
# MongoDB Connection
# ============================
client = MongoClient(os.getenv("MONGO_URI") or "mongodb://localhost:27017/")
db = client["student_project_platform"]

users_col = db["users"]
projects_col = db["projects"]
reports_col = db["plagiarism_reports"]

print("✅ Connected to MongoDB:", db.list_collection_names())

JWT_SECRET = os.getenv("JWT_SECRET", "secret")

# ============================
# ✅ Universal ObjectId Converter
# ============================
def convert_objectids(obj):
    if isinstance(obj, list):
        return [convert_objectids(i) for i in obj]
    if isinstance(obj, dict):
        return {k: convert_objectids(v) for k, v in obj.items()}
    if isinstance(obj, ObjectId):
        return str(obj)
    return obj

# ============================
# CORS is handled by Flask-CORS above
# ============================

# ============================
# Helpers
# ============================
def generate_token(user):
    payload = {
        "id": str(user["_id"]),
        "role": user.get("role", "student"),
        "exp": datetime.datetime.utcnow() + datetime.timedelta(days=7),
    }
    return jwt.encode(payload, JWT_SECRET, algorithm="HS256")


def allowed(filename):
    return os.path.splitext(filename)[1].lower() in {".pdf", ".docx", ".txt"}


def resolve_user_name(uploadedBy):
    try:
        uid = ObjectId(str(uploadedBy))
        uploader = users_col.find_one({"_id": uid})
        return uploader["name"] if uploader else "Unknown"
    except Exception:
        return "Unknown"


# Authentication Middleware
# def auth_required(fn):
#     from functools import wraps

#     @wraps(fn)
#     def wrapper(*args, **kwargs):
#         auth = request.headers.get("Authorization", "")
#         if not auth.startswith("Bearer "):
#             return jsonify({"msg": "Auth required"}), 401

#         try:
#             token = auth.split(" ")[1]
#             data = jwt.decode(token, JWT_SECRET, algorithms=["HS256"])
#             request.user_id = data["id"]
#             request.user_role = data.get("role", "student")
#         except Exception as e:
#             return jsonify({"msg": "Invalid token", "error": str(e)}), 401

#         return fn(*args, **kwargs)

#     return wrapper

# def auth_required(fn):
#     from functools import wraps
#     from flask import make_response

#     @wraps(fn)
#     def wrapper(*args, **kwargs):

#         # ✅ Allow OPTIONS (CORS preflight) so browser can continue
#         if request.method == "OPTIONS":
#             return make_response(("", 204))

#         auth = request.headers.get("Authorization", "")
#         if not auth.startswith("Bearer "):
#             return jsonify({"msg": "Auth required"}), 401

#         try:
#             token = auth.split(" ")[1]
#             data = jwt.decode(token, JWT_SECRET, algorithms=["HS256"])
#             request.user_id = data["id"]
#             request.user_role = data.get("role", "student")
#         except Exception as e:
#             return jsonify({"msg": "Invalid token", "error": str(e)}), 401

#         return fn(*args, **kwargs)

#     return wrapper


# def auth_required(fn):
#     from functools import wraps
#     from flask import make_response

#     @wraps(fn)
#     def wrapper(*args, **kwargs):

#         # ✅ Proper CORS preflight handling
#         if request.method == "OPTIONS":
#             response = make_response("", 204)
#             response.headers["Access-Control-Allow-Origin"] = "*"
#             response.headers["Access-Control-Allow-Headers"] = "Authorization, Content-Type"
#             response.headers["Access-Control-Allow-Methods"] = "GET, POST, PUT, PATCH, DELETE, OPTIONS"
#             response.headers["Access-Control-Allow-Credentials"] = "true"
#             return response

#         auth = request.headers.get("Authorization", "")
#         if not auth.startswith("Bearer "):
#             return jsonify({"msg": "Auth required"}), 401

#         try:
#             token = auth.split(" ")[1]
#             data = jwt.decode(token, JWT_SECRET, algorithms=["HS256"])
#             request.user_id = data["id"]
#             request.user_role = data.get("role", "student")
#         except Exception as e:
#             return jsonify({"msg": "Invalid token", "error": str(e)}), 401

#         return fn(*args, **kwargs)

#     return wrapper

def auth_required(fn):
    @wraps(fn)
    def wrapper(*args, **kwargs):
        # Proper CORS preflight handling
        if request.method == "OPTIONS":
            response = make_response("", 204)
            response.headers["Access-Control-Allow-Origin"] = "*"
            response.headers["Access-Control-Allow-Headers"] = "Authorization, Content-Type"
            response.headers["Access-Control-Allow-Methods"] = "GET, POST, PUT, PATCH, DELETE, OPTIONS"
            response.headers["Access-Control-Allow-Credentials"] = "true"
            return response

        auth = request.headers.get("Authorization", "").strip()
        if not auth.startswith("Bearer "):
            return jsonify({"msg": "Auth required"}), 401

        token = auth.split(" ")[1]
        try:
            data = jwt.decode(token, JWT_SECRET, algorithms=["HS256"])
            request.user_id = data["id"]
            request.user_role = data.get("role", "student")
        except ExpiredSignatureError:
            return jsonify({"msg": "Token expired"}), 401
        except InvalidTokenError as e:
            return jsonify({"msg": "Invalid token", "error": str(e)}), 401

        return fn(*args, **kwargs)

    return wrapper
# ============================
# Auth Routes
# ============================
@app.route("/api/auth/signup", methods=["POST", "OPTIONS"])
@cross_origin()
def signup():
    # Handle CORS preflight
    if request.method == "OPTIONS":
        return jsonify({"ok": True}), 200
    
    try:
        # Try to get JSON data with better error handling
        if not request.is_json:
            return jsonify({"msg": "Content-Type must be application/json"}), 400
        
        data = request.get_json(silent=True)
        if not data:
            return jsonify({"msg": "Invalid JSON in request body"}), 400
        
        name = data.get("name")
        email = data.get("email")
        password = data.get("password")
        role = data.get("role", "student")
        university = data.get("university", "")  # <-- new field

        if not (name and email and password and university):
            return jsonify({"msg": "Provide name, email, password, and university"}), 400

        if users_col.find_one({"email": email}):
            return jsonify({"msg": "Email already exists"}), 400

        # ✅ Check if admin already exists for this university
        if role == "admin":
            existing_admin = users_col.find_one({
                "role": "admin",
                "university": university
            })
            if existing_admin:
                return jsonify({
                    "msg": f"An admin already exists for {university}. Only one admin per university is allowed."
                }), 400

        hashed = hashlib.sha256(password.encode()).hexdigest()
        user = {
            "name": name,
            "email": email,
            "password": hashed,
            "role": role,
            "university": university,  # <-- include in user doc
            "createdAt": datetime.datetime.utcnow(),
        }

        res = users_col.insert_one(user)
        user["_id"] = str(res.inserted_id)
        user.pop("password", None)

        token = generate_token(user)
        return jsonify({"token": token, "user": user})
    
    except Exception as e:
        print(f"Signup error: {str(e)}")
        import traceback
        traceback.print_exc()
        return jsonify({"msg": "Server error", "error": str(e)}), 500

@app.route("/api/auth/login", methods=["POST", "OPTIONS"])
@cross_origin()
def login():
    # Handle CORS preflight
    if request.method == "OPTIONS":
        return jsonify({"ok": True}), 200
    
    try:
        # Force JSON parsing - this will handle cases where Content-Type might not be recognized
        data = request.get_json(force=True, silent=True)
        
        # If force=True still returns None, try to parse manually
        if data is None:
            try:
                import json
                raw_data = request.get_data(as_text=True)
                if raw_data:
                    data = json.loads(raw_data)
                else:
                    return jsonify({"msg": "Request body is empty"}), 400
            except json.JSONDecodeError:
                return jsonify({"msg": "Invalid JSON in request body"}), 400
            except Exception as e:
                print(f"Error parsing request: {e}")
                return jsonify({"msg": "Error parsing request", "error": str(e)}), 400
        
        if not isinstance(data, dict):
            return jsonify({"msg": "Request body must be a JSON object"}), 400
        
        email = data.get("email")
        password = data.get("password")

        if not email or not password:
            return jsonify({"msg": "Provide email and password"}), 400

        user = users_col.find_one({"email": email})
        if not user:
            return jsonify({"msg": "Invalid credentials"}), 400

        hashed = hashlib.sha256(password.encode()).hexdigest()
        if hashed != user.get("password"):
            return jsonify({"msg": "Invalid credentials"}), 400

        token = generate_token(user)
        user["_id"] = str(user["_id"])
        user.pop("password", None)

        return jsonify({"token": token, "user": user})
    
    except Exception as e:
        print(f"Login error: {str(e)}")
        import traceback
        traceback.print_exc()
        return jsonify({"msg": "Server error", "error": str(e)}), 500

@app.route("/", methods=["GET"])
def index():
    return "Flask server is running!"


# ============================
# ✅ Admin Overview
# ============================
@app.route("/api/admin/overview", methods=["GET", "OPTIONS"])
@cross_origin()
@auth_required
def admin_overview():
    if request.user_role != "admin":
        return jsonify({"msg": "Admin access only"}), 403

    try:
        return jsonify({
            "total_users": users_col.count_documents({}),
            "total_students": users_col.count_documents({"role": "student"}),
            "total_mentors": users_col.count_documents({"role": "mentor"}),
            "total_projects": projects_col.count_documents({}),
            "total_reports": reports_col.count_documents({}),
        }), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500


# ============================
# ✅ Admin: Get ALL Projects Uploaded by Users
# ============================
@app.route("/api/admin/projects", methods=["GET", "OPTIONS"])
@cross_origin()
@auth_required
def admin_all_projects():
    if request.user_role != "admin":
        return jsonify({"msg": "Admin access only"}), 403

    try:
        projects = []

        for p in projects_col.find().sort("uploadDate", -1):
            p = convert_objectids(p)

            # resolve uploader name
            p["uploadedBy"] = resolve_user_name(p.get("uploadedBy"))

            # ensure default values
            p["approved"] = p.get("approved", False)
            p["download_count"] = p.get("download_count", 0)

            projects.append(p)

        return jsonify({"projects": projects}), 200

    except Exception as e:
        return jsonify({"msg": "Server error", "error": str(e)}), 500

# ✅ NEW ROUTE: ADMIN CAN DELETE ANY PROJECT
@app.route("/api/admin/projects/<project_id>", methods=["DELETE", "OPTIONS"])
@cross_origin(
    methods=["DELETE", "OPTIONS"],
    allow_headers=["Authorization", "Content-Type"],
    supports_credentials=True
)
@auth_required
def admin_delete_project(project_id):
    try:
        # ✅ Only admin allowed
        if request.user_role != "admin":
            return jsonify({"msg": "Admin access only"}), 403

        project = projects_col.find_one({"_id": ObjectId(project_id)})
        if not project:
            return jsonify({"msg": "Project not found"}), 404

        # ✅ Remove file if exists
        file_path = project.get("filePath")
        if file_path and os.path.exists(file_path):
            try:
                os.remove(file_path)
            except Exception as e:
                print("Warning: failed to remove file:", e)

        # ✅ Delete document from DB
        projects_col.delete_one({"_id": ObjectId(project_id)})

        return jsonify({"msg": "Project deleted by admin"}), 200

    except Exception as e:
        return jsonify({"msg": "Server error", "error": str(e)}), 500
    
    
# ==========================================
# ✅ Mentor: List All Student Projects
# ==========================================
# @app.route("/api/mentor/projects", methods=["GET", "OPTIONS"])
# @cross_origin()
# @auth_required
# def mentor_projects():
#     if request.user_role not in ["mentor", "admin"]:
#         return jsonify({"msg": "Access denied"}), 403

#     try:
#         projects = []
#         for p in projects_col.find().sort("uploadDate", -1):
#             p["_id"] = str(p["_id"])
#             uploader = users_col.find_one({"_id": ObjectId(p["uploadedBy"])})

#             p["uploadedBy"] = uploader["name"] if uploader else "Unknown"
#             projects.append(p)

#         return jsonify({"projects": projects}), 200

#     except Exception as e:
#         return jsonify({"msg": "Server error", "error": str(e)}), 500


# ==========================================
# ✅ Mentor Overview
# ==========================================
@app.route("/api/mentor/overview", methods=["GET", "OPTIONS"])
@cross_origin()
@auth_required
def mentor_overview():
    if request.user_role not in ["mentor", "admin"]:
        return jsonify({"msg": "Access denied"}), 403

    try:
        return jsonify({
            "totalProjects": projects_col.count_documents({}),
            "pendingApprovals": projects_col.count_documents({"approved": False}),
            "approvedProjects": projects_col.count_documents({"approved": True})
        }), 200

    except Exception as e:
        return jsonify({"msg": "Server error", "error": str(e)}), 500

# ==========================================
# ✅ Mentor: List Only Projects Assigned to This Mentor
# ==========================================
# @app.route("/api/mentor/projects", methods=["GET", "OPTIONS"])
# @cross_origin()
# @auth_required
# def mentor_projects():
#     if request.user_role not in ["mentor", "admin"]:
#         return jsonify({"msg": "Access denied"}), 403

#     try:
#         mentor_id = ObjectId(request.user_id)
#         projects = []

#         # ✅ Filter projects by mentorId
#         for p in projects_col.find({"mentorId": mentor_id}).sort("uploadDate", -1):
#             p = convert_objectids(p)

#             # resolve uploader name
#             uploader = users_col.find_one({"_id": ObjectId(p["uploadedBy"])})
#             p["uploadedBy"] = uploader["name"] if uploader else "Unknown"

#             projects.append(p)

#         return jsonify({"projects": projects}), 200

#     except Exception as e:
#         return jsonify({"msg": "Server error", "error": str(e)}), 500


@app.route("/api/mentor/projects", methods=["GET", "OPTIONS"])
@cross_origin()
@auth_required
def mentor_projects():
    """
    ✅ Get all projects assigned to the logged-in mentor
    Returns projects where mentorId matches the current user's ID
    """
    try:
        # ✅ Verify user is a mentor or admin
        if request.user_role not in ["mentor", "admin"]:
            return jsonify({"msg": "Access denied. Mentor or admin role required"}), 403

        mentor_id = ObjectId(request.user_id)  # ✅ convert string to ObjectId

        projects = []
        
        # ✅ Find all projects assigned to this mentor
        for p in projects_col.find({"mentorId": mentor_id}).sort("uploadDate", -1):
            p = convert_objectids(p)

            # ✅ Resolve uploader/student name safely
            if p.get("uploadedBy"):
                try:
                    uploader = users_col.find_one({"_id": ObjectId(p.get("uploadedBy"))})
                    p["uploadedBy"] = uploader["name"] if uploader else "Unknown"
                except:
                    p["uploadedBy"] = "Unknown"
            else:
                p["uploadedBy"] = "Unknown"

            # ✅ Ensure all required fields have defaults
            p["approved"] = p.get("approved", False)
            p["download_count"] = p.get("download_count", 0)
            p["category"] = p.get("category", "")
            p["description"] = p.get("description", "")
            
            # ✅ Ensure teammates array is properly formatted
            if not p.get("teammates"):
                p["teammates"] = []
            
            # ✅ Include mentor info if available
            if p.get("mentor"):
                mentor_info = p.get("mentor", {})
                if isinstance(mentor_info, dict):
                    p["mentorName"] = mentor_info.get("name") or p.get("mentorName", "N/A")
                    p["mentorEmail"] = mentor_info.get("email") or p.get("mentorEmail", "N/A")

            projects.append(p)

        return jsonify({"projects": projects}), 200

    except Exception as e:
        import traceback
        print("Error in /api/mentor/projects:")
        traceback.print_exc()
        return jsonify({"msg": "Server error", "error": str(e)}), 500

# ==========================================
# ✅ Approve Project
# ==========================================
# @app.route("/api/mentor/approve/<project_id>", methods=["PATCH", "OPTIONS"])
# @cross_origin()
# @auth_required
# def approve_project(project_id):
#     if request.user_role not in ["mentor", "admin"]:
#         return jsonify({"msg": "Access denied"}), 403

#     try:
#         projects_col.update_one(
#             {"_id": ObjectId(project_id)},
#             {"$set": {"approved": True}}
#         )

#         return jsonify({"msg": "Project approved"}), 200

#     except Exception as e:
#         return jsonify({"msg": "Server error", "error": str(e)}), 500

# ✅ NEW: Mentor Approve Route (matches frontend)
@app.route("/api/mentor/projects/<project_id>/approve", methods=["PATCH", "OPTIONS"])
@cross_origin()
@auth_required
def approve_project_alt(project_id):
    if request.user_role not in ["mentor", "admin"]:
        return jsonify({"msg": "Access denied"}), 403

    try:
        projects_col.update_one(
            {"_id": ObjectId(project_id)},
            {"$set": {"approved": True}}
        )
        return jsonify({"msg": "Project approved"}), 200

    except Exception as e:
        return jsonify({"msg": "Server error", "error": str(e)}), 500

# ============================
# Update Project
# ============================
@app.route("/api/projects/<project_id>", methods=["PUT", "OPTIONS"])
@cross_origin()
@auth_required
def update_project(project_id):
    try:
        project = projects_col.find_one({"_id": ObjectId(project_id)})
        if not project:
            return jsonify({"msg": "Project not found"}), 404

        if str(project["uploadedBy"]) != request.user_id:
            return jsonify({"msg": "Unauthorized"}), 403

        content_type = request.content_type or ""
        if content_type.startswith("multipart/form-data"):
            title = request.form.get("title", project.get("title"))
            description = request.form.get("description", project.get("description"))

            file = request.files.get("file")
            if file:
                filename = f"{uuid.uuid4().hex}_{secure_filename(file.filename)}"
                save_path = os.path.join(app.config["UPLOAD_FOLDER"], filename)
                file.save(save_path)

                text = extract_text_from_file(save_path)

                projects_col.update_one(
                    {"_id": ObjectId(project_id)},
                    {"$set": {
                        "title": title,
                        "description": description,
                        "filePath": save_path,
                        "textContent": text,
                    }}
                )
            else:
                projects_col.update_one(
                    {"_id": ObjectId(project_id)},
                    {"$set": {"title": title, "description": description}}
                )
        else:
            data = request.json or {}
            update_data = {}

            if "title" in data:
                update_data["title"] = data["title"]
            if "description" in data:
                update_data["description"] = data["description"]

            if update_data:
                projects_col.update_one(
                    {"_id": ObjectId(project_id)},
                    {"$set": update_data}
                )

        return jsonify({"msg": "Project updated successfully"}), 200

    except Exception as e:
        return jsonify({"msg": "Server error", "error": str(e)}), 500


# ============================
# Delete Project
# ============================
@app.route("/api/projects/<project_id>", methods=["DELETE", "OPTIONS"])
@cross_origin()
@auth_required
def delete_project(project_id):
    try:
        project = projects_col.find_one({"_id": ObjectId(project_id)})
        if not project:
            return jsonify({"msg": "Project not found"}), 404

        if str(project["uploadedBy"]) != request.user_id:
            return jsonify({"msg": "Unauthorized"}), 403

        file_path = project.get("filePath")
        if file_path and os.path.exists(file_path):
            try:
                os.remove(file_path)
            except Exception as e:
                print("Warning: failed to remove file:", e)

        projects_col.delete_one({"_id": ObjectId(project_id)})

        return jsonify({"msg": "Project deleted successfully"}), 200

    except Exception as e:
        return jsonify({"msg": "Server error", "error": str(e)}), 500


# ============================
# Project Upload
# ============================
# @app.route("/api/projects/upload", methods=["POST", "OPTIONS"])
# @cross_origin()
# @auth_required
# def upload_project():
#     title = request.form.get("title", "Untitled")
#     description = request.form.get("description", "")
#     file = request.files.get("file")

#     if not file:
#         return jsonify({"msg": "No file uploaded"}), 400

#     filename = f"{uuid.uuid4().hex}_{secure_filename(file.filename)}"
#     save_path = os.path.join(app.config["UPLOAD_FOLDER"], filename)
#     file.save(save_path)

#     text = extract_text_from_file(save_path)

#     project = {
#         "title": title,
#         "description": description,
#         "uploadedBy": ObjectId(request.user_id),
#         "filePath": save_path,
#         "textContent": text,
#         "download_count": 0,
#         "approved": False,
#         "uploadDate": datetime.datetime.utcnow(),
#     }

#     res_proj = projects_col.insert_one(project)
#     project["_id"] = str(res_proj.inserted_id)

#     others = [
#         {"id": str(o["_id"]), "text": o.get("textContent", "")}
#         for o in projects_col.find({"_id": {"$ne": ObjectId(project["_id"])}})
#     ]

#     result = compare_with_corpus(
#         {"id": project["_id"], "text": project["textContent"]},
#         others
#     )

#     report = {
#         "projectId": project["_id"],
#         "comparedWith": result.get("results", []),
#         "similarityPercentage": result.get("highest", 0),
#         "reportDate": datetime.datetime.utcnow(),
#     }

#     res_report = reports_col.insert_one(report)
#     report["_id"] = str(res_report.inserted_id)

#     return jsonify({
#         "project": convert_objectids(project),
#         "report": convert_objectids(report)
#     }), 201


@app.route("/api/projects/upload", methods=["POST"])
@cross_origin()
@auth_required
def upload_project():
    title = request.form.get("title", "Untitled")
    description = request.form.get("description", "")
    category = request.form.get("category")
    file = request.files.get("file")

    # ---------------------------
    # ✅ Parse mentor object
    # ---------------------------
    mentor_obj = None
    mentor_json = request.form.get("mentor")
    if mentor_json:
        import json
        try:
            mentor_obj = json.loads(mentor_json)
            if "_id" in mentor_obj:
                mentor_obj["_id"] = ObjectId(mentor_obj["_id"])
        except Exception as e:
            print("Failed to parse mentor:", e)
            mentor_obj = None

    # ---------------------------
    # ✅ Parse teammates list
    # ---------------------------
    teammates = []
    teammates_json = request.form.get("teammates")
    if teammates_json:
        import json
        try:
            teammates = json.loads(teammates_json)
            for t in teammates:
                if "_id" in t:
                    t["_id"] = ObjectId(t["_id"])
        except Exception as e:
            print("Failed to parse teammates:", e)
            teammates = []

    # ✅ Validate file
    if not file:
        return jsonify({"msg": "No file uploaded"}), 400

    filename = f"{uuid.uuid4().hex}_{secure_filename(file.filename)}"
    save_path = os.path.join(app.config["UPLOAD_FOLDER"], filename)
    file.save(save_path)

    text = extract_text_from_file(save_path)

    # ✅ If mentor exists in DB, get full info (optional)
    mentor_name = mentor_obj["name"] if mentor_obj else None
    mentor_email = mentor_obj["email"] if mentor_obj else None
    mentor_id = mentor_obj["_id"] if mentor_obj else None

    # ---------------------------
    # ✅ Save project document
    # ---------------------------
    project = {
        "title": title,
        "description": description,
        "uploadedBy": ObjectId(request.user_id),
        "mentor": mentor_obj,        # ✅ Save full mentor object
        "mentorId": mentor_id,       # ✅ Use for indexing
        "mentorName": mentor_name,
        "mentorEmail": mentor_email,
        "category": category,
        "filePath": save_path,
        "textContent": text,
        "teammates": teammates,      # ✅ FULL objects stored
        "download_count": 0,
        "approved": False,
        "uploadDate": datetime.datetime.utcnow(),
    }

    res_proj = projects_col.insert_one(project)
    project["_id"] = str(res_proj.inserted_id)

    # ✅ Plagiarism check
    others = [
        {"id": str(o["_id"]), "text": o.get("textContent", "")}
        for o in projects_col.find({"_id": {"$ne": ObjectId(project["_id"])}})
    ]

    result = compare_with_corpus(
        {"id": project["_id"], "text": project["textContent"]},
        others
    )

    report = {
        "projectId": project["_id"],
        "comparedWith": result.get("results", []),
        "similarityPercentage": result.get("highest", 0),
        "reportDate": datetime.datetime.utcnow(),
    }

    res_report = reports_col.insert_one(report)
    report["_id"] = str(res_report.inserted_id)

    return jsonify({
        "project": convert_objectids(project),
        "report": convert_objectids(report)
    }), 201


# ============================
# List All Projects
# ============================
@app.route("/api/projects", methods=["GET"])
def list_projects():
    q = request.args.get("q", "")
    query = {}

    if q:
        query["$or"] = [
            {"title": {"$regex": q, "$options": "i"}},
            {"description": {"$regex": q, "$options": "i"}},
        ]

    projects = []
    for p in projects_col.find(query).sort("uploadDate", -1):
        p = convert_objectids(p)
        uploader_name = resolve_user_name(p.get("uploadedBy"))
        p["uploadedBy"] = uploader_name
        projects.append(p)

    return jsonify({"projects": projects})


# ============================
# Get Current User Projects
# ============================
# @app.route("/api/projects/my", methods=["GET", "OPTIONS"])
# @cross_origin()
# @auth_required
# def get_my_projects():
#     try:
#         user_id = ObjectId(request.user_id)

#         user_projects = []
#         for p in projects_col.find({"uploadedBy": user_id}).sort("uploadDate", -1):
#             p = convert_objectids(p)
#             p["student"] = resolve_user_name(p.get("uploadedBy"))
#             p["download_count"] = p.get("download_count", 0)
#             user_projects.append(p)

#         return jsonify(user_projects), 200

#     except Exception as e:
#         return jsonify({"msg": "Server error", "error": str(e)}), 500

@app.route("/api/projects/my", methods=["GET", "OPTIONS"])
@cross_origin()
@auth_required
def get_my_projects():
    try:
        user_id = ObjectId(request.user_id)

        user_projects = []
        # ✅ Find projects where user is either the uploader OR a teammate
        # Using $or to match either condition
        query = {
            "$or": [
                {"uploadedBy": user_id},  # Projects uploaded by user
                {"teammates._id": user_id}  # Projects where user is a teammate (ObjectId format)
            ]
        }
        
        for p in projects_col.find(query).sort("uploadDate", -1):
            p = convert_objectids(p)

            p["student"] = resolve_user_name(p.get("uploadedBy"))
            p["download_count"] = p.get("download_count", 0)
            p["approved"] = p.get("approved", False)  # ✅ FIX

            user_projects.append(p)

        return jsonify({"projects": user_projects}), 200   # ✅ FIX

    except Exception as e:
        return jsonify({"msg": "Server error", "error": str(e)}), 500

# ============================
# ✅ Download Project File
# ============================
@app.route("/api/projects/download/<project_id>", methods=["GET", "OPTIONS"])
@cross_origin()
@auth_required
def download_project(project_id):
    """
    ✅ Download the project file uploaded by the student
    
    - Requires authentication (JWT token)
    - Finds project by ID
    - Increments download count
    - Returns the file with proper headers
    - Handles filename extraction (removes UUID prefix)
    """
    try:
        # ✅ Validate project ID format
        try:
            project = projects_col.find_one({"_id": ObjectId(project_id)})
        except Exception:
            return jsonify({"msg": "Invalid project ID"}), 400

        if not project:
            return jsonify({"msg": "Project not found"}), 404

        # ✅ Check if file exists
        path = project.get("filePath")
        if not path:
            return jsonify({"msg": "No file associated with this project"}), 404
        
        if not os.path.exists(path):
            return jsonify({"msg": "File missing from server"}), 404

        # ✅ Increment download count
        new_count = project.get("download_count", 0) + 1
        projects_col.update_one(
            {"_id": ObjectId(project_id)},
            {"$set": {"download_count": new_count}}
        )

        # ✅ Extract directory and filename
        directory, filename = os.path.split(path)
        
        # ✅ Get original filename - remove UUID prefix if present (format: uuid_filename.ext)
        original_filename = filename
        if "_" in filename:
            parts = filename.split("_", 1)
            if len(parts) == 2 and len(parts[0]) == 32:  # UUID is 32 chars
                original_filename = parts[1]
        
        # ✅ Determine MIME type based on file extension
        mimetype, _ = mimetypes.guess_type(path)
        if not mimetype:
            mimetype = 'application/octet-stream'
        
        # ✅ Use send_file for better control and proper headers
        response = send_file(
            path,
            as_attachment=True,
            download_name=original_filename,
            mimetype=mimetype
        )
        
        # ✅ Expose Content-Disposition header for frontend access (Flask-CORS handles other CORS headers)
        response.headers["Access-Control-Expose-Headers"] = "Content-Disposition, Content-Type"
        
        # ✅ Ensure Content-Disposition header is properly set
        if "Content-Disposition" not in response.headers:
            response.headers["Content-Disposition"] = f'attachment; filename="{original_filename}"'
        
        return response

    except Exception as e:
        import traceback
        traceback.print_exc()
        return jsonify({"msg": "Server error", "error": str(e)}), 500
    
# ============================
# ✅ Update User (Admin Only)
# ============================
# @app.route("/api/admin/users/<user_id>", methods=["PUT","OPTIONS"])
# @cross_origin()
# @auth_required
# def admin_update_user(user_id):
#     if request.user_role != "admin":
#         return jsonify({"msg": "Admin access only"}), 403

#     data = request.json or {}

#     updated_fields = {}

#     if "name" in data:
#         updated_fields["name"] = data["name"]
#     if "email" in data:
#         updated_fields["email"] = data["email"]
#     if "role" in data:
#         updated_fields["role"] = data["role"]

#     if not updated_fields:
#         return jsonify({"msg": "No valid fields provided"}), 400

#     result = users_col.update_one(
#         {"_id": ObjectId(user_id)},
#         {"$set": updated_fields}
#     )

#     if result.modified_count > 0:
#         return jsonify({"msg": "User updated successfully"}), 200

#     return jsonify({"msg": "No changes made"}), 200    
# ============================
# ✅ Delete User (Admin Only)
# ============================
# @app.route("/api/admin/users/<user_id>", methods=["DELETE","OPTIONS"])
# @cross_origin()
# @auth_required
# def delete_user(user_id):
#     if request.user_role != "admin":
#         return jsonify({"msg": "Admin access only"}), 403

#     try:
#         users_col.delete_one({"_id": ObjectId(user_id)})
#         return jsonify({"msg": "User deleted"}), 200

#     except Exception as e:
#         return jsonify({"msg": "Server error", "error": str(e)}), 500

# @app.route("/api/admin/users/<user_id>", methods=["PUT", "DELETE", "OPTIONS"])
# @cross_origin()
# @auth_required
# def admin_user_actions(user_id):

#     if request.user_role != "admin":
#         return jsonify({"msg": "Admin access only"}), 403

#     # ✅ PUT → update user
#     if request.method == "PUT":
#         data = request.json or {}
#         updated_fields = {}

#         if "name" in data:
#             updated_fields["name"] = data["name"]
#         if "email" in data:
#             updated_fields["email"] = data["email"]
#         if "role" in data:
#             updated_fields["role"] = data["role"]

#         if not updated_fields:
#             return jsonify({"msg": "No valid fields provided"}), 400

#         users_col.update_one(
#             {"_id": ObjectId(user_id)},
#             {"$set": updated_fields}
#         )
#         return jsonify({"msg": "User updated successfully"}), 200

#     # ✅ DELETE → delete user
#     if request.method == "DELETE":
#         users_col.delete_one({"_id": ObjectId(user_id)})
#         return jsonify({"msg": "User deleted"}), 200

# ============================
# ✅ Update/Delete User (Admin Only)
# ============================
@app.route("/api/admin/users/<user_id>", methods=["PUT", "DELETE", "OPTIONS"])
@cross_origin()
@auth_required
def admin_user_actions(user_id):
    """
    ✅ Handle user update (PUT) and delete (DELETE) operations
    Admin can update any user's information or delete users
    """
    if request.user_role != "admin":
        return jsonify({"msg": "Admin access only"}), 403

    try:
        # ✅ Validate user ID
        try:
            user = users_col.find_one({"_id": ObjectId(user_id)})
        except Exception:
            return jsonify({"msg": "Invalid user ID"}), 400

        if not user:
            return jsonify({"msg": "User not found"}), 404

        # ✅ DELETE: Delete user
        if request.method == "DELETE":
            result = users_col.delete_one({"_id": ObjectId(user_id)})
            if result.deleted_count == 0:
                return jsonify({"msg": "User not found"}), 404
            return jsonify({"msg": "User deleted successfully"}), 200

        # ✅ PUT: Update user details
        if request.method == "PUT":
            data = request.json or {}
            updated_fields = {}

            # ✅ Update name if provided
            if "name" in data and data["name"]:
                updated_fields["name"] = data["name"]

            # ✅ Update email if provided (check for duplicates)
            if "email" in data and data["email"]:
                # Check if email already exists for another user
                existing_user = users_col.find_one({
                    "email": data["email"],
                    "_id": {"$ne": ObjectId(user_id)}
                })
                if existing_user:
                    return jsonify({"msg": "Email already exists"}), 400
                updated_fields["email"] = data["email"]

            # ✅ Update role if provided
            if "role" in data and data["role"]:
                if data["role"] not in ["student", "mentor", "admin"]:
                    return jsonify({"msg": "Invalid role"}), 400
                updated_fields["role"] = data["role"]

            if not updated_fields:
                return jsonify({"msg": "No valid fields provided"}), 400

            # ✅ Update user in database
            result = users_col.update_one(
                {"_id": ObjectId(user_id)},
                {"$set": updated_fields}
            )

            if result.modified_count > 0:
                return jsonify({"msg": "User updated successfully"}), 200
            else:
                return jsonify({"msg": "No changes made"}), 200

    except Exception as e:
        import traceback
        traceback.print_exc()
        return jsonify({"msg": "Server error", "error": str(e)}), 500

# ============================
# Update User Role (Admin Only)
# ============================
@app.route("/api/admin/users/<user_id>/role", methods=["PATCH", "OPTIONS"])
@cross_origin()
@auth_required
def update_user_role(user_id):
    if request.user_role != "admin":
        return jsonify({"msg": "Admin access only"}), 403

    data = request.json or {}
    new_role = data.get("role")

    if new_role not in ["student", "mentor", "admin"]:
        return jsonify({"msg": "Invalid role"}), 400

    result = users_col.update_one(
        {"_id": ObjectId(user_id)},
        {"$set": {"role": new_role}}
    )

    if result.modified_count > 0:
        return jsonify({"msg": f"User role updated to {new_role}"}), 200

    return jsonify({"msg": "No changes made"}), 200


# ============================
# ✅ Get All Users (Admin Only)
# ============================
@app.route("/api/admin/users", methods=["GET","OPTIONS"])
@cross_origin()
@auth_required
def get_all_users():
    if request.user_role != "admin":
        return jsonify({"msg": "Admin access only"}), 403

    try:
        users = list(users_col.find({}, {"password": 0}))  # exclude password
        for u in users:
            u["_id"] = str(u["_id"])
        return jsonify({"users": users}), 200

    except Exception as e:
        return jsonify({"msg": "Server error", "error": str(e)}), 500


# ============================
# ✅ Get Mentors by University (STUDENT FILTER)
# ============================
@app.route("/api/mentors/my-university", methods=["GET", "OPTIONS"])
@cross_origin(methods=["GET", "OPTIONS"], allow_headers=["Authorization"], supports_credentials=True)
@auth_required
def get_mentors_for_user():
    if request.method == "OPTIONS":
        return jsonify({"ok": True}), 200

    try:
        # ✅ Get logged-in user ID from token
        user_id = request.user_id

        # ✅ Fetch the user document
        user = users_col.find_one({"_id": ObjectId(user_id)})
        if not user:
            return jsonify({"msg": "User not found"}), 404

        # ✅ Extract user's university
        university = user.get("university")
        if not university:
            return jsonify({"msg": "User has no university field"}), 400

        # ✅ Fetch mentors from same university
        mentors = list(
            users_col.find(
                {"role": "mentor", "university": university},
                {"password": 0}
            )
        )

        # Convert ObjectId to string
        for m in mentors:
            m["_id"] = str(m["_id"])

        return jsonify({"mentors": mentors}), 200

    except Exception as e:
        return jsonify({"msg": "Server error", "error": str(e)}), 500

@app.route("/api/students/my-university", methods=["GET", "OPTIONS"])
@cross_origin(
    methods=["GET", "OPTIONS"],
    allow_headers=["Authorization", "Content-Type"],
    supports_credentials=True
)
@auth_required
def students_my_university():

    # ✅ Proper OPTIONS response
    if request.method == "OPTIONS":
        return jsonify({"ok": True}), 200

    try:
        # ✅ Logged-in user from token
        user = users_col.find_one({"_id": ObjectId(request.user_id)})
        if not user:
            return jsonify({"msg": "User not found"}), 404

        # ✅ User must have university field
        user_university = user.get("university")
        if not user_university:
            return jsonify({"students": []}), 200

        # ✅ Fetch students of same university except current user
        students = list(
            users_col.find(
                {
                    "role": "student",
                    "university": user_university,
                    "_id": {"$ne": ObjectId(request.user_id)}
                },
                {"_id": 1, "name": 1, "email": 1}
            )
        )

        # ✅ Convert ObjectIds to string
        for s in students:
            s["_id"] = str(s["_id"])

        return jsonify({"students": students}), 200

    except Exception as e:
        return jsonify({"msg": "Server error", "error": str(e)}), 500

# ============================
# Plagiarism Check
# ============================
# @app.route("/api/plagiarism/check/<project_id>", methods=["GET"])
# def check_existing(project_id):
#     project = projects_col.find_one({"_id": ObjectId(project_id)})
#     if not project:
#         return jsonify({"msg": "Project not found"}), 404

#     others = [
#         {"id": str(o["_id"]), "text": o.get("textContent", "")}
#         for o in projects_col.find({"_id": {"$ne": ObjectId(project_id)}})
#     ]

#     result = compare_with_corpus(
#         {"id": str(project["_id"]), "text": project.get("textContent", "")},
#         others
#     )

#     uploader = users_col.find_one({"_id": project["uploadedBy"]}) if project.get("uploadedBy") else None
#     uploader_name = uploader["name"] if uploader else "Unknown"

#     report = {
#         "projectId": str(project_id),
#         "uploadedBy": uploader_name,
#         "comparedWith": result.get("results", []),
#         "similarityPercentage": result.get("highest", 0),
#         "reportDate": datetime.datetime.utcnow(),
#     }

#     res = reports_col.insert_one(report)
#     report["_id"] = str(res.inserted_id)

#     return jsonify({"report": convert_objectids(report)}), 200

@app.route("/api/plagiarism/check/<project_id>", methods=["GET"])
def check_existing(project_id):
    project = projects_col.find_one({"_id": ObjectId(project_id)})
    if not project:
        return jsonify({"msg": "Project not found"}), 404

    # ✅ Prepare other documents for model
    others = [
        {"id": str(o["_id"]), "text": o.get("textContent", "")}
        for o in projects_col.find({"_id": {"$ne": ObjectId(project_id)}})
    ]

    # ✅ Run plagiarism model
    result = compare_with_corpus(
        {"id": str(project["_id"]), "text": project.get("textContent", "")},
        others
    )

    similarity = result.get("highest", 0)
    matches = result.get("results", [])

    # ✅ Save plagiarism results directly inside project document
    projects_col.update_one(
        {"_id": ObjectId(project_id)},
        {"$set": {
            "plagiarism_percent": similarity,
            "plagiarism_matches": matches
        }}
    )

    # ✅ Resolve uploader name for report collection
    uploader = users_col.find_one({"_id": project["uploadedBy"]}) if project.get("uploadedBy") else None
    uploader_name = uploader["name"] if uploader else "Unknown"

    # ✅ Create report document (optional)
    report = {
        "projectId": str(project_id),
        "uploadedBy": uploader_name,
        "comparedWith": matches,
        "similarityPercentage": similarity,
        "reportDate": datetime.datetime.utcnow(),
    }

    res = reports_col.insert_one(report)
    report["_id"] = str(res.inserted_id)

    return jsonify({
        "msg": "Plagiarism checked and saved",
        "similarity": similarity,
        "matches": matches,
        "report": convert_objectids(report)
    }), 200


# ============================
# ✅ Fetch All Approved Projects
# ============================
@app.route("/api/projects/approved", methods=["GET", "OPTIONS"])
@cross_origin()
@auth_required
def get_approved_projects():
    try:
        approved_projects = []

        for p in projects_col.find({"approved": True}).sort("uploadDate", -1):
            p = convert_objectids(p)

            # Resolve uploader name
            uploader = users_col.find_one({"_id": ObjectId(p.get("uploadedBy"))}) if p.get("uploadedBy") else None
            p["uploadedBy"] = uploader["name"] if uploader else "Unknown"

            # Ensure defaults
            p["download_count"] = p.get("download_count", 0)
            p["approved"] = True

            approved_projects.append(p)

        return jsonify({"projects": approved_projects}), 200

    except Exception as e:
        return jsonify({"msg": "Server error", "error": str(e)}), 500
@app.route("/api/projects/<project_id>", methods=["GET", "OPTIONS"])
@cross_origin()
def get_project(project_id):
    from bson.errors import InvalidId

    try:
        # ✅ Validate project ID
        try:
            project = projects_col.find_one({"_id": ObjectId(project_id)})
        except InvalidId:
            return jsonify({"msg": "Invalid project ID"}), 400

        if not project:
            return jsonify({"msg": "Project not found"}), 404

        # ✅ Convert top-level ObjectIds to string
        for field in ["_id", "uploadedBy", "mentorId", "university_id"]:
            if field in project and project[field]:
                project[field] = str(project[field])

        # ✅ Proper handling of teammates (FULL objects)
        formatted_teammates = []
        for tm in project.get("teammates", []):
            if isinstance(tm, dict):
                name = tm.get("name", "Unknown")
                email = tm.get("email", "")
                _id = str(tm.get("_id")) if tm.get("_id") else ""
            else:
                # If stored as simple string (fallback)
                name = tm
                email = ""
                _id = ""

            # Generate initials
            initials = "".join([w[0] for w in name.split()]).upper()

            formatted_teammates.append({
                "_id": _id,
                "name": name,
                "email": email,
                "initials": initials
            })

        project["teammates"] = formatted_teammates

        # ✅ Resolve university name
        university_name = ""
        uni_id = project.get("university_id")
        if uni_id:
            try:
                uni = universities_col.find_one({"_id": ObjectId(uni_id)})
                if uni:
                    university_name = uni.get("name", "")
            except:
                pass

        project["university"] = university_name

        # ✅ Resolve mentor object if needed
        if project.get("mentorId"):
            mentor_doc = users_col.find_one({"_id": ObjectId(project["mentorId"])})
            if mentor_doc:
                project["mentor"] = {
                    "_id": str(mentor_doc["_id"]),
                    "name": mentor_doc.get("name"),
                    "email": mentor_doc.get("email")
                }

        return jsonify(project), 200

    except Exception as e:
        print("Error fetching project:", e)
        return jsonify({"msg": "Error fetching project", "error": str(e)}), 500


# @app.route("/api/projects/<project_id>/plag-report", methods=["GET"])
# def download_plagiarism_pdf(project_id):

#     project = projects_col.find_one({"_id": ObjectId(project_id)})
#     if not project:
#         return jsonify({"msg": "Project not found"}), 404

#     # ✅ Prepare formatted object (avoid KeyErrors)
#     formatted = {
#         "_id": str(project.get("_id")),
#         "title": project.get("title", ""),
#         "description": project.get("description", ""),
#         "uploadedBy": str(project.get("uploadedBy")),
#         "mentor": project.get("mentor", {}),
#         "category": project.get("category", ""),
#         "filePath": project.get("filePath", ""),
#         "textContent": project.get("textContent", ""),
#         "teammates": project.get("teammates", []),
#         "plagPercent": project.get("similarityPercentage") or project.get("plagPercent", 0),
#         "matches": project.get("matches") or project.get("comparedWith", []),
#         "uploadDate": str(project.get("uploadDate")),
#     }

#     # ✅ Ensure directory exists
#     os.makedirs("reports", exist_ok=True)
#     out_path = f"reports/{project_id}_report.pdf"

#     generate_plagiarism_report(formatted, out_path)

#     return send_file(out_path, as_attachment=True)

# from flask import send_file
# from utils.plag_report_generator import generate_plagiarism_report


@app.route("/api/projects/<project_id>/plag-report", methods=["GET"])
def download_plagiarism_pdf_route(project_id):

    project = projects_col.find_one({"_id": ObjectId(project_id)})
    if not project:
        return jsonify({"msg": "Project not found"}), 404

    # ✅ Prepare other documents for plagiarism comparison
    others = [
        {"id": str(o["_id"]), "text": o.get("textContent", "")}
        for o in projects_col.find({"_id": {"$ne": ObjectId(project_id)}})
    ]

    # ✅ Run plagiarism model LIVE (no DB save)
    result = compare_with_corpus(
        {"id": str(project["_id"]), "text": project.get("textContent", "")},
        others
    )

    similarity_percentage = result.get("highest", 0)
    match_results = result.get("results", [])

    # ✅ Transform matches: convert snippets (list) to snippet (string) for PDF generator
    formatted_matches = []
    for match in match_results:
        snippets_list = match.get("snippets", [])
        # Join snippets with separator, or use first snippet, or default message
        snippet_text = " | ".join(snippets_list) if snippets_list else "No snippet available"
        formatted_matches.append({
            "projectId": match.get("projectId", "Unknown"),
            "similarity": match.get("similarity", 0),
            "percent": match.get("similarity", 0),  # Support both keys
            "snippet": snippet_text
        })

    # ✅ Build formatted object for PDF generator
    formatted = {
        "_id": str(project["_id"]),
        "title": project.get("title", ""),
        "description": project.get("description", ""),
        "uploadedBy": str(project.get("uploadedBy")),
        "mentor": project.get("mentor", {}),
        "category": project.get("category", ""),
        "filePath": project.get("filePath", ""),
        "textContent": project.get("textContent", ""),
        "teammates": project.get("teammates", []),
        "approved": project.get("approved", False),
        "uploadDate": str(project.get("uploadDate")),
        
        # ✅ Plagiarism results from model
        "similarityPercentage": similarity_percentage,
        "matches": formatted_matches
    }

    # ✅ Generate PDF
    os.makedirs("reports", exist_ok=True)
    out_path = f"reports/{project_id}_report.pdf"

    generate_plagiarism_report(formatted, out_path)

    return send_file(out_path, as_attachment=True)

# ============================
# Reports List
# ============================
@app.route("/api/reports", methods=["GET"])
def list_reports():
    docs = []
    for r in reports_col.find({}).sort("reportDate", -1):
        docs.append(convert_objectids(r))

    return jsonify({"reports": docs})

# ============================
# ✅ Mentor Reports - Get all plagiarism reports for mentor's projects
# ============================
@app.route("/api/mentor/reports", methods=["GET", "OPTIONS"])
@cross_origin()
@auth_required
def mentor_reports():
    """
    ✅ Get all plagiarism reports for projects assigned to the logged-in mentor
    Returns reports with project details for projects where mentorId matches
    """
    try:
        # ✅ Verify user is a mentor or admin
        if request.user_role not in ["mentor", "admin"]:
            return jsonify({"msg": "Access denied. Mentor or admin role required"}), 403

        mentor_id = ObjectId(request.user_id)
        
        # ✅ Find all projects assigned to this mentor
        mentor_projects = list(projects_col.find({"mentorId": mentor_id}))
        project_ids = [str(p["_id"]) for p in mentor_projects]
        
        if not project_ids:
            return jsonify({"reports": []}), 200
        
        # ✅ Find all reports for these projects
        reports = []
        for report in reports_col.find({"projectId": {"$in": project_ids}}).sort("reportDate", -1):
            report = convert_objectids(report)
            
            # ✅ Find the associated project
            project_id = report.get("projectId")
            project = projects_col.find_one({"_id": ObjectId(project_id)})
            
            if project:
                # ✅ Add project details to report
                report["projectTitle"] = project.get("title", "Untitled")
                report["projectDescription"] = project.get("description", "")
                report["projectCategory"] = project.get("category", "")
                report["uploadedBy"] = resolve_user_name(project.get("uploadedBy"))
                report["uploadDate"] = str(project.get("uploadDate", ""))
                report["approved"] = project.get("approved", False)
            
            reports.append(report)
        
        return jsonify({"reports": reports}), 200

    except Exception as e:
        import traceback
        print("Error in /api/mentor/reports:")
        traceback.print_exc()
        return jsonify({"msg": "Server error", "error": str(e)}), 500


# ============================
# Run App
# ============================
if __name__ == "__main__":
    port = int(os.getenv("PORT", "5000"))
    app.run(host="0.0.0.0", port=port, debug=True, use_reloader=False)


