'use client';
import { useEffect, useState } from 'react';
import './account.css';
import Navbar from '../../components/Navbar';

type User = { email: string; name?: string };

export default function AccountPage() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) setUser(JSON.parse(userData));
  }, []);

  if (!user) {
    return (
      <main className="account-page">
        <h2>You’re not signed in</h2>
        <p>Please <a href="/auth">sign in</a> to view your account.</p>
      </main>
    );
  }

  return (
    <div className="page-container">
          <Navbar />
    <main className="account-page">
      <h1>My Account</h1>
      <div className="account-card">
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Name:</strong> {user.name || 'Not provided'}</p>
      </div>
    </main>
    </div>
  );
}
