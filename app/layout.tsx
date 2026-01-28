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
  title: 'AMS - Premium PC Parts, Graphics Cards & Gaming Hardware | Pakistan',
  description: 'AMS - Your trusted PC parts store offering graphics cards (RTX, GPU), CPU coolers, PC cases, processors, storage, and custom PC builds. Expert support and fast delivery in Pakistan.',
  keywords: [
    'AMS',
    'PC parts Pakistan',
    'graphics cards',
    'graphics card shop',
    'RTX 4090',
    'gaming hardware',
    'custom PC builds',
    'CPU coolers',
    'PC cases',
    'motherboards',
    'gaming components',
    'high performance PC',
    'gaming rig builder'
  ],
  creator: 'AMS',
  publisher: 'AMS',
  category: 'Technology',
  applicationName: 'AMS PC Parts Store',
  generator: 'v0.app',
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
  authors: [{ name: 'AMS', url: 'https://amspakistan.com' }],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://amspakistan.com',
    siteName: 'AMS',
    title: 'AMS - Premium PC Parts & Gaming Hardware',
    description: 'Build your ultimate gaming rig with AMS premium components. Graphics cards, cases, coolers, and custom builds.',
    images: [
      {
        url: 'https://amspakistan.com/ams-logo.png',
        width: 1200,
        height: 630,
        alt: 'AMS PC Parts',
        type: 'image/png',
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AMS - Premium PC Parts',
    description: 'Best gaming hardware and PC components in Pakistan',
    creator: '@ams_pakistan',
  },
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
  alternates: {
    canonical: 'https://amspakistan.com',
  },
}

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  themeColor: '#ff6b00',
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
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
        <meta httpEquiv="X-UA-Compatible" content="ie=edge" />
        <meta name="theme-color" content="#ff6b00" />
      </head>
      <body className={`font-sans antialiased text-white`}>
        <GamerBackground />
        {children}
        <Analytics />
      </body>
    </html>
  )
}
