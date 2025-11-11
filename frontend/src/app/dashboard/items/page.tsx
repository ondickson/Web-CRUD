// src/app/dashboard/items/page.tsx
'use client';
import { useEffect, useState } from 'react';

const API = process.env.NEXT_PUBLIC_API_URL;

export default function Items() {
  const [items, setItems] = useState<any[]>([]);
  const [title, setTitle] = useState('');

  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;

  async function load() {
    if (!token) return;
    const res = await fetch(`${API}/items`, { headers: { Authorization: `Bearer ${token}` }});
    setItems(await res.json());
  }
  async function add() {
    const res = await fetch(`${API}/items`, {
      method:'POST',
      headers:{ 'Content-Type':'application/json', Authorization:`Bearer ${token}` },
      body: JSON.stringify({ title })
    });
    if (res.ok) { setTitle(''); load(); }
  }
  async function del(id:string) {
    await fetch(`${API}/items/${id}`, { method:'DELETE', headers:{ Authorization:`Bearer ${token}` }});
    load();
  }

  useEffect(()=>{ load(); }, [token]);

  return (
    <main style={{ padding: 24 }}>
      <h1>User's Items</h1>
      <div>
        <input value={title} onChange={e=>setTitle(e.target.value)} placeholder="new title" />
        <button onClick={add}>Add</button>
      </div>
      <ul>
        {items.map(it=>(
          <li key={it.id}>
            {it.title} <button onClick={()=>del(it.id)}>delete</button>
          </li>
        ))}
      </ul>
    </main>
  );
}
