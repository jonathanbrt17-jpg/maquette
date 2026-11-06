import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { 
  X, 
  Heart, 
  ShoppingBag, 
  Star, 
  ShieldCheck, 
  Check, 
  ArrowRight 
} from 'lucide-react';

export const QuickViewModal: React.FC = () => {
  const {
    quickViewProduct,
    setQuickViewProduct,
    addToCart,
    toggleWishlist,
    isInWishlist,
    openProductDetail,
  } = useShop();

  const [selectedSize, setSelectedSize] = useState<string>('');
  const [selectedColor, setSelectedColor] = useState<string>('');
  const [quantity, setQuantity] = useState(1);

  if (!quickViewProduct) return null;

  const product = quickViewProduct;
  const isFav = isInWishlist(product.id);

  const activeSize = selectedSize || (product.sizes ? product.sizes[0] : undefined);
  const activeColor = selectedColor || (product.colors ? product.colors[0].name : undefined);

  const handleAddToCart = () => {
    addToCart(product, quantity, activeSize, activeColor);
    setQuickViewProduct(null);
  };

  const handleViewFullPage = () => {
    setQuickViewProduct(null);
    openProductDetail(product.id);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in overflow-y-auto">
      <div 
        className="w-full max-w-3xl bg-[#141217] border border-neutral-800 rounded-2xl shadow-2xl overflow-hidden my-6"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative grid grid-cols-1 md:grid-cols-2">
          {/* Close button */}
          <button
            onClick={() => setQuickViewProduct(null)}
            className="absolute top-4 right-4 z-10 p-2 text-neutral-400 hover:text-white rounded-full bg-black/50 hover:bg-black/80 transition-colors"
            aria-label="Fermer"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Product Image */}
          <div className="relative bg-neutral-900 h-72 md:h-full min-h-[340px] flex items-center justify-center overflow-hidden">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover"
            />
            {product.isBestseller && (
              <span className="absolute top-4 left-4 bg-rose-950/90 text-rose-200 border border-rose-800/60 text-[10px] font-semibold tracking-widest uppercase px-2.5 py-1 rounded">
                Coup de Cœur
              </span>
            )}
          </div>

          {/* Product Info */}
          <div className="p-6 md:p-8 flex flex-col justify-between space-y-6">
            <div className="space-y-3">
              {/* Brand and Subcategory */}
              <div className="text-xs uppercase tracking-widest text-neutral-400 font-medium">
                {product.brand} · {product.subcategory}
              </div>

              {/* Title */}
              <h3 className="font-serif-luxury text-2xl font-semibold text-neutral-100 leading-snug">
                {product.name}
              </h3>

              {/* Rating */}
              <div className="flex items-center gap-2 text-xs text-neutral-400">
                <div className="flex items-center text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-3.5 h-3.5 ${
                        i < Math.floor(product.rating)
                          ? 'fill-amber-400'
                          : 'text-neutral-600'
                      }`}
                    />
                  ))}
                </div>
                <span className="font-mono">{product.rating}</span>
                <span>({product.reviewsCount} avis vérifiés)</span>
              </div>

              {/* Price */}
              <div className="flex items-baseline gap-3 pt-1">
                <span className="text-2xl font-bold font-mono text-neutral-100 tabular-nums">
                  {product.price.toFixed(2)} €
                </span>
                {product.originalPrice && (
                  <span className="text-sm line-through text-neutral-500 font-mono tabular-nums">
                    {product.originalPrice.toFixed(2)} €
                  </span>
                )}
              </div>

              {/* Short Description */}
              <p className="text-xs text-neutral-300 leading-relaxed">
                {product.description}
              </p>

              {/* Sizes Selector */}
              {product.sizes && (
                <div className="space-y-1.5 pt-2">
                  <span className="text-xs text-neutral-400 font-medium">Taille :</span>
                  <div className="flex flex-wrap gap-2">
                    {product.sizes.map((size) => (
                      <button
                        key={size}
                        type="button"
                        onClick={() => setSelectedSize(size)}
                        className={`px-3 py-1 text-xs rounded border transition-colors cursor-pointer ${
                          activeSize === size
                            ? 'border-rose-600 bg-rose-950/40 text-rose-200 font-semibold'
                            : 'border-neutral-800 bg-neutral-900 text-neutral-300 hover:border-neutral-700'
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Colors Selector */}
              {product.colors && (
                <div className="space-y-1.5 pt-2">
                  <span className="text-xs text-neutral-400 font-medium">
                    Coloris : <span className="text-neutral-200">{activeColor}</span>
                  </span>
                  <div className="flex items-center gap-2">
                    {product.colors.map((c) => (
                      <button
                        key={c.name}
                        type="button"
                        onClick={() => setSelectedColor(c.name)}
                        className={`w-6 h-6 rounded-full border-2 transition-all cursor-pointer flex items-center justify-center ${
                          activeColor === c.name
                            ? 'border-rose-500 scale-110 shadow-sm'
                            : 'border-transparent opacity-80 hover:opacity-100'
                        }`}
                        style={{ backgroundColor: c.hex }}
                        title={c.name}
                      >
                        {activeColor === c.name && (
                          <Check className="w-3 h-3 text-white drop-shadow" />
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Actions */}
            <div className="space-y-3 pt-3 border-t border-neutral-800">
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={handleAddToCart}
                  className="flex-1 py-3 px-4 rounded-xl bg-gradient-to-r from-rose-800 to-rose-950 hover:from-rose-700 hover:to-rose-900 text-white font-medium text-xs tracking-wider uppercase transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Ajouter au panier</span>
                </button>

                <button
                  type="button"
                  onClick={() => toggleWishlist(product.id)}
                  className={`p-3 rounded-xl border transition-colors cursor-pointer ${
                    isFav
                      ? 'border-rose-700 bg-rose-950/40 text-rose-400'
                      : 'border-neutral-800 bg-neutral-900 text-neutral-400 hover:text-white'
                  }`}
                  aria-label="Ajouter aux favoris"
                >
                  <Heart className={`w-4 h-4 ${isFav ? 'fill-rose-500' : ''}`} />
                </button>
              </div>

              <div className="flex items-center justify-between text-xs text-neutral-400 pt-1">
                <span className="flex items-center gap-1.5 text-neutral-400">
                  <ShieldCheck className="w-3.5 h-3.5 text-rose-400" />
                  Emballage neutre sans mention
                </span>
                <button
                  onClick={handleViewFullPage}
                  className="text-rose-400 hover:text-rose-300 font-medium flex items-center gap-1 cursor-pointer"
                >
                  <span>Fiche détaillée</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
