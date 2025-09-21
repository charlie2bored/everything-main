import { Metadata } from 'next'
import { Inter, DM_Sans, Playfair_Display } from 'next/font/google'
import './globals.css'
import MotionProvider from './providers/MotionProvider'

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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${dmSans.variable} ${playfair.variable}`}>
      <head>
        {/* Preload critical resources for LCP optimization */}
        <link 
          rel="preload" 
          href="/fonts/Display.woff2" 
          as="font" 
          type="font/woff2" 
          crossOrigin="anonymous" 
        />
        <link 
          rel="preload" 
          as="image" 
          href="/assets/projects/zenflow-cover.webp" 
        />
        <link rel="preload" href="/assets/noise.avif" as="image" />
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
      <body className={inter.className}>
        <a className="skip-link" href="#main">Skip to content</a>
        <MotionProvider>
          {children}
        </MotionProvider>
      </body>
    </html>
  )
}
