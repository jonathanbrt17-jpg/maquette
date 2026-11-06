import React from 'react';
import { Product } from '../data/products';
import { useShop } from '../context/ShopContext';
import { Heart, Eye, ShoppingBag, Star } from 'lucide-react';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart, toggleWishlist, isInWishlist, setQuickViewProduct, openProductDetail } = useShop();
  const isFav = isInWishlist(product.id);

  return (
    <div className="group relative flex flex-col bg-[#121115] border border-neutral-800/80 rounded-xl overflow-hidden hover:border-neutral-700 transition-all duration-300 hover:shadow-xl hover:-translate-y-0.5">
      {/* Image Container */}
      <div className="relative aspect-[4/5] bg-neutral-900 overflow-hidden cursor-pointer">
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          onClick={() => openProductDetail(product.id)}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
        />

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10 pointer-events-none">
          {product.isBestseller && (
            <span className="bg-rose-950/90 text-rose-200 border border-rose-800/60 text-[10px] font-semibold tracking-wider uppercase px-2 py-0.5 rounded backdrop-blur-sm">
              Coup de cœur
            </span>
          )}
          {product.isNew && (
            <span className="bg-neutral-900/90 text-neutral-200 border border-neutral-700/60 text-[10px] font-semibold tracking-wider uppercase px-2 py-0.5 rounded backdrop-blur-sm">
              Nouveauté
            </span>
          )}
          {product.isPromo && (
            <span className="bg-amber-950/90 text-amber-300 border border-amber-800/60 text-[10px] font-semibold tracking-wider uppercase px-2 py-0.5 rounded backdrop-blur-sm">
              Privilège
            </span>
          )}
        </div>

        {/* Favorite Button */}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            toggleWishlist(product.id);
          }}
          className={`absolute top-3 right-3 z-10 p-2 rounded-full backdrop-blur-md transition-all cursor-pointer ${
            isFav
              ? 'bg-rose-950/80 text-rose-400 border border-rose-800/80'
              : 'bg-black/40 text-neutral-300 hover:text-white hover:bg-black/70'
          }`}
          aria-label={isFav ? 'Retirer des favoris' : 'Ajouter aux favoris'}
        >
          <Heart className={`w-4 h-4 ${isFav ? 'fill-rose-500' : ''}`} />
        </button>

        {/* Quick View Hover Button */}
        <div className="absolute inset-x-3 bottom-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200 hidden sm:flex gap-2 z-10">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setQuickViewProduct(product);
            }}
            className="flex-1 py-2 px-3 rounded-lg bg-neutral-950/90 hover:bg-neutral-900 border border-neutral-700/60 text-neutral-200 text-xs font-medium backdrop-blur-md transition-all flex items-center justify-center gap-1.5 shadow-lg cursor-pointer"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Aperçu rapide</span>
          </button>
        </div>
      </div>

      {/* Info Block */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-3">
        <div className="space-y-1.5">
          {/* Brand & Subcategory */}
          <div className="flex items-center justify-between text-[11px] text-neutral-400 uppercase tracking-widest">
            <span className="truncate">{product.brand}</span>
            <div className="flex items-center gap-1 text-amber-400 font-mono text-[10px] shrink-0">
              <Star className="w-3 h-3 fill-amber-400" />
              <span>{product.rating}</span>
            </div>
          </div>

          {/* Title */}
          <h3
            onClick={() => openProductDetail(product.id)}
            className="font-serif-luxury text-base sm:text-lg font-medium text-neutral-100 group-hover:text-rose-200 transition-colors line-clamp-2 cursor-pointer leading-tight"
          >
            {product.name}
          </h3>
        </div>

        {/* Price & Add to Cart button */}
        <div className="pt-2 border-t border-neutral-800/60 flex items-center justify-between gap-2">
          <div className="flex flex-col">
            <div className="flex items-baseline gap-2">
              <span className="text-base font-semibold font-mono text-neutral-100 tabular-nums">
                {product.price.toFixed(2)} €
              </span>
              {product.originalPrice && (
                <span className="text-xs line-through text-neutral-500 font-mono tabular-nums">
                  {product.originalPrice.toFixed(2)} €
                </span>
              )}
            </div>
            <span className="text-[10px] text-neutral-500">
              {product.inStock ? 'En stock au Havre' : 'Sur commande'}
            </span>
          </div>

          <button
            type="button"
            onClick={() => addToCart(product)}
            className="p-2.5 rounded-lg bg-neutral-800/90 hover:bg-rose-900 text-neutral-200 hover:text-white border border-neutral-700/60 hover:border-rose-700 transition-all cursor-pointer shadow-sm"
            aria-label={`Ajouter ${product.name} au panier`}
            title="Ajouter au panier"
          >
            <ShoppingBag className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
