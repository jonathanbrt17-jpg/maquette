import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { PRODUCTS, Product } from '../data/products';
import { ProductCard } from '../components/ProductCard';
import { 
  ShoppingBag, 
  Heart, 
  Star, 
  ShieldCheck, 
  MapPin, 
  Truck, 
  RotateCcw, 
  ChevronRight, 
  Check, 
  Plus, 
  Minus,
  Sparkles,
  Layers,
  Sparkle
} from 'lucide-react';

export const ProductDetailPage: React.FC = () => {
  const {
    selectedProductId,
    addToCart,
    toggleWishlist,
    isInWishlist,
    setCurrentView,
    setCatalogCategory,
  } = useShop();

  // Find product or fallback to first product
  const product: Product =
    PRODUCTS.find((p) => p.id === selectedProductId) || PRODUCTS[0];

  const [activeImage, setActiveImage] = useState<string>(product.image);
  const [selectedSize, setSelectedSize] = useState<string>(
    product.sizes ? product.sizes[0] : ''
  );
  const [selectedColor, setSelectedColor] = useState<string>(
    product.colors ? product.colors[0].name : ''
  );
  const [quantity, setQuantity] = useState(1);
  const [activeAccordion, setActiveAccordion] = useState<'desc' | 'materials' | 'advice' | 'shipping'>('desc');

  const isFav = isInWishlist(product.id);

  // Gallery images list
  const gallery = [
    product.image,
    product.secondaryImage || '/src/assets/images/hero_scandal_luxury_1793958430839.jpg',
    '/src/assets/images/category_boutique_le_havre_1793958432754.jpg',
  ];

  // Similar products in same category
  const similarProducts = PRODUCTS.filter(
    (p) => p.id !== product.id && p.category === product.category
  ).slice(0, 4);

  const handleAddToCart = () => {
    addToCart(product, quantity, selectedSize || undefined, selectedColor || undefined);
  };

  return (
    <div className="min-h-screen bg-[#0c0b0e] py-8 sm:py-12 text-neutral-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Breadcrumbs */}
        <nav className="flex items-center gap-2 text-xs text-neutral-400">
          <button
            onClick={() => {
              setCurrentView('home');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="hover:text-white transition-colors cursor-pointer"
          >
            Accueil
          </button>
          <ChevronRight className="w-3.5 h-3.5 text-neutral-600" />
          <button
            onClick={() => {
              setCatalogCategory(product.category);
              setCurrentView('catalog');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="capitalize hover:text-white transition-colors cursor-pointer"
          >
            {product.category === 'bien-etre' ? 'Bien-être' : product.category}
          </button>
          <ChevronRight className="w-3.5 h-3.5 text-neutral-600" />
          <span className="text-neutral-200 truncate max-w-xs">{product.name}</span>
        </nav>

        {/* Main PDP Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
          {/* Left Column: Image Gallery (7 cols) */}
          <div className="lg:col-span-7 space-y-4">
            {/* Main high-res view */}
            <div className="relative aspect-[4/5] sm:aspect-square bg-[#131116] border border-neutral-800 rounded-2xl overflow-hidden">
              <img
                src={activeImage}
                alt={product.name}
                className="w-full h-full object-cover transition-all duration-300"
              />

              {product.isBestseller && (
                <span className="absolute top-4 left-4 bg-rose-950/90 text-rose-200 border border-rose-800/60 text-xs font-semibold tracking-widest uppercase px-3 py-1 rounded backdrop-blur-md">
                  Coup de Cœur Scandal LH
                </span>
              )}

              <button
                type="button"
                onClick={() => toggleWishlist(product.id)}
                className={`absolute top-4 right-4 z-10 p-3 rounded-full backdrop-blur-md transition-all cursor-pointer ${
                  isFav
                    ? 'bg-rose-950/80 text-rose-400 border border-rose-800'
                    : 'bg-black/50 text-neutral-300 hover:text-white hover:bg-black/80'
                }`}
                aria-label="Favoris"
              >
                <Heart className={`w-5 h-5 ${isFav ? 'fill-rose-500' : ''}`} />
              </button>
            </div>

            {/* Thumbnails row */}
            <div className="flex gap-3 overflow-x-auto pb-1">
              {gallery.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImage(img)}
                  className={`w-20 h-24 sm:w-24 sm:h-28 rounded-xl overflow-hidden border-2 transition-all cursor-pointer shrink-0 ${
                    activeImage === img
                      ? 'border-rose-600 scale-102 shadow-md'
                      : 'border-neutral-800 opacity-60 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Right Column: Contiguous Purchase Module (5 cols) */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              {/* Brand and Subtitle */}
              <div className="space-y-1">
                <span className="text-xs uppercase tracking-[0.25em] text-rose-400 font-semibold">
                  {product.brand}
                </span>
                <h1 className="font-serif-luxury text-3xl sm:text-4xl font-normal text-neutral-50 leading-tight">
                  {product.name}
                </h1>
                <div className="text-xs text-neutral-400">{product.subtitle}</div>
              </div>

              {/* Rating */}
              <div className="flex items-center gap-2 text-xs text-neutral-400">
                <div className="flex items-center text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < Math.floor(product.rating)
                          ? 'fill-amber-400'
                          : 'text-neutral-700'
                      }`}
                    />
                  ))}
                </div>
                <span className="font-mono font-medium text-neutral-200">{product.rating}</span>
                <span>·</span>
                <span>{product.reviewsCount} avis certifiés</span>
              </div>

              {/* Price */}
              <div className="flex items-baseline gap-4 py-2 border-y border-neutral-800/80">
                <span className="text-3xl font-bold font-mono text-neutral-50 tabular-nums">
                  {product.price.toFixed(2)} €
                </span>
                {product.originalPrice && (
                  <span className="text-base line-through text-neutral-500 font-mono tabular-nums">
                    {product.originalPrice.toFixed(2)} €
                  </span>
                )}
                <span className="text-xs text-neutral-400">TTC · Frais de port calculés au panier</span>
              </div>

              {/* Availability */}
              <div className="flex items-center gap-2 text-xs">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-emerald-400 font-medium">
                  {product.inStock ? `En stock · ${product.stockCount} exemplaires disponibles au Havre` : 'En réapprovisionnement'}
                </span>
              </div>

              {/* Short summary */}
              <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed font-light">
                {product.description}
              </p>

              {/* Sizes Selection */}
              {product.sizes && (
                <div className="space-y-2 pt-2">
                  <div className="flex justify-between text-xs">
                    <span className="text-neutral-300 font-medium">Choisir la taille :</span>
                    <span className="text-neutral-500 underline cursor-pointer">Guide des tailles</span>
                  </div>
                  <div className="flex flex-wrap gap-2.5">
                    {product.sizes.map((s) => (
                      <button
                        key={s}
                        type="button"
                        onClick={() => setSelectedSize(s)}
                        className={`min-w-12 py-2 px-3.5 rounded-xl border text-xs font-medium transition-all cursor-pointer ${
                          selectedSize === s
                            ? 'border-rose-600 bg-rose-950/50 text-rose-200 shadow-sm'
                            : 'border-neutral-800 bg-neutral-900 text-neutral-300 hover:border-neutral-700'
                        }`}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Colors Selection */}
              {product.colors && (
                <div className="space-y-2 pt-2">
                  <span className="text-xs text-neutral-300 font-medium">
                    Nuance : <strong className="text-neutral-100">{selectedColor}</strong>
                  </span>
                  <div className="flex items-center gap-3">
                    {product.colors.map((c) => (
                      <button
                        key={c.name}
                        type="button"
                        onClick={() => setSelectedColor(c.name)}
                        className={`w-7 h-7 rounded-full border-2 transition-all cursor-pointer flex items-center justify-center ${
                          selectedColor === c.name
                            ? 'border-rose-500 scale-110 shadow-md'
                            : 'border-transparent opacity-80 hover:opacity-100'
                        }`}
                        style={{ backgroundColor: c.hex }}
                        title={c.name}
                      >
                        {selectedColor === c.name && (
                          <Check className="w-3.5 h-3.5 text-white drop-shadow" />
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Quantity Stepper & Add to Bag CTA */}
              <div className="pt-4 flex items-center gap-4">
                <div className="flex items-center border border-neutral-800 rounded-xl bg-neutral-900 px-1 py-1">
                  <button
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="p-2 text-neutral-400 hover:text-white transition-colors cursor-pointer"
                    aria-label="Diminuer"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="px-3 text-xs font-semibold tabular-nums text-neutral-100">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity((q) => q + 1)}
                    className="p-2 text-neutral-400 hover:text-white transition-colors cursor-pointer"
                    aria-label="Augmenter"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>

                <button
                  type="button"
                  onClick={handleAddToCart}
                  className="flex-1 py-4 px-6 rounded-xl bg-gradient-to-r from-rose-800 to-rose-950 hover:from-rose-700 hover:to-rose-900 text-white font-semibold text-xs tracking-wider uppercase transition-all shadow-xl flex items-center justify-center gap-2.5 cursor-pointer"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Ajouter au panier</span>
                </button>
              </div>

              {/* Trust badges strip */}
              <div className="pt-4 grid grid-cols-2 gap-3 text-xs text-neutral-400">
                <div className="p-3 bg-[#131116] border border-neutral-800/80 rounded-xl flex items-start gap-2.5">
                  <ShieldCheck className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                  <div>
                    <div className="font-medium text-neutral-200">Emballage Discret</div>
                    <div className="text-[11px] text-neutral-500">Carton neutre sans logo</div>
                  </div>
                </div>

                <div className="p-3 bg-[#131116] border border-neutral-800/80 rounded-xl flex items-start gap-2.5">
                  <MapPin className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                  <div>
                    <div className="font-medium text-neutral-200">Retrait Boutique LH</div>
                    <div className="text-[11px] text-neutral-500">Prêt en 1h au Havre</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Accordions */}
            <div className="pt-6 border-t border-neutral-800 space-y-2 text-xs">
              {/* Accordion: Description complète */}
              <div className="border border-neutral-800 rounded-xl overflow-hidden bg-[#121115]">
                <button
                  onClick={() => setActiveAccordion(activeAccordion === 'desc' ? ('' as any) : 'desc')}
                  className="w-full p-4 flex items-center justify-between text-left font-medium text-neutral-200 hover:text-white"
                >
                  <span>Description détaillée & Atouts</span>
                  <span>{activeAccordion === 'desc' ? '−' : '+'}</span>
                </button>
                {activeAccordion === 'desc' && (
                  <div className="p-4 pt-0 text-neutral-400 space-y-3 leading-relaxed border-t border-neutral-800/60">
                    <p>{product.longDescription}</p>
                    <ul className="space-y-1.5 pt-1">
                      {product.features.map((feat, i) => (
                        <li key={i} className="flex items-center gap-2 text-neutral-300">
                          <span className="w-1.5 h-1.5 rounded-full bg-rose-500" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              {/* Accordion: Matières & Composition */}
              {product.composition && (
                <div className="border border-neutral-800 rounded-xl overflow-hidden bg-[#121115]">
                  <button
                    onClick={() => setActiveAccordion(activeAccordion === 'materials' ? ('' as any) : 'materials')}
                    className="w-full p-4 flex items-center justify-between text-left font-medium text-neutral-200 hover:text-white"
                  >
                    <span>Composition & Matières nobles</span>
                    <span>{activeAccordion === 'materials' ? '−' : '+'}</span>
                  </button>
                  {activeAccordion === 'materials' && (
                    <div className="p-4 pt-0 text-neutral-400 leading-relaxed border-t border-neutral-800/60">
                      <p className="font-mono text-[11px] text-neutral-300">{product.composition}</p>
                    </div>
                  )}
                </div>
              )}

              {/* Accordion: Conseils d'entretien / d'utilisation */}
              {product.usageAdvice && (
                <div className="border border-neutral-800 rounded-xl overflow-hidden bg-[#121115]">
                  <button
                    onClick={() => setActiveAccordion(activeAccordion === 'advice' ? ('' as any) : 'advice')}
                    className="w-full p-4 flex items-center justify-between text-left font-medium text-neutral-200 hover:text-white"
                  >
                    <span>Conseils d’utilisation & Rituel</span>
                    <span>{activeAccordion === 'advice' ? '−' : '+'}</span>
                  </button>
                  {activeAccordion === 'advice' && (
                    <div className="p-4 pt-0 text-neutral-400 leading-relaxed border-t border-neutral-800/60">
                      <p>{product.usageAdvice}</p>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Similar Products */}
        {similarProducts.length > 0 && (
          <div className="pt-16 border-t border-neutral-800 space-y-8">
            <div>
              <div className="text-xs uppercase tracking-[0.25em] text-rose-400 font-semibold mb-1">
                Complétez votre rituel
              </div>
              <h3 className="font-serif-luxury text-2xl sm:text-3xl font-light text-neutral-100">
                Vous aimerez aussi
              </h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {similarProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
