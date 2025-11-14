// app/components/Footer.tsx
import React from 'react';
import './Footer.css';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-top">
          <div className="footer-brand">
            <div className="footer-logo-circle">E</div>
            <div>
              <div className="footer-logo-text">Efie Now</div>
              <p>Your trusted partner for the best global stays.</p>
            </div>
          </div>

          <div className="footer-columns">
            <div className="footer-column">
              <h4>Company</h4>
              <a href="/footer_link/company/about">About</a>
              <a href="/footer_link/company/careers">Careers</a>
              <a href="/footer_link/company/press">Press</a>
            </div>

            <div className="footer-column">
              <h4>Support</h4>
              <a href="/footer_link/support/help_center">Help Center</a>
              <a href="/footer_link/support/contact">Contact</a>
              <a href="/footer_link/support/privacy">Privacy Policy</a>
            </div>

            <div className="footer-column">
              <h4>Explore</h4>
              <a href="/footer_link/Explore/destinations">Destinations</a>
              <a href="/footer_link/Explore/inspiration">Inspiration</a>
              <a href="/footer_link/Explore/blog">Blog</a>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <span>© 2025 Efie Now. All rights reserved.</span>
        </div>
      </div>
    </footer>
  );
}
