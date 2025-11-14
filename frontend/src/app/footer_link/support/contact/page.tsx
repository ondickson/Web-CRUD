// app/footer_link/support/contact/page.tsx
'use client';

import React from 'react';
import Navbar from '@/app/components/Navbar';
import './contact.css';

export default function ContactPage() {
  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    // later: send to backend / show toast / etc.
  }

  return (
    <>
      <Navbar />

      <main className="support-page">
        <section className="support-hero">
          <h1>Contact Us</h1>
          <p>Have a question or issue? Reach out and we’ll get back to you.</p>
        </section>

        <section className="support-section">
          <form className="contact-form" onSubmit={handleSubmit}>
            <div className="form-row">
              <label htmlFor="name">Full name</label>
              <input id="name" type="text" placeholder="Your name" />
            </div>

            <div className="form-row">
              <label htmlFor="email">Email address</label>
              <input id="email" type="email" placeholder="you@example.com" />
            </div>

            <div className="form-row">
              <label htmlFor="subject">Subject</label>
              <input id="subject" type="text" placeholder="What do you need help with?" />
            </div>

            <div className="form-row">
              <label htmlFor="message">Message</label>
              <textarea
                id="message"
                rows={4}
                placeholder="Tell us briefly what’s going on."
              />
            </div>

            <button className="contact-submit" type="submit">
              Send message
            </button>
          </form>
        </section>
      </main>
    </>
  );
}
