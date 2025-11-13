<!-- @format -->

# Deployment Guide - Student Project Platform

This guide provides step-by-step instructions to deploy your Flask + React application to free hosting platforms **without modifying the code structure**.

## 📋 Project Structure Overview

- **Backend**: Flask (Python) application on port 5000
- **Frontend**: React application (Create React App)
- **Database**: MongoDB
- **Dependencies**: File uploads, PDF generation

---

## 🆓 Free Hosting Options

### Recommended Stack:

1. **Backend**: [Render](https://render.com) or [Railway](https://railway.app) (Free tier)
2. **Frontend**: [Vercel](https://vercel.com) or [Netlify](https://netlify.com) (Free tier)
3. **Database**: [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) (Free tier - 512MB)

---

## 🗄️ Step 1: Setup MongoDB Atlas (Database)

1. **Create Account & Cluster**

   - Go to https://www.mongodb.com/cloud/atlas
   - Sign up for free account
   - Click "Build a Database" → Choose "FREE" tier (M0)
   - Select a cloud provider and region (choose closest to your hosting)
   - Click "Create"

2. **Configure Database Access**

   - Go to "Database Access" in left sidebar
   - Click "Add New Database User"
   - Choose "Password" authentication
   - Create username and password (save these!)
   - Set privileges to "Atlas admin" or "Read and write to any database"
   - Click "Add User"

3. **Configure Network Access**

   - Go to "Network Access" in left sidebar
   - Click "Add IP Address"
   - Click "Allow Access from Anywhere" (0.0.0.0/0) for development
   - Click "Confirm"

4. **Get Connection String**
   - Go to "Database" → Click "Connect" on your cluster
   - Choose "Connect your application"
   - Copy the connection string (looks like: `mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority`)
   - Replace `<password>` with your actual password
   - Replace `<dbname>` with `student_project_platform` (or keep default)
   - **Save this connection string** - you'll need it for backend deployment

---

## 🔧 Step 2: Deploy Backend (Flask) to Render

### Option A: Render (Recommended - Easiest)

1. **Prepare Backend for Deployment**

   - Create a file `Procfile` in the **root directory** (or `backend/Procfile`) with:
     ```
     web: cd backend && gunicorn app:app --bind 0.0.0.0:$PORT
     ```
   - Update `backend/requirements.txt` to include:
     ```
     gunicorn==21.2.0
     reportlab==4.0.7
     ```
   - Ensure `backend/app.py` has:
     ```python
     if __name__ == "__main__":
         port = int(os.getenv("PORT", "5000"))
         app.run(host="0.0.0.0", port=port, debug=False)
     ```

2. **Deploy to Render**

   - Go to https://render.com and sign up/login
   - Click "New +" → "Web Service"
   - Connect your GitHub repository (or use "Public Git repository")
   - Configure:
     - **Name**: `student-project-platform-backend`
     - **Environment**: `Python 3`
     - **Build Command**: `cd backend && pip install -r requirements.txt`
     - **Start Command**: `cd backend && gunicorn app:app --bind 0.0.0.0:$PORT`
     - **Root Directory**: Leave empty (or set to `backend` if needed)

3. **Set Environment Variables in Render**

   - In your service dashboard, go to "Environment"
   - Add these variables:
     ```
     MONGO_URI=<your-mongodb-atlas-connection-string>
     JWT_SECRET=<any-random-secret-string>
     PORT=10000
     UPLOAD_FOLDER=uploads
     ```
   - Click "Save Changes"

4. **Deploy**
   - Render will automatically build and deploy
   - Wait for deployment to complete
   - **Copy your backend URL** (e.g., `https://student-project-platform-backend.onrender.com`)
   - ⚠️ **Note**: Free tier on Render spins down after 15 minutes of inactivity (first request will be slow)

### Option B: Railway (Alternative)

1. **Deploy to Railway**

   - Go to https://railway.app and sign up/login
   - Click "New Project" → "Deploy from GitHub repo"
   - Select your repository
   - Railway will auto-detect Python
   - Set root directory to `backend`

2. **Configure Environment Variables**

   - In project settings, add:
     ```
     MONGO_URI=<your-mongodb-atlas-connection-string>
     JWT_SECRET=<any-random-secret-string>
     PORT=5000
     UPLOAD_FOLDER=uploads
     ```

3. **Get Backend URL**
   - Railway provides a URL like: `https://your-app.railway.app`
   - Copy this URL

---

## ⚛️ Step 3: Deploy Frontend (React) to Vercel

### Option A: Vercel (Recommended)

1. **Build Frontend Locally (Optional - for testing)**

   ```bash
   cd frontend
   npm install
   npm run build
   ```

2. **Deploy to Vercel**

   - Go to https://vercel.com and sign up/login
   - Click "Add New Project"
   - Import your GitHub repository
   - Configure:
     - **Framework Preset**: Create React App (or "Other" if you want full control)
     - **Root Directory**: `frontend` ⚠️ **IMPORTANT: Must be set to `frontend`**
     - **Build Command**: `npm run build` ⚠️ **Must use `npm run build` (not `npx react-scripts build`)**
     - **Output Directory**: `build`
     - **Install Command**: `npm install`
   - ⚠️ **Note**: The `vercel.json` file already specifies the build command, but make sure your dashboard settings match to avoid conflicts

3. **Set Environment Variables (Optional - Skip if using proxy)**

   - ⚠️ **You can skip this step** if you're using the proxy/rewrite approach (recommended - no code changes)
   - Only needed if you want to use environment variables instead of proxy
   - In project settings → Environment Variables
   - Add `REACT_APP_API_URL` with your backend URL (e.g., `https://your-backend.onrender.com`)
   - **Note**: Using environment variables requires updating frontend code to use `process.env.REACT_APP_API_URL`
   - **Recommended**: Use the proxy approach in step 4 below (no code changes needed)

4. **Configure API Proxy (Important!)**

   - Since frontend uses `http://127.0.0.1:5000`, you need to proxy requests
   - Create `vercel.json` in `frontend` directory:
     ```json
     {
      "rewrites": [
       {
        "source": "/api/:path*",
        "destination": "https://your-backend-url.onrender.com/api/:path*"
       }
      ]
     }
     ```
   - Replace `your-backend-url.onrender.com` with your actual Render/Railway backend URL

5. **Deploy**
   - Click "Deploy"
   - Wait for build to complete
   - Vercel will provide a URL like: `https://your-app.vercel.app`

### Option B: Netlify (Alternative)

1. **Deploy to Netlify**

   - Go to https://netlify.com and sign up/login
   - Click "Add new site" → "Import an existing project"
   - Connect GitHub repository
   - Configure:
     - **Base directory**: `frontend`
     - **Build command**: `npm run build`
     - **Publish directory**: `frontend/build`

2. **Configure Redirects**

   - Create `frontend/public/_redirects` file:
     ```
     /api/*  https://your-backend-url.onrender.com/api/:splat  200
     ```
   - Or create `netlify.toml` in `frontend`:
     ```toml
     [[redirects]]
       from = "/api/*"
       to = "https://your-backend-url.onrender.com/api/:splat"
       status = 200
       force = true
     ```

3. **Deploy**
   - Click "Deploy site"
   - Netlify will provide a URL

---

## 🔄 Step 4: Update Frontend API URLs (Required)

Since your frontend code has hardcoded `http://127.0.0.1:5000`, you have two options:

### Option 1: Use Proxy (Recommended - No Code Changes)

- Use Vercel/Netlify rewrite rules (as shown above)
- This routes `/api/*` requests to your backend automatically

### Option 2: Update Code (Minimal Change)

- Create `frontend/.env.production`:
  ```
  REACT_APP_API_URL=https://your-backend-url.onrender.com
  ```
- Update all fetch calls to use `process.env.REACT_APP_API_URL || "http://127.0.0.1:5000"`

**For this guide, we'll use Option 1 (proxy) to avoid code changes.**

---

## 📝 Step 5: Final Configuration Checklist

### Backend Environment Variables:

- ✅ `MONGO_URI` - MongoDB Atlas connection string
- ✅ `JWT_SECRET` - Random secret string (e.g., generate with `openssl rand -hex 32`)
- ✅ `PORT` - Port number (Render uses 10000, Railway auto-assigns)
- ✅ `UPLOAD_FOLDER` - `uploads` (default)

### Frontend Configuration:

- ✅ Proxy/rewrite rules configured
- ✅ Build completes successfully
- ✅ Environment variables set (if using Option 2)

### Database:

- ✅ MongoDB Atlas cluster running
- ✅ Network access configured (0.0.0.0/0)
- ✅ Database user created

---

## 🧪 Step 6: Testing Deployment

1. **Test Backend**

   - Visit: `https://your-backend-url.onrender.com/`
   - Should see: "Flask server is running!"
   - Test API: `https://your-backend-url.onrender.com/api/projects`

2. **Test Frontend**

   - Visit your Vercel/Netlify URL
   - Try to sign up/login
   - Check browser console for errors
   - Verify API calls are working

3. **Common Issues**
   - **CORS errors**: Backend CORS is already configured for `*`, should work
   - **404 on API calls**: Check proxy/rewrite configuration
   - **Database connection errors**: Verify MONGO_URI is correct
   - **Slow first request**: Render free tier spins down after inactivity

---

## 🚀 Quick Deployment Summary

1. **MongoDB Atlas**: Create cluster → Get connection string
2. **Backend (Render)**:
   - Deploy from GitHub
   - Set environment variables
   - Get backend URL
3. **Frontend (Vercel)**:
   - Deploy from GitHub
   - Configure proxy in `vercel.json`
   - Get frontend URL
4. **Test**: Visit frontend URL and test functionality

---

## 📌 Important Notes

### Free Tier Limitations:

**Render (Backend)**:

- Spins down after 15 min inactivity (cold start ~30-60s)
- 750 hours/month free
- 512MB RAM

**Vercel/Netlify (Frontend)**:

- Unlimited requests
- 100GB bandwidth/month
- Auto SSL certificates

**MongoDB Atlas**:

- 512MB storage
- Shared cluster (not dedicated)
- Good for development/small projects

### File Storage:

- Uploaded files are stored in `uploads/` folder on backend
- On free tiers, files are ephemeral (lost on restart)
- For production, consider:
  - AWS S3 (free tier available)
  - Cloudinary (free tier)
  - Or upgrade to paid hosting with persistent storage

### Reports:

- PDF reports are generated in `reports/` folder
- Same ephemeral storage issue applies

---

## 🔧 Troubleshooting

### Backend won't start:

- Check `requirements.txt` includes `gunicorn`
- Verify `Procfile` exists and is correct
- Check environment variables are set
- Review build logs in Render/Railway dashboard

### Frontend can't connect to backend:

- Verify proxy/rewrite rules are correct
- Check backend URL is accessible
- Test backend URL directly in browser
- Check browser console for CORS errors

### Vercel Build Permission Error (`react-scripts: Permission denied`):

**Error**: `sh: line 1: /vercel/path0/frontend/node_modules/.bin/react-scripts: Permission denied`

**Solutions**:

1. **Clear Vercel Build Cache**:

   - Go to Vercel Dashboard → Your Project → Settings → General
   - Scroll to "Build & Development Settings"
   - Click "Clear Build Cache"
   - Redeploy

2. **Verify Root Directory in Vercel**:

   - Go to Vercel Dashboard → Your Project → Settings → General
   - Under "Root Directory", make sure it's set to `frontend` (not empty)
   - If it's empty, set it to `frontend` and redeploy

3. **Check Build Settings**:

   - Framework Preset: `Create React App`
   - Root Directory: `frontend`
   - Build Command: `npm run build` (or leave default)
   - Output Directory: `build`
   - Install Command: `npm install` (or leave default)

4. **Update package.json build script (Recommended Fix)**:

   - The `package.json` has been updated to use `node` directly instead of the binary
   - Change the build script in `frontend/package.json` to:
     ```json
     "build": "node node_modules/react-scripts/scripts/build.js"
     ```
   - This bypasses permission issues by running the script directly with Node
   - Commit and push this change, then redeploy

5. **Alternative: Use npx in Vercel Dashboard**:

   - In Vercel Dashboard → Settings → General → Build & Development Settings
   - Change Build Command to: `npx react-scripts build`
   - This bypasses permission issues with the binary

6. **If still failing, verify Root Directory**:

   - Make sure Root Directory is set to `frontend` (not empty)
   - If Root Directory is empty, Vercel tries to build from root and can't find the right files

### Database connection fails:

- Verify MongoDB Atlas network access allows all IPs (0.0.0.0/0)
- Check connection string has correct password
- Ensure database user has proper permissions

---

## 🎉 You're Done!

Your application should now be live at:

- **Frontend**: `https://your-app.vercel.app`
- **Backend**: `https://your-backend.onrender.com`

Share the frontend URL with users to access your Student Project Platform!
