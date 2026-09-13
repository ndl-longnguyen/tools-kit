import type { Metadata } from 'next'
import Script from 'next/script'
import './globals.css'
import { ThemeProvider } from '@/components/layout/ThemeProvider'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { generateWebsiteJsonLd } from '@/lib/seo/jsonld'
import { SITE_CONFIG, SITE_URL } from '@/lib/config/site'

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_CONFIG.name} — Free Online Tools for Text, Code & Data | NDL Network`,
    template: `%s | ${SITE_CONFIG.name}`,
  },
  description: SITE_CONFIG.description,
  keywords: [
    'free online tools',
    'text tools',
    'text fixer',
    'json formatter',
    'word counter',
    'base64 encoder',
    'uuid generator',
    'remove line breaks',
    'developer utilities',
    'ndl tools',
    'toolskit',
  ],
  authors: [{ name: SITE_CONFIG.author, url: SITE_CONFIG.links.mainSite }],
  creator: SITE_CONFIG.author,
  publisher: SITE_CONFIG.publisher,
  applicationName: SITE_CONFIG.name,
  alternates: {
    canonical: SITE_URL,
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon.svg", type: "image/svg+xml" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
    shortcut: "/favicon.ico",
  },
  openGraph: {
    title: `${SITE_CONFIG.name} — Free Online Tools for Text, Code & Data`,
    description: SITE_CONFIG.description,
    url: SITE_URL,
    siteName: SITE_CONFIG.name,
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: `${SITE_CONFIG.name} — Free Online Tools for Text, Code & Data`,
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_CONFIG.name} — Free Online Tools for Text, Code & Data`,
    description: SITE_CONFIG.description,
    images: ["/og-image.png"],
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
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const websiteJsonLd = generateWebsiteJsonLd()
  const adsenseClientId = process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID || SITE_CONFIG.adsense.client

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="google-site-verification" content={SITE_CONFIG.googleVerification} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
      </head>
      <body className="antialiased min-h-screen flex flex-col selection:bg-blue-500 selection:text-white">
        {/* Google AdSense Script */}
        {adsenseClientId && (
          <Script
            id="google-adsense"
            async
            src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${adsenseClientId}`}
            crossOrigin="anonymous"
            strategy="afterInteractive"
          />
        )}
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <Header />
          <div className="flex-1">{children}</div>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  )
}
