# Customization Guide

This guide will help you personalize your portfolio website with your own information.

## Quick Start Checklist

- [ ] Update personal name and title
- [ ] Add your contact information
- [ ] Customize work experience
- [ ] Update education details
- [ ] Add your certifications
- [ ] Customize skills and technologies
- [ ] Update social media links
- [ ] Customize colors/theme (optional)

## 1. Navigation & Branding

**File**: `src/components/navigation.tsx`

```typescript
// Line 32: Change "Tyler Larson" to your name
<Link href="/" className="text-xl font-bold">
  Your Name Here
</Link>
```

**File**: `src/app/layout.tsx`

```typescript
// Lines 16-18: Update site metadata
export const metadata: Metadata = {
  title: "Your Name - Portfolio",
  description: "Your custom description",
};
```

## 2. Home Page

**File**: `src/app/page.tsx`

### Update Your Name and Title (Lines ~96-106)
```typescript
<h1>Your Name</h1>
<p>Your Job Title / Professional Description</p>
<p>Your personal tagline or mission statement</p>
```

### Customize "What I Do" Section (Lines ~150-180)
Edit the array of cards to reflect your specialties:
```typescript
{
  icon: YourIcon,
  title: "Your Specialty",
  description: "What you do in this area",
}
```

## 3. Experience Page

**File**: `src/app/experience/page.tsx`

### Work Experience (Lines ~19-70)
Update the experiences array with your work history:

```typescript
{
  title: "Your Job Title",
  company: "Company Name",
  location: "City, State/Country",
  period: "Start Year - End Year",
  description: "Brief overview of your role",
  achievements: [
    "Key achievement 1",
    "Key achievement 2",
    "Key achievement 3",
  ],
  skills: ["Skill1", "Skill2", "Skill3"],
}
```

### Education (Lines ~72-82)
Update your educational background:

```typescript
{
  degree: "Your Degree",
  institution: "Your University",
  location: "City, State",
  period: "Start Year - End Year",
  honors: "Any honors or distinctions", // Optional
}
```

### Certifications (Lines ~84-88)
Add your professional certifications:

```typescript
const certifications = [
  "Your Certification 1",
  "Your Certification 2",
  "Your Certification 3",
];
```

### Technical Skills (Lines ~157-164)
Customize your skill categories:

```typescript
const skills = {
  "Your Category 1": ["Skill1", "Skill2", "Skill3"],
  "Your Category 2": ["Skill4", "Skill5", "Skill6"],
  // Add more categories as needed
};
```

### Professional Summary (Lines ~224-230)
Write your own summary:

```typescript
<p>
  Your professional summary highlighting your experience,
  expertise, and career goals.
</p>
```

## 5. Styling & Theming

**File**: `src/app/globals.css`

### Change Color Scheme

The website uses CSS variables. Update these in the `:root` section (starting at line 46):

```css
:root {
  --primary: oklch(...);      /* Main brand color */
  --secondary: oklch(...);    /* Secondary color */
  --accent: oklch(...);       /* Accent color */
  /* More color variables... */
}
```

### For Dark Mode
Update colors in the `.dark` section (starting at line 81).

### Quick Color Tips:
- Use [oklch.com](https://oklch.com) to generate OKLCH colors
- Keep consistent lightness values for better accessibility
- Test both light and dark modes

## 6. Adding New Pages

To add a new page:

1. Create a new folder in `src/app/`
2. Add a `page.tsx` file in that folder
3. Update navigation in `src/components/navigation.tsx`

Example:
```typescript
// Add to links array in navigation.tsx
{ href: "/your-new-page", label: "New Page" }
```

## 7. Customizing Animations

### Framer Motion Variants

You can adjust animation timings and effects throughout the code. Common patterns:

```typescript
// Fade in from bottom
initial={{ opacity: 0, y: 30 }}
animate={{ opacity: 1, y: 0 }}
transition={{ duration: 0.6 }}

// Scale up
initial={{ opacity: 0, scale: 0.9 }}
animate={{ opacity: 1, scale: 1 }}

// Slide in from left
initial={{ opacity: 0, x: -50 }}
animate={{ opacity: 1, x: 0 }}
```

## 8. Icons

The site uses Lucide React icons. Browse available icons at [lucide.dev](https://lucide.dev).

Import new icons:
```typescript
import { IconName } from "lucide-react";
```

## 9. Adding Images

1. Place images in the `public/` folder
2. Use Next.js Image component:

```typescript
import Image from "next/image";

<Image
  src="/your-image.jpg"
  alt="Description"
  width={800}
  height={600}
/>
```

## 10. Testing Your Changes

After making changes:

```bash
# Development mode (hot reload)
npm run dev

# Check for errors
npm run lint

# Build for production
npm run build
```

## Common Issues & Solutions

### Issue: Colors look wrong
**Solution**: Make sure you're using the correct OKLCH format. Check [oklch.com](https://oklch.com) for valid values.

### Issue: Animations not working
**Solution**: Ensure you have `"use client";` at the top of files using Framer Motion.

### Issue: Build fails
**Solution**: Run `npm run lint` to find and fix errors.

## Need Help?

- Check the [Next.js Documentation](https://nextjs.org/docs)
- Browse [shadcn/ui Components](https://ui.shadcn.com/)
- Read [Framer Motion Docs](https://www.framer.com/motion/)

## Pro Tips

1. **Keep it simple**: Don't overload pages with too much information
2. **Test on mobile**: Use Chrome DevTools to test responsive design
3. **Performance matters**: Keep images optimized and animations smooth
4. **Proofread**: Double-check all text for typos and accuracy
5. **Update regularly**: Keep your experience and skills current

---

Happy customizing! 🚀

