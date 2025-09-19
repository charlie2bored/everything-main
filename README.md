# Charlie Portfolio

A cinematic, high-contrast portfolio website with placeholder projects, rekorderstudios.com-inspired navigation, and one-project-per-row layout.

## Quick Start

Open in Cursor. Run a local static server (or use VS Code Live Server). No build step required.

```bash
# Using Python
python -m http.server 8000

# Using Node.js
npx serve .

# Using VS Code Live Server extension
# Right-click index.html → "Open with Live Server"
```

## How to Replace Placeholders with Your Own Projects

### 1. Add Your Font File
Drop your `mensrea-bubble.woff2` file into the `/fonts/` directory. The CSS is already configured to load it.

### 2. Create Project Assets
For each project, create a folder in `projects/<your-slug>/`:
```
projects/your-project-slug/
├── cover.jpg    # Thumbnail image (~1600×1000, 80-85% JPG quality)
├── hero.jpg     # Hero image (~2400×1400, 80-85% JPG quality)
├── 1.jpg        # Gallery image 1 (optional)
├── 2.jpg        # Gallery image 2 (optional)
└── ...          # Additional gallery images (optional)
```

**Image Specifications:**
- **Thumbnails**: ~1600px wide, 80-85% JPG quality
- **Hero images**: ~2400px wide, 80-85% JPG quality
- **Gallery images**: Any size, optimized for web
- **Videos**: MP4/H.264, ~8-12 second loops for motion projects

### 3. Update projects.json
Open `projects.json` and replace the placeholder objects with your projects:

```json
{
  "slug": "your-project-slug",
  "title": "Your Project Title",
  "subtitle": "One-liner description",
  "tags": ["Design", "Development", "Branding"],
  "thumb": "projects/your-project-slug/cover.jpg",
  "hero": "projects/your-project-slug/hero.jpg",
  "summary": "Short 1-2 sentence project summary.",
  "role": "Your role(s) in the project",
  "scope": ["Deliverable A", "Deliverable B", "Deliverable C"],
  "outcomes": ["Result 1", "Result 2", "Result 3"],
  "gallery": [
    "projects/your-project-slug/1.jpg",
    "projects/your-project-slug/2.jpg"
  ]
}
```

### 4. Update Social Links
Edit the social links in `index.html` (lines 39-69):
- Replace `yourusername` with your actual usernames
- Replace `hello@yourdomain.com` with your email
- Update URLs to point to your profiles

### 5. Save and Deploy
Save the JSON file. Your projects automatically appear as full-width rows. Clicking them opens the case study page.

## Brand Colors

The portfolio uses these exact colors:
- **Black**: #000000
- **White**: #FFFFFF  
- **Yellow**: #FFD300 (accent color)
- **Light Gray**: #EDEDED
- **Dark Gray**: #1C1C1C

Edit `tokens.css` to customize colors if needed. Yellow is used for accents (links, focus rings, small dividers), not for large text blocks.

## Typography

The portfolio uses three font families:

1. **Mensrea Bubble** (Title font)
   - Self-hosted via `/fonts/mensrea-bubble.woff2`
   - Used for h1, h2, h3 elements
   - Letter-spacing: 0.2px

2. **Space Grotesk** (Subtitle font)
   - Loaded from Google Fonts
   - Used for subtitles and section subtitles
   - Clean, modern sans-serif

3. **Inter** (Body font)
   - Loaded from Google Fonts
   - Used for body text, navigation, and UI elements
   - Excellent readability

## Features

- **Cinematic Design**: High-contrast, full-bleed images with one project per row
- **Rekorder Studios Navbar**: Sticky navigation with transparent→solid transition and mobile overlay
- **Placeholder Projects**: 6 sample projects ready to replace with your work
- **Dynamic Project Loading**: Projects render from JSON, no code edits needed
- **Case Study System**: Click any project to view detailed case study
- **Responsive Design**: Mobile-first with optimized layouts
- **Accessibility**: WCAG AA compliant with keyboard navigation and reduced motion support
- **Performance**: Optimized animations with LQIP and responsive images
- **Form Validation**: Client-side validation with honeypot spam protection

## Project Structure

```
Charlie Portfolio/
├── index.html                    # Main portfolio page
├── 
│   └── case-study.html          # Dynamic case study template
├── 
│   └── projects.json            # Project data (edit to add projects)
├── styles/
│   ├── tokens.css              # Brand colors & typography
│   ├── main.css                # Main styles & layout
│   └── animations.css          # Animation styles
├── 
│   ├── main.js                 # Main functionality
│   ├── particles.js            # Particle effects
│   └── animations.js           # Animation helpers
├── fonts/
│   └── mensrea-bubble.woff2    # Your custom title font
├── 
│   ├── placeholder/            # Placeholder images (replace with your projects)
│   └── projects/               # Your project images
├── sitemap.xml                 # SEO sitemap
├── robots.txt                  # SEO robots file
└── README.md                   # This file
```

## How to Host

This portfolio is a static website that works on any web host. Here are several hosting options:

### Static Hosting Platforms (Recommended)

**GitHub Pages** (Free)
1. Create a new repository on GitHub
2. Upload your portfolio files to the repository
3. Go to Settings → Pages
4. Select "Deploy from a branch" and choose `main` branch
5. Your site will be available at `https://yourusername.github.io/repository-name`

**Netlify** (Free tier available)
1. Visit [netlify.com](https://netlify.com)
2. Drag and drop your portfolio folder onto their deploy area
3. Your site gets a random URL immediately
4. Optional: Connect to Git repository for automatic deployments
5. Optional: Add custom domain in site settings

**Vercel** (Free tier available)
1. Visit [vercel.com](https://vercel.com)
2. Import your Git repository or upload files
3. Deploy with zero configuration
4. Automatic HTTPS and global CDN included

**Cloudflare Pages** (Free)
1. Visit [pages.cloudflare.com](https://pages.cloudflare.com)
2. Connect your Git repository
3. Build command: Leave empty (static site)
4. Output directory: `/` (root)
5. Fast global deployment with Cloudflare's network

### Traditional Web Hosting

**Shared Hosting** (cPanel, etc.)
1. Upload files via FTP to your `public_html` or `www` folder
2. Ensure all files maintain their folder structure
3. Visit your domain to view the site

**VPS/Dedicated Server**
1. Upload files to your web server directory (usually `/var/www/html`)
2. Configure your web server (Apache/Nginx) to serve static files
3. Ensure proper file permissions (644 for files, 755 for folders)

### Domain Setup (Optional)

1. **Purchase a domain** from registrars like Namecheap, GoDaddy, or Google Domains
2. **Point to your host**:
   - For GitHub Pages: Create CNAME file with your domain
   - For Netlify/Vercel: Add domain in dashboard settings
   - For traditional hosting: Update nameservers or A records

### Pre-Deployment Checklist

- [ ] Replace placeholder content with your projects
- [ ] Update social links with your profiles
- [ ] Test all navigation and project links locally
- [ ] Optimize images (JPG quality 80-85%)
- [ ] Verify `projects.json` is valid JSON
- [ ] Add your custom font file if using Mensrea Bubble
- [ ] Test contact form functionality

### Post-Deployment

- **Set up analytics** (Google Analytics, Plausible, etc.)
- **Test performance** with PageSpeed Insights
- **Verify mobile responsiveness** on actual devices
- **Check accessibility** with tools like WAVE
- **Submit sitemap** to Google Search Console for SEO

## Deploy

The portfolio works on any static host and requires no build process or server-side code.

## Browser Support

- **Modern browsers**: Chrome 90+, Firefox 88+, Safari 14+, Edge 90+
- **Mobile**: iOS Safari 14+, Chrome Mobile 90+
- **Features**: CSS Grid, CSS Custom Properties, Intersection Observer, Fetch API

## Performance Targets

- **Lighthouse Performance**: ≥ 90
- **Lighthouse Accessibility**: ≥ 95  
- **Lighthouse SEO**: ≥ 95
- **Core Web Vitals**: All green
- **Load Time**: < 3 seconds on 3G

## Accessibility

- **WCAG AA Compliance**: Proper contrast ratios and focus states
- **Keyboard Navigation**: Full keyboard support with visible focus indicators
- **Screen Reader Support**: Semantic HTML and ARIA labels
- **Reduced Motion**: Respects `prefers-reduced-motion` settings
- **Skip Links**: Jump to main content with Tab key

## Customization

### Colors
Edit `styles/tokens.css` to change the color scheme. The CSS custom properties make it easy to maintain consistency.

### Typography
- **Title Font**: Replace `/fonts/mensrea-bubble.woff2` with your font file
- **Subtitle Font**: Update the Google Fonts link in `index.html`
- **Body Font**: Change the Inter font import if desired

### Layout
- **Project Rows**: Modify `.project-row` styles in `main.css`
- **Navigation**: Customize `.nav` and related styles
- **Hero Section**: Adjust `.hero` and `.hero-content` styles

### Animations
- **Reduced Motion**: All animations respect user preferences
- **Custom Animations**: Add new keyframes in `animations.css`
- **Performance**: Animations use `transform` and `opacity` for smooth 60fps

## Troubleshooting

### Projects Not Loading
- Check that `projects.json` is valid JSON
- Ensure image paths in JSON match your file structure
- Verify images exist in the specified locations

### Fonts Not Loading
- Confirm `mensrea-bubble.woff2` is in the `/fonts/` directory
- Check that Google Fonts links are accessible
- Verify font-display: swap is working

### Case Studies Not Working
- Ensure `case-study.html` exists
- Check that project slugs in JSON match the URL parameters
- Verify the fetch request to `projects.json` is successful

### Performance Issues
- Optimize images (use 80-85% JPG quality)
- Enable gzip compression on your server
- Use a CDN for faster global delivery
- Consider lazy loading for below-the-fold content

## Support

For issues or questions:
1. Check the browser console for JavaScript errors
2. Validate your JSON at jsonlint.com
3. Test with a local server (not file:// protocol)
4. Ensure all file paths are correct and files exist
