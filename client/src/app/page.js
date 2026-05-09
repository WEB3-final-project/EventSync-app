import React from 'react';

const LightningIcon = () => (
  <div className="bg-black p-2 rounded-lg">
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5">
      <path d="M13 2L3 14H12L11 22L21 10H12L13 2Z" />
    </svg>
  </div>
);

export default function Page() {
  return (
    <div className="min-h-screen bg-white font-sans text-slate-900">
      <header className="flex items-center justify-between px-8 py-5 max-w-7xl mx-auto">
        <div className="flex items-center gap-2">
          <LightningIcon />
          <span className="text-xl font-bold tracking-tight">EventSync</span>
        </div>

        <nav className="hidden md:flex gap-8 text-sm font-medium text-slate-600">
          <a href="#" className="hover:text-black">Fonctionnalités</a>
          <a href="#" className="hover:text-black">Comment ça marche</a>
          <a href="#" className="hover:text-black">Planning</a>
          <a href="#" className="hover:text-black">Rôles</a>
          <a href="#" className="hover:text-black">FAQ</a>
        </nav>

        <button className="bg-black text-white px-5 py-2 rounded-full text-sm font-bold">
          Commencer
        </button>
      </header>

      <main className="flex flex-col items-center text-center mt-20 px-6">
        <div className="flex items-center gap-2 border border-slate-200 bg-slate-50 px-4 py-1.5 rounded-full shadow-sm mb-10">
          <span className="text-blue-600 font-bold text-xs">(( ))</span>
          <span className="text-sm text-slate-600 font-medium">Plateforme d'événements en temps réel</span>
        </div>

        <h1 className="text-6xl md:text-8xl font-black tracking-tighter leading-[1.1] mb-6">
          Vos événements, <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-violet-500">
            synchronisés.
          </span>
        </h1>

        <p className="max-w-2xl text-lg text-slate-500 leading-relaxed mb-10">
          EventSync remplace les supports statiques par une interface dynamique. 
          Naviguez dans vos événements, interagissez en direct avec les sessions, 
          et engagez vos participants comme jamais.
        </p>

        <div className="flex flex-col sm:flex-row gap-4">
          <button className="bg-black text-white px-8 py-4 rounded-full font-bold flex items-center gap-2 hover:scale-105 transition-transform">
            Découvrir la plateforme
            <span>→</span>
          </button>
          <button className="bg-slate-50 border border-slate-200 px-8 py-4 rounded-full font-semibold text-slate-700 hover:bg-slate-100">
            Voir le planning
          </button>
        </div>
      </main>
    </div>
  );
}