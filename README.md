# Task Tracker Application

A full-stack task management application built for the BREW Hiring Assignment. This application allows authenticated users to create, read, update, and delete their personal tasks with advanced filtering and search capabilities.

## 🚀 Live Demo

[Add your deployed URL here after deployment]

## 📋 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Tech Stack Rationale](#tech-stack-rationale)
- [Setup Instructions](#setup-instructions)
- [Project Structure](#project-structure)
- [API Endpoints](#api-endpoints)
- [Assumptions](#assumptions)
- [Future Enhancements](#future-enhancements)

## ✨ Features

### User Authentication (Mandatory)
- ✅ **User Registration** - Create a new account with email and password
- ✅ **User Login** - Secure authentication with JWT tokens
- ✅ **User Logout** - Clear session and redirect to login
- ✅ **Protected Routes** - Dashboard and task management require authentication
- ✅ **Data Privacy** - Each user can only access their own tasks

### Task Management - CRUD Operations (Mandatory)
- ✅ **Create Task** - Add new tasks with title, description, due date, priority, and status
- ✅ **Read Tasks** - View all personal tasks in a clean, organized dashboard
- ✅ **Update Task** - Edit existing task details
- ✅ **Delete Task** - Remove tasks with confirmation
- ✅ **Filter by Status** - Filter tasks by "To Do", "In Progress", or "Done"
- ✅ **Search Tasks** - Search tasks by title or description

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

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web application framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **JWT** - JSON Web Tokens for authentication
- **bcryptjs** - Password hashing

### Deployment
- **Frontend**: Vercel / Netlify (recommended)
- **Backend**: Railway / Render / Heroku
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
   ```

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
│   │   ├── Navbar.tsx
│   │   └── ProtectedRoute.tsx
│   ├── lib/
│   │   ├── api.ts      # Axios configuration
│   │   └── auth.ts     # Auth utilities
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

## 🤔 Assumptions

1. **REST API Architecture**: I assumed the assignment allowed a traditional REST API approach (Express.js + MongoDB) rather than requiring a serverless solution like Firebase. This provides more control over the backend logic and better demonstrates full-stack development skills.

2. **Email/Password Authentication**: While the assignment mentions OAuth (Google) as an option, I implemented email/password authentication as it's more straightforward and demonstrates core authentication concepts. OAuth can be added as an enhancement.

3. **Task Privacy**: All tasks are automatically scoped to the authenticated user. The backend middleware ensures users can only access their own tasks, providing data privacy without requiring explicit user ID parameters in frontend requests.

4. **Real-time Updates**: The current implementation uses polling (refresh on actions) rather than WebSockets or real-time subscriptions. This was chosen for simplicity, but real-time updates could be added using Socket.io or similar technologies.

5. **Date Handling**: Due dates are stored as Date objects in MongoDB and handled as ISO strings in the frontend. The conversion between HTML date inputs and MongoDB dates is handled automatically by the backend.

6. **Error Handling**: Basic error handling is implemented with try-catch blocks and user-friendly alerts. Production applications would benefit from more sophisticated error handling and user feedback systems.

## 🎯 Future Enhancements

### Bonus Features (for extra points)
- [ ] Visual priority indicators (color-coded badges)
- [ ] Advanced sorting (by priority, due date, creation date)
- [ ] Task categories/tags
- [ ] Drag-and-drop status updates
- [ ] Task completion statistics
- [ ] Export tasks to CSV/JSON
- [ ] Dark mode toggle
- [ ] Task reminders/notifications

### Additional Improvements
- [ ] OAuth integration (Google Sign-In)
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

3. **Filtering & Search**: Demonstrate the client-side filtering and search functionality, explaining the useMemo hook for performance optimization.

4. **Responsive Design**: Show the application working on different screen sizes, highlighting Tailwind's responsive utilities.

5. **Code Organization**: Explain the separation between frontend and backend, and how the API layer abstracts HTTP requests.

## 📄 License

This project was created for the BREW Hiring Assignment.

## 👤 Author

[Your Name]
[Your Email]
[Your GitHub Profile]

---

**Built with ❤️ for BREW**

