# Quick Start: Deploy to Vercel

## 🚀 One-Command Deployment

```bash
# Install Vercel CLI (if not already installed)
npm install -g vercel

# Login to Vercel
vercel login

# Deploy (from project root)
vercel

# Set environment variables
vercel env add MONGO_URI
vercel env add JWT_SECRET
vercel env add VERCEL

# Deploy to production
vercel --prod
```

## 📋 Required Environment Variables

Set these in Vercel Dashboard → Settings → Environment Variables:

1. **MONGO_URI** - MongoDB Atlas connection string
   ```
   mongodb+srv://username:password@cluster.mongodb.net/database?retryWrites=true&w=majority
   ```

2. **JWT_SECRET** - Random secret for JWT tokens
   ```bash
   openssl rand -hex 32
   ```

3. **VERCEL** - Set to `1` (enables Vercel-specific settings)
   ```
   1
   ```

## ⚠️ Important Notes

### File Storage Limitation

**Current Implementation**: Files are stored in `/tmp` which is **ephemeral** (deleted after function execution).

**Impact**:
- ✅ File uploads work
- ✅ File processing works
- ❌ Files cannot be downloaded later
- ❌ Files are not persistent

**Solution**: Implement Vercel Blob Storage (see `VERCEL_DEPLOYMENT.md` for details)

### Project Structure

```
.
├── api/
│   ├── index.py          # Vercel serverless function handler
│   └── requirements.txt  # Python dependencies
├── backend/
│   ├── app.py           # Flask application
│   └── requirements.txt # Backend dependencies
├── frontend/
│   ├── src/             # React source code
│   └── package.json     # Frontend dependencies
├── vercel.json          # Vercel configuration
└── VERCEL_DEPLOYMENT.md # Full deployment guide
```

## 🧪 Testing

After deployment:

1. **Test Frontend**: Visit `https://your-app.vercel.app`
2. **Test API**: `curl https://your-app.vercel.app/api/projects`
3. **Test Login**: Try logging in through the frontend

## 📚 Full Documentation

See `VERCEL_DEPLOYMENT.md` for:
- Detailed deployment steps
- Troubleshooting guide
- File storage solutions
- Advanced configuration

## 🆘 Need Help?

1. Check Vercel deployment logs
2. Review `VERCEL_DEPLOYMENT.md`
3. Check function logs in Vercel Dashboard

