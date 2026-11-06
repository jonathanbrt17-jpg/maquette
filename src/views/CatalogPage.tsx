import React, { useState, useMemo } from 'react';
import { useShop } from '../context/ShopContext';
import { PRODUCTS, Product } from '../data/products';
import { ProductCard } from '../components/ProductCard';
import { 
  SlidersHorizontal, 
  Search, 
  X, 
  ArrowUpDown, 
  Sparkles, 
  Tag 
} from 'lucide-react';

export const CatalogPage: React.FC = () => {
  const { catalogCategory, setCatalogCategory } = useShop();

  const [searchFilter, setSearchFilter] = useState('');
  const [selectedSubcategory, setSelectedSubcategory] = useState<string>('all');
  const [priceRange, setPriceRange] = useState<'all' | 'under35' | '35to70' | 'above70'>('all');
  const [sortBy, setSortBy] = useState<'featured' | 'priceAsc' | 'priceDesc' | 'rating' | 'newest'>('featured');
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);

  // Subcategories available depending on category
  const availableSubcategories = useMemo(() => {
    let prods = PRODUCTS;
    if (catalogCategory !== 'all' && catalogCategory !== 'nouveautes' && catalogCategory !== 'promotions') {
      prods = prods.filter((p) => p.category === catalogCategory);
    }
    const subs = Array.from(new Set(prods.map((p) => p.subcategory)));
    return subs;
  }, [catalogCategory]);

  // Filtered and sorted products
  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((product) => {
      // Category filter
      if (catalogCategory === 'lingerie' && product.category !== 'lingerie') return false;
      if (catalogCategory === 'bien-etre' && product.category !== 'bien-etre') return false;
      if (catalogCategory === 'accessoires' && product.category !== 'accessoires') return false;
      if (catalogCategory === 'nouveautes' && !product.isNew) return false;
      if (catalogCategory === 'promotions' && !product.isPromo) return false;

      // Subcategory filter
      if (selectedSubcategory !== 'all' && product.subcategory !== selectedSubcategory) {
        return false;
      }

      // Search filter
      if (searchFilter.trim()) {
        const query = searchFilter.toLowerCase().trim();
        const matches =
          product.name.toLowerCase().includes(query) ||
          product.brand.toLowerCase().includes(query) ||
          product.subcategory.toLowerCase().includes(query);
        if (!matches) return false;
      }

      // Price range
      if (priceRange === 'under35' && product.price > 35) return false;
      if (priceRange === '35to70' && (product.price < 35 || product.price > 70)) return false;
      if (priceRange === 'above70' && product.price < 70) return false;

      return true;
    }).sort((a, b) => {
      if (sortBy === 'priceAsc') return a.price - b.price;
      if (sortBy === 'priceDesc') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'newest') return (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0);
      return 0; // featured default
    });
  }, [catalogCategory, selectedSubcategory, searchFilter, priceRange, sortBy]);

  const resetAllFilters = () => {
    setCatalogCategory('all');
    setSelectedSubcategory('all');
    setPriceRange('all');
    setSearchFilter('');
    setSortBy('featured');
  };

  const getCategoryTitle = () => {
    switch (catalogCategory) {
      case 'lingerie':
        return 'Lingerie Fine & Soie de Nuit';
      case 'bien-etre':
        return 'Bien-être & Soins Botaniques';
      case 'accessoires':
        return 'Accessoires Complices & Coffrets';
      case 'nouveautes':
        return 'Nouveautés 2026';
      case 'promotions':
        return 'Offres Privilèges & Sélections Douces';
      default:
        return 'La Boutique Complète Scandal LH';
    }
  };

  const getCategorySubtitle = () => {
    switch (catalogCategory) {
      case 'lingerie':
        return 'Pièces précieuses en soie sauvage, dentelle fine et matières caressantes, sélectionnées pour sublimer chaque instant.';
      case 'bien-etre':
        return 'Huiles de massage botaniques, bougies chaudes et élixirs hydratants formulés dans des laboratoires français.';
      case 'accessoires':
        return 'Créations ergonomiques veloutées, masques de soie et jeux d’initiation raffinés pour des rituels complices.';
      case 'nouveautes':
        return 'Les dernières créations présentées dans notre boutique au Havre.';
      case 'promotions':
        return 'Sélection de pièces exceptionnelles proposées à des tarifs privilégiés.';
      default:
        return 'Explorez l’ensemble de nos créations sensorielles au Havre. Expédition sous emballage 100% neutre et retrait gratuit en boutique.';
    }
  };

  return (
    <div className="min-h-screen bg-[#0c0b0e] py-10 sm:py-16 text-neutral-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Category Header Banner */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="text-xs uppercase tracking-[0.25em] text-rose-400 font-semibold">
            Catalogue & Collections
          </div>
          <h1 className="font-serif-luxury text-3xl sm:text-4xl lg:text-5xl font-light text-neutral-50">
            {getCategoryTitle()}
          </h1>
          <p className="text-xs sm:text-sm text-neutral-400 font-light leading-relaxed">
            {getCategorySubtitle()}
          </p>
        </div>

        {/* Primary Category Switcher Buttons */}
        <div className="flex items-center justify-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {[
            { id: 'all', label: 'Tout voir' },
            { id: 'lingerie', label: 'Lingerie' },
            { id: 'bien-etre', label: 'Bien-être' },
            { id: 'accessoires', label: 'Accessoires' },
            { id: 'nouveautes', label: 'Nouveautés' },
            { id: 'promotions', label: 'Promotions' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => {
                setCatalogCategory(tab.id);
                setSelectedSubcategory('all');
              }}
              className={`px-4 py-2 rounded-xl text-xs font-medium whitespace-nowrap transition-all cursor-pointer ${
                catalogCategory === tab.id
                  ? 'bg-rose-950 text-rose-200 border border-rose-800 shadow-sm'
                  : 'bg-neutral-900/80 text-neutral-400 hover:text-white border border-neutral-800/80 hover:border-neutral-700'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Interactive Filter and Toolbar */}
        <div className="bg-[#131116] border border-neutral-800 rounded-2xl p-4 sm:p-5 space-y-4">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            {/* Search Input in Catalog */}
            <div className="relative flex-1 max-w-md">
              <Search className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchFilter}
                onChange={(e) => setSearchFilter(e.target.value)}
                placeholder="Filtrer par nom, matière, marque..."
                className="w-full pl-10 pr-8 py-2.5 bg-neutral-900 border border-neutral-800 rounded-xl text-xs text-neutral-100 placeholder-neutral-500 focus:outline-none focus:border-rose-700"
              />
              {searchFilter && (
                <button
                  onClick={() => setSearchFilter('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-white"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Quick Price Filters */}
            <div className="flex flex-wrap items-center gap-2 text-xs">
              <span className="text-neutral-500 hidden sm:inline">Budget :</span>
              {[
                { id: 'all', label: 'Tous' },
                { id: 'under35', label: '< 35 €' },
                { id: '35to70', label: '35 € - 70 €' },
                { id: 'above70', label: '> 70 €' },
              ].map((p) => (
                <button
                  key={p.id}
                  onClick={() => setPriceRange(p.id as any)}
                  className={`px-3 py-1.5 rounded-lg border text-xs transition-colors cursor-pointer ${
                    priceRange === p.id
                      ? 'bg-rose-950/60 border-rose-800 text-rose-200 font-semibold'
                      : 'bg-neutral-900 border-neutral-800 text-neutral-400 hover:text-white'
                  }`}
                >
                  {p.label}
                </button>
              ))}
            </div>

            {/* Sort Select */}
            <div className="flex items-center gap-2 shrink-0">
              <ArrowUpDown className="w-4 h-4 text-neutral-400" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                aria-label="Trier les produits"
                className="bg-neutral-900 border border-neutral-800 text-xs text-neutral-200 py-2 px-3 rounded-xl focus:outline-none focus:border-rose-700 cursor-pointer"
              >
                <option value="featured">Tri : Sélection Recommandée</option>
                <option value="priceAsc">Prix : Moins cher au plus cher</option>
                <option value="priceDesc">Prix : Plus cher au moins cher</option>
                <option value="rating">Mieux notés</option>
                <option value="newest">Nouveautés en premier</option>
              </select>
            </div>
          </div>

          {/* Subcategories pills if multiple available */}
          {availableSubcategories.length > 1 && (
            <div className="pt-3 border-t border-neutral-800/60 flex flex-wrap items-center gap-2 text-xs">
              <span className="text-neutral-500 text-[11px] uppercase tracking-wider">Sous-catégorie :</span>
              <button
                onClick={() => setSelectedSubcategory('all')}
                className={`px-2.5 py-1 rounded text-xs transition-colors cursor-pointer ${
                  selectedSubcategory === 'all'
                    ? 'bg-rose-900/60 text-rose-200 font-medium'
                    : 'text-neutral-400 hover:text-white'
                }`}
              >
                Toutes
              </button>
              {availableSubcategories.map((sub) => (
                <button
                  key={sub}
                  onClick={() => setSelectedSubcategory(sub)}
                  className={`px-2.5 py-1 rounded text-xs transition-colors cursor-pointer ${
                    selectedSubcategory === sub
                      ? 'bg-rose-900/60 text-rose-200 font-medium'
                      : 'text-neutral-400 hover:text-white'
                  }`}
                >
                  {sub}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Results Counter and Active Filters Bar */}
        <div className="flex items-center justify-between text-xs text-neutral-400 px-1">
          <div>
            Affichage de <strong className="text-neutral-200">{filteredProducts.length}</strong> création(s)
          </div>
          {(catalogCategory !== 'all' || selectedSubcategory !== 'all' || priceRange !== 'all' || searchFilter) && (
            <button
              onClick={resetAllFilters}
              className="text-rose-400 hover:text-rose-300 underline cursor-pointer"
            >
              Réinitialiser tous les filtres
            </button>
          )}
        </div>

        {/* Product Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-[#121115] border border-neutral-800 rounded-2xl p-8 space-y-4">
            <h3 className="font-serif-luxury text-2xl text-neutral-300">
              Aucun produit ne correspond à ces critères
            </h3>
            <p className="text-xs text-neutral-400 max-w-sm mx-auto">
              Modifiez vos filtres de prix ou votre recherche textuelle pour découvrir nos créations.
            </p>
            <button
              onClick={resetAllFilters}
              className="px-6 py-2.5 rounded-xl bg-rose-900 hover:bg-rose-800 text-white text-xs font-semibold uppercase tracking-wider transition-colors"
            >
              Réinitialiser les filtres
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
