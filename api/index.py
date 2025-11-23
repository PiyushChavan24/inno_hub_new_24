"""
Vercel serverless function handler for Flask app
This handler exposes the Flask app for Vercel's Python runtime
"""
import sys
import os

# Set Vercel environment variable (if not already set)
if not os.getenv("VERCEL"):
    os.environ["VERCEL"] = "1"

# Get the absolute path to the backend directory
current_dir = os.path.dirname(os.path.abspath(__file__))
backend_dir = os.path.join(current_dir, '..', 'backend')

# Add backend directory to Python path
if backend_dir not in sys.path:
    sys.path.insert(0, backend_dir)

# Change working directory to backend for relative imports
original_cwd = os.getcwd()
try:
    os.chdir(backend_dir)
    
    # Import Flask app
    from app import app
    
finally:
    # Restore original working directory
    os.chdir(original_cwd)

# Export app for Vercel
# Vercel's @vercel/python automatically converts Flask app to WSGI handler
__all__ = ['app']
