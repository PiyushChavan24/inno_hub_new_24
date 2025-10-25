import os
from pdfminer.high_level import extract_text as pdf_extract
from docx import Document

def extract_text_from_file(path):
    ext = os.path.splitext(path)[1].lower()
    try:
        if ext == '.pdf':
            return pdf_extract(path) or ''
        elif ext == '.docx':
            doc = Document(path)
            parts = [p.text for p in doc.paragraphs]
            return '\n'.join(parts)
        else:
            with open(path, 'r', encoding='utf-8', errors='ignore') as f:
                return f.read()
    except Exception as e:
        print('extract error', e)
        return ''
