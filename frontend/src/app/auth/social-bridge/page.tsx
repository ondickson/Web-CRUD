// frontend/src/app/auth/social-bridge/page.tsx

'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';

const API = process.env.NEXT_PUBLIC_API_URL;

export default function SocialBridgePage() {
  const router = useRouter();
  const { data: session, status } = useSession();

  useEffect(() => {
    if (status === 'loading') return;

    if (status !== 'authenticated' || !session?.user?.email) {
      // No session, bounce to login
      router.replace('/auth');
      return;
    }

    async function syncWithBackend() {
      try {
        const res = await fetch(`${API}/auth/social-login`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            email: session.user.email,
            name: session.user.name,
            image: (session.user as any).image,
            provider: 'google',
            // providerAccountId optional; backend will handle null
          }),
        });

        if (!res.ok) {
          console.error('social-login failed', await res.text());
          router.replace('/auth');
          return;
        }

        const data = await res.json();

        // Same format your email/password login uses
        if (typeof window !== 'undefined') {
          if (data.token) {
            localStorage.setItem('token', data.token);
          }
          if (data.user) {
            localStorage.setItem('user', JSON.stringify(data.user));
          }
        }

        router.replace('/');
      } catch (err) {
        console.error('social-login error', err);
        router.replace('/auth');
      }
    }

    syncWithBackend();
  }, [status, session, router]);

  return (
    <main
      style={{
        minHeight: '80vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: 16,
      }}
    >
      Connecting your Google account…
    </main>
  );
}
