#!/bin/bash

echo "🚀 GitHub Repository Setup for Vercel Deployment"
echo ""

# Check if git is initialized
if [ ! -d ".git" ]; then
    echo "❌ Git repository not found. Please initialize git first:"
    echo "   git init"
    echo "   git add ."
    echo "   git commit -m 'Initial commit'"
    exit 1
fi

echo "✅ Git repository found"
echo ""

# Check current status
echo "📋 Current git status:"
git status --porcelain

echo ""
echo "🔗 To connect to GitHub, follow these steps:"
echo ""
echo "1. Go to https://github.com"
echo "2. Click '+' → 'New repository'"
echo "3. Repository name: real-estate-analytics-dashboard"
echo "4. Description: Real Estate Analytics Dashboard with React and Node.js"
echo "5. Choose Public or Private"
echo "6. DON'T initialize with README (you already have files)"
echo "7. Click 'Create repository'"
echo ""
echo "8. After creating, copy the repository URL and run:"
echo "   git remote add origin https://github.com/YOUR_USERNAME/real-estate-analytics-dashboard.git"
echo "   git branch -M main"
echo "   git push -u origin main"
echo ""
echo "9. Then deploy to Vercel:"
echo "   - Go to https://vercel.com"
echo "   - Import your GitHub repository"
echo "   - Set environment variables:"
echo "     * NODE_ENV: production"
echo "     * JWT_SECRET: your-production-secret-key"
echo "     * REACT_APP_API_URL: /api"
echo "   - Click Deploy!"
echo ""
echo "📖 See DEPLOYMENT.md for detailed instructions" 