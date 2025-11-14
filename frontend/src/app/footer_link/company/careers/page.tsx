// frontend/src/app/footer_link/company/careers/page.tsx
import React from 'react';
import Navbar from '../../../components/Navbar';
import './careers.css';

export default function SalePage() {
  return (
    <>
      <Navbar />
      <main className="page-main">
        <section className="page-hero">
          <h1>Careers</h1>
          <p>Explore homes and apartments available for purchase.</p>
        </section>
      </main>
    </>
  );
}
