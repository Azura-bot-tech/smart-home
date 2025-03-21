import './globals.css';
import { Analytics } from '@vercel/analytics/react';
import { Inter } from 'next/font/google';
import { Viewport } from 'next';
import { ThemeProvider } from '@/components/theme-provider';
import QueryProvider from '@/lib/providers/query-provider';
import { Suspense } from 'react';

// Initialize Inter font
const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
  preload: true
});

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: 'white' },
    { media: '(prefers-color-scheme: dark)', color: 'black' }
  ],
  width: 'device-width',
  initialScale: 1
};

export const metadata = {
  title: {
    template: '%s | Smart Home',
    default: 'Smart Home'
  },
  description:
    'Smart Home - Intelligent home automation system for modern living',
  keywords: ['smart home', 'home automation', 'IoT', 'smart devices'],
  authors: [{ name: 'Smart Home Team' }],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://your-domain.com',
    title: 'Smart Home',
    description:
      'Smart Home - Intelligent home automation system for modern living',
    siteName: 'Smart Home'
  },
  robots: {
    index: true,
    follow: true
  },
  manifest: '/manifest.json',
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-touch-icon.png'
  }
};

function Loading() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-primary"></div>
    </div>
  );
}

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable} suppressHydrationWarning>
      <body className="min-h-screen bg-background font-sans antialiased">
        <QueryProvider>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <Suspense fallback={<Loading />}>
              <main className="relative flex min-h-screen flex-col">
                {children}
              </main>
              <Analytics />
            </Suspense>
          </ThemeProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
