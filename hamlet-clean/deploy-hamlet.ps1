# HAMLET UNIFIED - ONE-CLICK DEPLOYMENT SCRIPT
# Run this in PowerShell to deploy your clean production-ready project

Write-Host "🚀 HAMLET UNIFIED DEPLOYMENT SCRIPT" -ForegroundColor Green
Write-Host "=" * 50 -ForegroundColor Yellow

# Configuration
$REPO_URL = "https://github.com/YOUR-USERNAME/hamlet-unified.git"  # UPDATE THIS
$PROJECT_NAME = "hamlet-unified-v4-clean"
$DEPLOY_PATH = "$HOME\Desktop\$PROJECT_NAME"

Write-Host "📂 Project will be created at: $DEPLOY_PATH" -ForegroundColor Cyan

# Step 1: Create clean directory
Write-Host "`n1️⃣  Creating clean project directory..." -ForegroundColor Cyan
if (Test-Path $DEPLOY_PATH) {
    Write-Host "⚠️   Directory exists. Removing old version..." -ForegroundColor Yellow
    Remove-Item -Recurse -Force $DEPLOY_PATH
}
New-Item -ItemType Directory -Force -Path $DEPLOY_PATH | Out-Null
Write-Host "✅ Directory created" -ForegroundColor Green

# Step 2: Extract project files
Write-Host "`n2️⃣  Extracting project files..." -ForegroundColor Cyan
$ARCHIVE_PATH = "$HOME\Downloads\hamlet-unified-clean.tar.gz"  # UPDATE THIS

if (-not (Test-Path $ARCHIVE_PATH)) {
    Write-Host "❌ Archive not found at: $ARCHIVE_PATH" -ForegroundColor Red
    Write-Host "Please extract the files manually and place them in: $DEPLOY_PATH" -ForegroundColor Yellow
    Write-Host "Then run the rest of this script manually." -ForegroundColor Yellow
    
    # Copy hamlet-clean directory content
    Write-Host "`n📋 Copying files from hamlet-clean..." -ForegroundColor Cyan
    Copy-Item -Recurse -Force "E:\HamletUnified\hamlet-clean\*" $DEPLOY_PATH
} else {
    tar -xzf $ARCHIVE_PATH -C $DEPLOY_PATH
}
Write-Host "✅ Files extracted" -ForegroundColor Green

# Step 3: Initialize Git
Write-Host "`n3️⃣  Initializing Git repository..." -ForegroundColor Cyan
Set-Location $DEPLOY_PATH
git init
git add .
git commit -m "Initial commit - Hamlet Unified V4 Production Ready"
Write-Host "✅ Git initialized" -ForegroundColor Green

# Step 4: Connect to GitHub
Write-Host "`n4️⃣  Connecting to GitHub..." -ForegroundColor Cyan
Write-Host "⚠️   UPDATE THE REPO_URL AT THE TOP OF THIS SCRIPT FIRST!" -ForegroundColor Yellow
Write-Host "Current URL: $REPO_URL" -ForegroundColor White

$proceed = Read-Host "Have you updated the GitHub URL? (yes/no)"
if ($proceed -eq "yes") {
    git remote add origin $REPO_URL
    Write-Host "✅ Remote added" -ForegroundColor Green
    
    # Step 5: Push to GitHub
    Write-Host "`n5️⃣  Pushing to GitHub..." -ForegroundColor Cyan
    git branch -M main
    git push -u origin main --force
    Write-Host "✅ Pushed to GitHub" -ForegroundColor Green
} else {
    Write-Host "⏸️  Skipping GitHub push" -ForegroundColor Yellow
    Write-Host "Run these commands manually after updating the URL:" -ForegroundColor Cyan
    Write-Host "  git remote add origin <YOUR-REPO-URL>" -ForegroundColor White
    Write-Host "  git branch -M main" -ForegroundColor White
    Write-Host "  git push -u origin main --force" -ForegroundColor White
}

# Step 6: Deploy Instructions
Write-Host "`n6️⃣  Next Steps - Deploy to Production:" -ForegroundColor Cyan
Write-Host ""
Write-Host "BACKEND (Railway):" -ForegroundColor Green
Write-Host "  1. Go to https://railway.app" -ForegroundColor White
Write-Host "  2. New Project → Deploy from GitHub" -ForegroundColor White
Write-Host "  3. Select your repo" -ForegroundColor White
Write-Host "  4. Add PostgreSQL plugin" -ForegroundColor White
Write-Host "  5. Set root directory: backend" -ForegroundColor White
Write-Host "  6. Add environment variables:" -ForegroundColor White
Write-Host "     - ALLOWED_ORIGINS=https://your-frontend.vercel.app" -ForegroundColor Gray
Write-Host "     - PORT=3001" -ForegroundColor Gray
Write-Host "     - NODE_ENV=production" -ForegroundColor Gray
Write-Host ""
Write-Host "FRONTEND (Vercel):" -ForegroundColor Green
Write-Host "  1. Go to https://vercel.com" -ForegroundColor White
Write-Host "  2. Import Project from GitHub" -ForegroundColor White
Write-Host "  3. Set root directory: frontend" -ForegroundColor White
Write-Host "  4. Add environment variable:" -ForegroundColor White
Write-Host "     - NEXT_PUBLIC_API_BASE=https://your-backend.railway.app" -ForegroundColor Gray
Write-Host ""
Write-Host "✅ DEPLOYMENT COMPLETE!" -ForegroundColor Green
Write-Host "📖 Read DEPLOYMENT.md for detailed instructions" -ForegroundColor Cyan
Write-Host ""
Write-Host "Project location: $DEPLOY_PATH" -ForegroundColor Yellow
Write-Host ""
