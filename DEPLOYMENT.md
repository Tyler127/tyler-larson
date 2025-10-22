# Deployment Guide

This guide covers various options for deploying your Next.js portfolio website.

## Table of Contents

1. [Vercel (Recommended)](#vercel-recommended)
2. [Netlify](#netlify)
3. [GitHub Pages](#github-pages)
4. [Custom Server](#custom-server)

---

## Vercel (Recommended)

Vercel is the easiest way to deploy Next.js applications (it's made by the Next.js team).

### Steps:

1. **Push your code to GitHub**
   ```bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

2. **Sign up for Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Sign up with your GitHub account

3. **Import your repository**
   - Click "New Project"
   - Select your GitHub repository
   - Vercel will auto-detect Next.js settings
   - Click "Deploy"

4. **Done!**
   - Your site will be live in ~2 minutes
   - You'll get a URL like `your-site.vercel.app`
   - You can add a custom domain in settings

### Automatic Deployments

Every push to your main branch will automatically deploy! 🎉

---

## Netlify

Netlify is another great option with a generous free tier.

### Steps:

1. **Push code to GitHub** (if not already done)

2. **Sign up for Netlify**
   - Go to [netlify.com](https://netlify.com)
   - Sign up with your GitHub account

3. **Create new site**
   - Click "Add new site" → "Import an existing project"
   - Choose GitHub and select your repository

4. **Configure build settings**
   ```
   Build command: npm run build
   Publish directory: .next
   ```

5. **Deploy**
   - Click "Deploy site"
   - Your site will be live at `your-site.netlify.app`

---

## GitHub Pages

GitHub Pages is free but requires a bit more setup for Next.js.

### Steps:

1. **Install static export package**
   ```bash
   npm install -D @next/static-export
   ```

2. **Update next.config.ts**
   ```typescript
   const nextConfig = {
     output: 'export',
     images: {
       unoptimized: true,
     },
   };
   ```

3. **Build static site**
   ```bash
   npm run build
   ```

4. **Create GitHub Pages workflow**
   Create `.github/workflows/deploy.yml`:
   ```yaml
   name: Deploy to GitHub Pages
   
   on:
     push:
       branches: [ main ]
   
   jobs:
     build-and-deploy:
       runs-on: ubuntu-latest
       
       steps:
       - uses: actions/checkout@v3
       
       - name: Setup Node.js
         uses: actions/setup-node@v3
         with:
           node-version: '18'
           
       - name: Install dependencies
         run: npm ci
         
       - name: Build
         run: npm run build
         
       - name: Deploy
         uses: peaceiris/actions-gh-pages@v3
         with:
           github_token: ${{ secrets.GITHUB_TOKEN }}
           publish_dir: ./out
   ```

5. **Enable GitHub Pages**
   - Go to repository Settings → Pages
   - Set source to "gh-pages" branch
   - Your site will be at `username.github.io/repository-name`

---

## Custom Server / VPS

For deploying to your own server.

### Requirements:
- Node.js 18+ installed
- PM2 for process management (recommended)

### Steps:

1. **Build the application**
   ```bash
   npm run build
   ```

2. **Install PM2** (on your server)
   ```bash
   npm install -g pm2
   ```

3. **Start the application**
   ```bash
   pm2 start npm --name "portfolio" -- start
   pm2 save
   pm2 startup
   ```

4. **Setup Nginx reverse proxy** (optional but recommended)
   
   Create `/etc/nginx/sites-available/portfolio`:
   ```nginx
   server {
       listen 80;
       server_name yourdomain.com;
       
       location / {
           proxy_pass http://localhost:3000;
           proxy_http_version 1.1;
           proxy_set_header Upgrade $http_upgrade;
           proxy_set_header Connection 'upgrade';
           proxy_set_header Host $host;
           proxy_cache_bypass $http_upgrade;
       }
   }
   ```

5. **Enable the site**
   ```bash
   sudo ln -s /etc/nginx/sites-available/portfolio /etc/nginx/sites-enabled/
   sudo nginx -t
   sudo systemctl restart nginx
   ```

6. **Setup SSL with Let's Encrypt** (recommended)
   ```bash
   sudo apt-get install certbot python3-certbot-nginx
   sudo certbot --nginx -d yourdomain.com
   ```

---

## Environment Variables

If you add environment variables later, remember to:

### For Vercel/Netlify:
- Add them in the dashboard under "Environment Variables"

### For Custom Server:
- Create `.env.local` file
- Add variables: `VARIABLE_NAME=value`
- Never commit `.env.local` to git!

---

## Custom Domain

### Vercel:
1. Go to project settings → Domains
2. Add your domain
3. Update DNS records as instructed

### Netlify:
1. Go to Site settings → Domain management
2. Add custom domain
3. Update DNS records

### GitHub Pages:
1. Go to repository Settings → Pages
2. Add custom domain
3. Create CNAME record pointing to `username.github.io`

---

## Performance Tips

1. **Enable Compression**
   - Most platforms enable this by default
   - For custom servers, enable gzip in Nginx

2. **Add Analytics** (optional)
   - Vercel Analytics
   - Google Analytics
   - Plausible Analytics

3. **Monitor Performance**
   - Use Lighthouse in Chrome DevTools
   - Check page load times
   - Optimize images if needed

---

## Troubleshooting

### Build Fails
```bash
# Clear cache and rebuild
rm -rf .next
npm run build
```

### Images Not Loading
- Make sure images are in the `public/` folder
- Check image paths (should start with `/`)
- For static export, use `unoptimized: true` in config

### Styles Not Working
- Clear browser cache
- Check that globals.css is imported in layout.tsx
- Verify Tailwind config is correct

### 404 Errors
- For Next.js App Router, ensure pages are in `src/app/`
- Check that route names match folder names
- Verify navigation links are correct

---

## Security Checklist

Before deploying:

- [ ] Remove any sensitive data from code
- [ ] Don't commit `.env` files
- [ ] Update personal information to real data (or keep placeholders)
- [ ] Set up HTTPS (most platforms do this automatically)
- [ ] Review privacy policy if collecting any data
- [ ] Test all links and buttons

---

## Post-Deployment

After deploying:

1. **Test Everything**
   - [ ] All pages load correctly
   - [ ] Navigation works
   - [ ] Resume downloads
   - [ ] Mobile responsiveness
   - [ ] Dark/light mode (if implemented)

2. **SEO Setup** (optional)
   - Add to Google Search Console
   - Submit sitemap
   - Add meta tags for social sharing

3. **Share Your Work!**
   - Add link to LinkedIn
   - Share on social media
   - Add to GitHub profile

---

## Updating Your Site

Whenever you make changes:

```bash
# 1. Make your changes
# 2. Test locally
npm run dev

# 3. Build to check for errors
npm run build

# 4. Commit and push
git add .
git commit -m "Your update description"
git push origin main

# 5. Automatic deployment! (Vercel/Netlify)
```

---

## Support

If you run into issues:

- Check [Next.js Documentation](https://nextjs.org/docs)
- Visit [Vercel Support](https://vercel.com/support)
- Check [Netlify Docs](https://docs.netlify.com)

---

Good luck with your deployment! 🚀

