import React from 'react';
import { useShop } from '../context/ShopContext';
import { Store, ShieldCheck, Lock, Headphones, MapPin } from 'lucide-react';

export const WhyScandalLH: React.FC = () => {
  const { setCurrentView } = useShop();

  return (
    <section className="py-20 bg-[#0d0c0e] border-b border-neutral-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <div className="text-xs uppercase tracking-[0.25em] text-rose-400 font-semibold">
            Confiance & Proximité
          </div>
          <h2 className="font-serif-luxury text-3xl sm:text-4xl text-neutral-100 font-normal">
            Pourquoi Choisir SCANDAL LH
          </h2>
          <p className="text-xs sm:text-sm text-neutral-400 font-light leading-relaxed">
            Une maison ancrée au Havre qui allie l'exigence d'une boutique physique accueillante à la simplicité d'une commande en ligne confidentielle.
          </p>
        </div>

        {/* 4 Pillars Grid (as requested) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* 1. Boutique physique */}
          <div className="p-6 rounded-2xl bg-[#131116] border border-neutral-800/80 hover:border-neutral-700 transition-all space-y-4">
            <div className="w-12 h-12 rounded-xl bg-neutral-900 border border-neutral-800 flex items-center justify-center text-rose-400">
              <Store className="w-6 h-6" />
            </div>
            <div className="space-y-2">
              <h3 className="font-serif-luxury text-xl font-medium text-neutral-100">
                Boutique Physique au Havre
              </h3>
              <p className="text-xs text-neutral-400 leading-relaxed">
                Une adresse havraise chaleureuse où découvrir nos collections, toucher les matières et bénéficier d'un accueil respectueux et sans jugement.
              </p>
            </div>
            <button
              onClick={() => {
                setCurrentView('boutique');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="text-xs text-rose-300 hover:text-rose-200 font-medium inline-flex items-center gap-1 cursor-pointer pt-2"
            >
              <MapPin className="w-3.5 h-3.5" />
              <span>Visiter la boutique</span>
            </button>
          </div>

          {/* 2. Livraison discrète */}
          <div className="p-6 rounded-2xl bg-[#131116] border border-neutral-800/80 hover:border-neutral-700 transition-all space-y-4">
            <div className="w-12 h-12 rounded-xl bg-neutral-900 border border-neutral-800 flex items-center justify-center text-rose-400">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div className="space-y-2">
              <h3 className="font-serif-luxury text-xl font-medium text-neutral-100">
                Livraison Discrète & Neutre
              </h3>
              <p className="text-xs text-neutral-400 leading-relaxed">
                Votre intimité est notre priorité. Tous les colis sont expédiés sous emballage carton neutre, sans logo ni mention de la nature du contenu.
              </p>
            </div>
            <span className="text-xs text-neutral-500 font-mono block pt-2">
              Confidentialité 100% garantie
            </span>
          </div>

          {/* 3. Paiement sécurisé */}
          <div className="p-6 rounded-2xl bg-[#131116] border border-neutral-800/80 hover:border-neutral-700 transition-all space-y-4">
            <div className="w-12 h-12 rounded-xl bg-neutral-900 border border-neutral-800 flex items-center justify-center text-rose-400">
              <Lock className="w-6 h-6" />
            </div>
            <div className="space-y-2">
              <h3 className="font-serif-luxury text-xl font-medium text-neutral-100">
                Paiement Sécurisé
              </h3>
              <p className="text-xs text-neutral-400 leading-relaxed">
                Transactions cryptées selon les normes bancaires les plus strictes avec libellé discret sur vos relevés pour préserver votre tranquillité.
              </p>
            </div>
            <span className="text-xs text-neutral-500 font-mono block pt-2">
              Chiffrement SSL / 3D-Secure
            </span>
          </div>

          {/* 4. Service client */}
          <div className="p-6 rounded-2xl bg-[#131116] border border-neutral-800/80 hover:border-neutral-700 transition-all space-y-4">
            <div className="w-12 h-12 rounded-xl bg-neutral-900 border border-neutral-800 flex items-center justify-center text-rose-400">
              <Headphones className="w-6 h-6" />
            </div>
            <div className="space-y-2">
              <h3 className="font-serif-luxury text-xl font-medium text-neutral-100">
                Service Client Dédié
              </h3>
              <p className="text-xs text-neutral-400 leading-relaxed">
                Une équipe locale à votre écoute par téléphone ou en boutique pour vous guider dans le choix des tailles, des matières et des rituels.
              </p>
            </div>
            <span className="text-xs text-neutral-500 block pt-2">
              Du mardi au samedi
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};
