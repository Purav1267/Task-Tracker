# Google OAuth Production Setup Guide

Your application is now deployed! Follow these steps to enable Google OAuth in production.

## Current Deployment URLs

- **Frontend:** https://task-tracker-hazel-theta.vercel.app/
- **Backend:** https://task-tracker-backend-6647-c435ebfb5871.herokuapp.com/api

## Step-by-Step Google OAuth Setup

### Step 1: Update Google Cloud Console

1. **Go to [Google Cloud Console](https://console.cloud.google.com/)**
   - Sign in with your Google account
   - Select your project (or create one if you haven't)

2. **Navigate to OAuth Consent Screen**
   - Go to "APIs & Services" > "OAuth consent screen"
   - If not already configured:
     - Choose "External" (unless you have Google Workspace)
     - Fill in:
       - App name: "Task Tracker"
       - User support email: Your email
       - Developer contact: Your email
     - Add scopes: `email`, `profile`, `openid`
     - Add test users (your email) if app is in testing mode
     - **Important:** If you want to make it public, you'll need to submit for verification (can take a few days)

3. **Update OAuth Client ID**
   - Go to "APIs & Services" > "Credentials"
   - Find your OAuth 2.0 Client ID (or create a new one)
   - Click "Edit" (pencil icon)

4. **Add Authorized JavaScript Origins:**
   ```
   http://localhost:3000
   https://task-tracker-hazel-theta.vercel.app
   ```

5. **Add Authorized Redirect URIs:**
   ```
   http://localhost:3000
   https://task-tracker-hazel-theta.vercel.app
   ```

6. **Save Changes**

### Step 2: Verify Environment Variables

**Frontend (Vercel):**
- Go to your Vercel project dashboard
- Navigate to Settings > Environment Variables
- Verify these are set:
  - `NEXT_PUBLIC_API_URL` = `https://task-tracker-backend-6647-c435ebfb5871.herokuapp.com/api`
  - `NEXT_PUBLIC_GOOGLE_CLIENT_ID` = `307016727380-72mibbu5agps5sk0pkn3d0ngnpdmtmck.apps.googleusercontent.com`

**Backend (Heroku):**
- Already configured with:
  - `GOOGLE_CLIENT_ID` = `307016727380-72mibbu5agps5sk0pkn3d0ngnpdmtmck.apps.googleusercontent.com`
  - `FRONTEND_URL` = `https://task-tracker-hazel-theta.vercel.app`

### Step 3: Test Google OAuth

1. **Visit your production site:**
   - Go to https://task-tracker-hazel-theta.vercel.app/

2. **Test Login Page:**
   - Click "Login"
   - You should see the Google Sign-In button
   - Click it and test authentication

3. **Test Register Page:**
   - Click "Get Started" or "Create Your Account"
   - You should see the Google Sign-In button
   - Click it and test registration

### Step 4: Troubleshooting

**If Google Sign-In button doesn't appear:**
- Check browser console for errors
- Verify `NEXT_PUBLIC_GOOGLE_CLIENT_ID` is set in Vercel
- Clear browser cache and cookies
- Check that Google script is loading (check Network tab)

**If you get "redirect_uri_mismatch" error:**
- Verify the exact URL in Google Console matches your Vercel URL
- Check for trailing slashes (should be consistent)
- Ensure both http and https are added if needed

**If authentication fails:**
- Check Heroku logs: `heroku logs --tail -a task-tracker-backend-6647`
- Verify `GOOGLE_CLIENT_ID` matches in both frontend and backend
- Check that CORS is allowing your Vercel domain

### Step 5: Make OAuth Public (Optional)

If you want anyone to use Google Sign-In (not just test users):

1. Go to OAuth Consent Screen
2. Click "PUBLISH APP"
3. Note: This may require app verification if you're requesting sensitive scopes
4. For `email`, `profile`, and `openid`, verification is usually not required

## Current Configuration Summary

✅ **Frontend URL:** https://task-tracker-hazel-theta.vercel.app/  
✅ **Backend URL:** https://task-tracker-backend-6647-c435ebfb5871.herokuapp.com/api  
✅ **Google Client ID:** 307016727380-72mibbu5agps5sk0pkn3d0ngnpdmtmck.apps.googleusercontent.com  
✅ **CORS:** Configured to allow Vercel domain  
✅ **Environment Variables:** Set in both Vercel and Heroku  

## Next Steps

1. ✅ Update Google Console with production URLs (Step 1)
2. ✅ Test Google Sign-In on production site
3. ✅ Verify all features work correctly
4. ✅ Share your application with users!

Your application is ready for production use! 🚀

