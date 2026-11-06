import React from 'react';
import { useShop } from '../context/ShopContext';
import { Tag, ArrowRight, Sparkles, Check } from 'lucide-react';

export const PromotionalBanner: React.FC = () => {
  const { applyCoupon, appliedCoupon, setCurrentView, setCatalogCategory } = useShop();

  const handleApplyPromo = () => {
    applyCoupon('BIENVENUE10');
  };

  const handleExploreOffers = () => {
    setCatalogCategory('promotions');
    setCurrentView('catalog');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section className="py-16 bg-[#0c0b0e] border-y border-neutral-800/80 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl bg-gradient-to-r from-neutral-900 via-[#1a1217] to-neutral-900 border border-neutral-800 p-8 sm:p-12 lg:p-16 overflow-hidden">
          {/* Subtle background glow */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-rose-950/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-amber-950/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left text column */}
            <div className="lg:col-span-8 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-950/60 border border-rose-900/60 text-xs text-rose-300 font-medium">
                <Sparkles className="w-3.5 h-3.5 text-rose-400" />
                <span>Offre de Bienvenue Exclusive</span>
              </div>

              <h2 className="font-serif-luxury text-3xl sm:text-4xl lg:text-5xl font-light text-neutral-100 leading-tight">
                -10% sur votre première commande avec le code <span className="text-rose-400 font-mono italic">BIENVENUE10</span>
              </h2>

              <p className="text-xs sm:text-sm text-neutral-300 max-w-xl font-light leading-relaxed">
                Profitez d'un privilège exceptionnel sur toute la boutique en ligne. Valable sur nos ensembles de lingerie fine, huiles de massage botaniques et bougies sensorielles.
              </p>

              {/* Code promo card with 1-click activation */}
              <div className="pt-2 flex flex-wrap items-center gap-4">
                <div className="flex items-center gap-3 p-2 px-4 rounded-xl bg-black/60 border border-rose-900/50 backdrop-blur-sm">
                  <Tag className="w-4 h-4 text-rose-400" />
                  <span className="font-mono text-sm tracking-wider font-semibold text-rose-200">
                    BIENVENUE10
                  </span>
                  <button
                    onClick={handleApplyPromo}
                    className={`text-[11px] font-semibold px-2.5 py-1 rounded transition-colors cursor-pointer ${
                      appliedCoupon === 'BIENVENUE10'
                        ? 'bg-emerald-950 text-emerald-300 border border-emerald-800'
                        : 'bg-rose-900 hover:bg-rose-800 text-white'
                    }`}
                  >
                    {appliedCoupon === 'BIENVENUE10' ? (
                      <span className="flex items-center gap-1">
                        <Check className="w-3 h-3" /> Appliqué
                      </span>
                    ) : (
                      'Activer immédiatement'
                    )}
                  </button>
                </div>

                <button
                  onClick={handleExploreOffers}
                  className="inline-flex items-center gap-2 text-xs uppercase tracking-wider text-neutral-200 hover:text-white font-medium underline underline-offset-8 transition-colors cursor-pointer"
                >
                  <span>Découvrir les offres privilèges</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Right highlight column */}
            <div className="lg:col-span-4 bg-black/40 rounded-2xl p-6 border border-neutral-800/80 backdrop-blur-md space-y-4">
              <div className="text-xs uppercase tracking-widest text-neutral-400 font-medium">
                Engagements SCANDAL LH
              </div>
              <div className="space-y-3 text-xs text-neutral-300">
                <div className="flex items-start gap-2.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-rose-500 mt-1.5 shrink-0" />
                  <span>Emballage 100% neutre sans aucune mention extérieure</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-rose-500 mt-1.5 shrink-0" />
                  <span>Retrait discret 1h à notre boutique au Havre</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-rose-500 mt-1.5 shrink-0" />
                  <span>Conseils personnalisés par notre équipe bienveillante</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
