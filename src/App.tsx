/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { ShopProvider, useShop } from './context/ShopContext';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { CategoryShowcase } from './components/CategoryShowcase';
import { FeaturedSelection } from './components/FeaturedSelection';
import { PromotionalBanner } from './components/PromotionalBanner';
import { WhyScandalLH } from './components/WhyScandalLH';
import { NewsletterSection } from './components/NewsletterSection';
import { Footer } from './components/Footer';
import { CatalogPage } from './views/CatalogPage';
import { ProductDetailPage } from './views/ProductDetailPage';
import { BoutiquePage } from './views/BoutiquePage';
import { CartDrawer } from './components/CartDrawer';
import { SearchModal } from './components/SearchModal';
import { QuickViewModal } from './components/QuickViewModal';
import { CheckoutModal } from './components/CheckoutModal';
import { ProposalModal } from './components/ProposalModal';
import { CheckCircle2, Info } from 'lucide-react';

const MainLayout: React.FC = () => {
  const { currentView, toast } = useShop();

  return (
    <div className="min-h-screen bg-[#0c0b0c] text-neutral-100 flex flex-col font-sans-clean">
      {/* Top Navigation */}
      <Navbar />

      {/* Main View Router */}
      <main className="flex-1">
        {currentView === 'home' && (
          <>
            <HeroSection />
            <CategoryShowcase />
            <FeaturedSelection />
            <PromotionalBanner />
            <WhyScandalLH />
            <NewsletterSection />
          </>
        )}

        {currentView === 'catalog' && <CatalogPage />}
        {currentView === 'product' && <ProductDetailPage />}
        {currentView === 'boutique' && <BoutiquePage />}
      </main>

      {/* Comprehensive Footer */}
      <Footer />

      {/* Modals & Slide-Overs */}
      <CartDrawer />
      <SearchModal />
      <QuickViewModal />
      <CheckoutModal />
      <ProposalModal />

      {/* Toast Notification Container */}
      {toast && (
        <div className="fixed bottom-6 right-6 z-50 animate-fade-in">
          <div className="flex items-center gap-2.5 px-4 py-3 rounded-xl bg-neutral-900 border border-rose-900/60 shadow-2xl text-xs text-neutral-100 backdrop-blur-md">
            {toast.type === 'success' ? (
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            ) : (
              <Info className="w-4 h-4 text-rose-400 shrink-0" />
            )}
            <span className="font-medium">{toast.message}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default function App() {
  return (
    <ShopProvider>
      <MainLayout />
    </ShopProvider>
  );
}
