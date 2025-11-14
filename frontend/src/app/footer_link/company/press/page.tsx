// frontend/src/app/footer_link/company/press/page.tsx
import React from 'react';
import Navbar from '@/app/components/Navbar';
import './press.css';

export default function PressPage() {
  return (
    <>
      <Navbar />

      <main className="press-page">
        <section className="press-hero">
          <h1>Press & Media</h1>
          <p>
            Explore news, official announcements, and media updates related to Efie Now.
          </p>
        </section>

        <section className="press-section">
          <h2>Latest Announcements</h2>
          <p>No press releases yet — stay tuned for updates as we expand.</p>
        </section>

        <section className="press-section">
          <h2>Media Contact</h2>
          <p>Email: <strong>media@efienow.com</strong></p>
          <p>We welcome interviews, collaborations, and press inquiries.</p>
        </section>
      </main>
    </>
  );
}
