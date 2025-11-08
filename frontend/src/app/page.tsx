// src/app/page.tsx
import React from 'react';
import './globals.css';

export default function Home() {
  return (
    <main className="home-container">
      <div className="hero-card">
        <h1>Welcome to <span>Web-CRUD</span></h1>
        <p className="subtitle">
          Manage your data efficiently — simple, modern, and secure.
        </p>

        <a href="/dashboard" className="cta-button">
          Go to Dashboard
        </a>
      </div>
    </main>
  );
}
