#!/bin/bash
# Quick deployment verification script

echo "🚀 Hamlet Frontend - Railway Deployment Check"
echo "=============================================="
echo ""

# Check if environment variables are set
if [ -z "$NEXT_PUBLIC_API_BASE" ]; then
    echo "❌ ERROR: NEXT_PUBLIC_API_BASE not set"
    echo "   Set it in Railway Variables tab: https://digitalmajlis.up.railway.app"
    exit 1
else
    echo "✅ NEXT_PUBLIC_API_BASE: $NEXT_PUBLIC_API_BASE"
fi

if [ -z "$NODE_ENV" ]; then
    echo "⚠️  WARNING: NODE_ENV not set, defaulting to production"
    export NODE_ENV=production
else
    echo "✅ NODE_ENV: $NODE_ENV"
fi

echo ""
echo "🔨 Building frontend..."
npm run build

if [ $? -eq 0 ]; then
    echo "✅ Build successful!"
    echo ""
    echo "🚀 Starting frontend..."
    npm start
else
    echo "❌ Build failed! Check errors above."
    exit 1
fi
