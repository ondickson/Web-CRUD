// src/app/auth/page.tsx
'use client';
import { useState } from 'react';

export default function Auth() {
  const [email, setEmail] = useState('test@example.com');
  const [password, setPassword] = useState('password');
  const [mode, setMode] = useState<'login'|'register'>('register');
  const [msg, setMsg] = useState('');

  const submit = async () => {
    setMsg('Loading...');
    const res = await fetch(process.env.NEXT_PUBLIC_API_URL + `/auth/${mode}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });
    const data = await res.json();
    if (!res.ok) { setMsg(data.error || 'Failed'); return; }
    if (data.token) localStorage.setItem('token', data.token);
    setMsg('Success!');
  };

  return (
    <main style={{ padding: 24 }}>
      <h1>{mode === 'register' ? 'Create account' : 'Login'}</h1>
      <input value={email} onChange={e=>setEmail(e.target.value)} placeholder="email" />
      <input value={password} type="password" onChange={e=>setPassword(e.target.value)} placeholder="password" />
      <div style={{ marginTop: 8 }}>
        <button onClick={submit}>Submit</button>
        <button onClick={()=>setMode(mode==='register'?'login':'register')} style={{ marginLeft: 8 }}>
          Switch to {mode==='register'?'Login':'Register'}
        </button>
      </div>
      <p>{msg}</p>
    </main>
  );
}
