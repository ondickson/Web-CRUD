import './globals.scss';
import './globals.css';
import React from 'react';
import Footer from './components/Footer';
import { Analytics } from '@vercel/analytics/next';
import { Providers } from './providers';

export const metadata = {
  title: 'EfieNow',
  description:
    'Your trusted platform for houses and apartments for rent in Ghana. Browse thousands of verified long-term rentals and secure your next home in Accra, Tema, and major cities with ease and confidence.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <Providers>
          {children}
          <Footer />
        </Providers>
        <Analytics />
      </body>
    </html>
  );
}
