# Google OAuth Setup Guide

## Step 1: Create Google OAuth Credentials

1. **Go to Google Cloud Console**
   - Visit: https://console.cloud.google.com/
   - Sign in with your Google account

2. **Create a New Project (or select existing)**
   - Click on the project dropdown at the top
   - Click "New Project"
   - Enter project name: "Task Tracker" (or your preferred name)
   - Click "Create"

3. **Enable Google+ API**
   - In the left sidebar, go to "APIs & Services" > "Library"
   - Search for "Google+ API" or "Google Identity Services"
   - Click on it and click "Enable"

4. **Create OAuth 2.0 Credentials**
   - Go to "APIs & Services" > "Credentials"
   - Click "Create Credentials" > "OAuth client ID"
   - If prompted, configure the OAuth consent screen first:
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
   - Application type: "Web application"
   - Name: "Task Tracker Web Client"
   - **Authorized JavaScript origins:**
     - `http://localhost:3000` (for development)
     - `http://localhost:3001` (if your frontend runs on different port)
     - Add your production URL when deploying
   - **Authorized redirect URIs:**
     - For Google Sign-In button, you typically don't need redirect URIs, but add:
     - `http://localhost:3000` (for development)
     - Your production URL when deploying
   - Click "Create"
   - **Copy the Client ID** - you'll need this!

6. **Create OAuth Client ID for Backend (Server-side)**
   - Create another OAuth client ID
   - Application type: "Web application"
   - Name: "Task Tracker Backend"
   - No redirect URIs needed for server-side verification
   - Click "Create"
   - **Copy the Client ID and Client Secret** - you'll need both!

## Step 2: Add Environment Variables

### Backend (.env in server folder)
Add these to your `server/.env` file:
```
GOOGLE_CLIENT_ID=your-backend-client-id-here
GOOGLE_CLIENT_SECRET=your-backend-client-secret-here
```

### Frontend (.env.local in frontend folder)
Create a `.env.local` file in the `frontend` folder:
```
NEXT_PUBLIC_GOOGLE_CLIENT_ID=your-frontend-client-id-here
```

**Important Notes:**
- The frontend Client ID is different from the backend Client ID
- Frontend Client ID is public (starts with `NEXT_PUBLIC_`)
- Backend Client Secret must NEVER be exposed to the frontend
- Add `.env.local` to `.gitignore` (it should already be there)

## Step 3: Test the Setup

1. Start your backend server
2. Start your frontend development server
3. Go to the login page
4. You should see the Google Sign-In button
5. Click it and test the authentication flow

## Troubleshooting

- **"Error 400: redirect_uri_mismatch"**: Make sure your authorized redirect URIs in Google Console match exactly (including http vs https, port numbers, trailing slashes)
- **"Invalid client"**: Check that you're using the correct Client ID for frontend vs backend
- **"Token verification failed"**: Make sure your backend has the correct Client ID and Secret

