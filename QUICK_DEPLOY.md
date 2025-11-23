# Quick Deployment Checklist - Vercel

## 🚀 Fast Track Deployment (30 minutes)

### 1. MongoDB Atlas Setup (5 min)
- [ ] Sign up at https://mongodb.com/cloud/atlas
- [ ] Create FREE cluster (M0)
- [ ] Create database user (save username/password)
- [ ] Allow network access (0.0.0.0/0)
- [ ] Copy connection string (replace `<password>`)

### 2. Vercel Deployment (15 min)
- [ ] Sign up at https://vercel.com
- [ ] Install Vercel CLI: `npm install -g vercel`
- [ ] Login: `vercel login`
- [ ] Deploy from project root: `vercel`
- [ ] Set Environment Variables in Vercel Dashboard:
  ```
  MONGO_URI=<your-atlas-connection-string>
  JWT_SECRET=<random-secret>
  VERCEL=1
  ```
- [ ] Deploy to production: `vercel --prod`
- [ ] Copy your Vercel URL

### 3. Test (5 min)
- [ ] Visit your Vercel URL
- [ ] Try signup/login
- [ ] Check browser console for errors
- [ ] Test API: `curl https://your-app.vercel.app/api/projects`

---

## 📝 Files Created for You

✅ `vercel.json` - Root Vercel configuration
✅ `api/index.py` - Vercel serverless function handler
✅ `api/requirements.txt` - Python dependencies
✅ `frontend/vercel.json` - Frontend configuration

---

## 🔗 Free Hosting URLs

| Service | URL | Free Tier |
|---------|-----|-----------|
| **MongoDB Atlas** | https://mongodb.com/cloud/atlas | 512MB storage |
| **Vercel** | https://vercel.com | Unlimited requests, 100GB bandwidth |

---

## ⚠️ Important Notes

1. **File Storage**: Files are stored in `/tmp` (ephemeral). Files are deleted after function execution. Consider implementing Vercel Blob Storage for persistent files.
2. **Cold Starts**: Vercel serverless functions may have cold starts (first request after inactivity can be slow).
3. **Function Timeout**: Vercel free tier has a 10-second timeout. Upgrade to Pro for 60-second timeout.
4. **Database**: MongoDB Atlas free tier is sufficient for development.

---

## 🆘 Need Help?

See `VERCEL_DEPLOYMENT.md` for detailed step-by-step instructions.
