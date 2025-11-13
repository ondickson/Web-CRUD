// app/nav_menu/sale/page.tsx
import React from 'react';
import Navbar from '@/app/components/Navbar';

export default function SalePage() {
  return (
    <>
      <Navbar />
      <main className="page-main">
        <section className="page-hero">
          <h1>For Sale</h1>
          <p>Explore homes and apartments available for purchase.</p>
        </section>
      </main>
    </>
  );
}
