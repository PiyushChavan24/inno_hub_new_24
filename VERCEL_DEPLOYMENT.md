<!-- @format -->

# Vercel Deployment Guide

This guide explains how to deploy both the Flask backend and React frontend to Vercel.

## 📋 Prerequisites

1. **Vercel Account**: Sign up at [vercel.com](https://vercel.com)
2. **MongoDB Atlas**: Set up a free MongoDB cluster at [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
3. **GitHub Repository**: Your code should be in a GitHub repository

## 🏗️ Project Structure

The project is configured as a monorepo with:

- `backend/` - Flask application
- `frontend/` - React application
- `api/` - Vercel serverless function handler
- `vercel.json` - Root Vercel configuration

## 🚀 Deployment Steps

### Step 1: Prepare Environment Variables

Before deploying, you'll need to set these environment variables in Vercel:

1. **MONGO_URI** - Your MongoDB Atlas connection string
   - Format: `mongodb+srv://username:password@cluster.mongodb.net/database?retryWrites=true&w=majority`
2. **JWT_SECRET** - A random secret string for JWT tokens
   - Generate with: `openssl rand -hex 32`
3. **VERCEL** - Set to `1` (tells the app it's running on Vercel)

   - This enables `/tmp` directory usage for file uploads

4. **UPLOAD_FOLDER** - Set to `/tmp/uploads` (optional, defaults to this on Vercel)

### Step 2: Deploy to Vercel

#### Option A: Using Vercel CLI (Recommended)

1. **Install Vercel CLI**:

   ```bash
   npm install -g vercel
   ```

2. **Login to Vercel**:

   ```bash
   vercel login
   ```

3. **Deploy**:

   ```bash
   vercel
   ```

   Follow the prompts:

   - Link to existing project or create new
   - Set root directory: `.` (root)
   - Override settings: No (use vercel.json)

4. **Set Environment Variables**:

   ```bash
   vercel env add MONGO_URI
   vercel env add JWT_SECRET
   vercel env add VERCEL
   ```

   Or set them in the Vercel Dashboard:

   - Go to your project → Settings → Environment Variables

5. **Deploy to Production**:
   ```bash
   vercel --prod
   ```

#### Option B: Using Vercel Dashboard

1. **Import Project**:

   - Go to [vercel.com/new](https://vercel.com/new)
   - Import your GitHub repository
   - Vercel will auto-detect the configuration from `vercel.json`

2. **Configure Project**:

   - Framework Preset: Other
   - Root Directory: `.` (root of repository)
   - Build Command: (auto-detected from vercel.json)
   - Output Directory: (auto-detected from vercel.json)

3. **Set Environment Variables**:

   - Go to Settings → Environment Variables
   - Add all required variables (see Step 1)

4. **Deploy**:
   - Click "Deploy"
   - Wait for build to complete

## 📁 File Storage on Vercel

⚠️ **Important**: Vercel serverless functions have ephemeral storage. Files stored in `/tmp` are:

- Available during the function execution
- **Deleted after the function completes**
- Not persistent across requests

### Current Implementation

The app uses `/tmp/uploads` and `/tmp/reports` on Vercel:

- ✅ Works for temporary file processing
- ❌ Files are not accessible after upload
- ❌ Files cannot be downloaded later

### Recommended Solutions

For production, consider:

1. **Vercel Blob Storage** (Recommended):

   ```bash
   npm install @vercel/blob
   ```

   - Persistent file storage
   - Free tier: 1GB storage, 100GB bandwidth
   - See: [vercel.com/docs/storage/vercel-blob](https://vercel.com/docs/storage/vercel-blob)

2. **Cloudinary** (Alternative):

   - Free tier available
   - Good for images and documents
   - See: [cloudinary.com](https://cloudinary.com)

3. **AWS S3** (Production):
   - Reliable and scalable
   - Free tier: 5GB storage
   - See: [aws.amazon.com/s3](https://aws.amazon.com/s3)

## 🔧 Configuration Files

### Root `vercel.json`

- Configures builds for both backend (Python) and frontend (React)
- Routes `/api/*` to Flask backend
- Routes `/*` to React frontend

### `api/index.py`

- Vercel serverless function handler
- Imports and exposes Flask app
- Handles WSGI conversion automatically

### `api/requirements.txt`

- Python dependencies for Vercel
- Must include all backend dependencies

### `frontend/vercel.json`

- Frontend-specific configuration
- Configures build and output directory
- Sets up API rewrites

## 🧪 Testing Deployment

1. **Test Backend API**:

   ```bash
   curl https://your-app.vercel.app/api/projects
   ```

2. **Test Frontend**:

   - Visit: `https://your-app.vercel.app`
   - Try logging in
   - Check browser console for errors

3. **Test File Upload**:
   - ⚠️ Note: Files uploaded will not persist (see File Storage section)
   - Upload functionality will work, but files won't be downloadable later

## 🐛 Troubleshooting

### Build Fails

1. **Check Build Logs**:

   - Go to Vercel Dashboard → Deployments → Click on failed deployment
   - Review error messages

2. **Common Issues**:
   - Missing dependencies in `api/requirements.txt`
   - Python version mismatch
   - Import errors (check paths in `api/index.py`)

### API Routes Return 404

1. **Check `vercel.json` routes**:

   - Ensure `/api/*` routes to `/api/index.py`
   - Verify `api/index.py` exists and imports Flask app correctly

2. **Check Function Logs**:
   - Vercel Dashboard → Functions → View logs
   - Look for import or runtime errors

### CORS Errors

- CORS is already configured in `backend/app.py`
- If issues persist, check:
  - Request headers
  - Vercel function response headers

### File Upload Issues

- Files are stored in `/tmp` (ephemeral)
- Files are deleted after function execution
- Consider implementing Vercel Blob or external storage

## 📝 Environment Variables Reference

| Variable        | Required | Description                                             | Example                                          |
| --------------- | -------- | ------------------------------------------------------- | ------------------------------------------------ |
| `MONGO_URI`     | Yes      | MongoDB connection string                               | `mongodb+srv://user:pass@cluster.mongodb.net/db` |
| `JWT_SECRET`    | Yes      | Secret for JWT tokens                                   | `your-random-secret-string`                      |
| `VERCEL`        | Yes      | Set to `1` on Vercel                                    | `1`                                              |
| `UPLOAD_FOLDER` | No       | Upload directory (defaults to `/tmp/uploads` on Vercel) | `/tmp/uploads`                                   |

## 🎯 Next Steps

1. ✅ Deploy to Vercel
2. ✅ Set environment variables
3. ✅ Test basic functionality
4. ⚠️ Implement persistent file storage (Vercel Blob recommended)
5. ✅ Update file download routes to use blob storage
6. ✅ Test file upload/download end-to-end

## 📚 Additional Resources

- [Vercel Python Documentation](https://vercel.com/docs/frameworks/python)
- [Vercel Blob Storage](https://vercel.com/docs/storage/vercel-blob)
- [Flask on Vercel](https://vercel.com/docs/frameworks/backend/flask)

## ⚠️ Important Notes

1. **File Storage**: Current implementation uses ephemeral `/tmp` storage. Files are not persistent.

2. **Cold Starts**: Vercel serverless functions may have cold starts (first request after inactivity can be slow).

3. **Function Timeout**: Vercel free tier has a 10-second timeout for serverless functions. For longer operations, consider:

   - Upgrading to Pro plan (60s timeout)
   - Using background jobs
   - Optimizing code performance

4. **Database**: Ensure MongoDB Atlas network access allows Vercel IPs (or use 0.0.0.0/0 for development).

5. **Build Time**: First build may take 5-10 minutes. Subsequent builds are faster.

---

**Need Help?** Check Vercel logs or open an issue in your repository.
