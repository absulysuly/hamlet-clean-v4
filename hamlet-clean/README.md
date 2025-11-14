# Hamlet Unified Platform - Iraq National Election 2025

Complete civic technology platform for Iraq's 2025 National Election serving 7,769+ candidates across 18 governorates.

## Features

- **Real-time Election Results Tracking**
- **Observer Reporting System**
- **Citizen Violation Reporting**
- **Trilingual Interface** (Arabic, Kurdish, English)
- **18 Governorate Coverage**

## Tech Stack

### Backend
- Node.js + Express.js + TypeScript
- PostgreSQL Database
- Prisma ORM
- RESTful API

### Frontend
- Next.js 14 + React 18
- TypeScript
- Tailwind CSS
- RTL Support for Arabic

## Quick Start

### Prerequisites
- Node.js 18+
- PostgreSQL 14+
- Docker (optional)

### Backend Setup
```bash
cd backend
npm install
cp .env.example .env
# Configure DATABASE_URL in .env
npx prisma generate
npx prisma db push
npm run dev
```

### Frontend Setup
```bash
cd frontend
npm install
cp .env.example .env
# Configure NEXT_PUBLIC_API_BASE in .env
npm run dev
```

### Docker Deployment
```bash
docker-compose up --build
```

## Production Deployment

### Backend (Railway)
1. Connect GitHub repo to Railway
2. Add PostgreSQL addon
3. Set environment variables
4. Deploy automatically on push

### Frontend (Vercel)
1. Connect GitHub repo to Vercel
2. Set environment variables
3. Deploy automatically on push

## Environment Variables

### Backend
```
DATABASE_URL=postgresql://user:pass@host:5432/db
PORT=3001
NODE_ENV=production
ALLOWED_ORIGINS=https://your-frontend.vercel.app
```

### Frontend
```
NEXT_PUBLIC_API_BASE=https://your-backend.railway.app
```

## API Endpoints

- `GET /api/health` - Health check
- `GET /api/candidates` - List candidates (paginated)
- `GET /api/candidates/:id` - Get single candidate
- `GET /api/candidates/governorate/:name` - Filter by governorate
- `GET /api/governorates` - List all governorates
- `GET /api/users` - List users
- `GET /api/events` - List events

## Database Schema

- **candidates** - 7,769 election candidates
- **users** - System users and observers
- **events** - Election events and reports
- **governorates** - 18 Iraqi governorates

## License

Proprietary - Iraq Election Commission 2025
