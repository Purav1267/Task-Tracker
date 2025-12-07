# Task Tracker Application

A full-stack task management application built for the BREW Hiring Assignment. This application allows authenticated users to create, read, update, and delete their personal tasks with advanced filtering and search capabilities.

## 🚀 Live Demo

**Frontend:** [https://task-tracker-hazel-theta.vercel.app/](https://task-tracker-hazel-theta.vercel.app/)

**Backend API:** [https://task-tracker-backend-6647-c435ebfb5871.herokuapp.com/api](https://task-tracker-backend-6647-c435ebfb5871.herokuapp.com/api)

## 📋 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Setup Instructions](#setup-instructions)
- [Google OAuth Setup](#google-oauth-setup)
- [Project Structure](#project-structure)
- [API Endpoints](#api-endpoints)
- [Deployment Guide](#deployment-guide)
- [Troubleshooting](#troubleshooting)
- [Future Enhancements](#future-enhancements)

## ✨ Features

### User Authentication
- ✅ **User Registration** - Create a new account with email and password
- ✅ **Google Sign-In** - OAuth authentication with Google (available on both Login and Register pages)
- ✅ **User Login** - Secure authentication with JWT tokens
- ✅ **User Logout** - Clear session and redirect to home page
- ✅ **Protected Routes** - Dashboard and task management require authentication
- ✅ **Data Privacy** - Each user can only access their own tasks
- ✅ **Back Navigation** - Back arrow button on login/register pages to return home

### Task Management - CRUD Operations
- ✅ **Create Task** - Add new tasks with title, description, due date, priority, and status
- ✅ **Read Tasks** - View all personal tasks in a clean, organized dashboard
- ✅ **Update Task** - Edit existing task details
- ✅ **Delete Task** - Remove tasks with frontend confirmation dialog
- ✅ **Filter by Status** - Filter tasks by "To Do", "In Progress", or "Done"
- ✅ **Search Tasks** - Search tasks by title or description
- ✅ **Sort Tasks** - Sort by newest, priority, due date, or title
- ✅ **Dark Mode** - Toggle between light and dark themes
- ✅ **Visual Indicators** - Color-coded priority and status badges
- ✅ **Overdue Alerts** - Visual indicators for overdue tasks

### Task Fields
- **Title** (Required) - Task name
- **Description** (Optional) - Detailed task description
- **Due Date** (Optional) - Task deadline
- **Priority** - Low, Medium, or High
- **Status** - To Do, In Progress, or Done

## 🛠 Tech Stack

### Frontend
- **Next.js 16** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first CSS framework
- **Shadcn/ui** - High-quality, accessible UI components
- **Axios** - HTTP client for API requests
- **React Hooks** - useState, useEffect for state management
- **Next Themes** - Dark mode support
- **Lucide React** - Icon library

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web application framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **JWT** - JSON Web Tokens for authentication
- **bcryptjs** - Password hashing
- **google-auth-library** - Google OAuth verification
- **CORS** - Cross-origin resource sharing

### Deployment
- **Frontend**: Vercel
- **Backend**: Heroku
- **Database**: MongoDB Atlas (free tier)

## 📦 Setup Instructions

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn
- MongoDB Atlas account (free tier) or local MongoDB installation
- Google Cloud Console account (for Google Sign-In)

### Backend Setup

1. **Navigate to the server directory:**
   ```bash
   cd server
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Create a `.env` file in the server directory:**
   ```env
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_secret_jwt_key_here
   PORT=4000
   GOOGLE_CLIENT_ID=your_google_client_id_here
   ```
   
   **Important**: For Google OAuth, use the same Client ID as your frontend (`NEXT_PUBLIC_GOOGLE_CLIENT_ID`). The backend verifies tokens created by the frontend.

4. **Start the development server:**
   ```bash
   npm run dev
   ```
   
   The server will run on `http://localhost:4000`

### Frontend Setup

1. **Navigate to the frontend directory:**
   ```bash
   cd frontend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Create a `.env.local` file in the frontend directory:**
   ```env
   NEXT_PUBLIC_API_URL=http://localhost:4000/api
   NEXT_PUBLIC_GOOGLE_CLIENT_ID=your_google_client_id_here
   ```

4. **Start the development server:**
   ```bash
   npm run dev
   ```

5. **Open your browser:**
   Navigate to `http://localhost:3000`

### Database Setup

1. **Create a MongoDB Atlas account** (if using cloud):
   - Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
   - Create a free cluster
   - Get your connection string
   - Add it to your `.env` file

2. **Or use local MongoDB:**
   - Install MongoDB locally
   - Use connection string: `mongodb://localhost:27017/tasktracker`

## 🔐 Google OAuth Setup

### Step 1: Create Google OAuth Credentials

1. **Go to Google Cloud Console**
   - Visit: https://console.cloud.google.com/
   - Sign in with your Google account

2. **Create a New Project (or select existing)**
   - Click on the project dropdown at the top
   - Click "New Project"
   - Enter project name: "Task Tracker"
   - Click "Create"

3. **Enable Google Identity Services API**
   - In the left sidebar, go to "APIs & Services" > "Library"
   - Search for "Google Identity Services API" or "Google+ API"
   - Click on it and click "Enable"

4. **Configure OAuth Consent Screen**
   - Go to "APIs & Services" > "OAuth consent screen"
   - Choose "External" (unless you have a Google Workspace)
   - Fill in required fields:
     - App name: "Task Tracker"
     - User support email: Your email
     - Developer contact: Your email
   - Click "Save and Continue"
   - Add scopes: `email`, `profile`, `openid`
   - Click "Save and Continue"
   - Add test users (your email) if in testing mode
   - Click "Save and Continue"

5. **Create OAuth Client ID**
   - Go to "APIs & Services" > "Credentials"
   - Click "Create Credentials" > "OAuth client ID"
   - Application type: "Web application"
   - Name: "Task Tracker Web Client"
   - **Authorized JavaScript origins:**
     - `http://localhost:3000` (for development)
     - `https://task-tracker-hazel-theta.vercel.app` (production)
   - **Authorized redirect URIs:**
     - `http://localhost:3000` (for development)
     - `https://task-tracker-hazel-theta.vercel.app` (production)
   - Click "Create"
   - **Copy the Client ID** - you'll need this!

### Step 2: Add Environment Variables

**Backend** (`server/.env`):
```env
GOOGLE_CLIENT_ID=your-google-client-id-here
```

**Frontend** (`frontend/.env.local`):
```env
NEXT_PUBLIC_GOOGLE_CLIENT_ID=your-google-client-id-here
```

**Important Notes:**
- Use the **same Client ID** for both frontend and backend
- The frontend creates the token, and the backend verifies it using the same Client ID
- Add `.env` and `.env.local` to `.gitignore` (they should already be there)

### Step 3: Fix Origin Mismatch Error (If Needed)

If you get "Error 400: origin_mismatch":

1. **Verify the exact URL:**
   - Open browser Developer Tools (F12) → Console
   - Type: `window.location.origin`
   - Copy the exact value shown

2. **Update Google Cloud Console:**
   - Go to "APIs & Services" > "Credentials"
   - Edit your OAuth 2.0 Client ID
   - Add the EXACT URL to "Authorized JavaScript origins"
   - **Important:** 
     - Use `https://` (not `http://`) for production
     - NO trailing slash
     - Exact match - case sensitive

3. **Save and wait:**
   - Click "SAVE"
   - Wait 1-5 minutes for changes to propagate
   - Clear browser cache and try again

## 📁 Project Structure

```
BREW - Task Tracker/
├── frontend/
│   ├── app/
│   │   ├── auth/
│   │   │   ├── login/
│   │   │   └── register/
│   │   ├── dashboard/
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── components/
│   │   ├── ui/          # Shadcn/ui components
│   │   ├── TaskCard.tsx
│   │   ├── TaskForm.tsx
│   │   ├── login-form.tsx
│   │   ├── Navbar.tsx
│   │   ├── ProtectedRoute.tsx
│   │   └── ThemeToggle.tsx
│   ├── lib/
│   │   ├── api.ts      # Axios configuration
│   │   ├── auth.ts     # Auth utilities
│   │   ├── constants.ts
│   │   └── utils.ts    # Utility functions
│   ├── types/
│   │   └── index.ts
│   └── package.json
├── server/
│   ├── models/
│   │   ├── User.js
│   │   └── Task.js
│   ├── routes/
│   │   ├── auth.js
│   │   └── tasks.js
│   ├── middleware/
│   │   └── auth.js     # JWT verification
│   ├── index.js         # Express server entry
│   ├── Procfile         # Heroku deployment file
│   └── package.json
└── README.md
```

## 🔌 API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
  ```json
  {
    "name": "John Doe",
    "email": "john@example.com",
    "password": "password123"
  }
  ```

- `POST /api/auth/login` - Login user
  ```json
  {
    "email": "john@example.com",
    "password": "password123"
  }
  ```

- `POST /api/auth/google` - Google Sign-In
  ```json
  {
    "credential": "google_id_token_here"
  }
  ```

### Tasks (Protected - Requires JWT Token)
- `GET /api/tasks` - Get all tasks for authenticated user
- `POST /api/tasks` - Create a new task
  ```json
  {
    "title": "Complete assignment",
    "description": "Finish the task tracker app",
    "dueDate": "2024-12-31",
    "priority": "high",
    "status": "To Do"
  }
  ```
- `PUT /api/tasks/:id` - Update a task
- `DELETE /api/tasks/:id` - Delete a task

## 🚀 Deployment Guide

### Frontend Deployment (Vercel)

1. **Push code to GitHub**
   ```bash
   git add .
   git commit -m "Ready for deployment"
   git push origin main
   ```

2. **Go to [Vercel](https://vercel.com)** and sign in with GitHub

3. **Import Your Project:**
   - Click "Add New Project"
   - Select your GitHub repository
   - Click "Import"

4. **Configure Project Settings:**
   - **Root Directory**: `frontend` (IMPORTANT!)
   - **Framework Preset**: Next.js (auto-detected)
   - **Build Command**: `npm run build` (default)
   - **Output Directory**: `.next` (default)
   - **Install Command**: `npm install` (default)

5. **Add Environment Variables:**
   - Go to Project Settings > Environment Variables
   - Add:
     - `NEXT_PUBLIC_API_URL` = `https://task-tracker-backend-6647-c435ebfb5871.herokuapp.com/api`
     - `NEXT_PUBLIC_GOOGLE_CLIENT_ID` = `307016727380-72mibbu5agps5sk0pkn3d0ngnpdmtmck.apps.googleusercontent.com`
   - Make sure to add them for all environments (Production, Preview, Development)

6. **Deploy:**
   - Click "Deploy"
   - Wait for the build to complete
   - Your app will be live at: `https://your-app-name.vercel.app`

### Backend Deployment (Heroku)

**Important:** Heroku requires `package.json` at the root of the deployed directory. Since our server is in a subdirectory, we need to use a specific deployment method.

#### Step 1: Install Heroku CLI

```bash
# macOS
brew tap heroku/brew && brew install heroku

# Or download from: https://devcenter.heroku.com/articles/heroku-cli
```

#### Step 2: Login and Create App

```bash
heroku login
heroku create your-app-name-backend
```

#### Step 3: Set Environment Variables

```bash
heroku config:set MONGO_URI=your-mongodb-connection-string -a your-app-name-backend
heroku config:set JWT_SECRET=your-jwt-secret -a your-app-name-backend
heroku config:set GOOGLE_CLIENT_ID=your-google-client-id -a your-app-name-backend
heroku config:set FRONTEND_URL=https://your-frontend-url.vercel.app -a your-app-name-backend
```

#### Step 4: Deploy Backend

**Use direct push from server directory** (most reliable method):

```bash
cd server
git init
git add .
git commit -m "Deploy server to Heroku"
git remote add heroku https://git.heroku.com/your-app-name-backend.git
git push heroku HEAD:main --force
cd ..
rm -rf server/.git
```

**Why this method?**
- Heroku's buildpack looks for `package.json` at the root
- By pushing directly from the `server` directory, `package.json` is at the root
- The `Procfile` is also at the root, which Heroku needs

#### Step 5: Verify Deployment

```bash
# Check logs
heroku logs --tail -a your-app-name-backend

# Test API
curl https://your-app-name-backend.herokuapp.com/api/tasks
```

### Post-Deployment Checklist

1. ✅ Backend accessible at `https://your-app-name-backend.herokuapp.com`
2. ✅ Frontend accessible at `https://your-app-name.vercel.app`
3. ✅ Environment variables set correctly on both platforms
4. ✅ Google OAuth production URLs added to Google Console
5. ✅ MongoDB Atlas network access configured (allow all IPs: 0.0.0.0/0)
6. ✅ CORS configured to allow requests from Vercel domain
7. ✅ Test registration, login, and Google Sign-In on both pages
8. ✅ Test all CRUD operations for tasks
9. ✅ Verify logout redirects to home page

## 🔧 Troubleshooting

### Backend Issues

**Problem: Build fails with "App not compatible with buildpack"**
- **Solution:** Make sure you're deploying from the `server` directory using the direct push method
- Verify `package.json` exists in the server directory
- Check that `Procfile` exists and contains: `web: node index.js`

**Problem: App crashes on Heroku**
- Check logs: `heroku logs --tail -a your-app-name-backend`
- Ensure all environment variables are set: `heroku config`
- Verify MongoDB connection string is correct
- Check that PORT is handled correctly (Heroku assigns it automatically)

**Problem: CORS errors**
- Update CORS settings in `server/index.js` to allow your Vercel domain
- Set `FRONTEND_URL` environment variable in Heroku
- Verify CORS allows requests from your frontend URL

**Problem: MongoDB connection fails**
- Verify MongoDB Atlas network access allows all IPs (0.0.0.0/0) or Heroku's IPs
- Check connection string format
- Ensure database user has correct permissions

### Frontend Issues

**Problem: API calls fail**
- Verify `NEXT_PUBLIC_API_URL` is set correctly in Vercel
- Check browser console for CORS errors
- Ensure backend is running and accessible

**Problem: Google Sign-In doesn't work**
- Verify `NEXT_PUBLIC_GOOGLE_CLIENT_ID` is set in Vercel
- Check Google Console for correct authorized origins
- Ensure production URL is added: `https://your-app.vercel.app`
- Clear browser cache and cookies

**Problem: Build fails on Vercel**
- Check build logs in Vercel dashboard
- Ensure all dependencies are in `package.json`
- Verify TypeScript errors are resolved
- Make sure Root Directory is set to `frontend`

### Google OAuth Issues

**Problem: "Error 400: origin_mismatch"**
- Go to Google Cloud Console > Credentials
- Edit your OAuth 2.0 Client ID
- Add EXACT URL to "Authorized JavaScript origins":
  - `https://your-app.vercel.app` (NO trailing slash)
  - `http://localhost:3000` (for development)
- Save and wait 1-5 minutes for changes to propagate
- Clear browser cache

**Problem: "Wrong recipient, payload audience != requiredAudience"**
- Use the **same Client ID** for both frontend and backend
- Frontend: `NEXT_PUBLIC_GOOGLE_CLIENT_ID`
- Backend: `GOOGLE_CLIENT_ID`
- They must match exactly

**Problem: OAuth consent screen issues**
- Make sure your app is published (if you want public access)
- Or add your email as a test user if in testing mode
- Verify scopes are set: `email`, `profile`, `openid`

### General Issues

**Problem: Environment variables not working**
- Restart the app after setting environment variables
- For Vercel: Redeploy after adding environment variables
- For Heroku: Restart dynos: `heroku restart -a your-app-name-backend`

**Problem: Changes not reflecting**
- Clear browser cache
- Hard refresh (Ctrl+Shift+R or Cmd+Shift+R)
- Check if deployment completed successfully
- Verify you're looking at the correct environment (production vs preview)

## 🎯 Future Enhancements

### Completed Features
- [x] Google OAuth integration
- [x] Dark mode toggle
- [x] Visual priority indicators
- [x] Advanced sorting
- [x] Overdue task indicators
- [x] Frontend delete confirmation dialog
- [x] Back navigation buttons

### Planned Features
- [ ] Task categories/tags
- [ ] Drag-and-drop status updates
- [ ] Task completion statistics
- [ ] Export tasks to CSV/JSON
- [ ] Task reminders/notifications
- [ ] Real-time updates using WebSockets
- [ ] Image attachments for tasks
- [ ] Task templates
- [ ] Collaborative features (shared tasks)
- [ ] Advanced filtering (by priority, due date range)
- [ ] Pagination for large task lists
- [ ] Unit and integration tests

## 📝 Development Notes

### Architecture Decisions

1. **REST API Architecture**: Chose Express.js + MongoDB over Firebase to demonstrate full-stack development skills and provide more control over backend logic.

2. **OAuth Implementation**: Google Sign-In uses Google Identity Services (newer approach) for better user experience.

3. **Task Privacy**: All tasks are automatically scoped to the authenticated user. The backend middleware ensures users can only access their own tasks.

4. **Real-time Updates**: Current implementation uses polling (refresh on actions). Real-time updates could be added using Socket.io.

5. **Error Handling**: Basic error handling with try-catch blocks and user-friendly messages. Production applications would benefit from more sophisticated error handling.

## 📄 License

This project was created for the BREW Hiring Assignment.

## 👤 Author

[Your Name]  
[Your Email]  
[Your GitHub Profile]

---

**Built with ❤️ for BREW**
