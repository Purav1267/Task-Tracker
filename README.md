# Task Tracker Application

A full-stack task management application built for the BREW Hiring Assignment. This application allows authenticated users to create, read, update, and delete their personal tasks with advanced filtering and search capabilities.

## 🚀 Live Demo

**Frontend:** [https://task-tracker-hazel-theta.vercel.app/](https://task-tracker-hazel-theta.vercel.app/)

**Backend API:** [https://task-tracker-backend-6647-c435ebfb5871.herokuapp.com/api](https://task-tracker-backend-6647-c435ebfb5871.herokuapp.com/api)

## 📋 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Tech Stack Rationale](#tech-stack-rationale)
- [Setup Instructions](#setup-instructions)
- [Google OAuth Setup](#google-oauth-setup)
- [Project Structure](#project-structure)
- [API Endpoints](#api-endpoints)
- [Deployment to Vercel](#deployment-to-vercel)
- [Assumptions](#assumptions)
- [Future Enhancements](#future-enhancements)

## ✨ Features

### User Authentication
- ✅ **User Registration** - Create a new account with email and password
- ✅ **Google Sign-In** - OAuth authentication with Google (available on both Login and Register pages)
- ✅ **User Login** - Secure authentication with JWT tokens
- ✅ **User Logout** - Clear session and redirect to home page
- ✅ **Protected Routes** - Dashboard and task management require authentication
- ✅ **Data Privacy** - Each user can only access their own tasks

### Task Management - CRUD Operations
- ✅ **Create Task** - Add new tasks with title, description, due date, priority, and status
- ✅ **Read Tasks** - View all personal tasks in a clean, organized dashboard
- ✅ **Update Task** - Edit existing task details
- ✅ **Delete Task** - Remove tasks with confirmation
- ✅ **Filter by Status** - Filter tasks by "To Do", "In Progress", or "Done"
- ✅ **Search Tasks** - Search tasks by title or description
- ✅ **Dark Mode** - Toggle between light and dark themes

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

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web application framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **JWT** - JSON Web Tokens for authentication
- **bcryptjs** - Password hashing
- **google-auth-library** - Google OAuth verification

### Deployment
- **Frontend**: Vercel (recommended for Next.js)
- **Backend**: Heroku / Railway / Render
- **Database**: MongoDB Atlas (free tier)

## 💡 Tech Stack Rationale

### Why Next.js + React?
- **Performance**: Next.js provides server-side rendering, automatic code splitting, and optimized production builds
- **Developer Experience**: Excellent TypeScript support, hot reloading, and a robust development environment
- **Modern Architecture**: App Router provides a clean, file-based routing system that aligns with modern React patterns
- **Assignment Requirement**: The assignment specifically requires Next.js/React, making this the natural choice

### Why Express.js + MongoDB?
- **Scalability**: MongoDB's flexible schema allows for easy iteration and feature additions
- **RESTful Architecture**: Express.js provides a clean, standard REST API structure that's easy to understand and maintain
- **Security**: JWT-based authentication ensures secure, stateless user sessions
- **Free Tier Availability**: MongoDB Atlas offers a generous free tier, meeting the assignment's requirement for free cloud-hosted database
- **Separation of Concerns**: A dedicated backend allows for better security, validation, and future scalability

### Why Tailwind CSS + Shadcn/ui?
- **Rapid Development**: Tailwind's utility classes enable fast UI development without writing custom CSS
- **Responsive Design**: Built-in responsive breakpoints (`sm:`, `md:`, `lg:`) ensure the application works seamlessly on all devices
- **Consistency**: Shadcn/ui provides pre-built, accessible components that follow design best practices
- **Customization**: Both tools allow for easy customization while maintaining a professional appearance

### Why JWT Authentication?
- **Stateless**: JWT tokens eliminate the need for server-side session storage
- **Scalable**: Works seamlessly across multiple servers and microservices
- **Secure**: Tokens are signed and can include expiration times
- **Standard**: Industry-standard approach that's well-documented and widely understood

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

### Step 3: Test Google Sign-In

1. Start your backend server
2. Start your frontend development server
3. Go to the login page
4. You should see the Google Sign-In button
5. Click it and test the authentication flow

## 📁 Project Structure

```
BREW - Task Tracker/
├── frontend/
│   ├── app/
│   │   ├── auth/
│   │   │   ├── login/
│   │   │   └── register/
│   │   ├── dashboard/
│   │   └── layout.tsx
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
│   │   └── utils.ts    # Utility functions
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

This project is deployed with **Frontend on Vercel** and **Backend on Heroku**. For detailed step-by-step instructions, see [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md).

### Quick Deployment Summary

#### Frontend Deployment (Vercel)

1. **Push code to GitHub**
2. **Go to [Vercel](https://vercel.com)** and import your repository
3. **Configure project:**
   - Root Directory: `frontend`
   - Framework: Next.js (auto-detected)
4. **Add Environment Variables:**
   - `NEXT_PUBLIC_API_URL` = `https://task-tracker-backend-6647-c435ebfb5871.herokuapp.com/api`
   - `NEXT_PUBLIC_GOOGLE_CLIENT_ID` = `307016727380-72mibbu5agps5sk0pkn3d0ngnpdmtmck.apps.googleusercontent.com`
5. **Deploy** - Vercel will automatically build and deploy

#### Backend Deployment (Heroku)

1. **Install Heroku CLI** and login
2. **Create Heroku app:**
   ```bash
   heroku create your-app-name-backend
   ```
3. **Set environment variables:**
   ```bash
   heroku config:set MONGO_URI=your-mongodb-connection-string
   heroku config:set JWT_SECRET=your-jwt-secret
   heroku config:set GOOGLE_CLIENT_ID=your-google-client-id
   ```
4. **Deploy:**
   - **Recommended Method:** Use direct push from server directory (see DEPLOY_BACKEND.md)
   ```bash
   cd server
   git init && git add . && git commit -m "Deploy"
   git remote add heroku https://git.heroku.com/task-tracker-backend-6647.git
   git push heroku HEAD:main --force
   rm -rf .git
   ```
   - **Alternative:** Connect Heroku to GitHub in Heroku Dashboard and enable automatic deploys

### Important Notes

- **Procfile** is already created in the `server` directory for Heroku
- **PORT** is handled automatically by Heroku (no need to set it)
- Update **Google OAuth** authorized origins with your production URLs
- Ensure **MongoDB Atlas** network access allows all IPs (0.0.0.0/0) or Heroku's IPs

### Post-Deployment Checklist

1. ✅ Backend accessible at `https://your-app-name-backend.herokuapp.com`
2. ✅ Frontend accessible at `https://your-app-name.vercel.app`
3. ✅ Environment variables set correctly on both platforms
4. ✅ Google OAuth production URLs added to Google Console
5. ✅ MongoDB Atlas network access configured
6. ✅ Test registration, login, and Google Sign-In on both pages
7. ✅ Test all CRUD operations for tasks
8. ✅ Verify CORS allows requests from Vercel to Heroku

### Troubleshooting

**Backend Issues:**
- Check logs: `heroku logs --tail`
- Verify all environment variables are set: `heroku config`
- Ensure MongoDB connection string is correct

**Frontend Issues:**
- Check Vercel build logs in dashboard
- Verify `NEXT_PUBLIC_API_URL` points to Heroku backend
- Clear browser cache and test again

**Google OAuth Issues:**
- Verify production URLs are in Google Console
- Check that `NEXT_PUBLIC_GOOGLE_CLIENT_ID` matches backend `GOOGLE_CLIENT_ID`
- Ensure OAuth consent screen is configured

For detailed troubleshooting, see [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md).

## 🤔 Assumptions

1. **REST API Architecture**: I assumed the assignment allowed a traditional REST API approach (Express.js + MongoDB) rather than requiring a serverless solution like Firebase. This provides more control over the backend logic and better demonstrates full-stack development skills.

2. **OAuth Implementation**: Google Sign-In is implemented using Google Identity Services (newer approach) rather than the older OAuth 2.0 flow, providing a better user experience.

3. **Task Privacy**: All tasks are automatically scoped to the authenticated user. The backend middleware ensures users can only access their own tasks, providing data privacy without requiring explicit user ID parameters in frontend requests.

4. **Real-time Updates**: The current implementation uses polling (refresh on actions) rather than WebSockets or real-time subscriptions. This was chosen for simplicity, but real-time updates could be added using Socket.io or similar technologies.

5. **Date Handling**: Due dates are stored as Date objects in MongoDB and handled as ISO strings in the frontend. The conversion between HTML date inputs and MongoDB dates is handled automatically by the backend.

6. **Error Handling**: Basic error handling is implemented with try-catch blocks and user-friendly alerts. Production applications would benefit from more sophisticated error handling and user feedback systems.

## 🎯 Future Enhancements

### Bonus Features
- [x] Google OAuth integration
- [x] Dark mode toggle
- [ ] Visual priority indicators (color-coded badges)
- [ ] Advanced sorting (by priority, due date, creation date)
- [ ] Task categories/tags
- [ ] Drag-and-drop status updates
- [ ] Task completion statistics
- [ ] Export tasks to CSV/JSON
- [ ] Task reminders/notifications

### Additional Improvements
- [ ] Real-time updates using WebSockets
- [ ] Image attachments for tasks
- [ ] Task templates
- [ ] Collaborative features (shared tasks)
- [ ] Advanced filtering (by priority, due date range)
- [ ] Pagination for large task lists
- [ ] Unit and integration tests

## 📝 Notes for Video Submission

### Key Points to Highlight:
1. **Architecture Decision**: Explain why you chose Express.js + MongoDB over Firebase, emphasizing the learning value and full-stack demonstration.

2. **Security Implementation**: Walk through the JWT middleware that ensures users can only access their own tasks.

3. **OAuth Integration**: Demonstrate Google Sign-In functionality and explain the token verification process.

4. **Filtering & Search**: Demonstrate the client-side filtering and search functionality, explaining the useMemo hook for performance optimization.

5. **Responsive Design**: Show the application working on different screen sizes, highlighting Tailwind's responsive utilities.

6. **Code Organization**: Explain the separation between frontend and backend, and how the API layer abstracts HTTP requests.

## 👤 Author

[Your Name]
[Your Email]
[Your GitHub Profile]

