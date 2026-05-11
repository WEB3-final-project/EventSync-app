"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const LightningIcon = () => (
  <div className="bg-black p-2 rounded-lg">
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke="white"
      strokeWidth="2.5"
    >
      <path d="M13 2L3 14H12L11 22L21 10H12L13 2Z" />
    </svg>
  </div>
);

export default function Page() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    "Fonctionnalités",
    "Comment ça marche",
    "Planning",
    "Rôles",
  ];

  const cards = [
    {
      icon: (
        <path d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
      ),
      title: "Gestion complète d'événements",
      desc: "Créez et gérez vos événements avec tous les détails : sessions, salles et intervenants.",
    },
    {
      icon: <path d="M4 6h16M4 12h16m-7 6h7" />,
      title: "Planning Multi-Track",
      desc: "Visualisez les sessions sous forme de grille temporelle avec affichage simultané par salles.",
    },
    {
      icon: (
        <path d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      ),
      title: "Sessions Live",
      desc: "Détection automatique des sessions en cours avec badge Live en temps réel.",
      active: true,
    },
    {
      icon: (
        <path d="M8 10h.01M12 10h.01M16 10h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
      ),
      title: "Q&A en direct",
      desc: "Les participants posent des questions pendant les sessions et votent pour les plus pertinentes.",
    },
    {
      icon: (
        <path d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
      ),
      title: "Pages Intervenants",
      desc: "Chaque intervenant dispose d'une page publique avec biographie, photo et sessions.",
    },
    {
      icon: (
        <path d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.382-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
      ),
      title: "Favoris personnels",
      desc: "Les participants construisent leur itinéraire personnel en ajoutant des sessions en favoris.",
    },
  ];

  return (
    <div className="min-h-screen bg-white font-sans text-slate-900 overflow-x-hidden">
      <header className="sticky top-0 z-[9999] bg-white/95 backdrop-blur-md border-b border-slate-100">
        <div className="flex items-center justify-between px-4 md:px-10 py-4 max-w-screen-2xl mx-auto w-full">
          <div className="flex items-center gap-2">
            <LightningIcon />
            <span className="text-lg md:text-2xl font-bold tracking-tight text-black">
              EventSync
            </span>
          </div>

          <nav className="hidden lg:flex gap-8 text-base font-semibold text-slate-600">
            {navItems.map((item) => (
              <motion.a
                key={item}
                href="#"
                whileHover={{ y: -1, color: "#000" }}
                className="relative group transition-colors"
              >
                {item}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-black transition-all group-hover:w-full" />
              </motion.a>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="hidden sm:block bg-black text-white px-6 py-2.5 rounded-full text-sm font-bold"
            >
              Sign in
            </motion.button>

            <button
              className="lg:hidden w-14 h-14 flex items-center justify-center rounded-2xl hover:bg-slate-100 active:bg-slate-200 pointer-events-auto touch-manipulation"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
              style={{ WebkitTapHighlightColor: "transparent" }}
            >
              <svg
                className="w-9 h-9"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.75"
                viewBox="0 0 24 24"
              >
                {isMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>

        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="lg:hidden bg-white border-t border-slate-100 shadow-2xl"
            >
              <div className="px-6 py-10 flex flex-col gap-6 text-lg">
                {navItems.map((item) => (
                  <a
                    key={item}
                    href="#"
                    className="py-4 px-5 -mx-5 rounded-2xl active:bg-slate-50 text-slate-700 font-medium"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item}
                  </a>
                ))}
                <button
                  className="mt-6 bg-black text-white py-5 rounded-2xl font-bold text-lg"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Sign in
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      <main className="relative z-10 flex flex-col items-center text-center mt-10 md:mt-20 px-4 md:px-6 w-full">
        <div className="animate-in fade-in zoom-in duration-200">
          <div className="flex items-center gap-2 border border-slate-200 bg-slate-50 px-4 py-1.5 rounded-full shadow-sm mb-6 md:mb-8">
            <span className="text-blue-600 font-bold text-xs animate-pulse">
              (( ))
            </span>
            <span className="text-[11px] md:text-sm text-slate-600 font-medium tracking-tight">
              Plateforme d'événements en temps réel
            </span>
          </div>
        </div>

        <h1 className="text-3xl md:text-7xl lg:text-8xl font-black tracking-tighter leading-[1.1] mb-6 px-4 text-black w-full">
          Vos événements,
          <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-violet-500">
            synchronisés.
          </span>
        </h1>

        <p className="max-w-2xl text-base md:text-lg text-slate-500 leading-relaxed mb-10 px-6">
          EventSync remplace les supports statiques par une interface dynamique.
          Naviguez dans vos événements et engagez vos participants.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto mb-20 md:mb-32 px-6 items-center justify-center">
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="bg-black text-white px-8 py-4 rounded-full text-base font-bold shadow-lg w-full sm:w-auto"
          >
            Découvrir la plateforme →
          </motion.button>

          <button className="bg-slate-50 border border-slate-200 px-8 py-4 rounded-full text-base font-semibold text-slate-700 hover:bg-slate-100 transition-all w-full sm:w-auto">
            Voir le planning
          </button>
        </div>

        <section className="w-full max-w-7xl mx-auto pb-24 px-4">
          <div className="flex flex-col items-center mb-12 md:mb-20">
            <div className="border border-blue-100 bg-blue-50/50 px-4 py-1 rounded-full mb-6">
              <span className="text-[10px] font-bold tracking-widest text-blue-600 uppercase">
                Fonctionnalités
              </span>
            </div>

            <h2 className="text-3xl md:text-6xl font-black tracking-tight text-black mb-6 px-4">
              Tout ce dont vous avez besoin
            </h2>

            <p className="text-slate-500 text-sm md:text-xl max-w-2xl px-6 text-center">
              Une plateforme complète pour gérer, afficher et dynamiser vos
              événements.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 text-left">
            {cards.map((card, index) => (
              <motion.div
                key={index}
                whileHover={{ y: -5, scale: 1.01 }}
                whileTap={{ scale: 0.98 }}
                className={`group relative p-6 md:p-8 rounded-[2rem] border bg-white transition-all duration-150 hover:shadow-xl ${
                  card.active
                    ? "border-blue-500 ring-4 ring-blue-50/60"
                    : "border-slate-100 hover:border-blue-200"
                } cursor-pointer`}
              >
                <div
                  className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-5 ${
                    card.active
                      ? "bg-blue-600 text-white"
                      : "bg-slate-50 text-slate-600 group-hover:bg-blue-50 group-hover:text-blue-600"
                  }`}
                >
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    viewBox="0 0 24 24"
                  >
                    {card.icon}
                  </svg>
                </div>

                <h3
                  className={`text-xl font-bold mb-3 ${
                    card.active
                      ? "text-blue-600"
                      : "group-hover:text-blue-600"
                  }`}
                >
                  {card.title}
                </h3>

                <p className="text-sm md:text-base leading-relaxed text-slate-500">
                  {card.desc}
                </p>

                {card.active && (
                  <div className="absolute top-6 right-6">
                    <span className="flex h-2.5 w-2.5">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-blue-600"></span>
                    </span>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}