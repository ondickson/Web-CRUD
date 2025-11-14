// frontend/src/app/account/saved_properties/page.tsx
import React from 'react';
import Navbar from '../../components/Navbar';
import './saved_properties.css';

export default function HotelsPage() {
  return (
    <>
      <Navbar />
      <main className="page-main">
        <section className="page-hero">
          <h1>Saved Properties</h1>
          <p>Find hotels and guesthouses for your stay.</p>
        </section>
      </main>
    </>
  );
}
