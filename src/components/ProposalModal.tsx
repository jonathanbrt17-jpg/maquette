import React from 'react';
import { useShop } from '../context/ShopContext';
import { 
  X, 
  Sparkles, 
  CheckCircle, 
  ArrowRight, 
  Smartphone, 
  Zap, 
  Shield, 
  TrendingUp, 
  Palette,
  ExternalLink
} from 'lucide-react';

export const ProposalModal: React.FC = () => {
  const { isCommercialProposalOpen, setIsCommercialProposalOpen, setCurrentView } = useShop();

  if (!isCommercialProposalOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md overflow-y-auto">
      <div 
        className="w-full max-w-4xl bg-[#141217] border border-neutral-800 rounded-2xl shadow-2xl overflow-hidden my-6"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-6 bg-[#0f0e12] border-b border-neutral-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-950/40 border border-amber-800/60 flex items-center justify-center text-amber-400">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <div className="text-[11px] uppercase tracking-widest text-amber-400 font-semibold">
                Proposition Commerciale
              </div>
              <h3 className="font-serif-luxury text-2xl font-semibold text-neutral-100">
                Concept de Modernisation SCANDAL LH
              </h3>
            </div>
          </div>
          <button
            onClick={() => setIsCommercialProposalOpen(false)}
            className="p-2 text-neutral-400 hover:text-white rounded-full hover:bg-neutral-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 sm:p-8 space-y-8 max-h-[75vh] overflow-y-auto text-neutral-300 text-sm">
          {/* Hero Statement */}
          <div className="p-5 rounded-xl bg-gradient-to-r from-neutral-900 to-[#19151c] border border-neutral-800 space-y-2">
            <p className="font-serif-luxury text-xl text-neutral-100 italic">
              « Concept de modernisation réalisé par Jojo Studio »
            </p>
            <p className="text-xs text-neutral-400 leading-relaxed">
              Cette maquette interactive a été spécialement élaborée par <strong>Jojo Studio</strong> comme démonstrateur technologique et visuel pour présenter à l’équipe de <strong>SCANDAL LH</strong> une vision contemporaine, luxueuse et raffinée de leur future boutique en ligne.
            </p>
          </div>

          {/* Diagnostic & Ambition */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3 p-5 rounded-xl bg-[#0e0d11] border border-neutral-800/80">
              <h4 className="font-serif-luxury text-lg text-neutral-100 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-rose-500" />
                Le Constat du Site Actuel
              </h4>
              <ul className="text-xs text-neutral-400 space-y-2">
                <li className="flex items-start gap-2">
                  <span className="text-neutral-500">·</span>
                  Design vieillissant qui ne reflète pas pleinement le positionnement haut de gamme et bienveillant de la boutique.
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-neutral-500">·</span>
                  Navigation mobile complexe avec des temps de chargement perfectibles.
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-neutral-500">·</span>
                  Manque de mise en valeur de la boutique physique située au Havre et du retrait Click & Collect.
                </li>
              </ul>
            </div>

            <div className="space-y-3 p-5 rounded-xl bg-[#0e0d11] border border-neutral-800/80">
              <h4 className="font-serif-luxury text-lg text-neutral-100 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                La Réponse Jojo Studio
              </h4>
              <ul className="text-xs text-neutral-300 space-y-2">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                  Direction artistique élégante, sensuelle et non explicite, adaptée à un public exigeant.
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                  Expérience d’achat discrète, fluide et ultra-rapide sur smartphone et ordinateur.
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                  Mise en avant de l’ancrage havrais, du service client et des garanties d’emballage neutre.
                </li>
              </ul>
            </div>
          </div>

          {/* 5 Core Pillars */}
          <div className="space-y-4">
            <h4 className="font-serif-luxury text-xl text-neutral-100">
              Les 5 Piliers d’Excellence de cette Refonte
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="p-4 rounded-xl bg-neutral-900/50 border border-neutral-800 space-y-2">
                <Palette className="w-5 h-5 text-rose-400" />
                <h5 className="font-medium text-neutral-200 text-sm">Univers Visuel Chic & Discret</h5>
                <p className="text-xs text-neutral-400">
                  Palette noir profond, bordeaux délicat et ivoire satiné. Typographie éditoriale haute parfumerie.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-neutral-900/50 border border-neutral-800 space-y-2">
                <Smartphone className="w-5 h-5 text-rose-400" />
                <h5 className="font-medium text-neutral-200 text-sm">Mobile-First Ultime</h5>
                <p className="text-xs text-neutral-400">
                  Menu fluide, tiroir panier instantané, boutons tactiles de 44px+ et zéro friction au défilement.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-neutral-900/50 border border-neutral-800 space-y-2">
                <Zap className="w-5 h-5 text-rose-400" />
                <h5 className="font-medium text-neutral-200 text-sm">Vitesse & Fluidité Headless</h5>
                <p className="text-xs text-neutral-400">
                  Temps de chargement quasi-instantané (&lt; 0.8s) pour réduire le taux de rebond et maximiser les conversions.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-neutral-900/50 border border-neutral-800 space-y-2">
                <Shield className="w-5 h-5 text-rose-400" />
                <h5 className="font-medium text-neutral-200 text-sm">Réassurance & Discrétion</h5>
                <p className="text-xs text-neutral-400">
                  Rappel permanent de l’emballage 100% neutre sans logo extérieur et du respect de la vie privée.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-neutral-900/50 border border-neutral-800 space-y-2">
                <TrendingUp className="w-5 h-5 text-rose-400" />
                <h5 className="font-medium text-neutral-200 text-sm">Optimisation du Panier Moyen</h5>
                <p className="text-xs text-neutral-400">
                  Jauge de livraison gratuite dynamique, cross-selling subtil et code promo privilège pré-intégré.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-neutral-900/50 border border-neutral-800 space-y-2">
                <Sparkles className="w-5 h-5 text-rose-400" />
                <h5 className="font-medium text-neutral-200 text-sm">Synergie Web & Boutique LH</h5>
                <p className="text-xs text-neutral-400">
                  Click & Collect en 1h dans la boutique havraise pour connecter la clientèle locale au digital.
                </p>
              </div>
            </div>
          </div>

          {/* Technical Note */}
          <div className="p-4 bg-neutral-900/40 rounded-xl border border-neutral-800 text-xs text-neutral-400 space-y-1">
            <span className="font-semibold text-neutral-300">Spécifications de la maquette :</span>
            <p>
              Composants React / TypeScript modulaires, animations fluides, gestion de panier en mémoire vive, recherche temps-réel, filtres multi-critères, sans dépendance tierce vulnérable ni stockage de données personnelles.
            </p>
          </div>
        </div>

        {/* Footer actions */}
        <div className="p-6 bg-[#0f0e12] border-t border-neutral-800 flex flex-wrap items-center justify-between gap-4">
          <span className="text-xs text-neutral-500">
            Jojo Studio · Studio de Création Numérique & E-Commerce
          </span>
          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                setIsCommercialProposalOpen(false);
                setCurrentView('catalog');
              }}
              className="px-5 py-2.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-200 text-xs font-medium transition-colors"
            >
              Tester le catalogue
            </button>
            <button
              onClick={() => setIsCommercialProposalOpen(false)}
              className="px-5 py-2.5 rounded-lg bg-rose-900 hover:bg-rose-800 text-white text-xs font-medium transition-colors"
            >
              Continuer la visite
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
