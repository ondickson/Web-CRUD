'use client';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import './Navbar.css';

const API = process.env.NEXT_PUBLIC_API_URL;

type User = { id: number; email: string; name?: string };

function parseJwt(token: string | null) {
  try {
    if (!token) return null;
    const payload = token.split('.')[1];
    const json = JSON.parse(atob(payload.replace(/-/g, '+').replace(/_/g, '/')));
    return json as { sub: number; email: string; exp: number; iat: number };
  } catch { return null; }
}

function tokenExpired(token: string | null) {
  const p = parseJwt(token);
  if (!p?.exp) return true;
  return Date.now() >= p.exp * 1000;
}

function displayFrom(user: User | null) {
  if (!user) return { label: '', initial: '' };
  const label = user.name?.trim() || user.email;
  const initial = (user.name?.trim() || user.email || '?').charAt(0).toUpperCase();
  return { label, initial };
}

export default function Navbar() {
  const [user, setUser] = useState<User | null>(null);
  const [open, setOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  

  // Load user reliably on mount
  useEffect(() => {
    async function load() {
      const token = localStorage.getItem('token');
      if (!token || tokenExpired(token)) {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setUser(null);
        return;
      }

      // try local cache first
      const cached = localStorage.getItem('user');
      if (cached) {
        try { setUser(JSON.parse(cached)); } catch { /* ignore */ }
      }

      // always verify via backend (works across new tabs)
      try {
        const res = await fetch(`${API}/auth/me`, {
          headers: { Authorization: `Bearer ${token}` },
          cache: 'no-store',
        });
        if (res.ok) {
          const data = await res.json();
          if (data?.user) {
            setUser(data.user);
            localStorage.setItem('user', JSON.stringify(data.user));
          }
        } else if (res.status === 401) {
          localStorage.removeItem('token');
          localStorage.removeItem('user');
          setUser(null);
        }
      } catch {
        // network error: keep whatever we have (cached), or nothing
      }
    }
    load();
  }, []);

  // Cross-tab sync: if another tab logs in/out, update this one
  useEffect(() => {
    function onStorage(e: StorageEvent) {
      if (e.key === 'token' || e.key === 'user') {
        const token = localStorage.getItem('token');
        if (!token || tokenExpired(token)) {
          setUser(null);
          return;
        }
        const cached = localStorage.getItem('user');
        if (cached) try { setUser(JSON.parse(cached)); } catch { /* ignore */ }
      }
    }
    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, []);

  useEffect(() => {
    function onClickOutside(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) setOpen(false);
    }
    if (open) document.addEventListener('mousedown', onClickOutside);
    return () => document.removeEventListener('mousedown', onClickOutside);
  }, [open]);

 function handleLogout() {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
  setMobileOpen(false);
  window.location.href = '/';
}


  const { label, initial } = displayFrom(user);

  return (
    <nav className="navbar">
      <div className="nav-container">
        <div className="nav-logo">
          <Link href="/"><img src="/efienow.png" alt="EfieNow logo"/></Link>
        </div>

        <ul className="nav-links">
          <li><Link href="/nav_menu/rent">For Rent</Link></li>
          <li><Link href="/nav_menu/sale">For Sale</Link></li>
          <li><Link href="/nav_menu/hotels">Hotels</Link></li>
        </ul>

        <div className="nav-actions" ref={menuRef}>
          {user ? (
            <>
              <button
                className="account-trigger"
                onClick={() => setOpen(v => !v)}
                aria-haspopup="menu"
                aria-expanded={open}
              >
                <span className="avatar"><span className="avatar-initial">{initial}</span></span>
                <span className="account-name">{label}</span>
                <svg className={`chev ${open ? 'open' : ''}`} viewBox="0 0 24 24" width="18" height="18">
                  <path d="M7 10l5 5 5-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </button>

              {open && (
                <div className="account-menu" role="menu">
                  <div className="menu-header">My Account</div>

                  <Link href="/bookings" className="menu-item" role="menuitem">
                    <svg viewBox="0 0 24 24" width="18" height="18"><path d="M7 4h10a2 2 0 0 1 2 2v12l-4-2-4 2-4-2-4 2V6a2 2 0 0 1 2-2z" fill="none" stroke="currentColor" strokeWidth="2"/></svg>
                    <span>Bookings</span>
                  </Link>

                  <Link href="/saved" className="menu-item" role="menuitem">
                    <svg viewBox="0 0 24 24" width="18" height="18"><path d="M12 21l-1.45-1.32C6 16 3 13.36 3 10a5 5 0 0 1 9-3 5 5 0 0 1 9 3c0 3.36-3 6-7.55 9.68L12 21z" fill="none" stroke="currentColor" strokeWidth="2"/></svg>
                    <span>Saved properties list</span>
                  </Link>

                  <Link href="/account" className="menu-item" role="menuitem">
                    <svg viewBox="0 0 24 24" width="18" height="18"><path d="M12 12a5 5 0 1 0-5-5 5 5 0 0 0 5 5zm0 2c-4.42 0-8 2.24-8 5v1h16v-1c0-2.76-3.58-5-8-5z" fill="none" stroke="currentColor" strokeWidth="2"/></svg>
                    <span>Profile</span>
                  </Link>

                  <div className="menu-sep" />
                  <button className="menu-item danger" onClick={handleLogout} role="menuitem">
                    <svg viewBox="0 0 24 24" width="18" height="18"><path d="M16 17l5-5-5-5M21 12H9M13 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h8" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>
                    <span>Sign out</span>
                  </button>
                </div>
              )}
            </>
          ) : (
            <>
              <Link href="/auth" className="nav-login">Sign In</Link>
              <Link href="/register" className="nav-register">Sign Up</Link>
            </>
          )}
        </div>
        {/* Mobile hamburger (shown only on small screens via CSS) */}
        <button
          className="nav-toggle"
          aria-label="Open menu"
          onClick={() => setMobileOpen(true)}
        >
          <span />
          <span />
          <span />
        </button>
      </div>
            {mobileOpen && (
        <div
          className="mobile-menu-overlay"
          onClick={() => setMobileOpen(false)}
        >
          <div
            className="mobile-menu"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mobile-menu-top">
              <div className="mobile-menu-greeting">
                {user ? `Hello, ${user.name || user.email}` : 'Menu'}
              </div>
              <button
                className="mobile-close"
                aria-label="Close menu"
                onClick={() => setMobileOpen(false)}
              >
                <span />
                <span />
              </button>
            </div>

            {!user && (
              <button
                className="mobile-signin-btn"
                onClick={() => {
                  setMobileOpen(false);
                  window.location.href = '/auth';
                }}
              >
                Sign in / Create account
              </button>
            )}

            <div className="mobile-menu-section">
              <p className="mobile-section-title">Browse EfieNow</p>

              <Link
                href="/nav_menu/rent"
                className="mobile-link"
                onClick={() => setMobileOpen(false)}
              >
                <span>For Rent</span>
              </Link>

              <Link
                href="/nav_menu/sale"
                className="mobile-link"
                onClick={() => setMobileOpen(false)}
              >
                <span>For Sale</span>
              </Link>

              <Link
                href="/nav_menu/hotels"
                className="mobile-link"
                onClick={() => setMobileOpen(false)}
              >
                <span>Hotels</span>
              </Link>
            </div>

            <div className="mobile-menu-section">
              <p className="mobile-section-title">Account</p>

              <Link
                href="/bookings"
                className="mobile-link"
                onClick={() => setMobileOpen(false)}
              >
                <span>My bookings</span>
              </Link>

              <Link
                href="/saved"
                className="mobile-link"
                onClick={() => setMobileOpen(false)}
              >
                <span>Saved properties list</span>
              </Link>

              {user && (
                <button
                  className="mobile-link mobile-link-danger"
                  onClick={handleLogout}
                >
                  <span>Sign out</span>
                </button>
              )}
            </div>
          </div>
        </div>
      )}

    </nav>
  );
}
