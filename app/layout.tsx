import { Metadata } from 'next'
 
import { Inter, DM_Sans, Playfair_Display } from 'next/font/google'
// Import CSS (Next.js will optimize this)
import './globals.css'
import StaticHeader from '@/components/StaticHeader'
import Container from '@/components/Container'
import dynamic from 'next/dynamic'
const ActiveAnchor = dynamic(() => import('@/components/ActiveAnchor'), { ssr: false })
 


const inter = Inter({
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
})

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-title',
  display: 'swap',
})

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://charlie2bored.pages.dev'),
  title: { 
    default: 'Charlie — Brand systems + motion that convert', 
    template: '%s · Charlie' 
  },
  description: 'Identity, web, and conversion UX. Case studies with outcomes.',
  keywords: ['design', 'development', 'branding', 'motion', 'portfolio', 'UX', 'UI', 'conversion'],
  authors: [{ name: 'Charlie' }],
  creator: 'Charlie',
  openGraph: {
    images: ['/assets/og/home.jpg'],
  },
  twitter: {
    card: 'summary_large_image',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: '/assets/favicon.ico',
    apple: '/assets/apple-touch-icon.png',
  },
}

// Read the critical CSS for inlining
const criticalCSS = `
:root{--c-black:#0A0A0A;--c-white:#FEFEFE;--c-gold:#D4AF37;--c-gray-200:#D1D1D1;--c-gray-500:#4a4a4a;--c-gray-600:#3a3a3a;--c-gray-700:#171717;--c-gray-800:#111111;--c-gray-900:#0D0D0D;--bg:var(--c-gray-900);--text:var(--c-white);--accent:var(--c-gold);--surface:var(--c-gray-800);--border:var(--c-gray-600);--step-0:clamp(14px,1vw,16px);--step-1:clamp(18px,2vw,22px);--step-2:clamp(26px,3.2vw,40px);--step-3:clamp(40px,6vw,88px);--font-display:'Display','Playfair Display',serif;--font-body:"Inter",ui-sans-serif,system-ui,sans-serif;--space-1:clamp(8px,1.2vw,14px);--space-2:clamp(12px,2vw,24px);--space-3:clamp(24px,4vw,56px);--space-4:clamp(40px,6vw,96px);--content-wide:1200px;--radius:16px;--transition-fast:120ms ease-out;--z-nav:100}*{box-sizing:border-box}html{font-family:var(--font-body);line-height:1.5;-webkit-text-size-adjust:100%}body{margin:0;padding:0;background:var(--bg);color:var(--text);font-family:var(--font-body);overflow-x:hidden}.skip-link{position:absolute;top:-40px;left:6px;background:var(--accent);color:var(--bg);padding:8px;text-decoration:none;border-radius:4px;z-index:1000;font-weight:600;transform:translateY(-100%);transition:transform 0.2s}.skip-link:focus{transform:translateY(0)}.header{position:fixed;top:0;left:0;right:0;z-index:var(--z-nav);background:var(--bg);border-bottom:1px solid var(--border);transition:all var(--transition-fast)}.header__container{max-width:var(--content-wide);margin:0 auto;padding:var(--space-2) var(--space-3);display:flex;align-items:center;justify-content:space-between}.header__logo{font-family:var(--font-display);font-size:var(--step-1);font-weight:400}.header__logo .logo-link{color:var(--text);text-decoration:none}.header__nav{display:flex;gap:var(--space-3)}.nav-list{display:flex;gap:var(--space-3);list-style:none;margin:0;padding:0}.nav-link{color:var(--text);text-decoration:none;padding:var(--space-1) 0;position:relative}.nav-link--active{color:var(--accent)}.hero{position:relative;min-height:100svh;display:flex;align-items:center;justify-content:center;text-align:center;padding:var(--space-4) var(--space-3);overflow:hidden}.hero__background{position:absolute;top:0;left:0;right:0;bottom:0;background:var(--bg);opacity:1;pointer-events:none}.hero__container{position:relative;z-index:2;max-width:800px}.hero__eyebrow{font-size:var(--step-0);color:var(--c-gray-200);margin-bottom:var(--space-1);text-transform:uppercase;letter-spacing:0.1em;font-weight:500}.hero__title{font-family:var(--font-display);font-size:var(--step-3);font-weight:400;line-height:1.1;margin:0 0 var(--space-2)}.hero__title-line--white{color:var(--text);display:block}.hero__title-line--yellow{color:var(--accent);display:block}.hero__lede{font-size:var(--step-1);color:var(--c-gray-200);margin-bottom:var(--space-4);max-width:600px;margin-left:auto;margin-right:auto;line-height:1.5}.hero__actions{display:flex;gap:var(--space-3);justify-content:center;flex-wrap:wrap}.btn{display:inline-flex;align-items:center;justify-content:center;padding:var(--space-2) var(--space-4);border-radius:999px;text-decoration:none;font-weight:600;font-size:var(--step-0);transition:all var(--transition-fast);cursor:pointer;border:1px solid transparent}.btn--primary{background:var(--accent);color:var(--bg)}.btn--secondary{background:transparent;color:var(--text);border-color:var(--border)}.content-grid{max-width:var(--content-wide);margin:0 auto;padding:0 var(--space-3)}.work-row{min-height:90svh;display:flex;align-items:center;margin-bottom:var(--space-4)}.work-link{display:grid;grid-template-columns:48fr 52fr;gap:var(--space-4);align-items:center;width:100%;text-decoration:none;color:inherit}.project-title{font-family:var(--font-display);font-size:var(--step-2);font-weight:400;margin:0;line-height:1.2}.project-subtitle{font-size:var(--step-0);color:var(--c-gray-200);margin:var(--space-1) 0;line-height:1.6}.media-wrap{position:relative;aspect-ratio:16/9;max-height:min(70svh,520px);overflow:clip;border-radius:0 0 0 clamp(48px,10vw,120px);background:var(--surface)}.project-thumb{width:100%;height:100%;object-fit:cover}@media (max-width:768px){.header__container{padding:var(--space-1) var(--space-2)}.header__nav{display:none}.hero{padding:var(--space-3) var(--space-2);min-height:100svh}.hero__title{font-size:var(--step-2)}.hero__actions{flex-direction:column;align-items:center;gap:var(--space-2)}.btn{width:100%;max-width:280px}.work-link{grid-template-columns:1fr;gap:var(--space-3)}}@media (max-width:480px){.hero__background{background:var(--bg)!important}}@media (prefers-reduced-motion:reduce){*{animation-duration:0.01ms!important;animation-iteration-count:1!important;transition-duration:0.01ms!important}}
`


export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${dmSans.variable} ${playfair.variable}`}>
      <head>
        {/* Inline critical CSS for instant above-the-fold rendering */}
        <style dangerouslySetInnerHTML={{ __html: criticalCSS }} />
        
        
        {/* Aggressive resource preloading for performance */}
        <link 
          rel="preload" 
          as="image" 
          href="/assets/projects/zenflow-cover-640.avif" 
          fetchPriority="high"
        />
        <link 
          rel="preload" 
          as="image" 
          href="/assets/projects/zenflow-cover-960.avif" 
        />
        <link rel="preload" href="/assets/noise.avif" as="image" />
        
        {/* Resource hints for performance */}
        <link rel="dns-prefetch" href="//fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.googleapis.com" crossOrigin="" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        
        {/* Prefetch critical assets */}
        <link rel="prefetch" href="/assets/projects/zenflow-cover-1280.avif" />
        <link rel="prefetch" href="/assets/projects/fintech-cover.webp" />
        
        {/* Optimize viewport and loading */}
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
        <meta name="format-detection" content="telephone=no" />
        
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Person',
              name: 'Charlie',
              url: 'https://charlie2bored.pages.dev/',
              sameAs: [
                'https://instagram.com/charlie_designs',
                'https://www.youtube.com/@charliedesigns',
                'https://medium.com/@charliedesigns',
                'https://www.linkedin.com/in/charliedesigns/',
              ],
              jobTitle: 'Designer & Frontend Developer',
              worksFor: {
                '@type': 'Organization',
                name: 'Independent',
              },
            }),
          }}
        />
      </head>
      <body className="">
        <a className="skip-link" href="#main">Skip to content</a>
        <StaticHeader />
        <div style={{ paddingTop: 'var(--header-h)' }}>
          <Container>
            {children}
          </Container>
        </div>
        <ActiveAnchor />
        
      </body>
    </html>
  )
}


