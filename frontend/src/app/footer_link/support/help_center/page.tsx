// frontend/src/app/footer_link/support/contact/page.tsx
import React from 'react';
import Navbar from '@/app/components/Navbar';
import './help_center.css';

export default function HelpCenterPage() {
  return (
    <>
      <Navbar />

      <main className="support-page">
        <section className="support-hero">
          <h1>Help Center</h1>
          <p>Quick answers to common questions about using Efie Now.</p>
        </section>

        <section className="help-section">
          <div className="help-item">
            <h2>How do I book a property?</h2>
            <p>
              Search for your destination, select your dates and guests, then choose a
              property and follow the on-screen steps to confirm your booking.
            </p>
          </div>

          <div className="help-item">
            <h2>Can I change or cancel my booking?</h2>
            <p>
              Many stays allow changes or cancellations within a specific timeframe.
              You’ll see the cancellation policy clearly before you confirm your booking.
            </p>
          </div>

          <div className="help-item">
            <h2>What if I have a problem during my stay?</h2>
            <p>
              First, contact the property directly for urgent issues. If you still need
              help, reach out to our support team through the Contact page and we’ll step in.
            </p>
          </div>
        </section>
      </main>
    </>
  );
}
