#!/bin/bash

# Production Deployment Script
echo "🚀 Setting up production environment..."

# Set production environment
export NODE_ENV=production

# Build the client
echo "📦 Building React application..."
cd client
npm run build
cd ..

# Create production .env if not exists
if [ ! -f "server/.env.production" ]; then
    echo "📝 Creating production .env file..."
    cat > server/.env.production << EOF
PORT=5000
NODE_ENV=production
JWT_SECRET=${JWT_SECRET:-your-production-secret-key}
EOF
fi

# Copy production env to .env
cp server/.env.production server/.env

echo "✅ Production build ready!"
echo ""
echo "To start production server:"
echo "  npm start"
echo ""
echo "⚠️  Production mode - no auto-restart (nodemon disabled)"
echo "🔒 Environment: production"
echo "🚀 Ready for deployment!" 