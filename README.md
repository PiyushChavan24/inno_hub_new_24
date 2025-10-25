# Student Project Platform (Flask backend)

This repo contains a minimal Student Project Platform with:
- Frontend: React + Tailwind CDN (simple pages)
- Backend: Flask (Python) + pymongo for MongoDB
- Plagiarism model: TF-IDF + Cosine Similarity implemented in Python

## Quick start

1. Start MongoDB (e.g. `mongod`).
2. Backend:
   - cd backend
   - python -m venv venv
   - source venv/bin/activate  # or venv\Scripts\activate on Windows
   - pip install -r requirements.txt
   - copy `.env.example` to `.env` and set `MONGO_URI` and `JWT_SECRET` if needed
   - python app.py
3. Frontend:
   - cd frontend
   - npm install
   - Serve `frontend/public` using a static server, or integrate into CRA/Vite.
   - For quick demo: `npx serve frontend/public -l 3000`
4. Open http://localhost:3000

Notes:
- The plagiarism model is simple and intended for demonstration.
- File extraction uses `pdfminer.six` and `python-docx` for PDFs and DOCX respectively.
