// app/nav_menu/rent/page.tsx
import React from 'react';
import Navbar from '@/app/components/Navbar';

export default function RentPage() {
  return (
    <>
      <Navbar />
      <main className="page-main">
        <section className="page-hero">
          <h1>For Rent</h1>
          <p>Browse apartments, homes, and rooms available for rent.</p>
        </section>
      </main>
    </>
  );
}
