import type { Metadata } from 'next';
import { Geist } from 'next/font/google';
import { ThemeProvider } from 'next-themes';
import { Suspense } from 'react';
import { PostHogPageView, PostHogProvider } from '@/components/PostHogProvider';
import { StructuredData } from '@/components/StructuredData';
import { SITE_CONFIG } from '@/lib/constants';
import { GoogleTagManager } from '@next/third-parties/google';
import { GoogleAnalytics } from '@next/third-parties/google';
import './globals.css';

const defaultUrl = process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : SITE_CONFIG.url;

export const metadata: Metadata = {
  metadataBase: new URL(defaultUrl),
  title: `${SITE_CONFIG.name} - The Gridiron Strategy Simulator`,
  description: SITE_CONFIG.description['en-US'],
  keywords: [
    'redzone boss',
    'american football',
    'football simulation',
    'gridiron strategy',
    'football manager',
    'NFL simulation',
    'football game',
  ],
  authors: [{ name: SITE_CONFIG.name }],
  creator: SITE_CONFIG.name,
  publisher: SITE_CONFIG.name,
  formatDetection: {
    email: true,
    telephone: false,
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    alternateLocale: 'pt_BR',
    url: SITE_CONFIG.url,
    siteName: SITE_CONFIG.name,
    title: `${SITE_CONFIG.name} - The Gridiron Strategy Simulator`,
    description: SITE_CONFIG.description['en-US'],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${SITE_CONFIG.name} - The Gridiron Strategy Simulator`,
    description: SITE_CONFIG.description['en-US'],
  },
  other: {
    'contact:email': SITE_CONFIG.email,
  },
  verification: {
    google: '5uw1hL7d3BfsjE7ev_iSDfVbv9k9ZxHiB8NZynsWY14',
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
};

const geistSans = Geist({
  variable: '--font-geist-sans',
  display: 'swap',
  subsets: ['latin'],
});

const IS_PRODUCTION =
  process.env.NEXT_PUBLIC_VERCEL_ENV === 'production' ||
  (process.env.NODE_ENV === 'production' && !process.env.NEXT_PUBLIC_VERCEL_ENV);
const GTMID = process.env.NEXT_PUBLIC_GTM_ID;
const GA_TRACKINGID = process.env.NEXT_PUBLIC_GA_TRACKINGID;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      {IS_PRODUCTION && !!GA_TRACKINGID && <GoogleAnalytics gaId={GA_TRACKINGID} />}
      {IS_PRODUCTION && !!GTMID && <GoogleTagManager gtmId={GTMID} />}
      <body className={`${geistSans.className} antialiased`}>
        {IS_PRODUCTION && !!GTMID && (
          <noscript>
            <iframe
              src={`https://www.googletagmanager.com/ns.html?id=${GTMID}`}
              height="0"
              width="0"
              style={{ display: 'none', visibility: 'hidden' }}
            />
          </noscript>
        )}
        <StructuredData />
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <PostHogProvider>
            <Suspense>
              <PostHogPageView />
            </Suspense>
            {children}
          </PostHogProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
