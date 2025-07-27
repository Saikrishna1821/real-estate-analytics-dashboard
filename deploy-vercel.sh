#!/bin/bash

# Vercel Deployment Script
echo "🚀 Preparing for Vercel deployment..."

# Check if git is initialized
if [ ! -d ".git" ]; then
    echo "❌ Git repository not found. Please initialize git first:"
    echo "   git init"
    echo "   git add ."
    echo "   git commit -m 'Initial commit'"
    exit 1
fi

# Check if vercel.json exists
if [ ! -f "vercel.json" ]; then
    echo "❌ vercel.json not found. Please ensure it exists in the root directory."
    exit 1
fi

# Build the project
echo "📦 Building the project..."
npm run build

if [ $? -eq 0 ]; then
    echo "✅ Build successful!"
else
    echo "❌ Build failed. Please fix the errors and try again."
    exit 1
fi

# Check if all required files exist
echo "🔍 Checking required files..."
required_files=("vercel.json" "client/package.json" "server/index.js")
for file in "${required_files[@]}"; do
    if [ -f "$file" ]; then
        echo "✅ $file exists"
    else
        echo "❌ $file missing"
        exit 1
    fi
done

echo ""
echo "🎉 Ready for Vercel deployment!"
echo ""
echo "Next steps:"
echo "1. Push your code to GitHub:"
echo "   git add ."
echo "   git commit -m 'Ready for Vercel deployment'"
echo "   git push origin main"
echo ""
echo "2. Go to https://vercel.com"
echo "3. Import your GitHub repository"
echo "4. Configure environment variables:"
echo "   - NODE_ENV: production"
echo "   - JWT_SECRET: your-production-secret-key"
echo "   - REACT_APP_API_URL: /api"
echo ""
echo "5. Deploy!"
echo ""
echo "📖 See DEPLOYMENT.md for detailed instructions." 