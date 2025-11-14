# Hamlet Unified - Deployment Guide

## Quick Deploy (15 Minutes)

### Step 1: Clone and Setup (2 min)
```bash
git clone <your-repo-url>
cd hamlet-unified
```

### Step 2: Backend Setup (5 min)

#### Railway Deployment
1. Go to [railway.app](https://railway.app)
2. Create new project → Deploy from GitHub
3. Select your repository
4. Add PostgreSQL plugin
5. Set environment variables:
   ```
   DATABASE_URL=<auto-provided by Railway>
   PORT=3001
   NODE_ENV=production
   ALLOWED_ORIGINS=https://your-frontend.vercel.app
   ```
6. Deploy automatically triggers

#### Verify Backend
```bash
curl https://your-backend.railway.app/api/health
```

### Step 3: Frontend Setup (5 min)

#### Vercel Deployment
1. Go to [vercel.com](https://vercel.com)
2. Import project from GitHub
3. Set root directory: `frontend`
4. Set environment variable:
   ```
   NEXT_PUBLIC_API_BASE=https://your-backend.railway.app
   ```
5. Deploy

#### Verify Frontend
Open: https://your-frontend.vercel.app

### Step 4: Database Setup (3 min)

#### In Railway PostgreSQL Console
```sql
-- Run migrations
-- Prisma will auto-create tables

-- Verify
SELECT COUNT(*) FROM candidates;
```

## Local Development

### Prerequisites
- Node.js 18+
- PostgreSQL 14+
- npm or yarn

### Backend
```bash
cd backend
npm install
cp .env.example .env
# Edit .env with your DATABASE_URL
npx prisma generate
npx prisma db push
npm run dev
```

### Frontend
```bash
cd frontend
npm install
cp .env.example .env
# Edit .env with your API URL
npm run dev
```

### Docker (All-in-One)
```bash
docker-compose up --build
```

## Environment Variables

### Backend (.env)
```
DATABASE_URL=postgresql://user:password@host:5432/db
PORT=3001
NODE_ENV=production
ALLOWED_ORIGINS=https://your-frontend.vercel.app,http://localhost:3000
SESSION_SECRET=<generate-random-string>
JWT_SECRET=<generate-random-string>
```

### Frontend (.env)
```
NEXT_PUBLIC_API_BASE=https://your-backend.railway.app
NODE_ENV=production
```

## Post-Deployment Checks

✅ Backend health: `curl https://your-backend.railway.app/api/health`
✅ Candidates endpoint: `curl https://your-backend.railway.app/api/candidates`
✅ Frontend loads without errors
✅ Data displays correctly
✅ No CORS errors in browser console

## Troubleshooting

### Backend Returns Empty Response
- Check Railway logs for errors
- Verify DATABASE_URL is set
- Ensure Prisma generated: `npx prisma generate`

### CORS Errors
- Add frontend URL to ALLOWED_ORIGINS in Railway
- Include http://localhost:3000 for development

### Database Connection Failed
- Verify PostgreSQL addon is attached
- Check DATABASE_URL format
- Run `npx prisma db push` to create tables

### Build Fails
- Clear node_modules: `rm -rf node_modules && npm install`
- Check Node.js version: 18+
- Verify package.json has no errors

## CI/CD

GitHub Actions automatically deploy on push to main:
- Backend → Railway
- Frontend → Vercel

Set secrets in GitHub repo settings:
- `VERCEL_TOKEN`
- `VERCEL_ORG_ID`
- `VERCEL_PROJECT_ID`

## Production Checklist

- [ ] Backend deployed on Railway
- [ ] Frontend deployed on Vercel
- [ ] PostgreSQL connected
- [ ] Environment variables set
- [ ] Health endpoints responding
- [ ] Database populated with candidates
- [ ] CORS configured correctly
- [ ] SSL/HTTPS enabled
- [ ] Error logging active
- [ ] Monitoring setup

## Support

For issues, check:
1. Railway logs (backend errors)
2. Vercel logs (frontend errors)
3. Browser console (client errors)
4. Database logs (query errors)

## Success Criteria

Platform is ready when:
✅ /api/health returns `{"status":"healthy"}`
✅ /api/candidates returns 7,769 candidates
✅ Frontend loads and displays data
✅ No console errors
✅ All 18 governorates accessible
