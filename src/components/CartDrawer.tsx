import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { 
  X, 
  Trash2, 
  Plus, 
  Minus, 
  ShieldCheck, 
  ArrowRight, 
  Sparkles, 
  Tag, 
  Check 
} from 'lucide-react';

const FREE_SHIPPING_THRESHOLD = 65.0;

export const CartDrawer: React.FC = () => {
  const {
    isCartOpen,
    setIsCartOpen,
    cart,
    updateQuantity,
    removeFromCart,
    clearCart,
    cartSubtotal,
    discountAmount,
    cartTotal,
    appliedCoupon,
    applyCoupon,
    removeCoupon,
    openProductDetail,
    setIsCheckoutModalOpen,
  } = useShop();

  const [couponInput, setCouponInput] = useState('');
  const [couponError, setCouponError] = useState('');

  if (!isCartOpen) return null;

  const freeShippingProgress = Math.min(100, (cartSubtotal / FREE_SHIPPING_THRESHOLD) * 100);
  const remainingForFreeShipping = Math.max(0, FREE_SHIPPING_THRESHOLD - cartSubtotal);

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponInput.trim()) return;
    const res = applyCoupon(couponInput);
    if (!res.success) {
      setCouponError(res.message);
    } else {
      setCouponError('');
      setCouponInput('');
    }
  };

  const handleStartCheckout = () => {
    setIsCartOpen(false);
    setIsCheckoutModalOpen(true);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/75 backdrop-blur-sm transition-opacity"
        onClick={() => setIsCartOpen(false)}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#131116] border-l border-neutral-800 text-neutral-100 flex flex-col shadow-2xl">
          {/* Header */}
          <div className="p-5 border-b border-neutral-800 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="font-serif-luxury text-xl font-semibold tracking-wide">
                Votre Panier
              </span>
              <span className="text-xs text-neutral-400 bg-neutral-900 px-2 py-0.5 rounded-full border border-neutral-800">
                {cart.reduce((sum, i) => sum + i.quantity, 0)} article(s)
              </span>
            </div>
            <button
              onClick={() => setIsCartOpen(false)}
              className="p-1.5 text-neutral-400 hover:text-white rounded-full hover:bg-neutral-800 transition-colors"
              aria-label="Fermer le panier"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Shipping Progress Indicator */}
          <div className="px-5 py-3.5 bg-[#0f0e12] border-b border-neutral-800/80">
            <div className="flex items-center justify-between text-xs mb-1.5">
              <span className="text-neutral-300 flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-rose-400" />
                {remainingForFreeShipping > 0 ? (
                  <>Plus que <strong className="text-rose-300 font-semibold">{remainingForFreeShipping.toFixed(2)} €</strong> pour la livraison offerte</>
                ) : (
                  <span className="text-emerald-400 font-medium">Félicitations ! Livraison discrète offerte</span>
                )}
              </span>
              <span className="text-neutral-400 font-mono text-[11px]">
                {Math.round(freeShippingProgress)}%
              </span>
            </div>
            <div className="w-full bg-neutral-800 h-1.5 rounded-full overflow-hidden">
              <div
                className="bg-gradient-to-r from-rose-700 to-rose-400 h-full transition-all duration-300"
                style={{ width: `${freeShippingProgress}%` }}
              />
            </div>
          </div>

          {/* Cart Item List */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4 divide-y divide-neutral-800/60">
            {cart.length === 0 ? (
              <div className="text-center py-16 space-y-4">
                <div className="w-16 h-16 mx-auto rounded-full bg-neutral-900 border border-neutral-800 flex items-center justify-center text-neutral-500">
                  <ShieldCheck className="w-8 h-8 text-neutral-600" />
                </div>
                <h4 className="font-serif-luxury text-xl text-neutral-300">Votre panier est vide</h4>
                <p className="text-xs text-neutral-500 max-w-xs mx-auto">
                  Découvrez notre sélection de lingerie raffinée, bougies d'ambiance et soins de bien-être intime.
                </p>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="mt-4 px-6 py-2.5 rounded-lg bg-rose-900/60 hover:bg-rose-800 text-rose-100 text-xs font-medium tracking-wide transition-colors"
                >
                  Explorer la boutique
                </button>
              </div>
            ) : (
              cart.map((item) => (
                <div key={item.id} className="pt-4 first:pt-0 flex gap-4">
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="w-20 h-24 object-cover rounded-md bg-neutral-900 border border-neutral-800 shrink-0 cursor-pointer"
                    onClick={() => {
                      setIsCartOpen(false);
                      openProductDetail(item.product.id);
                    }}
                  />
                  <div className="flex-1 min-w-0 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between gap-2">
                        <h4
                          onClick={() => {
                            setIsCartOpen(false);
                            openProductDetail(item.product.id);
                          }}
                          className="text-sm font-medium text-neutral-100 hover:text-rose-200 cursor-pointer line-clamp-1"
                        >
                          {item.product.name}
                        </h4>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="text-neutral-500 hover:text-rose-400 p-1 transition-colors"
                          title="Supprimer l'article"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      <div className="text-xs text-neutral-400 mt-1 flex flex-wrap gap-2">
                        {item.selectedSize && <span>Taille : {item.selectedSize}</span>}
                        {item.selectedSize && item.selectedColor && <span>·</span>}
                        {item.selectedColor && <span>Coloris : {item.selectedColor}</span>}
                      </div>

                      <div className="text-xs text-neutral-500 mt-0.5">
                        {item.product.brand}
                      </div>
                    </div>

                    <div className="flex items-center justify-between mt-3">
                      {/* Quantity Stepper */}
                      <div className="flex items-center border border-neutral-800 rounded bg-[#0b0a0d]">
                        <button
                          onClick={() => updateQuantity(item.id, -1)}
                          className="p-1.5 text-neutral-400 hover:text-white transition-colors"
                          aria-label="Diminuer la quantité"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="px-3 text-xs font-semibold tabular-nums">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, 1)}
                          className="p-1.5 text-neutral-400 hover:text-white transition-colors"
                          aria-label="Augmenter la quantité"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      {/* Price */}
                      <div className="text-right">
                        <span className="text-sm font-semibold text-neutral-100 tabular-nums">
                          {(item.product.price * item.quantity).toFixed(2)} €
                        </span>
                        {item.quantity > 1 && (
                          <div className="text-[10px] text-neutral-500">
                            {item.product.price.toFixed(2)} € / unité
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Cart Footer */}
          {cart.length > 0 && (
            <div className="p-5 bg-[#0f0e12] border-t border-neutral-800 space-y-4">
              {/* Promo Code Input */}
              <div>
                {appliedCoupon ? (
                  <div className="flex items-center justify-between p-2.5 bg-rose-950/40 border border-rose-900/60 rounded-lg text-xs">
                    <div className="flex items-center gap-2 text-rose-200">
                      <Tag className="w-3.5 h-3.5 text-rose-400" />
                      <span>Code <strong>{appliedCoupon}</strong> (-{appliedCoupon === 'HAVRE15' ? '15%' : '10%'})</span>
                    </div>
                    <button
                      onClick={removeCoupon}
                      className="text-xs text-neutral-400 hover:text-white underline cursor-pointer"
                    >
                      Retirer
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleApplyCoupon} className="flex gap-2">
                    <input
                      type="text"
                      value={couponInput}
                      onChange={(e) => {
                        setCouponInput(e.target.value);
                        setCouponError('');
                      }}
                      placeholder="Code promo (ex: BIENVENUE10)"
                      className="flex-1 py-2 px-3 text-xs bg-neutral-900 border border-neutral-800 rounded-lg text-neutral-100 placeholder-neutral-500 focus:outline-none focus:border-rose-800"
                    />
                    <button
                      type="submit"
                      className="px-4 py-2 bg-neutral-800 hover:bg-neutral-700 text-neutral-200 text-xs font-medium rounded-lg transition-colors cursor-pointer"
                    >
                      Appliquer
                    </button>
                  </form>
                )}
                {couponError && (
                  <p className="text-[11px] text-rose-400 mt-1">{couponError}</p>
                )}
              </div>

              {/* Price Calculation Details */}
              <div className="space-y-1.5 text-xs text-neutral-400">
                <div className="flex justify-between">
                  <span>Sous-total articles</span>
                  <span className="font-mono tabular-nums text-neutral-200">
                    {cartSubtotal.toFixed(2)} €
                  </span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between text-rose-400 font-medium">
                    <span>Remise privilège</span>
                    <span className="font-mono tabular-nums">
                      - {discountAmount.toFixed(2)} €
                    </span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Livraison discrète (Colissimo neutre)</span>
                  <span className="font-mono tabular-nums text-neutral-200">
                    {remainingForFreeShipping === 0 ? (
                      <span className="text-emerald-400 uppercase text-[10px] tracking-wider">Offerte</span>
                    ) : (
                      '4.90 €'
                    )}
                  </span>
                </div>
                <div className="pt-2 border-t border-neutral-800 flex justify-between items-baseline text-sm text-neutral-100">
                  <span className="font-medium">Total estimé TTC</span>
                  <div className="text-right">
                    <span className="text-lg font-bold font-mono tabular-nums text-rose-300">
                      {(cartTotal + (remainingForFreeShipping === 0 ? 0 : 4.9)).toFixed(2)} €
                    </span>
                  </div>
                </div>
              </div>

              {/* Checkout Simulator CTA */}
              <button
                onClick={handleStartCheckout}
                className="w-full py-3.5 px-4 rounded-lg bg-gradient-to-r from-rose-800 to-rose-950 hover:from-rose-700 hover:to-rose-900 text-white font-medium text-xs tracking-wider uppercase transition-all shadow-lg flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Commander en toute discrétion</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              {/* Discreet shipping note */}
              <div className="text-[11px] text-neutral-500 text-center flex items-center justify-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-neutral-400" />
                <span>Colis neutre sans logo ni mention de la boutique</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
