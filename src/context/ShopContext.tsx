import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, PRODUCTS } from '../data/products';

export interface CartItem {
  id: string; // unique item key e.g. `${product.id}-${size}-${color}`
  product: Product;
  quantity: number;
  selectedSize?: string;
  selectedColor?: string;
}

export type ViewType = 'home' | 'catalog' | 'product' | 'cart' | 'proposal' | 'boutique';

interface ShopContextType {
  // Navigation
  currentView: ViewType;
  setCurrentView: (view: ViewType) => void;
  selectedProductId: string | null;
  openProductDetail: (id: string) => void;

  // Cart
  cart: CartItem[];
  addToCart: (product: Product, quantity?: number, size?: string, color?: string) => void;
  updateQuantity: (itemId: string, delta: number) => void;
  removeFromCart: (itemId: string) => void;
  clearCart: () => void;
  cartCount: number;
  cartSubtotal: number;
  discountAmount: number;
  cartTotal: number;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;

  // Promo Coupon
  appliedCoupon: string | null;
  discountPercent: number;
  applyCoupon: (code: string) => { success: boolean; message: string };
  removeCoupon: () => void;

  // Wishlist
  wishlist: string[];
  toggleWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;

  // Quick View Modal
  quickViewProduct: Product | null;
  setQuickViewProduct: (product: Product | null) => void;

  // Search
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  isSearchOpen: boolean;
  setIsSearchOpen: (open: boolean) => void;

  // Catalog Filters
  catalogCategory: string;
  setCatalogCategory: (cat: string) => void;

  // Modals & Overlays
  isCheckoutModalOpen: boolean;
  setIsCheckoutModalOpen: (open: boolean) => void;
  isCommercialProposalOpen: boolean;
  setIsCommercialProposalOpen: (open: boolean) => void;

  // Notification Toast
  toast: { message: string; type: 'success' | 'info' } | null;
  showToast: (message: string, type?: 'success' | 'info') => void;
}

const ShopContext = createContext<ShopContextType | undefined>(undefined);

export const ShopProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentView, setCurrentView] = useState<ViewType>('home');
  const [selectedProductId, setSelectedProductId] = useState<string | null>(PRODUCTS[0].id);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [catalogCategory, setCatalogCategory] = useState<string>('all');
  const [isCheckoutModalOpen, setIsCheckoutModalOpen] = useState(false);
  const [isCommercialProposalOpen, setIsCommercialProposalOpen] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'info' } | null>(null);

  // Cart with preloaded initial dummy item so the demo starts lively
  const [cart, setCart] = useState<CartItem[]>(() => [
    {
      id: `${PRODUCTS[0].id}-M-Noir Minuit`,
      product: PRODUCTS[0],
      quantity: 1,
      selectedSize: 'M',
      selectedColor: 'Noir Minuit',
    },
    {
      id: `${PRODUCTS[1].id}-default-default`,
      product: PRODUCTS[1],
      quantity: 1,
    },
  ]);

  const [wishlist, setWishlist] = useState<string[]>([PRODUCTS[0].id, PRODUCTS[2].id]);
  const [appliedCoupon, setAppliedCoupon] = useState<string | null>('BIENVENUE10');
  const [discountPercent, setDiscountPercent] = useState<number>(10);

  const showToast = (message: string, type: 'success' | 'info' = 'success') => {
    setToast({ message, type });
  };

  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => setToast(null), 3500);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  // Navigate to PDP smoothly
  const openProductDetail = (id: string) => {
    setSelectedProductId(id);
    setCurrentView('product');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Add to cart
  const addToCart = (product: Product, quantity = 1, size?: string, color?: string) => {
    const itemKey = `${product.id}-${size || 'std'}-${color || 'std'}`;
    setCart((prev) => {
      const existing = prev.find((item) => item.id === itemKey);
      if (existing) {
        return prev.map((item) =>
          item.id === itemKey ? { ...item, quantity: item.quantity + quantity } : item
        );
      }
      return [
        ...prev,
        {
          id: itemKey,
          product,
          quantity,
          selectedSize: size || (product.sizes ? product.sizes[0] : undefined),
          selectedColor: color || (product.colors ? product.colors[0].name : undefined),
        },
      ];
    });

    showToast(`« ${product.name} » a été ajouté à votre panier`);
    setIsCartOpen(true);
  };

  // Update item quantity
  const updateQuantity = (itemId: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((item) => {
          if (item.id === itemId) {
            const newQ = item.quantity + delta;
            return newQ > 0 ? { ...item, quantity: newQ } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  // Remove from cart
  const removeFromCart = (itemId: string) => {
    setCart((prev) => prev.filter((item) => item.id !== itemId));
    showToast('Article retiré du panier', 'info');
  };

  const clearCart = () => {
    setCart([]);
  };

  // Wishlist toggle
  const toggleWishlist = (productId: string) => {
    setWishlist((prev) => {
      const exists = prev.includes(productId);
      const target = PRODUCTS.find((p) => p.id === productId);
      if (exists) {
        showToast(target ? `« ${target.name} » retiré de vos favoris` : 'Article retiré des favoris', 'info');
        return prev.filter((id) => id !== productId);
      } else {
        showToast(target ? `« ${target.name} » ajouté à vos favoris` : 'Article ajouté aux favoris');
        return [...prev, productId];
      }
    });
  };

  const isInWishlist = (productId: string) => wishlist.includes(productId);

  // Apply Coupon code
  const applyCoupon = (code: string) => {
    const clean = code.trim().toUpperCase();
    if (clean === 'BIENVENUE10' || clean === 'SCANDAL10') {
      setAppliedCoupon(clean);
      setDiscountPercent(10);
      showToast('Code privilège de -10% appliqué !');
      return { success: true, message: 'Code privilège -10% appliqué avec succès' };
    } else if (clean === 'HAVRE15') {
      setAppliedCoupon(clean);
      setDiscountPercent(15);
      showToast('Privilège Le Havre -15% appliqué !');
      return { success: true, message: 'Code spécial Le Havre -15% appliqué' };
    }
    return { success: false, message: 'Code privilège invalide ou expiré' };
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
    setDiscountPercent(0);
    showToast('Code de réduction retiré', 'info');
  };

  // Calculation
  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
  const cartSubtotal = cart.reduce((total, item) => total + item.product.price * item.quantity, 0);
  const discountAmount = appliedCoupon ? (cartSubtotal * discountPercent) / 100 : 0;
  const cartTotal = Math.max(0, cartSubtotal - discountAmount);

  return (
    <ShopContext.Provider
      value={{
        currentView,
        setCurrentView,
        selectedProductId,
        openProductDetail,
        cart,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        cartCount,
        cartSubtotal,
        discountAmount,
        cartTotal,
        isCartOpen,
        setIsCartOpen,
        appliedCoupon,
        discountPercent,
        applyCoupon,
        removeCoupon,
        wishlist,
        toggleWishlist,
        isInWishlist,
        quickViewProduct,
        setQuickViewProduct,
        searchQuery,
        setSearchQuery,
        isSearchOpen,
        setIsSearchOpen,
        catalogCategory,
        setCatalogCategory,
        isCheckoutModalOpen,
        setIsCheckoutModalOpen,
        isCommercialProposalOpen,
        setIsCommercialProposalOpen,
        toast,
        showToast,
      }}
    >
      {children}
    </ShopContext.Provider>
  );
};

export const useShop = () => {
  const context = useContext(ShopContext);
  if (!context) {
    throw new Error('useShop must be used within a ShopProvider');
  }
  return context;
};
