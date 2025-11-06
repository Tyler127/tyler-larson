# GitHub Token Setup (REQUIRED)

The GitHub contribution graph feature requires a GitHub Personal Access Token to access GitHub's GraphQL API. The token is **required** for the application to work properly in production.

## How to Create a GitHub Personal Access Token:

1. Go to https://github.com/settings/tokens
2. Click **"Generate new token"** → **"Generate new token (classic)"**
3. Give it a name like **"Portfolio Website"**
4. **Expiration**: Choose "No expiration" or set a custom date
5. **Select scopes**: 
   - ✅ **ONLY select `read:user`** (this is all you need for public contribution data)
   - ❌ Do NOT select any other scopes for security
6. Click **"Generate token"**
7. **Copy the token** (you won't be able to see it again!)

## How to Add the Token to Your Project:

1. Create a file called `.env.local` in your project root (same folder as `package.json`)
2. Add this line to the file:
   ```
   GITHUB_TOKEN=ghp_yourTokenHere
   ```
3. Replace `ghp_yourTokenHere` with your actual token
4. **Restart your dev server** (`npm run dev`)

## Important Notes:

- The `.env.local` file is automatically ignored by git (won't be committed)
- **Never commit your token to GitHub** - keep it in `.env.local` only
- **The token is REQUIRED** - GitHub's GraphQL API requires authentication
- With a token, you get 5000 requests/hour rate limit

## For Production Deployment:

When deploying to production (Vercel, Netlify, etc.), you need to add the `GITHUB_TOKEN` as an environment variable in your hosting platform's dashboard:

1. **Vercel**: Go to Project Settings → Environment Variables → Add `GITHUB_TOKEN`
2. **Netlify**: Go to Site Settings → Environment Variables → Add `GITHUB_TOKEN`
3. After adding the token, redeploy your site for the changes to take effect

