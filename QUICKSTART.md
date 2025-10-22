# Quick Start Guide

Get your portfolio website up and running in 5 minutes! 🚀

## Step 1: View the Website

The development server should already be running. Open your browser and go to:

```
http://localhost:3000
```

If it's not running, start it with:
```bash
npm run dev
```

## Step 2: Customize Your Information

### Update Your Name (3 places)

1. **Navigation Bar**: `src/components/navigation.tsx` line 32
2. **Home Page**: `src/app/page.tsx` line ~96
3. **Layout Metadata**: `src/app/layout.tsx` line 16

### Update Contact Info

**File**: `src/app/resume/page.tsx` (lines ~150-155)

Replace:
- Email address
- Phone number
- LinkedIn URL
- GitHub URL
- Location

### Update Work Experience

**File**: `src/app/experience/page.tsx` (lines ~19-70)

Edit the `experiences` array with your actual work history.

### Update Skills

**File**: `src/app/resume/page.tsx` (lines ~157-164)

Modify the `skills` object with your technologies.

## Step 3: Test Your Changes

Save your files and watch the browser automatically reload! ✨

Check all three pages:
- Home: http://localhost:3000
- Experience: http://localhost:3000/experience
- Resume: http://localhost:3000/resume

## Step 4: Build for Production

Test that everything builds correctly:

```bash
npm run build
```

If successful, you'll see "✓ Compiled successfully"

## Step 5: Deploy

### Easiest Option: Vercel

1. Push your code to GitHub:
   ```bash
   git add .
   git commit -m "Customize portfolio"
   git push origin main
   ```

2. Go to [vercel.com](https://vercel.com)

3. Sign up and import your repository

4. Click "Deploy" - Done! 🎉

Your site will be live at `your-site.vercel.app`

## Common Customizations

### Change Colors

**File**: `src/app/globals.css` (line 46+)

Adjust the CSS variables:
```css
:root {
  --primary: oklch(...);  /* Your brand color */
}
```

Use [oklch.com](https://oklch.com) to pick colors.

### Add a Photo

1. Put your photo in the `public/` folder
2. Add to home page:
   ```tsx
   import Image from "next/image";
   
   <Image
     src="/your-photo.jpg"
     alt="Your Name"
     width={200}
     height={200}
     className="rounded-full"
   />
   ```

### Change Icons

Browse [lucide.dev](https://lucide.dev) for icons, then:

```tsx
import { IconName } from "lucide-react";

<IconName className="w-6 h-6" />
```

## Need More Help?

- **Full Customization Guide**: See `CUSTOMIZATION_GUIDE.md`
- **Deployment Options**: See `DEPLOYMENT.md`
- **Feature List**: See `FEATURES.md`

## Checklist

Before deploying:
- [ ] Updated name and title
- [ ] Changed contact information
- [ ] Added real work experience
- [ ] Updated skills section
- [ ] Changed education details
- [ ] Added certifications
- [ ] Tested all pages
- [ ] Tested on mobile (Chrome DevTools)
- [ ] Resume downloads correctly
- [ ] No placeholder text remaining
- [ ] Ran `npm run build` successfully

## That's It!

You now have a professional portfolio website with:
- ✅ Modern, responsive design
- ✅ Smooth animations
- ✅ Downloadable resume
- ✅ Mobile-friendly
- ✅ Production-ready

---

## Quick Commands Reference

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Check for errors
npm run lint

# Start production server (after build)
npm start
```

---

Happy customizing! If you have questions, check the other documentation files. 🎉

