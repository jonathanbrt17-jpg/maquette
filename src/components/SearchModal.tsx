import React, { useState, useMemo } from 'react';
import { useShop } from '../context/ShopContext';
import { PRODUCTS, Product } from '../data/products';
import { Search, X, ArrowRight, Sparkles } from 'lucide-react';

const SUGGESTED_QUERIES = [
  'Nuisette en Soie',
  'Huile de massage',
  'Bougie végétale',
  'Dentelle',
  'Coffret cadeau',
  'Boutique Le Havre',
];

export const SearchModal: React.FC = () => {
  const { isSearchOpen, setIsSearchOpen, openProductDetail, setCurrentView, setCatalogCategory } = useShop();
  const [searchTerm, setSearchTerm] = useState('');

  const searchResults = useMemo(() => {
    if (!searchTerm.trim()) return [];
    const term = searchTerm.toLowerCase().trim();
    return PRODUCTS.filter(
      (p) =>
        p.name.toLowerCase().includes(term) ||
        p.subcategory.toLowerCase().includes(term) ||
        p.brand.toLowerCase().includes(term) ||
        p.description.toLowerCase().includes(term)
    ).slice(0, 5);
  }, [searchTerm]);

  if (!isSearchOpen) return null;

  const handleSelectProduct = (product: Product) => {
    setIsSearchOpen(false);
    setSearchTerm('');
    openProductDetail(product.id);
  };

  const handleSearchAll = () => {
    setIsSearchOpen(false);
    setCurrentView('catalog');
    setCatalogCategory('all');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-black/80 backdrop-blur-sm animate-fade-in">
      <div 
        className="w-full max-w-2xl bg-[#141217] border border-neutral-800 rounded-xl shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="relative flex items-center px-4 border-b border-neutral-800">
          <Search className="w-5 h-5 text-neutral-400 mr-3 shrink-0" />
          <input
            type="text"
            autoFocus
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Rechercher une nuisette, une huile de massage, un coffret..."
            className="w-full py-4 text-base bg-transparent text-neutral-100 placeholder-neutral-500 focus:outline-none"
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm('')}
              className="p-1 text-neutral-400 hover:text-white mr-2"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={() => setIsSearchOpen(false)}
            className="text-xs uppercase tracking-wider text-neutral-400 hover:text-white py-1 px-2 border border-neutral-700/60 rounded"
          >
            Fermer
          </button>
        </div>

        {/* Suggested Queries */}
        <div className="px-5 py-3 bg-[#0d0c0e]/80 border-b border-neutral-800/60 flex flex-wrap items-center gap-2 text-xs">
          <span className="text-neutral-500 flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-rose-400" />
            Tendances :
          </span>
          {SUGGESTED_QUERIES.map((query) => (
            <button
              key={query}
              onClick={() => setSearchTerm(query)}
              className="px-2.5 py-1 rounded bg-neutral-900 hover:bg-neutral-800 text-neutral-300 hover:text-rose-200 transition-colors cursor-pointer border border-neutral-800"
            >
              {query}
            </button>
          ))}
        </div>

        {/* Results Body */}
        <div className="p-4 max-h-[60vh] overflow-y-auto">
          {searchTerm.trim() ? (
            searchResults.length > 0 ? (
              <div className="space-y-3">
                <div className="text-xs text-neutral-500 font-medium px-1">
                  {searchResults.length} produit{searchResults.length > 1 ? 's' : ''} trouvé{searchResults.length > 1 ? 's' : ''}
                </div>
                <div className="divide-y divide-neutral-800/60">
                  {searchResults.map((product) => (
                    <button
                      key={product.id}
                      onClick={() => handleSelectProduct(product)}
                      className="w-full flex items-center gap-4 py-3 px-2 rounded-lg hover:bg-neutral-800/40 transition-colors text-left group cursor-pointer"
                    >
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-14 h-14 object-cover rounded bg-neutral-900 border border-neutral-800 shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="text-xs text-rose-400/90 font-medium tracking-wide uppercase">
                          {product.brand}
                        </div>
                        <div className="text-sm font-medium text-neutral-100 group-hover:text-rose-200 truncate transition-colors">
                          {product.name}
                        </div>
                        <div className="text-xs text-neutral-400 mt-0.5">
                          {product.subcategory}
                        </div>
                      </div>
                      <div className="text-right shrink-0">
                        <div className="text-sm font-semibold text-neutral-100 tabular-nums">
                          {product.price.toFixed(2)} €
                        </div>
                        <span className="text-[11px] text-emerald-400 flex items-center justify-end gap-1 mt-0.5">
                          En stock
                        </span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <div className="text-center py-10 text-neutral-400">
                <p className="text-base font-serif-luxury text-neutral-300">Aucun produit ne correspond à « {searchTerm} »</p>
                <p className="text-xs text-neutral-500 mt-1">
                  Essayez un terme comme <button onClick={() => setSearchTerm('Soie')} className="underline text-rose-400">soie</button>, <button onClick={() => setSearchTerm('Bougie')} className="underline text-rose-400">bougie</button> ou <button onClick={() => setSearchTerm('Élixir')} className="underline text-rose-400">élixir</button>.
                </p>
              </div>
            )
          ) : (
            <div className="py-6 text-center text-xs text-neutral-500">
              Tapez le nom d’un produit, d’une marque ou explorez tout le catalogue.
            </div>
          )}
        </div>

        {/* Bottom CTA */}
        <div className="p-3 bg-[#0d0c0e] border-t border-neutral-800 flex items-center justify-between text-xs text-neutral-400">
          <span>Livraison discrète au Havre et dans toute la France</span>
          <button
            onClick={handleSearchAll}
            className="flex items-center gap-1.5 text-rose-400 hover:text-rose-300 font-medium cursor-pointer"
          >
            <span>Voir toute la boutique</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
