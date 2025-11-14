// frontend/src/app/footer_link/company/about/page.tsx
import React from 'react';
import Navbar from '@/app/components/Navbar';
import './about.css';

export default function AboutPage() {
  return (
    <>
      <Navbar />

      <main className="company-page">
        <section className="company-hero">
          <h1>About Efie Now</h1>
          <p>
            Efie Now is built to make discovering homes, rentals, and hotels simple,
            transparent, and stress-free. We focus on reliability, accuracy, and a clean user experience.
          </p>
        </section>

        <section className="company-section">
          <h2>Our Mission</h2>
          <p>
            We aim to connect people with the right properties while ensuring trust, quality,
            and convenience every step of the way.
          </p>
        </section>

        <section className="company-section">
          <h2>What We Value</h2>
          <ul>
            <li>Transparency in listings and pricing</li>
            <li>Secure booking and safe user experience</li>
            <li>Customer support that truly helps</li>
            <li>Continuous improvement and innovation</li>
          </ul>
        </section>
      </main>
    </>
  );
}
