// frontend/src/app/footer_link/company/careers/page.tsx
import React from 'react';
import Navbar from '@/app/components/Navbar';
import './careers.css';

export default function CareersPage() {
  return (
    <>
      <Navbar />

      <main className="careers-page">
        <section className="careers-hero">
          <h1>Careers at Efie Now</h1>
          <p>
            We’re building the future of property discovery. Join a team that values creativity, ownership, and innovation.
          </p>
        </section>

        <section className="careers-section">
          <h2>We're Looking For</h2>
          <ul>
            <li>Frontend Developers (React / Next.js)</li>
            <li>Backend Developers (Node / Prisma / PostgreSQL)</li>
            <li>UI/UX Designers</li>
            <li>Customer Experience Specialists</li>
          </ul>
        </section>

        <section className="careers-section">
          <h2>Why Work With Us?</h2>
          <p>
            At Efie Now, we give our team freedom to build boldly, learn constantly,
            and bring ideas to life. Remote-friendly work, a respectful environment, and real impact.
          </p>
        </section>
      </main>
    </>
  );
}
