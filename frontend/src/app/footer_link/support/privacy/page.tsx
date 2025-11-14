// frontend/src/app/footer_link/support/contact/page.tsx
import React from 'react';
import Navbar from '@/app/components/Navbar';
import './privacy.css';

export default function PrivacyPage() {
  return (
    <>
      <Navbar />

      <main className="support-page">
        <section className="support-hero">
          <h1>Privacy Policy</h1>
          <p>
            Here’s how we handle your data when you use Efie Now.
          </p>
        </section>

        <section className="privacy-section">
          <h2>Information We Collect</h2>
          <p>
            We collect basic account details such as your name, email address, and any
            information you provide while searching, booking, or contacting support.
          </p>
        </section>

        <section className="privacy-section">
          <h2>How We Use Your Information</h2>
          <ul>
            <li>To create and manage your account</li>
            <li>To process bookings and communicate updates</li>
            <li>To improve the Efie Now platform and user experience</li>
          </ul>
        </section>

        <section className="privacy-section">
          <h2>Your Choices</h2>
          <p>
            You can update or delete certain information in your account settings
            once that feature is enabled. You can also contact us directly for data-related requests.
          </p>
        </section>
      </main>
    </>
  );
}
