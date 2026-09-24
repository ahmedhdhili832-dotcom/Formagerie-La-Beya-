import { useState, useEffect } from 'react';
import { Language, CheeseProduct } from './types';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { ProductCatalog } from './components/ProductCatalog';
import { ArtisanStory } from './components/ArtisanStory';
import { OrderSection } from './components/OrderSection';
import { TestimonialsSection } from './components/TestimonialsSection';
import { LocationSection } from './components/LocationSection';
import { Footer } from './components/Footer';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';
import { ProductQuickViewModal } from './components/ProductQuickViewModal';
import { ArtisanAdminPage } from './components/ArtisanAdminPage';
import { testFirestoreConnection } from './firebase';

export default function App() {
  // Default to Arabic as primary language
  const [currentLang, setCurrentLang] = useState<Language>('ar');
  const [selectedProductForOrder, setSelectedProductForOrder] = useState<CheeseProduct | null>(null);
  const [quickViewProduct, setQuickViewProduct] = useState<CheeseProduct | null>(null);

  // Check URL path or hash to determine whether we are on the public store or the admin page
  const [currentPage, setCurrentPage] = useState<'store' | 'admin'>(() => {
    if (typeof window !== 'undefined') {
      const isPathAdmin = window.location.pathname === '/admin' || window.location.pathname.startsWith('/admin/');
      const isHashAdmin = window.location.hash === '#admin';
      return (isPathAdmin || isHashAdmin) ? 'admin' : 'store';
    }
    return 'store';
  });

  // Sync HTML dir and lang attributes, and validate Firestore connection on boot
  useEffect(() => {
    document.documentElement.dir = currentLang === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = currentLang;
  }, [currentLang]);

  useEffect(() => {
    testFirestoreConnection();
  }, []);

  // Sync page state with browser history (popstate / hashchange)
  useEffect(() => {
    const handlePopState = () => {
      const isPathAdmin = window.location.pathname === '/admin' || window.location.pathname.startsWith('/admin/');
      const isHashAdmin = window.location.hash === '#admin';
      setCurrentPage((isPathAdmin || isHashAdmin) ? 'admin' : 'store');
    };

    window.addEventListener('popstate', handlePopState);
    window.addEventListener('hashchange', handlePopState);
    return () => {
      window.removeEventListener('popstate', handlePopState);
      window.removeEventListener('hashchange', handlePopState);
    };
  }, []);

  const navigateTo = (page: 'store' | 'admin') => {
    setCurrentPage(page);
    if (page === 'admin') {
      window.history.pushState(null, '', '#admin');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      window.history.pushState(null, '', window.location.pathname);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const scrollToOrder = () => {
    const el = document.getElementById('commande');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToCatalog = () => {
    const el = document.getElementById('produits');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSelectProductForOrder = (product: CheeseProduct) => {
    setSelectedProductForOrder(product);
    scrollToOrder();
  };

  // If on the dedicated Admin Page: render the full-screen Artisan Portal
  if (currentPage === 'admin') {
    return (
      <ArtisanAdminPage
        currentLang={currentLang}
        onBackToStore={() => navigateTo('store')}
        onToggleLang={(lang) => setCurrentLang(lang)}
      />
    );
  }

  // Public Customer Storefront
  return (
    <div className={`min-h-screen flex flex-col bg-[#FAF7F2] text-[#241C15] ${currentLang === 'ar' ? 'font-arabic' : 'font-sans'}`}>
      
      {/* Top Navigation */}
      <Header
        currentLang={currentLang}
        onToggleLang={(lang) => setCurrentLang(lang)}
        onNavigateToOrder={scrollToOrder}
      />

      {/* Main Content */}
      <main className="flex-1">
        {/* Hero Section */}
        <Hero
          currentLang={currentLang}
          onExploreClick={scrollToCatalog}
          onOrderClick={scrollToOrder}
        />

        {/* Product Catalog (No Prices) */}
        <ProductCatalog
          currentLang={currentLang}
          onSelectProductForOrder={handleSelectProductForOrder}
          onQuickView={(prod) => setQuickViewProduct(prod)}
        />

        {/* Artisan Story */}
        <ArtisanStory
          currentLang={currentLang}
        />

        {/* Direct Order Form (Direct & Fast, saves in Firestore database behind the scenes) */}
        <OrderSection
          currentLang={currentLang}
          preselectedProduct={selectedProductForOrder}
        />

        {/* Customer Reviews & Testimonials */}
        <TestimonialsSection
          currentLang={currentLang}
        />

        {/* Store Location on Google Maps */}
        <LocationSection
          currentLang={currentLang}
        />
      </main>

      {/* Footer (with discreet link to Artisan Portal) */}
      <Footer
        currentLang={currentLang}
        onOpenAdmin={() => navigateTo('admin')}
      />

      {/* Floating WhatsApp Quick Action Button (53216859) */}
      <FloatingWhatsApp
        currentLang={currentLang}
      />

      {/* Product Quick View Modal */}
      <ProductQuickViewModal
        product={quickViewProduct}
        currentLang={currentLang}
        onClose={() => setQuickViewProduct(null)}
        onSelectForOrder={handleSelectProductForOrder}
      />
    </div>
  );
}
