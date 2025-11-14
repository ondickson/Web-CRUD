// frontend/src/app/footer_link/Explore/inspiration/page.tsx
import React from 'react';
import Navbar from '@/app/components/Navbar';
import './inspiration.css';

export default function InspirationPage() {
  return (
    <>
      <Navbar />

      <main className="explore-page">
        <section className="explore-hero">
          <h1>Travel Inspiration</h1>
          <p>Ideas to spark your next adventure.</p>
        </section>

        <section className="inspiration-grid">
          <div className="inspiration-card">
            <h3>Weekend Getaways</h3>
            <p>Quick trips that refresh your mind without breaking the schedule.</p>
          </div>

          <div className="inspiration-card">
            <h3>Luxury Stays</h3>
            <p>Upgrade your experience with premium hotels and villas.</p>
          </div>

          <div className="inspiration-card">
            <h3>Budget-Friendly Trips</h3>
            <p>Great destinations and stays without overspending.</p>
          </div>
        </section>
      </main>
    </>
  );
}
