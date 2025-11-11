// frontend/src/app/page.tsx

'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import './page.css';

const API = process.env.NEXT_PUBLIC_API_URL;

type Item = {
  id: number;
  name: string;
  description?: string;
  createdAt: string;
};

export default function DashboardHome() {
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);

async function loadPublicItems() {
  try {
    const token = localStorage.getItem('token');
    const res = await fetch(`${API}/items`, {
      cache: 'no-store',
      headers: token ? { Authorization: `Bearer ${token}` } : {},
    });
    if (!res.ok) throw new Error('Failed to fetch');
    const data = await res.json();
    setItems(data);
  } catch (err) {
    console.error(err);
  } finally {
    setLoading(false);
  }
}


  useEffect(() => {
    loadPublicItems();
  }, []);

  return (
    <main className="dashboard" style={{ padding: '2rem', width: '100%' }}>
      <header className="dashboard-header">
        <h1>EfieNow</h1>
        <div className="nav-links">
          <Link href="/auth">Login</Link>
          <Link href="/register" className="register-btn">Register</Link>
        </div>
      </header>

      <section className="dashboard-section">
        <h2>Recent Items</h2>
        {loading ? (
          <p>Loading...</p>
        ) : items.length === 0 ? (
          <p>No items yet. Be the first to add one after you register!</p>
        ) : (
          <ul className="item-list">
            {items.map((it) => (
              <li key={it.id} className="item-card">
                <strong>{it.name}</strong>
                <p>{it.description || 'No description'}</p>
                <small>Added {new Date(it.createdAt).toLocaleString()}</small>
              </li>
            ))}
          </ul>
        )}
      </section>
    </main>
  );
}
