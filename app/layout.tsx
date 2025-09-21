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
  title: 'Charlie — Designer & Developer',
  description: 'Charlie — product designer/dev. Brand systems, motion, and conversion-focused web.',
  keywords: ['design', 'development', 'branding', 'motion', 'portfolio', 'UX', 'UI'],
  authors: [{ name: 'Charlie' }],
  creator: 'Charlie',
  openGraph: {
    title: 'Charlie — Designer & Developer',
    description: 'Selected work with measurable outcomes.',
    type: 'website',
    url: 'https://everything-evu.pages.dev/',
    images: [
      {
        url: '/assets/og/home.jpg',
        width: 1200,
        height: 630,
        alt: 'Charlie Portfolio',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Charlie — Designer & Developer',
    description: 'Selected work with measurable outcomes.',
    images: ['/assets/og/home.jpg'],
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
  alternates: {
    canonical: 'https://everything-evu.pages.dev/',
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
        <link rel="preload" href="/assets/noise.avif" as="image" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Person',
              name: 'Charlie',
              url: 'https://everything-evu.pages.dev/',
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
        <MotionProvider>
          {children}
        </MotionProvider>
      </body>
    </html>
  )
}
