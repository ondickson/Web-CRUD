'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';
import Navbar from '../components/Navbar';
import './auth.css';

const API = process.env.NEXT_PUBLIC_API_URL;

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await fetch(`${API}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Login failed');

      // your existing JWT-based flow
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify({ email }));
      router.push('/');
    } catch (err: any) {
      setError(err.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="page-container">
      <Navbar />

      <main className="auth-container">
        <div className="auth-card">
          <h1 className="auth-title">Sign in or create an account</h1>
          <p className="auth-subtitle">
            Sign up for free or log in to access amazing deals and benefits!
          </p>

          {/* GOOGLE BUTTON */}
          <button
            type="button"
            className="btn-social btn-google googleSignin"
            onClick={() => signIn("google")}
          >
            <span className="btn-social-icon">
              <span className="google-circle">G</span>
            </span>
            <span>Sign in with Google</span>
          </button>

          {/* you can wire these later */}
          <button type="button" className="btn-social btn-facebook" disabled>
            <span className="btn-social-icon">f</span>
            <span>Sign in with Facebook</span>
          </button>

          <button type="button" className="btn-social btn-apple" disabled>
            <span className="btn-social-icon"></span>
            <span>Sign in with Apple</span>
          </button>

          <div className="auth-divider">
            <span>or</span>
          </div>

          {/* EMAIL / PASSWORD FORM (your old logic, kept intact) */}
          <form onSubmit={handleLogin} className="auth-form">
            <label className="auth-label">
              Email
              <input
                type="email"
                className="auth-input"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </label>

            <label className="auth-label">
              Password
              <input
                type="password"
                className="auth-input"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </label>

            {error && <p className="error">{error}</p>}

            <button type="submit" disabled={loading} className="btn-continue">
              {loading ? 'Logging in...' : 'Login'}
            </button>
          </form>

          <p className="auth-footer-text">
            Don’t have an account? <a href="/register">Register</a>
          </p>
        </div>
      </main>
    </div>
  );
}
