'use client';

import './page.css';
import Navbar from './components/Navbar';
import { MapPin, Calendar, Users, ShieldCheck, BadgeCheck, Headset, CheckCircle } from 'lucide-react';

export default function Homepage() {
  return (
    <div className="page-container">
      <Navbar />

      <main className="homepage">
        {/* HERO */}
        <section className="hero">
          <div className="hero-bg" />
          <div className="hero-overlay" />

          <div className="hero-inner">
            <h1 className="hero-title">Find Your Perfect Stay</h1>
            <p className="hero-subtitle">
              Discover amazing hotels and vacation rentals around the world.
            </p>

            {/* SEARCH CARD */}
            <div className="search-card">
              <div className="search-fields">
                <div className="search-field">
                  <span className="field-label">Location</span>
                  <div className="field-input">
                    <MapPin className="field-icon" />
                    <input
                      type="text"
                      placeholder="Where are you going?"
                    />
                  </div>
                </div>

                <div className="search-field">
                  <span className="field-label">Check in</span>
                  <div className="field-input">
                    <Calendar className="field-icon" />
                    <input
                      type="text"
                      placeholder="dd/mm/yyyy"
                    />
                  </div>
                </div>

                <div className="search-field">
                  <span className="field-label">Check out</span>
                  <div className="field-input">
                    <Calendar className="field-icon" />
                    <input
                      type="text"
                      placeholder="dd/mm/yyyy"
                    />
                  </div>
                </div>

                <div className="search-field">
                  <span className="field-label">Guests</span>
                  <div className="field-input">
                    <Users className="field-icon" />
                    <input
                      type="number"
                      min={1}
                      defaultValue={2}
                    />
                  </div>
                </div>
              </div>

              <button className="search-button">Search</button>
            </div>
          </div>
        </section>

              {/* POPULAR DESTINATIONS */}
      <section className="section section-destinations">
        <div className="section-header">
          <h2>Popular Destinations</h2>
          <p>Explore our most sought-after locations</p>
        </div>

        <div className="destinations-grid">
          <article className="destination-card">
            <div className="destination-image destination-image--forrent" />
            <div className="destination-content">
              <h3>For Rent</h3>
              <p>Your next home or vacation stay awaits</p>
            </div>
          </article>

          <article className="destination-card">
            <div className="destination-image destination-image--forsale" />
            <div className="destination-content">
              <h3>For Sale</h3>
              <p>Discover properties ready for new owners</p>
            </div>
          </article>

          {/* <article className="destination-card">
            <div className="destination-image destination-image--city" />
            <div className="destination-content">
              <h3>Lands</h3>
              <p>Explore opportunities for development or investment</p>
            </div>
          </article> */}

          <article className="destination-card">
            <div className="destination-image destination-image--hotel" />
            <div className="destination-content">
              <h3>Hotels</h3>
              <p>Comfortable stays for any trip or occasion</p>
            </div>
          </article>
        </div>
      </section>

      {/* FEATURED PROPERTIES */}
      <section className="section section-featured">
        <div className="section-header">
          <h2>Featured Properties</h2>
          <p>Handpicked places just for you</p>
        </div>

        <div className="properties-grid">
          <article className="property-card">
            <div className="property-image property-image--1">
              <span className="property-badge">Top Pick</span>
            </div>
            <div className="property-body">
              <h3>Kempinski Hotel</h3>
              <p className="property-location">Ridge • Accra</p>
              <div className="property-footer">
                <span className="property-price">GHC4450</span>
                <span className="property-period">/ night</span>
              </div>
            </div>
          </article>

          <article className="property-card">
            <div className="property-image property-image--2">
              <span className="property-badge">New</span>
            </div>
            <div className="property-body">
              <h3>Accra Pearl in City</h3>
              <p className="property-location">Osu • Accra</p>
              <div className="property-footer">
                <span className="property-price">GHC7000</span>
                <span className="property-period">/ month</span>
              </div>
            </div>
          </article>

          <article className="property-card">
            <div className="property-image property-image--3">
              <span className="property-badge">Hot Deal</span>
            </div>
            <div className="property-body">
              <h3>Accra Airport Hotel</h3>
              <p className="property-location">Airport Residential • Accra</p>
              <div className="property-footer">
                <span className="property-price">GHC380</span>
                <span className="property-period">/ night</span>
              </div>
            </div>
          </article>

          <article className="property-card">
            <div className="property-image property-image--4">
              <span className="property-badge">Limited</span>
            </div>
            <div className="property-body">
              <h3>Spacious Family Villa</h3>
              <p className="property-location">East Legon • Accra</p>
              <div className="property-footer">
                <span className="property-price">GHC1,200,000</span>
                {/* <span className="property-period">/ night</span> */}
              </div>
            </div>
          </article>
        </div>
      </section>

            {/* WHY CHOOSE HOTELBOOK */}
      <section className="section section-why">
        <div className="section-header">
          <h2>Why Choose HotelBook</h2>
          <p>We make your booking experience seamless</p>
        </div>

        <div className="why-grid">
          <div className="why-item">
            <div className="why-icon">
              <ShieldCheck />
            </div>
            <h3>Secure Booking</h3>
            <p>Your information is protected with industry-standard security.</p>
          </div>

          <div className="why-item">
            <div className="why-icon">
              <BadgeCheck />
            </div>
            <h3>Best Price Guarantee</h3>
            <p>Find a lower rate and we’ll match it on select stays.</p>
          </div>

          <div className="why-item">
            <div className="why-icon">
              <Headset />
            </div>
            <h3>24/7 Support</h3>
            <p>Our team is here anytime to help with your booking.</p>
          </div>

          <div className="why-item">
            <div className="why-icon">
              <CheckCircle />
            </div>
            <h3>Verified Properties</h3>
            <p>Every property is reviewed to meet our quality standards.</p>
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="cta-section">
        <div className="cta-inner">
          <h2>Ready to Start Your Journey?</h2>
          <p>
            Join millions of travelers who trust HotelBook for their perfect getaway.
          </p>
          <button className="cta-button">Get Started Today</button>
        </div>
      </section>

      {/* FOOTER */}
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
                <a href="#">About</a>
                <a href="#">Careers</a>
                <a href="#">Press</a>
              </div>

              <div className="footer-column">
                <h4>Support</h4>
                <a href="#">Help Center</a>
                <a href="#">Contact</a>
                <a href="#">Privacy Policy</a>
              </div>

              <div className="footer-column">
                <h4>Explore</h4>
                <a href="#">Destinations</a>
                <a href="#">Inspiration</a>
                <a href="#">Blog</a>
              </div>
            </div>
          </div>

          <div className="footer-bottom">
            <span>© 2025 Efie Now. All rights reserved.</span>
          </div>
        </div>
      </footer>


      </main>
    </div>
  );
}
