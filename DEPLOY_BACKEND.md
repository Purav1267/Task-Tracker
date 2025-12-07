# How to Deploy Backend to Heroku

**Note:** `git subtree push` can sometimes have issues with Heroku detecting the correct directory. Use this direct method instead:

## Method: Direct Push from Server Directory

1. **Navigate to server directory:**
   ```bash
   cd server
   ```

2. **Initialize git (if not already):**
   ```bash
   git init
   git add .
   git commit -m "Deploy server to Heroku"
   ```

3. **Add Heroku remote:**
   ```bash
   git remote add heroku https://git.heroku.com/task-tracker-backend-6647.git
   ```

4. **Push to Heroku:**
   ```bash
   git push heroku HEAD:main --force
   ```

5. **Clean up (optional):**
   ```bash
   cd ..
   rm -rf server/.git
   ```

## Alternative: Using Git Subtree (if the above doesn't work)

```bash
cd "/Users/puravmalik/Coding/BREW - Task Tracker"
git subtree push --prefix server heroku main
```

## Verify Deployment

```bash
heroku logs --tail -a task-tracker-backend-6647
curl https://task-tracker-backend-6647-c435ebfb5871.herokuapp.com/api/tasks
```

The direct push method from the server directory is more reliable for Heroku deployments.

