import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { 
  X, 
  ShieldCheck, 
  MapPin, 
  Truck, 
  CheckCircle2, 
  Lock, 
  Sparkles, 
  Store 
} from 'lucide-react';

export const CheckoutModal: React.FC = () => {
  const {
    isCheckoutModalOpen,
    setIsCheckoutModalOpen,
    cart,
    cartTotal,
    discountAmount,
    appliedCoupon,
    clearCart,
  } = useShop();

  const [deliveryType, setDeliveryType] = useState<'colissimo' | 'boutique'>('colissimo');
  const [formData, setFormData] = useState({
    prenom: 'Claire',
    nom: 'Dubois',
    email: 'claire.dubois@exemple.fr',
    telephone: '06 12 34 56 78',
    adresse: '14 Rue de Paris',
    codePostal: '76600',
    ville: 'Le Havre',
    instructions: 'Colis sans signature en boîte aux lettres',
  });

  const [isSuccess, setIsSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isCheckoutModalOpen) return null;

  const shippingCost = deliveryType === 'boutique' ? 0 : cartTotal >= 65 ? 0 : 4.9;
  const finalTotal = cartTotal + shippingCost;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      clearCart();
    }, 900);
  };

  const handleClose = () => {
    setIsCheckoutModalOpen(false);
    setIsSuccess(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md overflow-y-auto">
      <div 
        className="w-full max-w-2xl bg-[#141217] border border-neutral-800 rounded-2xl shadow-2xl overflow-hidden my-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header */}
        <div className="p-5 border-b border-neutral-800 flex items-center justify-between bg-[#0f0e12]">
          <div className="flex items-center gap-2">
            <Lock className="w-4 h-4 text-rose-400" />
            <h3 className="font-serif-luxury text-xl font-semibold text-neutral-100">
              {isSuccess ? 'Confirmation de Commande Simulée' : 'Finalisation de la Commande (Simulation)'}
            </h3>
          </div>
          <button
            onClick={handleClose}
            className="p-1.5 text-neutral-400 hover:text-white rounded-full hover:bg-neutral-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {isSuccess ? (
          /* Confirmation Screen */
          <div className="p-8 text-center space-y-6">
            <div className="w-16 h-16 mx-auto rounded-full bg-rose-950/60 border border-rose-800 flex items-center justify-center">
              <CheckCircle2 className="w-8 h-8 text-rose-300" />
            </div>

            <div className="space-y-2">
              <h4 className="font-serif-luxury text-2xl font-semibold text-neutral-100">
                Commande de démonstration enregistrée !
              </h4>
              <p className="text-xs text-neutral-400 max-w-md mx-auto">
                Référence fictive : <strong className="text-neutral-200 font-mono">SCANDAL-LH-2026-DEMO</strong>
              </p>
            </div>

            {/* Jojo Studio Commercial Disclaimer Card */}
            <div className="p-4 bg-amber-950/20 border border-amber-800/40 rounded-xl text-left space-y-2">
              <div className="flex items-center gap-2 text-amber-300 font-medium text-xs">
                <Sparkles className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Information importante · Maquette Jojo Studio</span>
              </div>
              <p className="text-xs text-neutral-300 leading-relaxed">
                Ceci est une simulation interactive conçue par <strong>Jojo Studio</strong> pour la proposition commerciale de refonte de <strong>SCANDAL LH</strong>. Aucun paiement réel n’a été prélevé et aucune donnée bancaire n’a été requise.
              </p>
            </div>

            {/* Summary card */}
            <div className="bg-[#0b0a0d] p-4 rounded-xl border border-neutral-800 text-left text-xs space-y-2">
              <div className="flex justify-between text-neutral-400">
                <span>Destinataire simulé :</span>
                <span className="text-neutral-200">{formData.prenom} {formData.nom}</span>
              </div>
              <div className="flex justify-between text-neutral-400">
                <span>Mode choisi :</span>
                <span className="text-neutral-200">
                  {deliveryType === 'boutique' ? 'Retrait 1h en Boutique au Havre' : 'Colissimo Emballage Neutre'}
                </span>
              </div>
              <div className="flex justify-between text-neutral-400">
                <span>Montant total simulé :</span>
                <span className="font-mono font-semibold text-rose-300">{finalTotal.toFixed(2)} €</span>
              </div>
            </div>

            <button
              onClick={handleClose}
              className="px-8 py-3 bg-neutral-800 hover:bg-neutral-700 text-white rounded-lg text-xs font-semibold tracking-wider uppercase transition-colors"
            >
              Retourner à la boutique
            </button>
          </div>
        ) : (
          /* Checkout Form */
          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            {/* Presentation banner */}
            <div className="p-3 bg-rose-950/20 border border-rose-900/40 rounded-lg flex items-center gap-2 text-xs text-rose-200/90">
              <ShieldCheck className="w-4 h-4 text-rose-400 shrink-0" />
              <span>
                Mode Démonstration · Testez le parcours client sans paiement réel.
              </span>
            </div>

            {/* Choice of delivery */}
            <div className="space-y-3">
              <label className="text-xs uppercase tracking-wider text-neutral-400 font-medium">
                1. Choisissez votre mode de réception
              </label>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setDeliveryType('colissimo')}
                  className={`p-4 rounded-xl border text-left transition-all cursor-pointer ${
                    deliveryType === 'colissimo'
                      ? 'border-rose-700 bg-rose-950/30 text-white'
                      : 'border-neutral-800 bg-neutral-900/60 text-neutral-400 hover:border-neutral-700'
                  }`}
                >
                  <div className="flex items-center gap-2 text-sm font-semibold mb-1 text-neutral-100">
                    <Truck className="w-4 h-4 text-rose-400" />
                    <span>Colissimo 100% Neutre</span>
                  </div>
                  <p className="text-xs text-neutral-400">
                    Livraison discrète à domicile en 48h. Aucune inscription extérieure.
                  </p>
                  <div className="mt-2 text-xs font-semibold text-rose-300 font-mono">
                    {cartTotal >= 65 ? 'Offert' : '4.90 €'}
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => setDeliveryType('boutique')}
                  className={`p-4 rounded-xl border text-left transition-all cursor-pointer ${
                    deliveryType === 'boutique'
                      ? 'border-rose-700 bg-rose-950/30 text-white'
                      : 'border-neutral-800 bg-neutral-900/60 text-neutral-400 hover:border-neutral-700'
                  }`}
                >
                  <div className="flex items-center gap-2 text-sm font-semibold mb-1 text-neutral-100">
                    <Store className="w-4 h-4 text-rose-400" />
                    <span>Retrait Boutique LH</span>
                  </div>
                  <p className="text-xs text-neutral-400">
                    Click & Collect disponible en 1h dans la boutique du Havre.
                  </p>
                  <div className="mt-2 text-xs font-semibold text-emerald-400">
                    Gratuit · Prêt en 1h
                  </div>
                </button>
              </div>
            </div>

            {/* Client Coordinates */}
            <div className="space-y-3">
              <label className="text-xs uppercase tracking-wider text-neutral-400 font-medium">
                2. Coordonnées de réception
              </label>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] text-neutral-400 mb-1">Prénom</label>
                  <input
                    type="text"
                    required
                    value={formData.prenom}
                    onChange={(e) => setFormData({ ...formData, prenom: e.target.value })}
                    className="w-full py-2 px-3 text-xs bg-neutral-900 border border-neutral-800 rounded-lg text-neutral-100 focus:outline-none focus:border-rose-700"
                  />
                </div>
                <div>
                  <label className="block text-[11px] text-neutral-400 mb-1">Nom</label>
                  <input
                    type="text"
                    required
                    value={formData.nom}
                    onChange={(e) => setFormData({ ...formData, nom: e.target.value })}
                    className="w-full py-2 px-3 text-xs bg-neutral-900 border border-neutral-800 rounded-lg text-neutral-100 focus:outline-none focus:border-rose-700"
                  />
                </div>
                <div>
                  <label className="block text-[11px] text-neutral-400 mb-1">Email</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full py-2 px-3 text-xs bg-neutral-900 border border-neutral-800 rounded-lg text-neutral-100 focus:outline-none focus:border-rose-700"
                  />
                </div>
                <div>
                  <label className="block text-[11px] text-neutral-400 mb-1">Téléphone</label>
                  <input
                    type="tel"
                    value={formData.telephone}
                    onChange={(e) => setFormData({ ...formData, telephone: e.target.value })}
                    className="w-full py-2 px-3 text-xs bg-neutral-900 border border-neutral-800 rounded-lg text-neutral-100 focus:outline-none focus:border-rose-700"
                  />
                </div>
              </div>

              {deliveryType === 'colissimo' && (
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                  <div className="sm:col-span-2">
                    <label className="block text-[11px] text-neutral-400 mb-1">Adresse</label>
                    <input
                      type="text"
                      required
                      value={formData.adresse}
                      onChange={(e) => setFormData({ ...formData, adresse: e.target.value })}
                      className="w-full py-2 px-3 text-xs bg-neutral-900 border border-neutral-800 rounded-lg text-neutral-100 focus:outline-none focus:border-rose-700"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] text-neutral-400 mb-1">Code Postal & Ville</label>
                    <input
                      type="text"
                      required
                      value={`${formData.codePostal} ${formData.ville}`}
                      onChange={(e) => setFormData({ ...formData, ville: e.target.value })}
                      className="w-full py-2 px-3 text-xs bg-neutral-900 border border-neutral-800 rounded-lg text-neutral-100 focus:outline-none focus:border-rose-700"
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Summary strip */}
            <div className="p-4 bg-[#0c0b0e] border border-neutral-800 rounded-xl space-y-2 text-xs">
              <div className="flex justify-between text-neutral-400">
                <span>Nombre d’articles :</span>
                <span className="text-neutral-200">{cart.reduce((s, i) => s + i.quantity, 0)}</span>
              </div>
              {appliedCoupon && (
                <div className="flex justify-between text-rose-400">
                  <span>Code avantage ({appliedCoupon}) :</span>
                  <span>- {discountAmount.toFixed(2)} €</span>
                </div>
              )}
              <div className="flex justify-between text-neutral-400">
                <span>Frais d’envoi neutre :</span>
                <span className="text-neutral-200">{shippingCost === 0 ? 'Gratuit' : `${shippingCost.toFixed(2)} €`}</span>
              </div>
              <div className="pt-2 border-t border-neutral-800 flex justify-between items-center text-sm">
                <span className="font-semibold text-neutral-100">Total de la commande simulée :</span>
                <span className="font-bold text-rose-300 font-mono text-base">{finalTotal.toFixed(2)} €</span>
              </div>
            </div>

            {/* Submit CTA */}
            <button
              type="submit"
              disabled={isSubmitting || cart.length === 0}
              className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-rose-800 to-rose-950 hover:from-rose-700 hover:to-rose-900 text-white font-semibold text-xs tracking-wider uppercase transition-all shadow-lg flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              {isSubmitting ? (
                <span>Validation en cours...</span>
              ) : (
                <>
                  <Lock className="w-4 h-4" />
                  <span>Confirmer la commande (Simulation)</span>
                </>
              )}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
