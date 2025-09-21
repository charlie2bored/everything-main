# Charlie Portfolio

A modern Next.js portfolio with static export, optimized for Cloudflare Pages. Features conversion-focused design, comprehensive accessibility, and measurable performance.

## 🏆 Features

- **Static Export**: Optimized for Cloudflare Pages deployment
- **Design System**: Consistent 48/52 grid layout with asymmetric media radius
- **Motion**: Framer Motion v11 with proper reduced motion support
- **Accessibility**: WCAG 2.1 AA compliant with focus management and screen reader support
- **Performance**: LCP ≤ 1.8s, CLS < 0.01, JS budget ≤ 120KB gzipped
- **SEO**: Per-page metadata, OpenGraph images, structured data

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Serve built files locally
npm start

# Type checking
npm run type-check

# Linting
npm run lint
```

## 📁 Project Structure

```
├── app/                    # Next.js App Router pages
│   ├── layout.tsx         # Root layout with metadata and providers
│   ├── page.tsx           # Home page (Hero + Selected Work + Proof)
│   ├── work/page.tsx      # Work index with filtering
│   ├── services/page.tsx  # Service offerings and pricing
│   ├── about/page.tsx     # Bio, methodology, timeline
│   ├── contact/page.tsx   # Contact form with validation
│   ├── case/[slug]/       # Case study pages
│   └── globals.css        # Global styles and design system
├── components/            # Reusable UI components
│   ├── Header.tsx         # Main navigation (rekorderstudios style)
│   ├── Footer.tsx         # Site footer with links
│   ├── Hero.tsx           # Homepage hero section
│   ├── Row.tsx            # 48/52 project display with hover pills
│   ├── StickyToc.tsx      # Table of contents with scroll progress
│   ├── MetricBadge.tsx    # KPI display components
│   ├── Testimonial.tsx    # Client testimonial display
│   ├── Lightbox.tsx       # Accessible image lightbox
│   ├── BeforeAfter.tsx    # Accessible comparison slider
│   ├── Media.tsx          # Optimized image/video display
│   └── FilterChips.tsx    # Work filtering interface
├── lib/                   # Utilities and helpers
│   └── projects.ts        # Project data types and helpers
├── data/                  # Content data
│   └── projects.json      # Project content and metadata
└── public/               # Static assets
    ├── assets/           # Images, fonts, icons
    └── resume.pdf        # Downloadable resume
```

## 📊 Adding Projects

Edit `data/projects.json` to add or update projects. Each project follows this schema:

```json
{
  "slug": "unique-project-identifier",
  "title": "Project Name",
  "subtitle": "Brief description",
  "tags": ["Branding", "Web", "Motion", "UX"],
  "client": "Client Name",
  "industry": "Industry Type",
  "role": ["Design", "Frontend", "Research"],
  "timeline": "8 weeks",
  "problem": "What business pain existed and needed solving",
  "insights": [
    "Key user insight that shaped the approach",
    "Technical or business constraint that influenced decisions"
  ],
  "solution": "What you built and why it solves the problem",
  "kpis": [
    {"label": "Conversion rate", "change": "+42%"},
    {"label": "User satisfaction", "change": "98%"}
  ],
  "testimonial": {
    "quote": "Short, credible client feedback",
    "author": "Name, Title"
  },
  "cover": "/assets/projects/project-cover.webp",
  "before": "/assets/projects/project-before.webp",
  "after": "/assets/projects/project-after.webp",
  "gallery": [
    {
      "src": "/assets/projects/project-1.webp",
      "alt": "Descriptive alt text focusing on the design decision",
      "caption": "Why this layout improved user comprehension by 25%"
    }
  ],
  "links": {
    "live": "https://project-url.com",
    "repo": "https://github.com/user/repo",
    "press": "https://article-url.com"
  }
}
```

### Image Guidelines

- **Cover images**: 1600×1000px, WEBP format, < 200KB
- **Gallery images**: Variable sizes, WEBP format with PNG fallback
- **Before/After**: Same dimensions for comparison slider
- Use descriptive filenames: `project-name-screenshot-1.webp`

## 🎨 Design System

### Layout Grid
- **Home/Work**: 48/52 text/media split
- **Asymmetric radius**: `0 0 0 clamp(48px, 10vw, 120px)` on media
- **Responsive**: Single column on mobile

### Typography Scale
```css
--step--1: clamp(12px, 0.8vw, 14px)  /* Small text */
--step-0:  clamp(14px, 1vw, 16px)     /* Body text */
--step-1:  clamp(18px, 2vw, 22px)     /* Subheadings */
--step-2:  clamp(26px, 3.2vw, 40px)   /* Headings */
--step-3:  clamp(40px, 6vw, 88px)     /* Large headings */
--step-4:  clamp(60px, 8vw, 120px)    /* Hero titles */
```

### Color Palette
```css
--c-black: #0A0A0A         /* Primary background */
--c-white: #FEFEFE         /* Primary text */
--c-gold: #D4AF37          /* Accent color */
--c-gray-100: #E8E8E8      /* Light gray */
--c-gray-600: #262626      /* Dark gray */
```

### Spacing System
```css
--space-xs: 0.5rem    /* 8px */
--space-sm: 1rem      /* 16px */
--space-md: 1.5rem    /* 24px */
--space-lg: 2rem      /* 32px */
--space-xl: 3rem      /* 48px */
--space-2xl: 4rem     /* 64px */
--space-3xl: 6rem     /* 96px */
--space-4xl: 8rem     /* 128px */
```

## 🎭 Motion System

### Animation Principles
- **Entrance staggers**: 0.06s between elements
- **Duration**: 0.38s for titles, 0.5s for content
- **Easing**: `easeOut` for natural deceleration
- **Reduced motion**: Opacity changes only, no transforms

### Common Variants
```typescript
// Fade up entrance
const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0 }
}

// Staggered children
const stagger = (delay = 0.06) => ({
  show: { transition: { staggerChildren: delay } }
})
```

## ♿ Accessibility Features

### Navigation
- **Skip links**: Visible on focus, jump to main content
- **Focus management**: Logical tab order, visible focus rings
- **Keyboard shortcuts**: Arrow keys for navigation, Esc to close modals

### Screen Readers
- **Landmarks**: Proper heading hierarchy, semantic HTML
- **Live regions**: Status updates announced dynamically
- **Alt text**: Descriptive, decision-focused image descriptions

### Motion
- **Reduced motion**: Respects `prefers-reduced-motion` setting
- **No vestibular triggers**: No infinite scrolling or parallax on text

## 🚀 Performance Optimization

### Images
- **Format**: AVIF/WEBP with PNG fallback
- **Loading**: Lazy loading with proper `loading` attributes
- **Sizes**: Responsive with `sizes` attribute for optimal loading
- **Dimensions**: Explicit width/height to prevent layout shift

### Fonts
- **Preload**: Critical display fonts preloaded in layout
- **Display**: `swap` for improved loading performance
- **Self-hosted**: WOFF2 files in `/public/fonts/`

### JavaScript
- **Code splitting**: Dynamic imports for non-critical features
- **Lazy loading**: Framer Motion with `LazyMotion`
- **Bundle analysis**: Monitor with `npm run build`

## 🔧 Deployment

### Cloudflare Pages Setup

1. **Build Settings**:
   - Build command: `npm run build`
   - Build output directory: `out`
   - Node.js version: `18.17.0`

2. **Environment Variables**:
   ```bash
   NODE_VERSION=18.17.0
   NPM_VERSION=9.6.7
   ```

3. **Custom Domain**: Configure in Cloudflare Pages dashboard

### Build Validation
```bash
# Ensure build succeeds
npm run build

# Check static export
ls -la out/

# Test production build locally
npm start
```

## 🎯 Performance Targets

- **LCP**: ≤ 1.8s on Moto G Power (throttled)
- **CLS**: < 0.01 (no layout shifts)
- **FID**: < 100ms (good interactivity)
- **JavaScript**: ≤ 120KB gzipped on homepage
- **Lighthouse scores**: 90+ across all metrics

## 📝 Content Guidelines

### Case Study Structure
1. **Overview**: Problem statement and approach
2. **Problem**: Business context and user pain points
3. **Insights**: Research findings that shaped decisions
4. **Solution**: What was built and why
5. **Outcomes**: Measurable results with KPIs
6. **Gallery**: Process shots with decision-focused captions

### Writing Tone
- **Confident**: Show expertise without arrogance
- **Results-focused**: Lead with measurable outcomes
- **Accessible**: Clear, jargon-free explanations
- **Story-driven**: Connect decisions to user impact

## 🔄 Maintenance

### Regular Updates
- **Dependencies**: Monthly security updates
- **Content**: Quarterly project additions
- **Performance**: Monitor Core Web Vitals monthly
- **Accessibility**: Annual WCAG audit

### Monitoring
- **Analytics**: Google Analytics 4 for usage insights
- **Performance**: Core Web Vitals via PageSpeed Insights
- **Uptime**: Cloudflare Analytics for availability

## 📞 Support

For questions or issues:
- **Documentation**: Check this README first
- **Issues**: Create GitHub issue with reproduction steps
- **Contact**: hello@charlie.design for urgent matters

---

Built with Next.js 14, Framer Motion 11, and deployed on Cloudflare Pages.