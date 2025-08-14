import React from 'react';
import type { Metadata } from 'next';
import ThemeProvider from '@/components/ThemeProvider';

export const metadata: Metadata = {
  title: '🎨 Custom Gift Creator - Design Your Perfect Personalized Gift',
  description: 'Create beautiful personalized gifts in 5 easy steps. Choose characters, backgrounds, accessories, and add personal messages. Perfect for birthdays, anniversaries, and special occasions.',
  keywords: 'personalized gifts, custom gifts, gift creator, birthday gifts, anniversary gifts, custom art, personalized art',
  authors: [{ name: 'The Loving Gifts Team' }],
  creator: 'The Loving Gifts',
  publisher: 'The Loving Gifts',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://theluvingifts.vercel.app'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: '🎨 Custom Gift Creator - Design Your Perfect Personalized Gift',
    description: 'Create beautiful personalized gifts in 5 easy steps. Choose characters, backgrounds, accessories, and add personal messages.',
    url: 'https://theluvingifts.vercel.app',
    siteName: 'The Loving Gifts',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Custom Gift Creator - Design Your Perfect Personalized Gift',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: '🎨 Custom Gift Creator - Design Your Perfect Personalized Gift',
    description: 'Create beautiful personalized gifts in 5 easy steps. Choose characters, backgrounds, accessories, and add personal messages.',
    images: ['/og-image.jpg'],
    creator: '@theluvingifts',
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
  verification: {
    google: 'your-google-verification-code',
    yandex: 'your-yandex-verification-code',
    yahoo: 'your-yahoo-verification-code',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#6366f1" />
        <meta name="msapplication-TileColor" content="#6366f1" />
        <meta name="theme-color" content="#6366f1" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />

        
        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "The Loving Gifts",
              "url": "https://theluvingifts.vercel.app",
              "logo": "https://theluvingifts.vercel.app/logo.png",
              "description": "Create beautiful personalized gifts in 5 easy steps",
              "contactPoint": {
                "@type": "ContactPoint",
                "telephone": "+84-123-456-789",
                "contactType": "customer service",
                "areaServed": "VN",
                "availableLanguage": "English, Vietnamese"
              },
              "sameAs": [
                "https://facebook.com/theluvingifts",
                "https://instagram.com/theluvingifts",
                "https://zalo.me/theluvingifts"
              ]
            })
          }}
        />
      </head>
      <body>
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
