import React from 'react';
import { CATEGORIES } from '../data/products';
import { useShop } from '../context/ShopContext';
import { ArrowUpRight } from 'lucide-react';

export const CategoryShowcase: React.FC = () => {
  const { setCurrentView, setCatalogCategory } = useShop();

  const handleCategoryClick = (catId: string) => {
    setCatalogCategory(catId);
    setCurrentView('catalog');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section className="py-16 sm:py-24 bg-[#0d0c0e] border-b border-neutral-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <div className="text-xs uppercase tracking-[0.25em] text-rose-400 font-semibold mb-2">
              Univers Dédiés
            </div>
            <h2 className="font-serif-luxury text-3xl sm:text-4xl text-neutral-100 font-normal">
              Nos Univers Signatures
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-neutral-400 max-w-md font-light">
            Une sélection rigoureuse de pièces nobles, de soins sensoriels et d'objets complices pour éveiller les sens en toute sérénité.
          </p>
        </div>

        {/* Categories Grid (4 cards) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {CATEGORIES.map((cat) => (
            <div
              key={cat.id}
              onClick={() => handleCategoryClick(cat.id)}
              className="group relative h-96 rounded-2xl overflow-hidden cursor-pointer border border-neutral-800/80 hover:border-neutral-700 transition-all duration-300"
            >
              {/* Category Background Image */}
              <img
                src={cat.image}
                alt={cat.name}
                loading="lazy"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
              />

              {/* Scrim Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/50 to-transparent transition-opacity duration-300" />

              {/* Card Content */}
              <div className="absolute inset-0 p-6 flex flex-col justify-end text-white">
                <div className="flex items-center justify-between text-xs text-rose-300 tracking-widest uppercase mb-1 font-medium">
                  <span>{cat.label}</span>
                  <span className="w-7 h-7 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center group-hover:bg-rose-900 group-hover:text-white transition-colors">
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </span>
                </div>

                <h3 className="font-serif-luxury text-2xl font-medium text-neutral-100 group-hover:text-rose-200 transition-colors">
                  {cat.name}
                </h3>

                <p className="text-xs text-neutral-400 mt-2 line-clamp-2 leading-relaxed">
                  {cat.description}
                </p>

                <div className="pt-3 mt-3 border-t border-white/10 flex items-center justify-between text-[11px] text-neutral-400">
                  <span>{cat.itemCount} références</span>
                  <span className="text-neutral-300 group-hover:translate-x-1 transition-transform">
                    Explorer →
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
