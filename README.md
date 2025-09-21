# Charlie Portfolio — Next.js + Framer Motion

A modern portfolio website built with Next.js 14 App Router, Framer Motion v11, and designed for static export to Cloudflare Pages.

## ✨ Features

- **Next.js 14 App Router** with static export for optimal performance
- **Framer Motion v11** with reduced motion support and smooth animations
- **Responsive 48/52 grid layout** for work showcase
- **Cursor-following interactive pill** on project hover
- **Case study pages** generated from data/projects.json
- **OpenGraph image generation** for social sharing
- **Accessibility-first** with proper focus management and ARIA labels
- **Performance optimized** with lazy loading and image optimization

## 🚀 Quick Start

### Prerequisites

- Node.js 18.0.0 or higher
- npm or yarn package manager

### Installation

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start development server:**
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) to view the site.

3. **Build for production:**
   ```bash
   npm run build
   ```
   The static files will be generated in the `out/` directory.

4. **Preview production build:**
   ```bash
   npm start
   ```

## 📁 Project Structure

```
├── app/                          # Next.js App Router
│   ├── case/[slug]/             # Dynamic case study pages
│   │   ├── page.tsx             # Case study template
│   │   └── opengraph-image.tsx  # OG image generator
│   ├── work/                    # All work page
│   ├── providers/               # App providers
│   │   └── MotionProvider.tsx   # Framer Motion setup
│   ├── globals.css              # Global styles
│   ├── layout.tsx               # Root layout
│   └── page.tsx                 # Home page
├── components/                   # Reusable components
│   ├── Hero.tsx                 # Hero section with animations
│   ├── Row.tsx                  # Project row with cursor pill
│   └── TagChips.tsx             # Tag components
├── data/                        # Static data
│   └── projects.json            # Project data
├── lib/                         # Utilities
│   └── projects.ts              # Project helpers
├── public/                      # Static assets
│   └── assets/                  # Images, icons, etc.
├── tokens.css                   # Design tokens
├── main.css                     # Base styles
├── luxury-styles.css            # Enhanced styles
└── next.config.mjs              # Next.js configuration
```

## 📝 How to Add Projects

Edit the `data/projects.json` file to add or modify projects:

```json
{
  "slug": "project-slug",
  "title": "Project Title",
  "subtitle": "Brief description",
  "tags": ["Branding", "Web", "Motion"],
  "role": "Your role on the project",
  "timeline": "Project duration",
  "summary": "Detailed project overview...",
  "process": [
    "Step 1 of your process...",
    "Step 2 of your process..."
  ],
  "gallery": [
    "/assets/projects/project-1.webp",
    "/assets/projects/project-2.webp"
  ],
  "outcomes": [
    "+25% conversion improvement",
    "Award recognition"
  ],
  "cover": "/assets/projects/project-cover.webp",
  "live": "https://example.com",
  "repo": "https://github.com/username/repo"
}
```

### Image Guidelines

- **Cover images:** 1200x800px WebP format
- **Gallery images:** Variable sizes, WebP format recommended
- **File naming:** Use project slug as prefix (e.g., `zenflow-cover.webp`)
- **Location:** Place all images in `public/assets/projects/`

## 🎨 Customization

### Design Tokens

Edit `tokens.css` to customize the design system:

- **Colors:** Brand colors, semantic colors
- **Typography:** Font sizes, families
- **Spacing:** Consistent spacing scale
- **Layout:** Content widths, grid settings

### Animations

Framer Motion variants are defined in `app/providers/MotionProvider.tsx`:

- `fadeUp` - Standard entrance animation
- `stagger` - Staggered children animations
- `scaleIn` - Scale entrance effect

### Layout

The 48/52 grid layout is configured in CSS:
- Text content: 48% width
- Media content: 52% width
- Asymmetric border radius on media
- Responsive breakpoints included

## 🚀 Deployment to Cloudflare Pages

### Automatic Deployment

1. **Connect repository** to Cloudflare Pages
2. **Set build configuration:**
   - Build command: `npm run build`
   - Output directory: `out`
   - Framework preset: None

### Manual Deployment

1. **Build the project:**
   ```bash
   npm run build
   ```

2. **Upload the `out/` directory** to Cloudflare Pages

### Environment Variables

No environment variables are required for the static build.

## 🎯 Performance

- **Lighthouse Score:** 90+/90+ target
- **Static Export:** No server-side rendering
- **Image Optimization:** Next.js Image component with lazy loading
- **Code Splitting:** Automatic with Next.js App Router
- **Reduced Motion:** Respects user preferences

## 🧩 Browser Support

- **Modern browsers:** Chrome, Firefox, Safari, Edge (latest 2 versions)
- **Mobile:** iOS Safari, Chrome Mobile
- **Accessibility:** WCAG 2.1 AA compliance

## 📖 Key Features Explained

### Cursor-Following Pill

The "See the work" pill follows the cursor on project hover and pins to bottom-right on keyboard focus for accessibility.

### Framer Motion Integration

- **LazyMotion:** Only loads necessary animation features
- **MotionConfig:** Respects `prefers-reduced-motion`
- **AnimatePresence:** Smooth page transitions

### Static Generation

All pages are statically generated at build time:
- Home page with all projects
- Individual case study pages
- Work listing page
- OpenGraph images

### Accessibility

- **Focus management:** Proper tab order and focus indicators
- **ARIA labels:** Descriptive labels for screen readers
- **Reduced motion:** Animations disabled when preferred
- **Keyboard navigation:** Full keyboard accessibility

## 🔧 Development Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production (generates `out/` directory)
- `npm start` - Preview production build locally
- `npm run lint` - Run ESLint
- `npm run type-check` - TypeScript type checking

## 📄 License

MIT License - feel free to use this as a starting point for your own portfolio.

## 🤝 Contributing

This is a personal portfolio template. Feel free to fork and customize for your own use.

---

**Built with ❤️ using Next.js, Framer Motion, and modern web standards.**