// frontend/src/assets/test.tsx

'use client';

import './page.css';


export default function Homepage() {
  return (
    <div className="page-container">

      <main className="homepage">
          <div className="relative z-10 container mx-auto px-4 text-center">
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
              Find Your Perfect Stay
            </h1>
            <p className="text-xl text-white/90 mb-12 max-w-2xl mx-auto">
              Discover amazing hotels and vacation rentals around the world
            </p>

          </div>
      </main>
    </div>
  );
}
