# Development Guide - Auto-Restart Setup

## 🔄 Auto-Restart Configuration

This project is configured with automatic restart capabilities for development while ensuring production deployments remain stable.

## 🚀 Quick Start

### Development Setup

```bash
# Initial setup (one-time)
npm run setup:dev

# Start development with auto-restart
npm run dev
```

### Production Setup

```bash
# Production build and setup
npm run setup:prod

# Start production server (no auto-restart)
npm start
```

## 📋 Available Scripts

### Development Scripts

- `npm run dev` - Start both client and server with auto-restart
- `npm run dev:server` - Start only server with nodemon
- `npm run dev:client` - Start only client with hot reload
- `npm run dev:debug` - Start with debug mode enabled

### Production Scripts

- `npm start` - Start production server (no auto-restart)
- `npm run build` - Build React app for production
- `npm run setup:prod` - Setup production environment

### PM2 Scripts (Production)

- `npm run pm2:start` - Start with PM2 process manager
- `npm run pm2:stop` - Stop PM2 processes
- `npm run pm2:restart` - Restart PM2 processes
- `npm run pm2:delete` - Delete PM2 processes

## 🔧 Auto-Restart Features

### Backend (Node.js)

- **Nodemon**: Watches for file changes in `server/` directory
- **File Extensions**: `.js`, `.json`, `.env`
- **Ignored**: `node_modules/`, test files, logs
- **Delay**: 1 second to prevent rapid restarts
- **Manual Restart**: Type `rs` in terminal

### Frontend (React)

- **Hot Reload**: Built into Create React App
- **Fast Refresh**: Instant UI updates
- **State Preservation**: Maintains component state

## 🛡️ Production Safety

### Environment Detection

The application automatically detects the environment:

```javascript
const NODE_ENV = process.env.NODE_ENV || "development";

if (NODE_ENV === "development") {
  // Auto-restart enabled
  console.log("🚀 Development mode enabled");
} else {
  // Production mode - no auto-restart
  console.log("🔒 Production mode - stable deployment");
}
```

### Deployment Considerations

#### Heroku/Railway/Render

```bash
# These platforms automatically use:
npm start  # Production start script
```

#### Vercel/Netlify

```bash
# Frontend only - no backend auto-restart needed
npm run build
```

#### Docker

```dockerfile
# Production Dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
EXPOSE 5000
CMD ["npm", "start"]
```

## 🔍 Debug Mode

Enable debug mode for advanced development:

```bash
npm run dev:debug
```

This enables:

- Node.js inspector
- Breakpoint debugging
- Memory profiling
- Performance monitoring

## 📁 File Structure

```
├── scripts/
│   ├── dev-setup.sh      # Development environment setup
│   └── deploy.sh         # Production deployment setup
├── server/
│   ├── nodemon.json      # Nodemon configuration
│   └── index.js          # Server with environment detection
├── client/
│   └── package.json      # React with hot reload
├── ecosystem.config.js   # PM2 production configuration
└── package.json          # Root scripts
```

## 🚨 Troubleshooting

### Auto-restart not working?

1. Check if `NODE_ENV=development`
2. Verify nodemon is installed: `npm list nodemon`
3. Check file permissions: `chmod +x scripts/dev-setup.sh`

### Production deployment issues?

1. Ensure `NODE_ENV=production`
2. Use `npm start` not `npm run dev`
3. Check environment variables

### Memory issues?

1. Restart development server
2. Clear node_modules: `rm -rf node_modules && npm install`
3. Check for memory leaks in development

## 🔒 Security Notes

- Development secrets are in `.env` (gitignored)
- Production secrets should be set via environment variables
- JWT secrets are environment-specific
- Auto-restart is disabled in production

## 📊 Monitoring

### Development

- Console logs show restart events
- Nodemon provides restart statistics
- React DevTools for frontend debugging

### Production

- PM2 provides process monitoring
- Log files in `logs/` directory
- Health check endpoint: `/api/health`
