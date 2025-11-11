'use client';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import './Navbar.css';

type User = { email: string; name?: string };

function getDisplay(user: User | null) {
  if (!user) return { label: '', initial: '' };
  const label = user.name?.trim() || user.email;
  const initial = (user.name?.trim() || user.email || '?').charAt(0).toUpperCase();
  return { label, initial };
}

export default function Navbar() {
  const [user, setUser] = useState<User | null>(null);
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const raw = localStorage.getItem('user');
    if (token && raw) {
      try { setUser(JSON.parse(raw)); } catch { setUser(null); }
    } else {
      setUser(null);
    }
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
    window.location.href = '/';
  }

  const { label, initial } = getDisplay(user);

  return (
    <nav className="navbar">
      <div className="nav-container">
        <div className="nav-logo">
          <Link href="/">Efie Now</Link>
        </div>

        <ul className="nav-links">
          <li><Link href="/hotels">Hotels</Link></li>
          <li><Link href="/homes">Homes</Link></li>
        </ul>

        <div className="nav-actions" ref={menuRef}>
          {user ? (
            <button
              className="account-trigger"
              onClick={() => setOpen(v => !v)}
              aria-haspopup="menu"
              aria-expanded={open}
              title="My Account"
            >
              <span className="avatar" aria-hidden="true">
                {/* future: replace with <img src={...} /> when you add avatars */}
                <span className="avatar-initial">{initial}</span>
              </span>
              <span className="account-name">{label}</span>
              <svg className={`chev ${open ? 'open' : ''}`} viewBox="0 0 24 24" width="18" height="18">
                <path d="M7 10l5 5 5-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </button>
          ) : (
            <>
              <Link href="/auth" className="nav-login">Sign In</Link>
              <Link href="/register" className="nav-register">Create Account</Link>
            </>
          )}

          {user && open && (
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

              <button className="menu-item danger" role="menuitem" onClick={handleLogout}>
                <svg viewBox="0 0 24 24" width="18" height="18"><path d="M16 17l5-5-5-5M21 12H9M13 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h8" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>
                <span>Sign out</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
