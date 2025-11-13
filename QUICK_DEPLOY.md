# Quick Deployment Checklist

## 🚀 Fast Track Deployment (30 minutes)

### 1. MongoDB Atlas Setup (5 min)
- [ ] Sign up at https://mongodb.com/cloud/atlas
- [ ] Create FREE cluster (M0)
- [ ] Create database user (save username/password)
- [ ] Allow network access (0.0.0.0/0)
- [ ] Copy connection string (replace `<password>`)

### 2. Backend Deployment - Render (10 min)
- [ ] Sign up at https://render.com
- [ ] New Web Service → Connect GitHub repo
- [ ] Settings:
  - Build: `cd backend && pip install -r requirements.txt`
  - Start: `cd backend && gunicorn app:app --bind 0.0.0.0:$PORT`
- [ ] Environment Variables:
  ```
  MONGO_URI=<your-atlas-connection-string>
  JWT_SECRET=<random-secret>
  PORT=10000
  UPLOAD_FOLDER=uploads
  ```
- [ ] Deploy → Copy backend URL

### 3. Frontend Deployment - Vercel (10 min)
- [ ] Sign up at https://vercel.com
- [ ] New Project → Import GitHub repo
- [ ] Settings:
  - Framework: Create React App
  - Root Directory: `frontend`
  - Build: `npm run build`
  - Output: `build`
- [ ] Create `frontend/vercel.json`:
  ```json
  {
    "rewrites": [{
      "source": "/api/:path*",
      "destination": "https://YOUR-BACKEND-URL.onrender.com/api/:path*"
    }]
  }
  ```
- [ ] Deploy → Copy frontend URL

### 4. Test (5 min)
- [ ] Visit frontend URL
- [ ] Try signup/login
- [ ] Check browser console for errors

---

## 📝 Files Created for You

✅ `backend/Procfile` - For Render deployment
✅ `backend/requirements.txt` - Updated with gunicorn
✅ `frontend/vercel.json.example` - Template for Vercel proxy
✅ `frontend/netlify.toml.example` - Template for Netlify

**Action Required**: Copy `vercel.json.example` to `vercel.json` and update with your backend URL!

---

## 🔗 Free Hosting URLs

| Service | URL | Free Tier |
|---------|-----|-----------|
| **MongoDB Atlas** | https://mongodb.com/cloud/atlas | 512MB storage |
| **Render** | https://render.com | 750 hrs/month |
| **Vercel** | https://vercel.com | Unlimited |
| **Netlify** | https://netlify.com | 100GB bandwidth |

---

## ⚠️ Important Notes

1. **Backend URL**: Replace `YOUR-BACKEND-URL` in `vercel.json` with your actual Render backend URL
2. **Cold Starts**: Render free tier spins down after 15 min (first request slow)
3. **File Storage**: Uploads are ephemeral on free tiers (lost on restart)
4. **Database**: MongoDB Atlas free tier is sufficient for development

---

## 🆘 Need Help?

See `DEPLOYMENT_GUIDE.md` for detailed step-by-step instructions.

