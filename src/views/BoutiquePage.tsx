import React from 'react';
import { useShop } from '../context/ShopContext';
import { 
  MapPin, 
  Clock, 
  Phone, 
  Mail, 
  ShieldCheck, 
  Sparkles, 
  ArrowRight, 
  Store, 
  CheckCircle2, 
  HeartHandshake 
} from 'lucide-react';

export const BoutiquePage: React.FC = () => {
  const { setCurrentView, setCatalogCategory } = useShop();

  const handleShopOnline = () => {
    setCatalogCategory('all');
    setCurrentView('catalog');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#0c0b0e] py-12 sm:py-16 text-neutral-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Hero Section */}
        <div className="relative rounded-3xl overflow-hidden border border-neutral-800 bg-[#141217]">
          <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[500px]">
            {/* Text description */}
            <div className="lg:col-span-6 p-8 sm:p-12 lg:p-16 flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-950/60 border border-rose-900/60 text-xs text-rose-300 font-medium">
                  <MapPin className="w-3.5 h-3.5 text-rose-400" />
                  <span>Adresse Havraise</span>
                </div>
                <h1 className="font-serif-luxury text-3xl sm:text-4xl lg:text-5xl font-light text-neutral-50 leading-tight">
                  La Boutique SCANDAL LH au Havre
                </h1>
                <p className="text-xs sm:text-sm text-neutral-300 font-light leading-relaxed">
                  Située en plein cœur du Havre, notre boutique physique est pensée comme un sanctuaire élégant et chaleureux. Un lieu confidentiel où chaque visiteur est accueilli avec bienveillance, respect et écoute.
                </p>
              </div>

              {/* Quick Hours and Contacts */}
              <div className="p-5 bg-neutral-900/70 border border-neutral-800 rounded-2xl space-y-3 text-xs">
                <div className="flex items-center gap-3">
                  <Clock className="w-4 h-4 text-rose-400 shrink-0" />
                  <div>
                    <span className="font-medium text-neutral-200">Horaires d'ouverture :</span>
                    <div className="text-neutral-400">Du Mardi au Samedi : 10h30 – 13h00 / 14h00 – 19h00</div>
                  </div>
                </div>

                <div className="flex items-center gap-3 pt-2 border-t border-neutral-800">
                  <MapPin className="w-4 h-4 text-rose-400 shrink-0" />
                  <div>
                    <span className="font-medium text-neutral-200">Localisation :</span>
                    <div className="text-neutral-400">Centre-ville, 76600 Le Havre</div>
                  </div>
                </div>

                <div className="flex items-center gap-3 pt-2 border-t border-neutral-800">
                  <Phone className="w-4 h-4 text-rose-400 shrink-0" />
                  <div>
                    <span className="font-medium text-neutral-200">Téléphone de la boutique :</span>
                    <div className="text-neutral-400">02 35 XX XX XX (Conseils & réservations)</div>
                  </div>
                </div>
              </div>

              <div className="pt-2">
                <button
                  onClick={handleShopOnline}
                  className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-rose-800 to-rose-950 hover:from-rose-700 hover:to-rose-900 text-white text-xs font-semibold tracking-wider uppercase transition-all shadow-md flex items-center gap-2 cursor-pointer"
                >
                  <span>Commander en ligne & Retirer en 1h</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Boutique Atmosphere Photo */}
            <div className="lg:col-span-6 relative bg-neutral-900 min-h-[350px]">
              <img
                src="/src/assets/images/category_boutique_le_havre_1793958432754.jpg"
                alt="Intérieur de la boutique Scandal LH au Havre"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent lg:bg-gradient-to-r lg:from-[#141217] lg:via-transparent lg:to-transparent" />
            </div>
          </div>
        </div>

        {/* 3 Pillars of In-Store Experience */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl bg-[#131116] border border-neutral-800 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-neutral-900 border border-neutral-800 flex items-center justify-center text-rose-400">
              <Store className="w-5 h-5" />
            </div>
            <h3 className="font-serif-luxury text-xl font-medium text-neutral-100">
              Click & Collect Express 1h
            </h3>
            <p className="text-xs text-neutral-400 leading-relaxed">
              Commandez sereinement depuis votre smartphone et récupérez votre sac neutre en boutique 1 heure plus tard sans frais de port.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-[#131116] border border-neutral-800 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-neutral-900 border border-neutral-800 flex items-center justify-center text-rose-400">
              <HeartHandshake className="w-5 h-5" />
            </div>
            <h3 className="font-serif-luxury text-xl font-medium text-neutral-100">
              Conseils & Bienveillance
            </h3>
            <p className="text-xs text-neutral-400 leading-relaxed">
              Une oreille attentive pour vous orienter sur le choix des matières, les correspondances de tailles ou pour composer un cadeau mémorable.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-[#131116] border border-neutral-800 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-neutral-900 border border-neutral-800 flex items-center justify-center text-rose-400">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="font-serif-luxury text-xl font-medium text-neutral-100">
              Discrétion Absolue
            </h3>
            <p className="text-xs text-neutral-400 leading-relaxed">
              Que ce soit lors de votre passage en boutique ou pour vos achats en ligne, nous préservons méticuleusement votre anonymat et votre intimité.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
