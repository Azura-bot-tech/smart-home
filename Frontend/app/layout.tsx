'use client';

import { AuthProvider } from '@/lib/context/AuthContext';
import './globals.css';
import { Analytics } from '@vercel/analytics/react';

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="flex min-h-screen w-full flex-col">
        <AuthProvider>{children}</AuthProvider>
        <Analytics />
      </body>
    </html>
  );
}
