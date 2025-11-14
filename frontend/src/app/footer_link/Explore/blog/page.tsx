// frontend/src/app/footer_link/Explore/blog/page.tsx
import React from 'react';
import Navbar from '@/app/components/Navbar';
import './blog.css';

export default function BlogPage() {
  return (
    <>
      <Navbar />

      <main className="explore-page">
        <section className="explore-hero">
          <h1>Efie Now Blog</h1>
          <p>Dive into travel tips, housing insights, and destination guides.</p>
        </section>

        <section className="explore-section">
          <h2>Latest Articles</h2>
          <div className="explore-list">
            <article className="explore-card">
              <h3>How to Find the Perfect Apartment in Accra</h3>
              <p>
                A quick guide to navigating rentals, from budgeting to viewing properties.
              </p>
            </article>

            <article className="explore-card">
              <h3>Top 5 Beachfront Stays in Ghana</h3>
              <p>
                From Labadi to Busua — here are the coastal gems worth visiting.
              </p>
            </article>

            <article className="explore-card">
              <h3>Hotel Safety Tips Every Traveler Should Know</h3>
              <p>
                Practical advice to help you stay safe and confident during your trip.
              </p>
            </article>
          </div>
        </section>
      </main>
    </>
  );
}
