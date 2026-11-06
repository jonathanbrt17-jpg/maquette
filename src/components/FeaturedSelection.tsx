import React, { useState } from 'react';
import { PRODUCTS, Product } from '../data/products';
import { ProductCard } from './ProductCard';
import { useShop } from '../context/ShopContext';
import { ArrowRight, Sparkles } from 'lucide-react';

export const FeaturedSelection: React.FC = () => {
  const { setCurrentView, setCatalogCategory } = useShop();
  const [activeTab, setActiveTab] = useState<'bestseller' | 'new' | 'promo'>('bestseller');

  const filteredProducts = PRODUCTS.filter((p) => {
    if (activeTab === 'bestseller') return p.isBestseller;
    if (activeTab === 'new') return p.isNew;
    if (activeTab === 'promo') return p.isPromo;
    return true;
  }).slice(0, 8);

  const handleSeeAll = () => {
    setCatalogCategory('all');
    setCurrentView('catalog');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section className="py-16 sm:py-24 bg-[#0a090c]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Title and Segmented Tabs */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
          <div>
            <div className="text-xs uppercase tracking-[0.25em] text-rose-400 font-semibold mb-2 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-rose-400" />
              <span>Sélection Exclusivité</span>
            </div>
            <h2 className="font-serif-luxury text-3xl sm:text-4xl text-neutral-100 font-normal">
              Les Incontournables Scandal LH
            </h2>
          </div>

          {/* Tab selector buttons */}
          <div className="flex items-center gap-1 p-1 bg-neutral-900 border border-neutral-800 rounded-xl self-start md:self-auto">
            <button
              onClick={() => setActiveTab('bestseller')}
              className={`px-4 py-2 text-xs font-medium rounded-lg transition-all cursor-pointer ${
                activeTab === 'bestseller'
                  ? 'bg-rose-950/80 text-rose-200 border border-rose-900/60 shadow-sm'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              Coups de Cœur
            </button>
            <button
              onClick={() => setActiveTab('new')}
              className={`px-4 py-2 text-xs font-medium rounded-lg transition-all cursor-pointer ${
                activeTab === 'new'
                  ? 'bg-rose-950/80 text-rose-200 border border-rose-900/60 shadow-sm'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              Nouveautés
            </button>
            <button
              onClick={() => setActiveTab('promo')}
              className={`px-4 py-2 text-xs font-medium rounded-lg transition-all cursor-pointer ${
                activeTab === 'promo'
                  ? 'bg-rose-950/80 text-rose-200 border border-rose-900/60 shadow-sm'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              Offres Privilèges
            </button>
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* Bottom CTA to full catalog */}
        <div className="mt-12 text-center">
          <button
            onClick={handleSeeAll}
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 hover:border-neutral-700 text-xs uppercase tracking-wider text-neutral-200 hover:text-white font-medium transition-all shadow-md cursor-pointer"
          >
            <span>Explorer l’ensemble de la collection</span>
            <ArrowRight className="w-4 h-4 text-rose-400" />
          </button>
        </div>
      </div>
    </section>
  );
};
