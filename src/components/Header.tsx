import { useState, useEffect } from 'react';
import { Phone, MessageCircle, MapPin, Sparkles, Globe, Menu, X, ShoppingBag, ArrowRight } from 'lucide-react';
import { Language } from '../types';
import { WHATSAPP_PHONE_DISPLAY, getWhatsAppDirectUrl } from '../utils/whatsapp';

interface HeaderProps {
  currentLang: Language;
  onToggleLang: (lang: Language) => void;
  onNavigateToOrder: () => void;
}

export function Header({ currentLang, onToggleLang, onNavigateToOrder }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isAr = currentLang === 'ar';

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: '#produits', fr: 'Nos Fromages', ar: 'تشكيلة الأجبان' },
    { href: '#artisan', fr: 'L\'Artisan Omar Hdhili', ar: 'عمر هذيلي وصنعة الأجبان' },
    { href: '#commande', fr: 'Commander', ar: 'طلب مباشر' },
    { href: '#avis', fr: 'Avis Clients', ar: 'آراء الحرفاء' },
    { href: '#localisation', fr: 'Localisation', ar: 'موقع المتجر' },
  ];

  return (
    <header className="sticky top-0 z-50 w-full transition-all duration-300">
      {/* Top micro bar with artisan credit and fast contact */}
      <div className="bg-[#140E0A] text-[#E8DCCB] text-xs py-2 px-4 border-b border-[#2C1F14]">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3 font-medium">
          <div className="flex items-center gap-2.5">
            <span className="inline-block w-2 h-2 rounded-full bg-[#C89B3C] animate-pulse"></span>
            <span className="tracking-wide text-[11px] sm:text-xs text-[#D8C7B0]">
              {isAr ? (
                <>حرفي الأجبان <strong className="text-[#F5DEB3] font-semibold">عمر هذيلي</strong> · حليب طازج 100% · جندوبة</>
              ) : (
                <>Maître Fromager <strong className="text-[#F5DEB3] font-semibold">Omar Hdhili</strong> · Terroir & Prestige</>
              )}
            </span>
          </div>

          <div className="flex items-center gap-4 text-xs">
            <a
              href="tel:+21653216859"
              id="top-bar-phone-link"
              className="flex items-center gap-1.5 text-[#E6C687] hover:text-white transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-[#C89B3C]" />
              <span className="font-semibold tracking-wider" dir="ltr">53 216 859</span>
            </a>

            <span className="text-[#4A3725]">|</span>

            {/* Language Switcher */}
            <div className="flex items-center gap-0.5 bg-[#251B12] rounded-md p-0.5 border border-[#3E2D1D]">
              <button
                type="button"
                onClick={() => onToggleLang('fr')}
                className={`px-2 py-0.5 rounded transition-all text-[11px] font-semibold cursor-pointer ${
                  currentLang === 'fr'
                    ? 'bg-[#C89B3C] text-[#140E0A] shadow-xs'
                    : 'text-[#AFA18E] hover:text-[#FAF7F2]'
                }`}
                title="Français"
              >
                FR
              </button>
              <button
                type="button"
                onClick={() => onToggleLang('ar')}
                className={`px-2 py-0.5 rounded transition-all text-[11px] font-semibold cursor-pointer ${
                  currentLang === 'ar'
                    ? 'bg-[#C89B3C] text-[#140E0A] shadow-xs'
                    : 'text-[#AFA18E] hover:text-[#FAF7F2]'
                }`}
                title="العربية"
              >
                عربي
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main navigation container */}
      <nav
        className={`w-full transition-all duration-300 ${
          isScrolled
            ? 'bg-[#FAF7F2]/95 backdrop-blur-md shadow-md border-b border-[#E2D5C1] py-2.5'
            : 'bg-[#FAF7F2] border-b border-[#E8DFC8]/60 py-3.5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          
          {/* Brand identity: Big French text + Arabic subtitle */}
          <a href="#" className="group flex flex-col focus:outline-none select-none">
            <span className="font-serif-brand text-2xl sm:text-3xl font-extrabold tracking-wider text-[#1A130E] uppercase group-hover:text-[#9E6E1E] transition-colors leading-tight">
              FROMAGERIE LA BEYA
            </span>
            <div className="flex items-center gap-2 font-arabic text-sm sm:text-base font-bold text-[#8C6226] tracking-normal -mt-0.5">
              <span>أجبان البية</span>
              <span className="text-[11px] font-medium text-[#7D6B58] hidden sm:inline">
                · {isAr ? 'عمر هذيلي' : 'Omar Hdhili'}
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center gap-6 xl:gap-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm font-semibold text-[#4A3B2C] hover:text-[#9E6E1E] transition-colors tracking-wide py-1 relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-[#C89B3C] hover:after:w-full after:transition-all"
              >
                {isAr ? link.ar : link.fr}
              </a>
            ))}
          </div>

          {/* Action buttons: WhatsApp 53216859 + Commander */}
          <div className="hidden sm:flex items-center gap-3">
            <a
              href={getWhatsAppDirectUrl('Bonjour Fromagerie La Beya, je souhaite passer une commande directe.')}
              target="_blank"
              rel="noopener noreferrer"
              id="header-whatsapp-btn"
              className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold text-xs sm:text-sm px-4 py-2.5 rounded-xl shadow-sm hover:shadow-md transition-all transform hover:-translate-y-0.5 active:translate-y-0"
            >
              <MessageCircle className="w-4 h-4 fill-white" />
              <span>WhatsApp</span>
              <span className="bg-black/15 px-2 py-0.5 rounded-md text-xs font-mono" dir="ltr">53216859</span>
            </a>

            <button
              type="button"
              id="header-order-cta-btn"
              onClick={onNavigateToOrder}
              className="inline-flex items-center gap-2 bg-[#1A130E] hover:bg-[#2F2218] text-[#F3E5AB] font-semibold text-xs sm:text-sm px-4 py-2.5 rounded-xl border border-[#C89B3C]/50 shadow-xs hover:shadow-sm transition-all cursor-pointer"
            >
              <ShoppingBag className="w-4 h-4 text-[#C89B3C]" />
              <span>{isAr ? 'اطلب الآن' : 'Commander'}</span>
            </button>
          </div>

          {/* Mobile menu toggle button */}
          <div className="flex lg:hidden items-center gap-2">
            <a
              href={getWhatsAppDirectUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 bg-[#25D366] text-white rounded-xl sm:hidden shadow-xs"
              title="WhatsApp"
            >
              <MessageCircle className="w-4 h-4 fill-white" />
            </a>

            <button
              type="button"
              id="mobile-menu-toggle-button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-[#1A130E] hover:text-[#9E6E1E] focus:outline-none cursor-pointer"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile menu dropdown */}
        {mobileMenuOpen && (
          <div className="lg:hidden px-4 pt-3 pb-6 bg-[#FAF7F2] border-b border-[#E2D5C1] space-y-3">
            <div className="flex flex-col space-y-1 pt-2">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-base font-semibold text-[#1A130E] hover:text-[#9E6E1E] py-2 border-b border-[#E8DFC8]/60"
                >
                  {isAr ? link.ar : link.fr}
                </a>
              ))}
            </div>

            <div className="pt-2 flex flex-col gap-2.5">
              <a
                href={getWhatsAppDirectUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 bg-[#25D366] text-white font-bold py-3 px-4 rounded-xl shadow-xs"
              >
                <MessageCircle className="w-5 h-5 fill-white" />
                <span>WhatsApp: 53216859</span>
              </a>

              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onNavigateToOrder();
                }}
                className="w-full flex items-center justify-center gap-2 bg-[#1A130E] text-[#F3E5AB] font-bold py-3 px-4 rounded-xl border border-[#C89B3C]/50 cursor-pointer"
              >
                <ShoppingBag className="w-5 h-5 text-[#C89B3C]" />
                <span>{isAr ? 'نموذج الطلب المباشر' : 'Passer une commande'}</span>
              </button>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
