// src/app/dashboard/items/page.tsx
'use client';

import { useEffect, useMemo, useState } from 'react';

type Item = {
  id: number;
  name: string;
  description?: string | null;
  createdAt?: string;
  updatedAt?: string;
};

const API = process.env.NEXT_PUBLIC_API_URL;

export default function Items() {
  const [items, setItems] = useState<Item[]>([]);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState<string>('');

  const token = useMemo(
    () => (typeof window !== 'undefined' ? localStorage.getItem('token') : null),
    []
  );

  function authHeaders() {
    return token ? { Authorization: `Bearer ${token}` } : {};
  }

  async function load() {
    if (!token || !API) return;
    setLoading(true);
    setMsg('');
    try {
      const res = await fetch(`${API}/items`, { headers: { ...authHeaders() } });
      if (!res.ok) {
        const e = await res.json().catch(() => ({}));
        throw new Error(e.error || `Failed to load (${res.status})`);
      }
      const data: Item[] = await res.json();
      setItems(data);
    } catch (e: any) {
      setMsg(e.message || 'Failed to load items');
    } finally {
      setLoading(false);
    }
  }

  async function add() {
    if (!token || !API) return;
    const payload = {
      name: name.trim(),
      // Send null for empty optional field to keep backend clean
      description: description.trim() || null,
    };
    if (!payload.name) {
      setMsg('Name is required');
      return;
    }
    setMsg('');
    const res = await fetch(`${API}/items`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...authHeaders(),
      },
      body: JSON.stringify(payload),
    });
    if (!res.ok) {
      const e = await res.json().catch(() => ({}));
      setMsg(e.error || `Create failed (${res.status})`);
      return;
    }
    setName('');
    setDescription('');
    load();
  }

  async function del(id: number) {
    if (!token || !API) return;
    setMsg('');
    const res = await fetch(`${API}/items/${id}`, {
      method: 'DELETE',
      headers: { ...authHeaders() },
    });
    if (!res.ok) {
      const e = await res.json().catch(() => ({}));
      setMsg(e.error || `Delete failed (${res.status})`);
      return;
    }
    load();
  }

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  return (
    <main style={{ padding: 24, maxWidth: 720 }}>
      <h1>Your Items</h1>

      <section style={{ margin: '12px 0', display: 'grid', gap: 8 }}>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Item name (required)"
        />
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Description (optional)"
          rows={3}
        />
        <div>
          <button onClick={add}>Add</button>
          <button onClick={load} style={{ marginLeft: 8 }}>
            Refresh
          </button>
        </div>
        {msg ? <p style={{ color: 'crimson' }}>{msg}</p> : null}
      </section>

      <section>
        {loading ? <p>Loading…</p> : null}
        {!loading && items.length === 0 ? <p>No items yet.</p> : null}
        <ul style={{ paddingLeft: 16 }}>
          {items.map((it) => (
            <li key={it.id} style={{ marginBottom: 8 }}>
              <div style={{ fontWeight: 600 }}>{it.name}</div>
              {it.description ? <div>{it.description}</div> : null}
              <button onClick={() => del(it.id)} style={{ marginTop: 4 }}>
                delete
              </button>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
