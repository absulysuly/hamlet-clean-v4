# 🚀 Railway Deployment Guide - Hamlet Unified Platform

## ✅ Current Status

**Backend:** LIVE and OPERATIONAL
- URL: https://digitalmajlis.up.railway.app
- Status: Healthy ✓
- Database: Connected ✓
- API: Responding ✓

**Frontend:** READY TO DEPLOY
- Configuration files: Ready ✓
- Next.js build: Configured ✓
- Environment variables: Template provided ✓

---

## 📋 Quick Deployment (5 Minutes)

### Step 1: Create Frontend Service

1. Go to Railway dashboard: https://railway.app
2. Open your project: `compassionate-truth`
3. Click **"+ New"** → **"GitHub Repo"**
4. Select: **`absulysuly/hamlet-clean-v4`**
5. Railway creates a new service

### Step 2: Configure Frontend Service

1. Click on the new service (rename it to "Frontend" if you want)
2. Go to **"Settings"** tab
3. Under **"Service"** section, set:
   - **Root Directory:** `hamlet-clean/frontend`
   - **Watch Paths:** `hamlet-clean/frontend/**`

### Step 3: Add Environment Variables

1. Click **"Variables"** tab
2. Click **"+ New Variable"**
3. Add these variables:

```bash
NEXT_PUBLIC_API_BASE=https://digitalmajlis.up.railway.app
NODE_ENV=production
```

4. Railway automatically starts building

### Step 4: Monitor Deployment

1. Go to **"Deployments"** tab
2. Watch build progress (takes 3-5 minutes)
3. Wait for: **"Deployment Successful"** ✓

### Step 5: Generate Public URL

1. Go to **"Settings"** tab
2. Scroll to **"Networking"** section
3. Click **"Generate Domain"**
4. Copy your frontend URL (e.g., `hamlet-frontend-production-xxxx.up.railway.app`)

### Step 6: Update Backend CORS

1. Go to **Backend service** (hamlet-clean-v4)
2. Click **"Variables"** tab
3. Update `ALLOWED_ORIGINS` variable:

```bash
ALLOWED_ORIGINS=https://your-frontend-url.up.railway.app,http://localhost:3000
```

Replace `your-frontend-url.up.railway.app` with your actual frontend URL from Step 5.

4. Save - Backend auto-redeploys

---

## ✅ Verify Deployment

### Backend Tests:
```bash
# Health Check
curl https://digitalmajlis.up.railway.app/api/health

# Governorates
curl https://digitalmajlis.up.railway.app/api/governorates

# Candidates
curl https://digitalmajlis.up.railway.app/api/candidates?page=1&limit=10
```

### Frontend Test:
Open in browser:
```
https://your-frontend-url.up.railway.app
```

**Check for:**
- ✅ Page loads without errors
- ✅ Arabic/English/Kurdish selector works
- ✅ Candidates list displays
- ✅ Governorate filter works
- ✅ No CORS errors in console (F12)

---

## 🎯 Final Production URLs

Once complete:

```
Backend API:  https://digitalmajlis.up.railway.app
Frontend App: https://[your-frontend].up.railway.app
Database:     PostgreSQL (Railway managed)
```

---

## 🆘 Troubleshooting

### Build Fails
- Check **Build Logs** tab for specific errors
- Verify Node.js version compatibility (should be 18+)
- Ensure `package.json` has correct scripts

### Frontend Shows API Errors
- Verify `NEXT_PUBLIC_API_BASE` points to: `https://digitalmajlis.up.railway.app`
- Check browser console (F12) for CORS errors
- Verify backend `ALLOWED_ORIGINS` includes frontend URL

### CORS Errors
- Update backend `ALLOWED_ORIGINS` with frontend URL
- Format: `https://frontend-url.up.railway.app,http://localhost:3000`
- Redeploy backend after updating

### Page Not Loading
- Check **Deploy Logs** for startup errors
- Verify frontend service is running (green status)
- Check if domain was generated

---

## 📊 Service Architecture

```
┌─────────────────────────────────────┐
│     Railway Project                 │
│  (compassionate-truth)              │
├─────────────────────────────────────┤
│                                     │
│  ┌──────────────────────────────┐  │
│  │  Frontend Service            │  │
│  │  - Next.js 14                │  │
│  │  - Port: 3000                │  │
│  │  - Root: hamlet-clean/frontend│ │
│  └──────────────────────────────┘  │
│              ▼                      │
│  ┌──────────────────────────────┐  │
│  │  Backend Service             │  │
│  │  - Node.js + Express         │  │
│  │  - Port: 3001                │  │
│  │  - URL: digitalmajlis...     │  │
│  └──────────────────────────────┘  │
│              ▼                      │
│  ┌──────────────────────────────┐  │
│  │  PostgreSQL Database         │  │
│  │  - Managed by Railway        │  │
│  │  - Auto-connected            │  │
│  └──────────────────────────────┘  │
│                                     │
└─────────────────────────────────────┘
```

---

## 🎉 Success Checklist

- [x] Backend deployed and healthy
- [x] Database connected
- [x] API endpoints responding
- [ ] Frontend service created
- [ ] Frontend environment variables set
- [ ] Frontend deployed successfully
- [ ] Frontend public URL generated
- [ ] Backend CORS updated
- [ ] Frontend loads in browser
- [ ] No console errors
- [ ] API calls working from frontend

---

## 📞 Support

If you encounter issues:

1. Check **Build Logs** and **Deploy Logs** in Railway
2. Verify all environment variables are set correctly
3. Test API endpoints directly in browser
4. Check browser console (F12) for frontend errors
5. Review Railway service status indicators

---

## 🚀 Next Steps After Deployment

1. **Custom Domain (Optional):**
   - Settings → Networking → Custom Domain
   - Add your domain and configure DNS

2. **Monitoring:**
   - Use Railway Metrics tab
   - Monitor response times and errors

3. **Scaling (If needed):**
   - Railway auto-scales based on usage
   - Adjust in Settings if needed

4. **Database Backups:**
   - Configure in PostgreSQL service settings
   - Schedule regular backups

---

## 📝 Environment Variables Reference

### Backend Variables:
```bash
DATABASE_URL=${{Postgres.DATABASE_URL}}
PORT=3001
NODE_ENV=production
ALLOWED_ORIGINS=https://your-frontend-url.up.railway.app,http://localhost:3000
```

### Frontend Variables:
```bash
NEXT_PUBLIC_API_BASE=https://digitalmajlis.up.railway.app
NODE_ENV=production
```

---

**Deployment Date:** 2025-11-14  
**Backend URL:** https://digitalmajlis.up.railway.app  
**Status:** Backend ✓ | Frontend Pending  
