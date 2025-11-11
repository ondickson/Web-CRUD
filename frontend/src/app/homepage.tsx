'use client';
import Link from 'next/link';
import './page.css';
import Navbar from './components/Navbar';

export default function Homepage() {
  return (
    <>
      <Navbar />
      <main className="homepage">
        <section className="hero">
          <h1>Welcome to Noah & Sons Web-CRUD</h1>
          <p>
            Build, manage, and explore listings with a clean interface and secure access.
          </p>
          <div className="hero-actions">
            <Link href="/register" className="primary-btn">
              Get Started
            </Link>
            <Link href="/auth" className="secondary-btn">
              Sign In
            </Link>
          </div>
        </section>
      </main>
    </>
  );
}
