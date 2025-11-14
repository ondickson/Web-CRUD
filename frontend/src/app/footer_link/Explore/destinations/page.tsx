// frontend/src/app/footer_link/Explore/destinations/page.tsx
import React from 'react';
import Navbar from '@/app/components/Navbar';
import './destinations.css';

export default function DestinationsPage() {
  return (
    <>
      <Navbar />

      <main className="explore-page">
        <section className="explore-hero">
          <h1>Top Destinations</h1>
          <p>Explore exciting places and travel-ready cities.</p>
        </section>

        <section className="destinations-grid">
          <div className="destination-card">
            <h3>Accra</h3>
            <p>The vibrant capital filled with culture, nightlife, and beaches.</p>
          </div>

          <div className="destination-card">
            <h3>Kumasi</h3>
            <p>Ashanti heritage, traditional crafts, and cozy local stays.</p>
          </div>

          <div className="destination-card">
            <h3>Tamale</h3>
            <p>The gateway to northern adventures and unique landscapes.</p>
          </div>
        </section>
      </main>
    </>
  );
}
