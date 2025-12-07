# How to Deploy Backend to Heroku

**Important:** Heroku requires `package.json` at the root of the deployed directory. Since our server is in a subdirectory, we need to use a specific deployment method.

## ✅ Recommended Method: Direct Push from Server Directory

This is the most reliable method for deploying a subdirectory to Heroku.

### Step-by-Step Instructions

1. **Navigate to server directory:**
   ```bash
   cd server
   ```

2. **Initialize git repository (temporary):**
   ```bash
   git init
   git add .
   git commit -m "Deploy server to Heroku"
   ```

3. **Add Heroku remote:**
   ```bash
   git remote add heroku https://git.heroku.com/task-tracker-backend-6647.git
   ```
   
   Or if remote already exists:
   ```bash
   git remote set-url heroku https://git.heroku.com/task-tracker-backend-6647.git
   ```

4. **Push to Heroku:**
   ```bash
   git push heroku HEAD:main --force
   ```

5. **Clean up temporary git repository:**
   ```bash
   cd ..
   rm -rf server/.git
   ```

### Verify Deployment

```bash
# Check logs
heroku logs --tail -a task-tracker-backend-6647

# Test API
curl https://task-tracker-backend-6647-c435ebfb5871.herokuapp.com/api/tasks
```

## Why This Method Works

- Heroku's buildpack looks for `package.json` at the root
- By pushing directly from the `server` directory, `package.json` is at the root
- The `Procfile` is also at the root, which Heroku needs

## Troubleshooting

**If build fails with "App not compatible with buildpack":**
- Make sure you're in the `server` directory when running git commands
- Verify `package.json` exists in the server directory
- Check that `Procfile` exists and contains: `web: node index.js`

**If you get "remote already exists" error:**
- Use: `git remote set-url heroku https://git.heroku.com/task-tracker-backend-6647.git`

**For future deployments:**
- Always use the direct push method from the server directory
- This ensures Heroku detects Node.js correctly

