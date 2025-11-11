// frontend/src/app/register/page.tsx

'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import '../auth/auth.css';

const API = process.env.NEXT_PUBLIC_API_URL;

export default function RegisterPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

async function handleRegister(e: React.FormEvent) {
  e.preventDefault();
  setError('');
  setLoading(true);
  try {
    const res = await fetch(`${API}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Registration failed');

    localStorage.setItem('token', data.token);
    router.push('/'); // or '/dashboard' if it exists
  } catch (err: any) {
    setError(err.message);
  } finally {
    setLoading(false);
  }
}


  return (
    <main className="auth-container">
      <h1>Create Account</h1>
      <form onSubmit={handleRegister} className="auth-form">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password (min 6 chars)"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        {error && <p className="error">{error}</p>}

        <button type="submit" disabled={loading}>
          {loading ? 'Creating...' : 'Register'}
        </button>
      </form>

      <p>
        Already have an account? <a href="/auth">Login</a>
      </p>
    </main>
  );
}
