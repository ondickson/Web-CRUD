// src/app/layout.tsx
import './globals.scss';
import React from 'react';

export const metadata = { title: 'Web CRUD', description: 'Simple CRUD demo' };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
