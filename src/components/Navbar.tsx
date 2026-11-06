import React, { useState } from 'react';
import { useShop, ViewType } from '../context/ShopContext';
import { 
  ShoppingBag, 
  Heart, 
  Search, 
  Menu, 
  X, 
  MapPin, 
  ShieldCheck, 
  Sparkles, 
  FileText 
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const {
    currentView,
    setCurrentView,
    cartCount,
    setIsCartOpen,
    wishlist,
    setIsSearchOpen,
    setCatalogCategory,
    setIsCommercialProposalOpen,
  } = useShop();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleNavClick = (view: ViewType, category?: string) => {
    setCurrentView(view);
    if (category) {
      setCatalogCategory(category);
    }
    setIsMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-[#0d0c0e]/95 backdrop-blur-md border-b border-neutral-800/80">
      {/* Top Discretion & Service Bar */}
      <div className="bg-[#141217] text-neutral-300 text-xs py-2 px-4 border-b border-neutral-800/50">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-4 text-[11px] sm:text-xs tracking-wider">
            <span className="flex items-center gap-1.5 text-rose-200/90 font-medium">
              <ShieldCheck className="w-3.5 h-3.5 text-rose-400" />
              Livraison 100% neutre & discrète offerte dès 65€
            </span>
            <span className="hidden md:inline-block text-neutral-600">·</span>
            <span className="hidden md:flex items-center gap-1.5 text-neutral-400">
              <MapPin className="w-3.5 h-3.5 text-neutral-500" />
              Retrait gratuit 1h en Boutique au Havre
            </span>
          </div>

          <div className="flex items-center gap-4 text-[11px]">
            <button
              onClick={() => setIsCommercialProposalOpen(true)}
              className="flex items-center gap-1.5 text-amber-300/90 hover:text-amber-200 transition-colors py-0.5 px-2 rounded bg-amber-950/40 border border-amber-800/40 cursor-pointer"
              title="Voir la proposition commerciale de refonte"
            >
              <Sparkles className="w-3 h-3 text-amber-400" />
              <span className="font-medium">Concept Modernisation · Jojo Studio</span>
            </button>
            <span className="hidden sm:inline-block text-neutral-500">
              Boutique Le Havre : 02 35 XX XX XX
            </span>
          </div>
        </div>
      </div>

      {/* Main Luxury Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 gap-4">
          {/* Mobile Menu Button */}
          <div className="flex items-center lg:hidden">
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 text-neutral-300 hover:text-white rounded-md transition-colors"
              aria-label="Ouvrir le menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Brand Logo Lockup */}
          <div className="flex items-center">
            <button
              onClick={() => handleNavClick('home')}
              className="text-left group cursor-pointer"
            >
              <div className="flex flex-col">
                <span className="font-serif-luxury text-2xl sm:text-3xl font-semibold tracking-[0.2em] text-neutral-50 uppercase group-hover:text-rose-200 transition-colors">
                  SCANDAL <span className="text-rose-500 font-light">LH</span>
                </span>
                <span className="text-[9px] sm:text-[10px] tracking-[0.35em] text-neutral-400 uppercase font-light">
                  Maison du Bien-Être & Lingerie
                </span>
              </div>
            </button>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-8 text-sm tracking-wide font-medium">
            <button
              onClick={() => handleNavClick('catalog', 'lingerie')}
              className={`transition-colors cursor-pointer py-1 relative ${
                currentView === 'catalog' && false
                  ? 'text-rose-300'
                  : 'text-neutral-300 hover:text-rose-200'
              }`}
            >
              Lingerie
            </button>

            <button
              onClick={() => handleNavClick('catalog', 'bien-etre')}
              className="text-neutral-300 hover:text-rose-200 transition-colors cursor-pointer py-1"
            >
              Bien-être
            </button>

            <button
              onClick={() => handleNavClick('catalog', 'accessoires')}
              className="text-neutral-300 hover:text-rose-200 transition-colors cursor-pointer py-1"
            >
              Accessoires
            </button>

            <button
              onClick={() => handleNavClick('catalog', 'nouveautes')}
              className="text-neutral-300 hover:text-rose-200 transition-colors cursor-pointer py-1 flex items-center gap-1.5"
            >
              <span>Nouveautés</span>
              <span className="text-[10px] uppercase font-sans tracking-widest text-rose-400">2026</span>
            </button>

            <button
              onClick={() => handleNavClick('catalog', 'promotions')}
              className="text-rose-300/90 hover:text-rose-200 transition-colors cursor-pointer py-1 font-semibold"
            >
              Promotions
            </button>

            <button
              onClick={() => handleNavClick('boutique')}
              className="text-neutral-300 hover:text-white transition-colors cursor-pointer py-1 flex items-center gap-1"
            >
              <MapPin className="w-3.5 h-3.5 text-rose-500" />
              <span>Boutique LH</span>
            </button>
          </nav>

          {/* Header Action Icons */}
          <div className="flex items-center gap-3 sm:gap-4">
            {/* Search Button */}
            <button
              type="button"
              onClick={() => setIsSearchOpen(true)}
              className="p-2.5 text-neutral-300 hover:text-white rounded-full hover:bg-neutral-800/60 transition-colors cursor-pointer"
              aria-label="Rechercher un produit"
              title="Rechercher"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Wishlist Button */}
            <button
              type="button"
              onClick={() => {
                handleNavClick('catalog');
                setCatalogCategory('all');
              }}
              className="relative p-2.5 text-neutral-300 hover:text-rose-200 rounded-full hover:bg-neutral-800/60 transition-colors cursor-pointer"
              aria-label="Voir les favoris"
              title="Mes favoris"
            >
              <Heart className="w-5 h-5" />
              {wishlist.length > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-rose-600 text-white text-[10px] font-bold flex items-center justify-center">
                  {wishlist.length}
                </span>
              )}
            </button>

            {/* Shopping Bag Button */}
            <button
              type="button"
              onClick={() => setIsCartOpen(true)}
              className="relative flex items-center gap-2 p-2 sm:px-3 sm:py-2 text-neutral-100 bg-neutral-900 hover:bg-neutral-800 border border-neutral-700/80 rounded-full transition-all duration-200 cursor-pointer shadow-sm hover:border-rose-900/50"
              aria-label="Ouvrir le panier"
            >
              <ShoppingBag className="w-5 h-5 text-rose-300" />
              <span className="hidden sm:inline text-xs font-medium tracking-wider">Panier</span>
              {cartCount > 0 && (
                <span className="w-5 h-5 rounded-full bg-rose-600 text-white text-xs font-bold flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-[#111014] border-b border-neutral-800 px-6 py-6 space-y-4">
          <div className="space-y-2">
            <button
              onClick={() => handleNavClick('home')}
              className="w-full text-left py-2.5 text-base text-neutral-200 hover:text-white font-medium border-b border-neutral-800/60"
            >
              Accueil
            </button>
            <button
              onClick={() => handleNavClick('catalog', 'lingerie')}
              className="w-full text-left py-2.5 text-base text-neutral-200 hover:text-rose-300 font-medium border-b border-neutral-800/60"
            >
              Lingerie Fine & Soie
            </button>
            <button
              onClick={() => handleNavClick('catalog', 'bien-etre')}
              className="w-full text-left py-2.5 text-base text-neutral-200 hover:text-rose-300 font-medium border-b border-neutral-800/60"
            >
              Bien-être & Élixirs
            </button>
            <button
              onClick={() => handleNavClick('catalog', 'accessoires')}
              className="w-full text-left py-2.5 text-base text-neutral-200 hover:text-rose-300 font-medium border-b border-neutral-800/60"
            >
              Accessoires Complices
            </button>
            <button
              onClick={() => handleNavClick('catalog', 'nouveautes')}
              className="w-full text-left py-2.5 text-base text-neutral-200 hover:text-rose-300 font-medium border-b border-neutral-800/60"
            >
              Nouveautés 2026
            </button>
            <button
              onClick={() => handleNavClick('catalog', 'promotions')}
              className="w-full text-left py-2.5 text-base text-rose-400 hover:text-rose-300 font-semibold border-b border-neutral-800/60"
            >
              Offres Privilèges & Promotions
            </button>
            <button
              onClick={() => handleNavClick('boutique')}
              className="w-full text-left py-2.5 text-base text-neutral-200 hover:text-white font-medium flex items-center gap-2"
            >
              <MapPin className="w-4 h-4 text-rose-500" />
              <span>Notre Boutique au Havre & Click & Collect</span>
            </button>
          </div>

          <div className="pt-4 border-t border-neutral-800/80">
            <button
              onClick={() => {
                setIsCommercialProposalOpen(true);
                setIsMobileMenuOpen(false);
              }}
              className="w-full py-3 px-4 rounded-lg bg-amber-950/30 border border-amber-800/40 text-amber-300 text-xs font-medium flex items-center justify-center gap-2"
            >
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>Proposition Commerciale Jojo Studio</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
