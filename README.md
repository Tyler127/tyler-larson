# Tyler Larson - Personal Portfolio Website

A modern, responsive personal portfolio website built with Next.js 16, TypeScript, Tailwind CSS, and shadcn/ui components.

## Features

- **Modern Tech Stack**: Built with Next.js 16, React 19, TypeScript, and Tailwind CSS 4
- **Beautiful UI**: Utilizing shadcn/ui components for a polished, professional look
- **Smooth Animations**: Framer Motion animations and scroll effects throughout
- **Responsive Design**: Fully responsive layout that works on all devices
- **Three Main Sections**:
  - **Home**: Hero section with animated particles and call-to-action
  - **Experience**: Single-page scrolling experience with timeline, work history, education, and certifications

## Getting Started

### Prerequisites

- Node.js 18+ installed on your machine
- npm or yarn package manager

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd tyler-larson
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser to see the website.

## Project Structure

```
tyler-larson/
├── src/
│   ├── app/
│   │   ├── experience/
│   │   │   └── page.tsx       # Experience page with scroll effects
│   │   ├── globals.css        # Global styles and theme
│   │   ├── layout.tsx         # Root layout with navigation
│   │   └── page.tsx           # Home page
│   ├── components/
│   │   ├── ui/                # shadcn/ui components
│   │   └── navigation.tsx     # Navigation component
│   └── lib/
│       └── utils.ts           # Utility functions
├── public/                    # Static assets
└── package.json
```

## Customization

### Updating Personal Information

1. **Home Page** (`src/app/page.tsx`): Update the hero section with your name and title
2. **Experience Page** (`src/app/experience/page.tsx`): Modify the experiences, education, and certifications arrays
4. **Navigation** (`src/components/navigation.tsx`): Update the site title in the navigation bar

### Theming

The website uses Tailwind CSS with shadcn/ui's theming system. To customize colors:

1. Edit the CSS variables in `src/app/globals.css`
2. Modify the `--primary`, `--secondary`, `--accent` colors for light and dark modes

## Available Scripts

- `npm run dev` - Start the development server
- `npm run build` - Build the production application
- `npm run start` - Start the production server
- `npm run lint` - Run ESLint to check code quality

## Technologies Used

- **Framework**: [Next.js 16](https://nextjs.org/)
- **UI Library**: [React 19](https://react.dev/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/)
- **Components**: [shadcn/ui](https://ui.shadcn.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Icons**: [Lucide React](https://lucide.dev/)

## Features Breakdown

### Home Page
- Animated gradient background
- Floating particle effects
- Staggered content animations
- Quick overview cards
- Call-to-action sections

### Experience Page
- Scroll progress indicator
- Timeline-based work history
- Animated card reveals on scroll
- Skills badges with staggered animations
- Education and certifications sections


## License

This project is open source and available under the MIT License.

## Contact

Tyler Larson
- Email: tyler.larson@email.com
- LinkedIn: [linkedin.com/in/tylerlarson](https://linkedin.com/in/tylerlarson)
- GitHub: [github.com/tylerlarson](https://github.com/tylerlarson)
