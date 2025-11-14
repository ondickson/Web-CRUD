// frontend/src/app/account/bookings/page.tsx
import React from 'react';
import Navbar from '../../components/Navbar';
import './bookings.css';

export default function HotelsPage() {
  return (
    <>
      <Navbar />
      <main className="page-main">
        <section className="page-hero">
          <h1>Bookings</h1>
          <p>Find hotels and guesthouses for your stay.</p>
        </section>
      </main>
    </>
  );
}
