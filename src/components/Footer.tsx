import React from 'react';
import { useShop } from '../context/ShopContext';
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  ShieldCheck, 
  Sparkles, 
  Instagram, 
  Facebook 
} from 'lucide-react';

export const Footer: React.FC = () => {
  const { setCurrentView, setCatalogCategory, setIsCommercialProposalOpen } = useShop();

  const handleNav = (category: string) => {
    setCatalogCategory(category);
    setCurrentView('catalog');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#0b0a0d] text-neutral-400 border-t border-neutral-800 text-xs">
      {/* Top Footer with 4 Columns */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Col 1: Brand & Boutique LH */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex flex-col">
              <span className="font-serif-luxury text-2xl font-semibold tracking-[0.2em] text-neutral-100 uppercase">
                SCANDAL <span className="text-rose-500 font-light">LH</span>
              </span>
              <span className="text-[10px] tracking-[0.3em] text-neutral-400 uppercase font-light">
                Maison du Bien-Être Intime & Lingerie
              </span>
            </div>

            <p className="text-neutral-400 text-xs leading-relaxed max-w-sm">
              Boutique havraise dédiée à la lingerie de luxe, aux rituels de soins intimes et aux accessoires complices. Une approche contemporaine, bienveillante et résolument discrète.
            </p>

            <div className="space-y-2 pt-2 text-xs text-neutral-400">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-rose-500 shrink-0" />
                <span>Boutique au Havre (76600) · Retrait Click & Collect</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-neutral-500 shrink-0" />
                <span>Mardi – Samedi : 10h30 – 19h00</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-neutral-500 shrink-0" />
                <span>Conseil & Service : 02 35 XX XX XX</span>
              </div>
            </div>
          </div>

          {/* Col 2: Univers & Collections */}
          <div className="space-y-3">
            <h4 className="font-serif-luxury text-base text-neutral-200 tracking-wider font-semibold">
              Nos Univers
            </h4>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => handleNav('lingerie')}
                  className="hover:text-rose-300 transition-colors cursor-pointer"
                >
                  Lingerie Fine & Soie
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('bien-etre')}
                  className="hover:text-rose-300 transition-colors cursor-pointer"
                >
                  Bien-être & Élixirs botaniques
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('accessoires')}
                  className="hover:text-rose-300 transition-colors cursor-pointer"
                >
                  Accessoires complices
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('nouveautes')}
                  className="hover:text-rose-300 transition-colors cursor-pointer"
                >
                  Nouveautés 2026
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('promotions')}
                  className="text-rose-400 hover:text-rose-300 transition-colors cursor-pointer font-medium"
                >
                  Offres Privilèges
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Services & Engagements */}
          <div className="space-y-3">
            <h4 className="font-serif-luxury text-base text-neutral-200 tracking-wider font-semibold">
              Engagements
            </h4>
            <ul className="space-y-2 text-neutral-400">
              <li className="flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-rose-400" />
                <span>Emballage neutre sans logo</span>
              </li>
              <li>
                <button
                  onClick={() => {
                    setCurrentView('boutique');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Retrait Click & Collect 1h
                </button>
              </li>
              <li>
                <span>Livraison offerte dès 65€</span>
              </li>
              <li>
                <span>Retours discrets sous 14 jours</span>
              </li>
              <li>
                <span>Paiement crypté sécurisé</span>
              </li>
            </ul>
          </div>

          {/* Col 4: Informations légales & Réseaux */}
          <div className="space-y-3">
            <h4 className="font-serif-luxury text-base text-neutral-200 tracking-wider font-semibold">
              Informations
            </h4>
            <ul className="space-y-2">
              <li>
                <span className="hover:text-white transition-colors cursor-pointer">
                  Mentions Légales
                </span>
              </li>
              <li>
                <span className="hover:text-white transition-colors cursor-pointer">
                  Conditions Générales de Vente
                </span>
              </li>
              <li>
                <span className="hover:text-white transition-colors cursor-pointer">
                  Politique de Confidentialité
                </span>
              </li>
              <li>
                <span className="hover:text-white transition-colors cursor-pointer">
                  Livraisons & Retours
                </span>
              </li>
            </ul>

            <div className="pt-2">
              <div className="text-[11px] text-neutral-400 uppercase tracking-wider mb-2">
                Suivez Scandal LH
              </div>
              <div className="flex items-center gap-3">
                <a
                  href="https://www.instagram.com"
                  target="_blank"
                  rel="noreferrer"
                  className="p-2 rounded-lg bg-neutral-900 hover:bg-neutral-800 text-neutral-300 hover:text-rose-300 transition-colors"
                  aria-label="Instagram"
                >
                  <Instagram className="w-4 h-4" />
                </a>
                <a
                  href="https://www.facebook.com"
                  target="_blank"
                  rel="noreferrer"
                  className="p-2 rounded-lg bg-neutral-900 hover:bg-neutral-800 text-neutral-300 hover:text-rose-300 transition-colors"
                  aria-label="Facebook"
                >
                  <Facebook className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Legal Bar & Jojo Studio Proposal Link */}
      <div className="border-t border-neutral-900 bg-[#080709] py-6 px-4">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-neutral-500">
          <div>
            © 2026 SCANDAL LH — Tous droits réservés. Boutique au Havre, France.
          </div>

          {/* Jojo Studio discrete credit button */}
          <button
            onClick={() => setIsCommercialProposalOpen(true)}
            className="flex items-center gap-1.5 text-amber-400/80 hover:text-amber-300 transition-colors px-2 py-1 rounded hover:bg-amber-950/20 cursor-pointer"
          >
            <Sparkles className="w-3 h-3 text-amber-400" />
            <span>Concept de modernisation réalisé par Jojo Studio</span>
          </button>
        </div>
      </div>
    </footer>
  );
};
