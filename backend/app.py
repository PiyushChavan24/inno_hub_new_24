import os
import uuid
import datetime
import hashlib
import jwt
from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
from werkzeug.utils import secure_filename
from pymongo import MongoClient
from bson.objectid import ObjectId
from dotenv import load_dotenv
from utils.file_parser import extract_text_from_file
from utils.plagiarism_model import compare_with_corpus

# ============================
# Load environment
# ============================
load_dotenv()
UPLOAD_FOLDER = os.getenv('UPLOAD_FOLDER', 'uploads')
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

app = Flask(__name__)
CORS(app)
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
app.config['MAX_CONTENT_LENGTH'] = 50 * 1024 * 1024  # 50MB

# ============================
# MongoDB Connection
# ============================
client = MongoClient(os.getenv('MONGO_URI') or 'mongodb://localhost:27017/')
db = client['student_project_platform']
users_col = db['users']
projects_col = db['projects']
reports_col = db['plagiarism_reports']

print("✅ Connected to MongoDB:", db.list_collection_names())

JWT_SECRET = os.getenv('JWT_SECRET', 'secret')

# ============================
# Helpers
# ============================
def generate_token(user):
    payload = {
        'id': str(user['_id']),
        'role': user.get('role', 'student'),
        'exp': datetime.datetime.utcnow() + datetime.timedelta(days=7)
    }
    return jwt.encode(payload, JWT_SECRET, algorithm='HS256')

def allowed(filename):
    return os.path.splitext(filename)[1].lower() in {'.pdf', '.docx', '.txt'}

def auth_required(fn):
    from functools import wraps
    @wraps(fn)
    def wrapper(*args, **kwargs):
        auth = request.headers.get('Authorization', '')
        if not auth.startswith('Bearer '):
            return jsonify({'msg': 'Auth required'}), 401
        try:
            data = jwt.decode(auth.split(' ')[1], JWT_SECRET, algorithms=['HS256'])
            request.user_id = data['id']
            request.user_role = data.get('role','student')
        except Exception as e:
            return jsonify({'msg': 'Invalid token', 'error': str(e)}), 401
        return fn(*args, **kwargs)
    return wrapper

# ============================
# Auth Routes
# ============================
@app.route('/api/auth/signup', methods=['POST'])
def signup():
    data = request.json or {}
    name, email, password = data.get('name'), data.get('email'), data.get('password')
    role = data.get('role', 'student')

    if not (name and email and password):
        return jsonify({'msg': 'Provide name, email, password'}), 400

    if users_col.find_one({'email': email}):
        return jsonify({'msg': 'Email already exists'}), 400

    hashed = hashlib.sha256(password.encode()).hexdigest()
    user = {'name': name, 'email': email, 'password': hashed, 'role': role, 'createdAt': datetime.datetime.utcnow()}
    res = users_col.insert_one(user)
    user['_id'] = str(res.inserted_id)
    user.pop('password', None)

    token = generate_token(user)
    return jsonify({'token': token, 'user': user})

@app.route('/api/auth/login', methods=['POST'])
def login():
    data = request.json or {}
    email, password = data.get('email'), data.get('password')

    if not (email and password):
        return jsonify({'msg': 'Provide email and password'}), 400

    user = users_col.find_one({'email': email})
    if not user:
        return jsonify({'msg': 'Invalid credentials'}), 400

    hashed = hashlib.sha256(password.encode()).hexdigest()
    if hashed != user.get('password'):
        return jsonify({'msg': 'Invalid credentials'}), 400

    token = generate_token(user)
    user['_id'] = str(user['_id'])
    user.pop('password', None)
    return jsonify({'token': token, 'user': user})

# ============================
# Project Routes
# ============================
@app.route('/api/projects/upload', methods=['POST'])
@auth_required
def upload_project():
    title = request.form.get('title', 'Untitled')
    description = request.form.get('description', '')
    file = request.files.get('file')
    if not file:
        return jsonify({'msg': 'No file uploaded'}), 400

    # Use UUID to avoid filename conflicts
    filename = f"{uuid.uuid4().hex}_{secure_filename(file.filename)}"
    save_path = os.path.join(app.config['UPLOAD_FOLDER'], filename)
    file.save(save_path)

    text = extract_text_from_file(save_path)
    project = {
        'title': title,
        'description': description,
        'uploadedBy': ObjectId(request.user_id),
        'filePath': save_path,
        'textContent': text,
        'approved': False,
        'uploadDate': datetime.datetime.utcnow()
    }

    # Insert project first to get _id
    res_proj = projects_col.insert_one(project)
    project['_id'] = str(res_proj.inserted_id)

    # Run plagiarism check automatically
    others = [{'id': str(o['_id']), 'text': o.get('textContent','')} 
              for o in projects_col.find({'_id': {'$ne': ObjectId(project['_id'])}})]
    target = {'id': project['_id'], 'text': project['textContent']}
    result = compare_with_corpus(target, others)

    report = {
        'projectId': project['_id'],
        'comparedWith': result['results'],
        'similarityPercentage': result['highest'],
        'reportDate': datetime.datetime.utcnow()
    }
    res_report = reports_col.insert_one(report)
    report['_id'] = str(res_report.inserted_id)

    return jsonify({'project': project, 'report': report})

@app.route('/api/projects', methods=['GET'])
def list_projects():
    q = request.args.get('q','')
    query = {}
    if q:
        query['$or'] = [
            {'title': {'$regex': q, '$options': 'i'}}, 
            {'description': {'$regex': q, '$options': 'i'}}
        ]

    projects = []
    for p in projects_col.find(query).sort('uploadDate', -1):
        p['_id'] = str(p['_id'])
        # fetch uploader name
        uploader = users_col.find_one({'_id': ObjectId(p['uploadedBy'])})
        p['uploadedBy'] = uploader['name'] if uploader else "Unknown"
        projects.append(p)
    return jsonify({'projects': projects})

@app.route('/api/projects/download/<project_id>', methods=['GET'])
def download_project(project_id):
    project = projects_col.find_one({'_id': ObjectId(project_id)})
    if not project:
        return jsonify({'msg': 'Project not found'}), 404

    path = project.get('filePath')
    if not path or not os.path.exists(path):
        return jsonify({'msg': 'File missing'}), 404

    directory, filename = os.path.split(path)
    return send_from_directory(directory, filename, as_attachment=True)

# ============================
# Plagiarism Routes
# ============================
@app.route('/api/plagiarism/check/<project_id>', methods=['GET'])
def check_existing(project_id):
    project = projects_col.find_one({'_id': ObjectId(project_id)})
    if not project:
        return jsonify({'msg': 'Project not found'}), 404

    others = [{'id': str(o['_id']), 'text': o.get('textContent','')} 
              for o in projects_col.find({'_id': {'$ne': ObjectId(project_id)}})]
    target = {'id': str(project['_id']), 'text': project.get('textContent','')}
    result = compare_with_corpus(target, others)

    # fetch uploader name
    uploader = users_col.find_one({'_id': ObjectId(project['uploadedBy'])})
    uploader_name = uploader['name'] if uploader else "Unknown"

    report = {
        'projectId': str(project_id),
        'uploadedBy': uploader_name,
        'comparedWith': result['results'],
        'similarityPercentage': result['highest'],
        'reportDate': datetime.datetime.utcnow()
    }
    res = reports_col.insert_one(report)
    report['_id'] = str(res.inserted_id)
    return jsonify({'report': report})

@app.route('/api/plagiarism/upload-projects', methods=['POST'])
def check_upload_multiple():
    if 'files' not in request.files:
        return jsonify({'msg':'No files uploaded, use "files" field'}),400

    files = request.files.getlist('files')
    if len(files) < 2:
        return jsonify({'msg':'Upload at least 2 files'}),400

    uploaded_docs = []
    for file in files:
        filename = f"{uuid.uuid4().hex}_{secure_filename(file.filename)}"
        save_path = os.path.join(app.config['UPLOAD_FOLDER'], filename)
        file.save(save_path)
        text = extract_text_from_file(save_path)
        uploaded_docs.append({'id': filename, 'text': text})

    comparisons = []
    for i, doc1 in enumerate(uploaded_docs):
        for j, doc2 in enumerate(uploaded_docs):
            if i >= j: continue
            result = compare_with_corpus(doc1,[{'id':doc2['id'],'text':doc2['text']}])
            comparisons.append({'file1': doc1['id'],'file2': doc2['id'],'similarity': result['highest']})

    db_projects = [{'id': str(o['_id']),'text': o.get('textContent','')} for o in projects_col.find({})]
    external_comparisons = []
    for doc in uploaded_docs:
        result = compare_with_corpus(doc, db_projects)
        external_comparisons.append({'uploadedFile': doc['id'],'maxSimilarityWithDB': result['highest'],'comparedWith': result['results']})

    report = {
        'uploadedFiles':[f['id'] for f in uploaded_docs],
        'internalComparisons': comparisons,
        'dbComparisons': external_comparisons,
        'reportDate': datetime.datetime.utcnow()
    }

    res = reports_col.insert_one(report)
    report['_id'] = str(res.inserted_id)
    return jsonify({'report': report})

@app.route('/api/reports', methods=['GET'])
def list_reports():
    docs = []
    for r in reports_col.find({}).sort('reportDate', -1):
        r['_id'] = str(r['_id'])
        if 'projectId' in r:
            r['projectId'] = str(r['projectId'])
        # Convert nested ObjectIds in comparedWith
        if 'comparedWith' in r:
            for item in r['comparedWith']:
                if 'projectId' in item:
                    item['projectId'] = str(item['projectId'])
        docs.append(r)
    return jsonify({'reports': docs})


# ============================
# Run Flask
# ============================
if __name__ == '__main__':
    port = int(os.getenv('PORT','5000'))
    app.run(host='0.0.0.0', port=port, debug=True)
