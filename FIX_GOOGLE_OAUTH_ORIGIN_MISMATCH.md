# Fix Google OAuth Origin Mismatch Error

## Error: "Error 400: origin_mismatch"

This error occurs when your Vercel URL is not registered in Google Cloud Console as an authorized JavaScript origin.

## Quick Fix Steps

### Step 1: Go to Google Cloud Console

1. Visit: https://console.cloud.google.com/
2. Sign in with your Google account
3. Select your project (the one with your OAuth credentials)

### Step 2: Navigate to OAuth Credentials

1. Go to **"APIs & Services"** in the left sidebar
2. Click **"Credentials"**
3. Find your **OAuth 2.0 Client ID** (the one you're using: `307016727380-72mibbu5agps5sk0pkn3d0ngnpdmtmck.apps.googleusercontent.com`)
4. Click the **pencil icon** (Edit) next to it

### Step 3: Add Authorized JavaScript Origins

In the **"Authorized JavaScript origins"** section, make sure you have EXACTLY these URLs:

```
http://localhost:3000
https://task-tracker-hazel-theta.vercel.app
```

**IMPORTANT:**
- ✅ Use `https://` (not `http://`) for production
- ✅ NO trailing slash at the end
- ✅ Exact match - case sensitive
- ✅ Include the protocol (https://)

### Step 4: Add Authorized Redirect URIs

In the **"Authorized redirect URIs"** section, add:

```
http://localhost:3000
https://task-tracker-hazel-theta.vercel.app
```

**IMPORTANT:**
- ✅ Same URLs as JavaScript origins
- ✅ NO trailing slash
- ✅ Exact match

### Step 5: Save Changes

1. Click **"SAVE"** at the bottom
2. Wait a few seconds for changes to propagate (can take 1-5 minutes)

### Step 6: Test Again

1. Clear your browser cache and cookies
2. Visit: https://task-tracker-hazel-theta.vercel.app/
3. Try Google Sign-In again

## Common Mistakes to Avoid

❌ **WRONG:**
- `http://task-tracker-hazel-theta.vercel.app` (missing https)
- `https://task-tracker-hazel-theta.vercel.app/` (trailing slash)
- `task-tracker-hazel-theta.vercel.app` (missing protocol)
- `https://www.task-tracker-hazel-theta.vercel.app` (www prefix if not used)

✅ **CORRECT:**
- `https://task-tracker-hazel-theta.vercel.app` (exact match)

## If It Still Doesn't Work

### Check 1: Verify the URL
1. Open your browser's Developer Tools (F12)
2. Go to Console tab
3. Type: `window.location.origin`
4. Copy the exact value shown
5. Make sure this EXACT value is in Google Console

### Check 2: Wait for Propagation
- Google's changes can take 1-5 minutes to propagate
- Try again after waiting a few minutes

### Check 3: Check OAuth Consent Screen
1. Go to "APIs & Services" > "OAuth consent screen"
2. Make sure your app is published (if you want public access)
3. Or add your email as a test user if in testing mode

### Check 4: Verify Client ID
1. Check Vercel environment variables
2. Make sure `NEXT_PUBLIC_GOOGLE_CLIENT_ID` matches the Client ID in Google Console
3. Current Client ID: `307016727380-72mibbu5agps5sk0pkn3d0ngnpdmtmck.apps.googleusercontent.com`

### Check 5: Check Browser Console
1. Open Developer Tools (F12)
2. Go to Console tab
3. Look for any JavaScript errors
4. Check Network tab for failed requests

## Step-by-Step Screenshot Guide

1. **Google Cloud Console** → **APIs & Services** → **Credentials**
2. Find your OAuth 2.0 Client ID
3. Click the **pencil/edit icon**
4. Scroll to **"Authorized JavaScript origins"**
5. Click **"+ ADD URI"**
6. Enter: `https://task-tracker-hazel-theta.vercel.app`
7. Click **"SAVE"**

## Still Having Issues?

If you're still getting the error after following these steps:

1. **Double-check the exact URL:**
   - Visit your site: https://task-tracker-hazel-theta.vercel.app
   - Check the address bar - copy the EXACT URL
   - Make sure it matches exactly in Google Console

2. **Check for multiple OAuth clients:**
   - Make sure you're editing the correct Client ID
   - The one you're using: `307016727380-72mibbu5agps5sk0pkn3d0ngnpdmtmck.apps.googleusercontent.com`

3. **Try incognito/private browsing:**
   - Sometimes browser cache causes issues
   - Test in a new incognito window

4. **Verify environment variable:**
   - In Vercel, check that `NEXT_PUBLIC_GOOGLE_CLIENT_ID` is set correctly
   - Redeploy if you just changed it

## Quick Checklist

- [ ] Added `https://task-tracker-hazel-theta.vercel.app` to Authorized JavaScript origins
- [ ] Added `https://task-tracker-hazel-theta.vercel.app` to Authorized redirect URIs
- [ ] NO trailing slashes
- [ ] Using `https://` (not `http://`)
- [ ] Clicked SAVE in Google Console
- [ ] Waited 1-5 minutes for changes to propagate
- [ ] Cleared browser cache
- [ ] Verified Client ID matches in Vercel

After completing these steps, your Google OAuth should work! 🎉

