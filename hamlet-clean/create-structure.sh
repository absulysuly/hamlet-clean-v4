#!/bin/bash

# Create backend structure
mkdir -p backend/src/{routes,controllers,services,config,middleware}
mkdir -p backend/prisma

# Create frontend structure
mkdir -p frontend/src/{app,components,lib,hooks,types,styles}
mkdir -p frontend/public

# Create shared
mkdir -p shared/types

# Create root configs
touch .gitignore
touch README.md
touch docker-compose.yml

# Create backend files
touch backend/package.json
touch backend/tsconfig.json
touch backend/Dockerfile
touch backend/.env.example
touch backend/src/index.ts
touch backend/src/routes/index.ts
touch backend/src/controllers/{candidates,health,governorates,users,events}.ts
touch backend/src/services/{database,candidates}.ts
touch backend/src/config/database.ts
touch backend/src/middleware/{cors,error}.ts
touch backend/prisma/schema.prisma

# Create frontend files
touch frontend/package.json
touch frontend/tsconfig.json
touch frontend/next.config.js
touch frontend/Dockerfile
touch frontend/.env.example
touch frontend/src/app/page.tsx
touch frontend/src/app/layout.tsx
touch frontend/src/components/{Header,CandidateList,CandidateCard}.tsx
touch frontend/src/lib/api.ts
touch frontend/src/hooks/useCandidates.ts
touch frontend/src/types/index.ts

# Create CI/CD
mkdir -p .github/workflows
touch .github/workflows/deploy-backend.yml
touch .github/workflows/deploy-frontend.yml

echo "✅ Structure created"
