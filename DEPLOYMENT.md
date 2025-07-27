# Vercel Deployment Guide

## 🚀 Deploy to Vercel

### Prerequisites

- Vercel account (free at vercel.com)
- GitHub repository with your code

### Step 1: Prepare Your Repository

1. **Push your code to GitHub**

   ```bash
   git add .
   git commit -m "Ready for Vercel deployment"
   git push origin main
   ```

2. **Ensure all files are committed:**
   - `vercel.json` (configuration file)
   - `client/package.json` (with build scripts)
   - `server/index.js` (backend API)

### Step 2: Deploy on Vercel

1. **Go to [vercel.com](https://vercel.com)**
2. **Sign in with GitHub**
3. **Click "New Project"**
4. **Import your GitHub repository**
5. **Configure the project:**

   **Build Settings:**

   - Framework Preset: `Other`
   - Root Directory: `./` (leave empty)
   - Build Command: `cd client && npm run build`
   - Output Directory: `client/build`
   - Install Command: `npm run install-all`

   **Environment Variables:**

   - `NODE_ENV`: `production`
   - `JWT_SECRET`: `your-production-secret-key`
   - `REACT_APP_API_URL`: `/api`

6. **Click "Deploy"**

### Step 3: Verify Deployment

1. **Check the deployment logs**
2. **Test the application:**
   - Visit your Vercel URL
   - Test login functionality
   - Verify all features work

### Step 4: Custom Domain (Optional)

1. **In Vercel dashboard, go to your project**
2. **Click "Settings" → "Domains"**
3. **Add your custom domain**
4. **Configure DNS records as instructed**

## 🔧 Configuration Details

### Vercel Configuration (`vercel.json`)

- Routes API calls to the Node.js server
- Serves React app for all other routes
- Handles both frontend and backend in one deployment

### Environment Variables

- `NODE_ENV`: Set to production
- `JWT_SECRET`: Your secret key for JWT tokens
- `REACT_APP_API_URL`: Points to `/api` for production

### Build Process

1. Vercel installs dependencies
2. Builds the React app
3. Deploys both frontend and backend
4. Routes are automatically configured

## 🐛 Troubleshooting

### Common Issues:

1. **Build Fails**

   - Check if all dependencies are in package.json
   - Verify build scripts are correct
   - Check for syntax errors

2. **API Not Working**

   - Verify environment variables are set
   - Check if server/index.js is accessible
   - Ensure routes are correctly configured

3. **Authentication Issues**
   - Verify JWT_SECRET is set
   - Check if API endpoints are working
   - Test with demo credentials

### Support

- Check Vercel deployment logs
- Verify all environment variables
- Test locally before deploying

## 📝 Notes

- The application will be available at your Vercel URL
- API endpoints will be at `your-url.vercel.app/api/*`
- Static files will be served from the React build
- All features including authentication will work in production
