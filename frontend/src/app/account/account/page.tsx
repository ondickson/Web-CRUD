// frontend/src/app/account/account/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import './account.css';
import Navbar from '../../components/Navbar';

type User = { email: string; name?: string | null };

export default function AccountPage() {
  const [user, setUser] = useState<User | null>(null);
  const { data: session } = useSession();

  useEffect(() => {
    // 1) Try localStorage (JWT-based login or social-bridge result)
    const userData =
      typeof window !== 'undefined' ? localStorage.getItem('user') : null;

    if (userData) {
      try {
        setUser(JSON.parse(userData));
        return;
      } catch {
        // ignore bad JSON and fall back to session
      }
    }

    // 2) Fall back to NextAuth session (Google etc.)
    if (session?.user?.email) {
      setUser({
        email: session.user.email,
        name: session.user.name ?? null,
      });
    }
  }, [session]);

  if (!user) {
    return (
      <div className="page-container">
        <Navbar />
        <main className="account-page">
          <h2>You’re not signed in</h2>
          <p>
            Please <a href="/auth">sign in</a> to view your account.
          </p>
        </main>
      </div>
    );
  }

  return (
    <div className="page-container">
      <Navbar />
      <main className="account-page">
        <h1>My Account</h1>
        <div className="account-card">
          <p>
            <strong>Email:</strong> {user.email}
          </p>
          <p>
            <strong>Name:</strong> {user.name || 'Not provided'}
          </p>
        </div>
      </main>
    </div>
  );
}
