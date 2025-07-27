#!/bin/bash

# Development Setup Script
echo "🚀 Setting up development environment..."

# Check if .env files exist, create if not
if [ ! -f "server/.env" ]; then
    echo "📝 Creating server .env file..."
    cat > server/.env << EOF
PORT=5000
NODE_ENV=development
JWT_SECRET=dev-secret-key-change-in-production
EOF
fi

if [ ! -f "client/.env" ]; then
    echo "📝 Creating client .env file..."
    cat > client/.env << EOF
REACT_APP_API_URL=http://localhost:5000
REACT_APP_ENV=development
EOF
fi

# Install dependencies if needed
if [ ! -d "node_modules" ]; then
    echo "📦 Installing root dependencies..."
    npm install
fi

if [ ! -d "client/node_modules" ]; then
    echo "📦 Installing client dependencies..."
    cd client && npm install && cd ..
fi

if [ ! -d "server/node_modules" ]; then
    echo "📦 Installing server dependencies..."
    cd server && npm install && cd ..
fi

echo "✅ Development environment ready!"
echo ""
echo "Available commands:"
echo "  npm run dev          - Start both client and server with auto-restart"
echo "  npm run dev:server   - Start only server with nodemon"
echo "  npm run dev:client   - Start only client with hot reload"
echo "  npm run dev:debug    - Start with debug mode enabled"
echo "  npm start           - Start production server (no auto-restart)"
echo ""
echo "🔧 Auto-restart is enabled for development only!"
echo "🚀 Production deployments will use 'npm start' (no nodemon)" 