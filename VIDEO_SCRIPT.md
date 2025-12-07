# Video Demo Script - Task Tracker Application

**Total Duration: ~8-10 minutes**

---

## PART 1: Introduction & Tech Stack (1 minute)

**[Start with a friendly greeting]**

"Hi, I'm [Your Name], and I'm excited to present my Task Tracker application built for the BREW Hiring Assignment.

**Tech Stack Choices:**

For the **frontend**, I chose **Next.js 16 with TypeScript** because it's one of the most widely used React frameworks in the industry. It provides excellent performance with server-side rendering, and the TypeScript integration ensures type safety throughout the application. This combination is very popular, which means there's extensive documentation and community support, making it easier for AI tools to debug and understand the codebase.

For the **backend**, I went with **Express.js and MongoDB** because Express is the most popular Node.js framework, and MongoDB's flexible schema works perfectly for a task management system. This stack is widely adopted, so debugging with AI tools is straightforward, and there's a wealth of resources available.

I used **Tailwind CSS** for styling because it's the industry standard for utility-first CSS, and **Shadcn/ui** for pre-built, accessible components. This combination allows for rapid development while maintaining a professional appearance.

The entire stack is modern, widely used, and AI-friendly, which makes development and debugging much more efficient."

---

## PART 2: Live Demo (2-3 minutes)

**[Switch to browser/application]**

"Now let me walk you through the application live.

**1. Home Page & Navigation:**
- Here's the landing page with a clean, modern design
- I can navigate to Login or Register

**2. User Registration:**
- Let me create a new account
- [Fill in name, email, password]
- I can also use Google Sign-In here - notice the back arrow button for easy navigation
- [Register successfully]

**3. User Login:**
- Let me also show the login page
- [Login with credentials]
- Again, Google Sign-In is available here too

**4. Dashboard - Task Management:**
- Now I'm in the dashboard where I can see all my tasks
- Let me create a new task: [Create task with title, description, due date, priority, status]
- [Show task appears in the list]

**5. Task Operations:**
- **Edit Task:** [Click edit, modify task details, save]
- **Delete Task:** [Click delete, show confirmation dialog, confirm deletion]
- Notice the styled confirmation dialog instead of a browser alert

**6. Filtering & Search:**
- **Filter by Status:** [Select "In Progress" - show filtered results]
- **Search:** [Type in search box - show matching tasks]
- **Sort:** [Change sort option - show sorted results]

**7. Edge Cases:**
- **Overdue Tasks:** [Show task with past due date - notice red border and alert icon]
- **Empty States:** [Clear all tasks - show "No tasks found" message]
- **Filter with No Results:** [Filter to show no matching tasks]

**8. Dark Mode:**
- [Toggle dark mode - show theme change]

**9. Logout:**
- [Click logout - redirects to home page]

---

## PART 3: Code Walkthrough (2-3 minutes)

**[Switch to code editor]**

"Let me walk you through some key code sections.

**1. Authentication Logic - Backend (server/routes/auth.js):**
- Here's the registration endpoint that hashes passwords with bcrypt
- The login endpoint verifies credentials and generates JWT tokens
- The Google OAuth endpoint verifies Google ID tokens and creates or updates users
- Notice how we use the same Client ID for both frontend and backend verification

**2. JWT Middleware (server/middleware/auth.js):**
- This middleware protects all task routes
- It extracts the token from the Authorization header
- Verifies the token and attaches the user ID to the request
- This ensures users can only access their own tasks

**3. Task Routes (server/routes/tasks.js):**
- All CRUD operations are protected with the auth middleware
- Notice how we filter tasks by `req.user.id` - this ensures data privacy
- Each user can only see and modify their own tasks

**4. Frontend API Configuration (frontend/lib/api.ts):**
- Axios is configured with the base URL
- An interceptor automatically attaches the JWT token to all requests
- This keeps the code DRY - we don't need to add tokens manually

**5. State Management Decision:**
- I chose **React hooks (useState, useEffect, useMemo)** over Redux or Context API
- For this application size, hooks provide sufficient state management
- The `useMemo` hook optimizes filtering and sorting - it only recalculates when dependencies change
- This approach is simpler, has less boilerplate, and is easier for AI tools to understand and debug
- The code is more readable and maintainable without the complexity of a global state management library

**6. Protected Routes (frontend/components/ProtectedRoute.tsx):**
- This component checks for authentication before rendering the dashboard
- If no token exists, it redirects to login

**7. Task Filtering Logic (frontend/app/dashboard/page.tsx):**
- The `useMemo` hook efficiently filters, searches, and sorts tasks
- It only recalculates when tasks, filter status, search query, or sort option changes
- This prevents unnecessary re-renders and improves performance"

---

## PART 4: Challenges & Solutions (2-3 minutes)

**[Continue in code editor or switch back to browser]**

"During development, I faced several challenges:

**Challenge 1: Google OAuth Origin Mismatch**
- **Problem:** After deploying to Vercel, Google OAuth kept showing "origin mismatch" errors
- **Solution:** I had to add the exact production URL (without trailing slash) to Google Cloud Console's authorized JavaScript origins. The key was ensuring the URL matched exactly - including the protocol and no trailing slash. This taught me the importance of careful configuration in production environments.

**Challenge 2: Heroku Deployment - Buildpack Detection**
- **Problem:** Heroku couldn't detect the Node.js app because `package.json` was in a subdirectory
- **Solution:** Instead of using `git subtree`, I deployed directly from the server directory. This ensures `package.json` is at the root, which Heroku's buildpack requires. I documented this in the README for future deployments.

**Challenge 3: CORS Configuration**
- **Problem:** Initially, CORS was too permissive, allowing all origins
- **Solution:** I updated the CORS configuration to dynamically allow the frontend URL from environment variables while maintaining localhost for development. This improves security in production.

**Challenge 4: Google OAuth Client ID Mismatch**
- **Problem:** Got "audience mismatch" error because frontend and backend were using different Client IDs
- **Solution:** I learned that for Google Identity Services, the frontend creates the token and the backend verifies it using the SAME Client ID. This is different from traditional OAuth flows. I updated both environment variables to use the same Client ID.

**Challenge 5: Task Deletion Confirmation**
- **Problem:** Initially used browser's native `confirm()` which looked unprofessional
- **Solution:** I replaced it with a styled Shadcn/ui Dialog component that matches the application's design system. This provides a better user experience and maintains design consistency.

**Key Learning:** These challenges taught me the importance of thorough testing in production environments, understanding third-party API requirements, and the value of good documentation for troubleshooting."

---

## CLOSING (30 seconds)

**[Wrap up]**

"This Task Tracker application demonstrates full-stack development skills with a modern tech stack, secure authentication, and a clean user interface. All code is well-organized, follows best practices, and is ready for production deployment.

The application is live at:
- Frontend: https://task-tracker-hazel-theta.vercel.app/
- Backend: https://task-tracker-backend-6647-c435ebfb5871.herokuapp.com/api

Thank you for watching, and I'm happy to answer any questions!"

---

## TIPS FOR RECORDING:

1. **Speak naturally** - Don't read word-for-word, use this as a guide
2. **Show enthusiasm** - Be excited about your work
3. **Pause between sections** - Give viewers time to process
4. **Highlight key features** - Point out what makes your app special
5. **Be confident** - You built this, own it!
6. **Keep it under 10 minutes** - Edit out any long pauses or mistakes

---

## KEY POINTS TO EMPHASIZE:

✅ Modern, widely-used tech stack (AI-friendly for debugging)
✅ Secure authentication with JWT and Google OAuth
✅ Clean code organization and best practices
✅ Responsive design with dark mode
✅ Efficient state management with React hooks
✅ Production-ready deployment
✅ Problem-solving skills demonstrated through challenges

