at# Deployment Guide - Vercel (Frontend) + Heroku (Backend)

This guide will walk you through deploying your Task Tracker application with the frontend on Vercel and backend on Heroku.

## Prerequisites

- GitHub account
- Vercel account (free tier available)
- Heroku account (free tier available, but note: Heroku free tier was discontinued in 2022, you may need to use a paid plan)
- MongoDB Atlas account (free tier available)
- Google Cloud Console account (for OAuth)

---

## Part 1: Backend Deployment on Heroku

### Step 1: Prepare Your Backend

1. **Ensure your `server/package.json` has a start script:**
   ```json
   {
     "scripts": {
       "start": "node index.js"
     }
   }
   ```

2. **Create a `Procfile` in the `server` directory:**
   ```
   web: node index.js
   ```
   (This file should already exist after setup)

3. **Update CORS settings** (if needed):
   - Your backend should allow requests from your Vercel frontend URL
   - The current setup uses `app.use(cors())` which allows all origins
   - For production, you may want to restrict it to your Vercel domain

### Step 2: Create Heroku App

1. **Install Heroku CLI** (if not already installed):
   ```bash
   # macOS
   brew tap heroku/brew && brew install heroku
   
   # Or download from: https://devcenter.heroku.com/articles/heroku-cli
   ```

2. **Login to Heroku:**
   ```bash
   heroku login
   ```

3. **Navigate to your project root:**
   ```bash
   cd "/Users/puravmalik/Coding/BREW - Task Tracker"
   ```

4. **Create a Heroku app:**
   ```bash
   heroku create your-app-name-backend
   ```
   (Replace `your-app-name-backend` with your desired app name)

5. **Set the buildpack** (if needed):
   ```bash
   heroku buildpacks:set heroku/nodejs
   ```

### Step 3: Configure Environment Variables on Heroku

1. **Set all required environment variables:**
   ```bash
   heroku config:set MONGO_URI=your-mongodb-connection-string
   heroku config:set JWT_SECRET=your-super-secret-jwt-key
   heroku config:set GOOGLE_CLIENT_ID=your-google-client-id
   ```

2. **Verify your environment variables:**
   ```bash
   heroku config
   ```

### Step 4: Deploy to Heroku

**Option A: Deploy from GitHub (Recommended)**

1. **Push your code to GitHub** (if not already):
   ```bash
   git add .
   git commit -m "Prepare for deployment"
   git push origin main
   ```

2. **Connect Heroku to GitHub:**
   - Go to [Heroku Dashboard](https://dashboard.heroku.com)
   - Select your app
   - Go to "Deploy" tab
   - Under "Deployment method", select "GitHub"
   - Connect your repository
   - Enable "Automatic deploys" from your main branch
   - Click "Deploy Branch"

**Option B: Deploy using Git**

1. **Add Heroku remote:**
   ```bash
   heroku git:remote -a your-app-name-backend
   ```

2. **Deploy:**
   ```bash
   git subtree push --prefix server heroku main
   ```
   
   Or if that doesn't work:
   ```bash
   cd server
   git init
   git add .
   git commit -m "Deploy to Heroku"
   heroku git:remote -a your-app-name-backend
   git push heroku HEAD:main
   ```

### Step 5: Verify Backend Deployment

1. **Check logs:**
   ```bash
   heroku logs --tail
   ```

2. **Test your backend:**
   ```bash
   curl https://your-app-name-backend.herokuapp.com/api/tasks
   ```
   (Should return 401 Unauthorized, which is expected without auth token)

3. **Note your backend URL:**
   - Your backend URL will be: `https://your-app-name-backend.herokuapp.com`
   - API base URL: `https://your-app-name-backend.herokuapp.com/api`

---

## Part 2: Frontend Deployment on Vercel

### Step 1: Prepare Your Frontend

1. **Ensure your frontend is ready:**
   - All code is committed to GitHub
   - Environment variables are documented

### Step 2: Deploy to Vercel

1. **Go to [Vercel](https://vercel.com)**
   - Sign in with your GitHub account

2. **Import Your Project:**
   - Click "Add New Project"
   - Select your GitHub repository
   - Click "Import"

3. **Configure Project Settings:**
   - **Framework Preset**: Next.js (auto-detected)
   - **Root Directory**: `frontend` (IMPORTANT!)
   - **Build Command**: `npm run build` (default)
   - **Output Directory**: `.next` (default)
   - **Install Command**: `npm install` (default)

4. **Add Environment Variables:**
   - Click "Environment Variables"
   - Add the following:
     ```
     NEXT_PUBLIC_API_URL = https://your-app-name-backend.herokuapp.com/api
     NEXT_PUBLIC_GOOGLE_CLIENT_ID = your-google-client-id
     ```
   - Make sure to add them for all environments (Production, Preview, Development)

5. **Deploy:**
   - Click "Deploy"
   - Wait for the build to complete
   - Your app will be live at: `https://your-app-name.vercel.app`

### Step 3: Update Google OAuth Settings

1. **Go to [Google Cloud Console](https://console.cloud.google.com)**
2. **Navigate to APIs & Services > Credentials**
3. **Edit your OAuth 2.0 Client ID**
4. **Add Authorized JavaScript origins:**
   - `https://your-app-name.vercel.app`
   - `https://your-app-name-backend.herokuapp.com` (if needed)
5. **Add Authorized redirect URIs:**
   - `https://your-app-name.vercel.app`
6. **Save changes**

---

## Part 3: Post-Deployment Checklist

### Backend (Heroku)

- [ ] Backend is accessible at `https://your-app-name-backend.herokuapp.com`
- [ ] Environment variables are set correctly
- [ ] MongoDB connection is working (check logs)
- [ ] CORS allows requests from Vercel domain
- [ ] API endpoints are responding correctly

### Frontend (Vercel)

- [ ] Frontend is accessible at `https://your-app-name.vercel.app`
- [ ] Environment variables are set correctly
- [ ] API calls are pointing to Heroku backend
- [ ] Google OAuth is working
- [ ] All routes are accessible

### Google OAuth

- [ ] Production URLs added to Google Console
- [ ] OAuth consent screen is published (if needed)
- [ ] Test users added (if app is in testing mode)

### Testing

- [ ] User registration works
- [ ] User login works
- [ ] Google Sign-In works on both login and register pages
- [ ] Tasks can be created, read, updated, and deleted
- [ ] Protected routes require authentication
- [ ] Logout works correctly

---

## Troubleshooting

### Backend Issues

**Problem: App crashes on Heroku**
- Check logs: `heroku logs --tail`
- Ensure all environment variables are set
- Verify MongoDB connection string is correct
- Check that PORT is handled correctly (Heroku assigns it automatically)

**Problem: CORS errors**
- Update CORS settings to allow your Vercel domain
- In `server/index.js`, you can update:
  ```javascript
  app.use(cors({
    origin: process.env.FRONTEND_URL || 'https://your-app-name.vercel.app'
  }));
  ```

**Problem: MongoDB connection fails**
- Verify MongoDB Atlas network access allows all IPs (0.0.0.0/0) or Heroku's IPs
- Check connection string format
- Ensure database user has correct permissions

### Frontend Issues

**Problem: API calls fail**
- Verify `NEXT_PUBLIC_API_URL` is set correctly
- Check browser console for CORS errors
- Ensure backend is running and accessible

**Problem: Google Sign-In doesn't work**
- Verify `NEXT_PUBLIC_GOOGLE_CLIENT_ID` is set
- Check Google Console for correct authorized origins
- Clear browser cache and cookies

**Problem: Build fails on Vercel**
- Check build logs in Vercel dashboard
- Ensure all dependencies are in `package.json`
- Verify TypeScript errors are resolved

### General Issues

**Problem: Environment variables not working**
- Restart the app after setting environment variables
- For Vercel: Redeploy after adding environment variables
- For Heroku: Restart dynos: `heroku restart`

**Problem: Changes not reflecting**
- Clear browser cache
- Hard refresh (Ctrl+Shift+R or Cmd+Shift+R)
- Check if deployment completed successfully

---

## Useful Commands

### Heroku Commands

```bash
# View logs
heroku logs --tail

# Restart app
heroku restart

# View config vars
heroku config

# Set config var
heroku config:set KEY=value

# Open app in browser
heroku open

# Run commands in Heroku environment
heroku run node -v
```

### Vercel Commands

```bash
# Install Vercel CLI
npm i -g vercel

# Login
vercel login

# Deploy
vercel

# View deployments
vercel ls

# View logs
vercel logs
```

---

## Cost Considerations

### Free Tiers Available:
- **Vercel**: Free tier with generous limits
- **MongoDB Atlas**: Free tier (M0 cluster)
- **Google Cloud**: Free tier for OAuth

### Paid Services:
- **Heroku**: Free tier discontinued, starts at $7/month (Eco Dyno)
- Consider alternatives: Railway ($5/month), Render (free tier available)

---

## Alternative: Railway for Backend

If you prefer a free alternative to Heroku:

1. **Sign up at [Railway](https://railway.app)**
2. **Create New Project** from GitHub
3. **Set Root Directory** to `server`
4. **Add Environment Variables**
5. **Deploy** (automatic)

Railway provides a free tier with $5 credit monthly.

---

## Next Steps

After successful deployment:

1. Update your README with live demo URL
2. Test all features thoroughly
3. Monitor logs for any errors
4. Set up error tracking (optional): Sentry, LogRocket, etc.
5. Consider adding a custom domain (optional)

---

**Need Help?**
- [Heroku Documentation](https://devcenter.heroku.com/)
- [Vercel Documentation](https://vercel.com/docs)
- [MongoDB Atlas Documentation](https://docs.atlas.mongodb.com/)

