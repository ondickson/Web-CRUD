// app/nav_menu/hotels/page.tsx
import React from 'react';
import Navbar from '@/app/components/Navbar';

export default function HotelsPage() {
  return (
    <>
      <Navbar />
      <main className="page-main">
        <section className="page-hero">
          <h1>Hotels</h1>
          <p>Find hotels and guesthouses for your stay.</p>
        </section>
      </main>
    </>
  );
}
