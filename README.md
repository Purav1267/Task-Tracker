# Task Tracker Application

A full-stack task management application built for the BREW Hiring Assignment. This application allows authenticated users to create, read, update, and delete their personal tasks with advanced filtering and search capabilities.

## 🚀 Live Demo

[Add your deployed URL here after deployment]

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
- ✅ **User Login** - Secure authentication with JWT tokens
- ✅ **Google Sign-In** - OAuth authentication with Google
- ✅ **User Logout** - Clear session and redirect to login
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
- **Backend**: Railway / Render / Vercel Serverless Functions
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
     - Add your production URL when deploying (e.g., `https://your-app.vercel.app`)
   - **Authorized redirect URIs:**
     - `http://localhost:3000` (for development)
     - Your production URL when deploying
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

## 🚀 Deployment to Vercel

### Frontend Deployment (Next.js)

1. **Push your code to GitHub**
   ```bash
   git add .
   git commit -m "Ready for deployment"
   git push origin main
   ```

2. **Deploy to Vercel**
   - Go to [Vercel](https://vercel.com)
   - Sign in with your GitHub account
   - Click "Add New Project"
   - Import your GitHub repository
   - Configure the project:
     - **Root Directory**: `frontend`
     - **Framework Preset**: Next.js (auto-detected)
     - **Build Command**: `npm run build` (default)
     - **Output Directory**: `.next` (default)
     - **Install Command**: `npm install` (default)

3. **Add Environment Variables in Vercel**
   - Go to Project Settings > Environment Variables
   - Add the following:
     - `NEXT_PUBLIC_API_URL` = `https://your-backend-url.com/api`
     - `NEXT_PUBLIC_GOOGLE_CLIENT_ID` = `your-google-client-id`
   - **Important**: Update your Google OAuth authorized origins to include your Vercel URL

4. **Deploy**
   - Click "Deploy"
   - Vercel will build and deploy your app
   - You'll get a URL like `https://your-app.vercel.app`

### Backend Deployment Options

#### Option 1: Railway (Recommended for Express.js)

1. **Sign up at [Railway](https://railway.app)**
2. **Create a New Project**
   - Click "New Project"
   - Select "Deploy from GitHub repo"
   - Choose your repository
3. **Configure the Project**
   - Set Root Directory to `server`
   - Railway will auto-detect Node.js
4. **Add Environment Variables**
   - Go to Variables tab
   - Add:
     - `MONGO_URI` = your MongoDB connection string
     - `JWT_SECRET` = your JWT secret
     - `PORT` = `4000` (or leave empty, Railway auto-assigns)
     - `GOOGLE_CLIENT_ID` = your Google Client ID
5. **Deploy**
   - Railway will automatically deploy
   - You'll get a URL like `https://your-app.railway.app`
   - Update `NEXT_PUBLIC_API_URL` in Vercel to this URL

#### Option 2: Render

1. **Sign up at [Render](https://render.com)**
2. **Create a New Web Service**
   - Connect your GitHub repository
   - Set:
     - **Name**: task-tracker-backend
     - **Root Directory**: `server`
     - **Environment**: Node
     - **Build Command**: `npm install`
     - **Start Command**: `npm start`
3. **Add Environment Variables** (same as Railway)
4. **Deploy**

#### Option 3: Vercel Serverless Functions

If you want to keep everything on Vercel, you can convert your Express.js backend to Vercel serverless functions. This requires refactoring your routes.

### Post-Deployment Checklist

1. ✅ Update Google OAuth authorized origins with production URLs
2. ✅ Update `NEXT_PUBLIC_API_URL` in Vercel to your backend URL
3. ✅ Ensure MongoDB Atlas allows connections from your backend IP (or use 0.0.0.0/0 for development)
4. ✅ Test authentication flow on production
5. ✅ Test Google Sign-In on production
6. ✅ Verify CORS settings allow your frontend domain

### Troubleshooting Deployment

- **CORS Errors**: Make sure your backend CORS settings allow your Vercel frontend URL
- **Environment Variables**: Double-check all environment variables are set correctly
- **Google OAuth**: Ensure production URLs are added to Google Console authorized origins
- **MongoDB Connection**: Verify MongoDB Atlas network access allows your backend server

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

## 📄 License

This project was created for the BREW Hiring Assignment.

## 👤 Author

[Your Name]
[Your Email]
[Your GitHub Profile]

---

**Built with ❤️ for BREW**
