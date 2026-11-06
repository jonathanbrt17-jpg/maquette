import React from 'react';
import { useShop } from '../context/ShopContext';
import { ArrowRight, MapPin, ShieldCheck, Sparkles } from 'lucide-react';

export const HeroSection: React.FC = () => {
  const { setCurrentView, setCatalogCategory } = useShop();

  const handleExploreShop = () => {
    setCatalogCategory('all');
    setCurrentView('catalog');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleVisitBoutique = () => {
    setCurrentView('boutique');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section className="relative w-full min-h-[640px] lg:min-h-[720px] flex items-center overflow-hidden bg-neutral-950">
      {/* Background Image with Scrim Gradient */}
      <div className="absolute inset-0 z-0">
        <img
          src="/src/assets/images/hero_scandal_luxury_1793958430839.jpg"
          alt="Atmosphère raffinée SCANDAL LH"
          className="w-full h-full object-cover object-center scale-100 animate-fade-in"
          fetchPriority="high"
        />
        {/* Measured cinematic scrim */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/70 to-black/30" />
        <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-transparent to-neutral-950/60" />
      </div>

      {/* Hero Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28 w-full">
        <div className="max-w-2xl space-y-6">
          {/* Subtle Top Kicker */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-rose-950/50 border border-rose-900/60 backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5 text-rose-300" />
            <span className="text-xs uppercase tracking-[0.25em] text-rose-200 font-medium">
              Boutique & Maison de Bien-Être · Le Havre
            </span>
          </div>

          {/* Main Hero Headline (as requested) */}
          <h1 className="font-serif-luxury text-4xl sm:text-5xl lg:text-6xl font-light text-neutral-50 tracking-tight leading-[1.15] text-balance">
            Découvrez une nouvelle expérience de bien-être
          </h1>

          {/* Subtitle */}
          <p className="text-sm sm:text-base text-neutral-300 font-light leading-relaxed max-w-xl">
            Lingerie d'exception, soins botaniques délicats et accessoires complices. Une invitation au raffinement, guidée par une discrétion absolue et l'écoute bienveillante de notre boutique havraise.
          </p>

          {/* Call to Actions */}
          <div className="pt-2 flex flex-wrap items-center gap-4">
            <button
              onClick={handleExploreShop}
              className="px-7 py-4 rounded-xl bg-gradient-to-r from-rose-800 to-rose-950 hover:from-rose-700 hover:to-rose-900 text-white text-xs sm:text-sm font-semibold tracking-wider uppercase transition-all shadow-xl hover:shadow-rose-950/50 flex items-center gap-2.5 cursor-pointer"
            >
              <span>Découvrir la boutique</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={handleVisitBoutique}
              className="px-6 py-4 rounded-xl bg-neutral-900/80 hover:bg-neutral-800 text-neutral-200 hover:text-white border border-neutral-700/80 text-xs sm:text-sm font-medium tracking-wide transition-all backdrop-blur-md flex items-center gap-2 cursor-pointer"
            >
              <MapPin className="w-4 h-4 text-rose-400" />
              <span>Notre boutique au Havre</span>
            </button>
          </div>

          {/* Reassurance Strip */}
          <div className="pt-8 border-t border-neutral-800/80 flex flex-wrap items-center gap-6 text-xs text-neutral-400">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-rose-400" />
              <span>Colis 100% neutre sans mention</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-rose-500" />
              <span>Retrait 1h en Boutique</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-rose-500" />
              <span>Conseils personnalisés & discrets</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
