import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { Mail, CheckCircle, Shield } from 'lucide-react';

export const NewsletterSection: React.FC = () => {
  const { showToast, applyCoupon } = useShop();
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !email.includes('@')) return;
    setSubscribed(true);
    applyCoupon('BIENVENUE10');
    showToast('Bienvenue dans le Cercle Privilège Scandal LH !');
  };

  return (
    <section className="py-20 bg-[#09080b] border-b border-neutral-800/80">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neutral-900 border border-neutral-800 text-xs text-rose-300 font-medium">
          <Mail className="w-3.5 h-3.5 text-rose-400" />
          <span>Le Cercle Privilège</span>
        </div>

        <h2 className="font-serif-luxury text-3xl sm:text-4xl text-neutral-100 font-normal max-w-xl mx-auto leading-snug">
          Recevez nos invitations exclusives & avant-premières
        </h2>

        <p className="text-xs sm:text-sm text-neutral-400 font-light max-w-md mx-auto leading-relaxed">
          Inscrivez-vous pour recevoir nos sélections confidentielles, nos conseils bien-être et bénéficiez de 10% sur votre première commande.
        </p>

        {subscribed ? (
          <div className="p-5 max-w-md mx-auto bg-rose-950/30 border border-rose-900/60 rounded-xl text-center space-y-2">
            <CheckCircle className="w-6 h-6 text-emerald-400 mx-auto" />
            <h4 className="font-serif-luxury text-lg text-neutral-100 font-medium">
              Merci pour votre confiance
            </h4>
            <p className="text-xs text-neutral-300">
              Votre privilège de -10% avec le code <strong className="text-rose-300 font-mono">BIENVENUE10</strong> est automatiquement activé sur votre session.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="max-w-md mx-auto flex flex-col sm:flex-row gap-3">
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Votre adresse email confidentielle"
              className="flex-1 py-3 px-4 bg-neutral-900 border border-neutral-800 rounded-xl text-neutral-100 placeholder-neutral-500 text-xs focus:outline-none focus:border-rose-700 transition-colors"
            />
            <button
              type="submit"
              className="py-3 px-6 bg-gradient-to-r from-rose-800 to-rose-950 hover:from-rose-700 hover:to-rose-900 text-white rounded-xl text-xs font-semibold tracking-wider uppercase transition-all shadow-md cursor-pointer whitespace-nowrap"
            >
              Rejoindre
            </button>
          </form>
        )}

        <div className="flex items-center justify-center gap-1.5 text-[11px] text-neutral-500">
          <Shield className="w-3.5 h-3.5 text-neutral-600" />
          <span>Vos données restent strictement confidentielles · Désinscription en un clic</span>
        </div>
      </div>
    </section>
  );
};
