import React from "react"
import type { Metadata } from 'next'
import { Orbitron, Inter, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { GamerBackground } from "@/components/GamerBackground"
import './globals.css'


const orbitron = Orbitron({ subsets: ["latin"], variable: '--font-orbitron' });
const inter = Inter({ subsets: ["latin"], variable: '--font-inter' });
const geistMono = Geist_Mono({ subsets: ["latin"], variable: '--font-geist-mono' });

export const metadata: Metadata = {
  title: 'AMS Pakistan - Premium PC Parts, Gaming Cases, Cooling & Hardware Store',
  description: 'AMS Pakistan is the leading PC parts store offering premium gaming cases, CPU coolers, RGB fans, monitors, and custom PC builds. Best prices, expert support, and fast delivery across Pakistan.',
  keywords: [
    'AMS',
    'AMS Pakistan',
    'AMS PC parts',
    'PC parts Pakistan',
    'gaming PC Pakistan',
    'PC cases Pakistan',
    'CPU coolers Pakistan',
    'RGB fans',
    'gaming monitors Pakistan',
    'custom PC builds Pakistan',
    'computer parts Lahore',
    'computer parts Karachi',
    'computer parts Islamabad',
    'gaming hardware Pakistan',
    'PC components Pakistan',
    'best PC parts store Pakistan',
    'gaming accessories Pakistan',
    'PC cooling solutions',
    'high performance PC parts'
  ],
  creator: 'AMS Pakistan',
  publisher: 'AMS Pakistan',
  category: 'Technology',
  applicationName: 'AMS Pakistan - PC Parts Store',
  metadataBase: new URL('https://amspakistan.com'),
  referrer: 'origin-when-cross-origin',
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  authors: [{ name: 'AMS Pakistan', url: 'https://amspakistan.com' }],
  openGraph: {
    type: 'website',
    locale: 'en_PK',
    url: 'https://amspakistan.com',
    siteName: 'AMS Pakistan',
    title: 'AMS Pakistan - Premium PC Parts & Gaming Hardware Store',
    description: 'Build your ultimate gaming rig with AMS Pakistan. Premium PC cases, coolers, fans, monitors, and custom builds with expert support.',
    images: [
      {
        url: '/ams-logo.png',
        width: 1200,
        height: 630,
        alt: 'AMS Pakistan - Premium PC Parts Store',
        type: 'image/png',
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AMS Pakistan - Premium PC Parts & Gaming Hardware',
    description: 'Best gaming hardware and PC components in Pakistan. Premium cases, coolers, fans, and custom builds.',
    creator: '@amspakistan',
    site: '@amspakistan',
    images: ['/ams-logo.png'],
  },
  alternates: {
    canonical: 'https://amspakistan.com',
  },
  verification: {
    google: 'add-your-google-verification-code-here',
  },
}

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#ff6b00',
}

// JSON-LD structured data for better Google SEO
const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Store',
  name: 'AMS Pakistan',
  alternateName: 'AMS',
  description: 'Premium PC parts store in Pakistan offering gaming cases, CPU coolers, RGB fans, monitors, and custom PC builds.',
  url: 'https://amspakistan.com',
  logo: 'https://amspakistan.com/ams-logo.png',
  image: 'https://amspakistan.com/ams-logo.png',
  priceRange: '$$',
  address: {
    '@type': 'PostalAddress',
    addressCountry: 'PK',
    addressLocality: 'Pakistan',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: '30.3753',
    longitude: '69.3451',
  },
  openingHoursSpecification: {
    '@type': 'OpeningHoursSpecification',
    dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
    opens: '10:00',
    closes: '20:00',
  },
  sameAs: [
    'https://www.facebook.com/amspakistan',
    'https://www.instagram.com/amspakistan',
    'https://twitter.com/amspakistan',
  ],
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'PC Parts & Gaming Hardware',
    itemListElement: [
      {
        '@type': 'OfferCatalog',
        name: 'PC Cases',
        description: 'Premium gaming PC cases with RGB lighting and excellent airflow',
      },
      {
        '@type': 'OfferCatalog',
        name: 'CPU Cooling',
        description: 'High-performance CPU coolers and liquid cooling solutions',
      },
      {
        '@type': 'OfferCatalog',
        name: 'RGB Fans',
        description: 'RGB case fans for optimal airflow and aesthetics',
      },
      {
        '@type': 'OfferCatalog',
        name: 'Gaming Monitors',
        description: 'High refresh rate gaming monitors',
      },
    ],
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${orbitron.variable} ${inter.variable} ${geistMono.variable}`}>
      <head>
        <meta charSet="utf-8" />
        <link rel="canonical" href="https://amspakistan.com" />
        <meta name="geo.region" content="PK" />
        <meta name="geo.placename" content="Pakistan" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={`font-sans antialiased text-white`}>
        <GamerBackground />
        {children}
        <Analytics />
      </body>
    </html>
  )
}
