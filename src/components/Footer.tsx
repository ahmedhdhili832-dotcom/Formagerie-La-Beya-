import { Phone, MessageCircle, MapPin, Heart, Sparkles, Clock, ShieldCheck, Mail, Lock } from 'lucide-react';
import { Language } from '../types';
import { WHATSAPP_PHONE_RAW, WHATSAPP_PHONE_DISPLAY, getWhatsAppDirectUrl } from '../utils/whatsapp';

interface FooterProps {
  currentLang: Language;
  onOpenAdmin?: () => void;
}

export function Footer({ currentLang, onOpenAdmin }: FooterProps) {
  const isAr = currentLang === 'ar';

  return (
    <footer className="bg-[#100B07] text-[#DDD0C0] pt-16 pb-12 border-t border-[#261A10]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-[#261A10]">
          
          {/* Brand Col */}
          <div className="lg:col-span-5 space-y-4">
            <div className="space-y-1">
              <span className="font-serif-brand text-2xl sm:text-3xl font-black tracking-wider text-[#FAF7F2] uppercase block">
                FROMAGERIE LA BEYA
              </span>
              <span className="font-arabic text-xl font-bold text-[#F3E5AB] block">
                أجبان البية
              </span>
            </div>

            {/* Zero-Pill Artisan Kicker */}
            <div className="text-xs uppercase tracking-[0.2em] font-semibold text-[#D4AF37]">
              {isAr ? 'عمر هذيلي · جندوبة' : 'Omar Hdhili · Jendouba'}
            </div>

            <p className="font-arabic text-xs sm:text-sm text-[#A89885] leading-relaxed max-w-sm">
              {isAr
                ? 'أجبان طبيعية فاخرة تعكس ثراء التقاليد وحرفية الصنع. كل قطعة تحمل بصمة الشغف والجودة العالية من ورشة عمر هذيلي.'
                : 'Fromagerie artisanale de haute tradition alliant excellence d\'affinage et pureté du lait. Conçue avec passion par Omar Hdhili.'}
            </p>

            {/* Direct WhatsApp Callout */}
            <div className="pt-2">
              <a
                href={getWhatsAppDirectUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#20be5a] text-white font-bold text-xs px-4 py-2.5 rounded-xl shadow-xs transition-colors"
              >
                <MessageCircle className="w-4 h-4 fill-white" />
                <span>WhatsApp Direct: 53216859</span>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="font-serif-brand text-sm font-bold uppercase tracking-wider text-[#F3E5AB]">
              {isAr ? 'تصفح الأصناف' : 'Nos Variétés'}
            </h4>
            <ul className="space-y-2 text-xs text-[#B5A492]">
              <li>
                <a href="#produits" className="hover:text-[#F3E5AB] transition-colors">
                  {isAr ? 'غودا البية المعتق' : 'Gouda Affiné Prestige'}
                </a>
              </li>
              <li>
                <a href="#produits" className="hover:text-[#F3E5AB] transition-colors">
                  {isAr ? 'موزاريلا طازجة فيور دي لاتي' : 'Mozzarella Artisanale'}
                </a>
              </li>
              <li>
                <a href="#produits" className="hover:text-[#F3E5AB] transition-colors">
                  {isAr ? 'كاممبير وبيري فاخر' : 'Camembert & Brie de La Beya'}
                </a>
              </li>
              <li>
                <a href="#produits" className="hover:text-[#F3E5AB] transition-colors">
                  {isAr ? 'توم ريفية بالأعشاب' : 'Tomme Fermière aux Herbes'}
                </a>
              </li>
              <li>
                <a href="#produits" className="hover:text-[#F3E5AB] transition-colors">
                  {isAr ? 'طبق الضيافة الملكي' : 'Plateau Dégustation Royale'}
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Details */}
          <div className="lg:col-span-4 space-y-3">
            <h4 className="font-serif-brand text-sm font-bold uppercase tracking-wider text-[#F3E5AB]">
              {isAr ? 'الاتصال والطلبيات' : 'Contact & Commandes'}
            </h4>

            <div className="space-y-2.5 text-xs text-[#B5A492]">
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#C89B3C] shrink-0" />
                <span>
                  {isAr ? 'الهاتف المباشر:' : 'Ligne directe :'} <strong className="text-[#FAF7F2] font-mono" dir="ltr">53 216 859</strong>
                </span>
              </div>

              <div className="flex items-center gap-2">
                <MessageCircle className="w-4 h-4 text-[#25D366] shrink-0" />
                <span>
                  WhatsApp: <strong className="text-[#FAF7F2] font-mono" dir="ltr">53216859</strong>
                </span>
              </div>

              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#C89B3C] shrink-0" />
                <a
                  href="https://maps.app.goo.gl/iacAvMyoRFXy2PqGA"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#F3E5AB] transition-colors"
                >
                  {isAr ? 'أجبان البية، جندوبة (GQ3J+2C6) - توصيل لكافة الولايات' : 'Fromagerie La Beya, Jendouba (GQ3J+2C6) - Livraison toute la Tunisie'}
                </a>
              </div>

              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#C89B3C] shrink-0" />
                <span>
                  {isAr ? 'الخدمة والرد: طيلة أيام الأسبوع' : 'Service client 7j/7'}
                </span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom copyright & Artisan tribute */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#8A7968]">
          <div className="flex items-center gap-4">
            <span>
              © {new Date().getFullYear()} FROMAGERIE LA BEYA (أجبان البية).{' '}
              {isAr ? 'جميع الحقوق محفوظة.' : 'Tous droits réservés.'}
            </span>

            {onOpenAdmin && (
              <button
                type="button"
                onClick={onOpenAdmin}
                className="hover:text-[#F3E5AB] transition-colors cursor-pointer text-[11px] underline flex items-center gap-1 opacity-60 hover:opacity-100"
                title={isAr ? 'دخول لوحة تحكم الحرفي' : 'Espace Maître Fromager'}
              >
                <Lock className="w-3 h-3 text-[#C89B3C]" />
                <span>{isAr ? 'فضاء الحرفي' : 'Espace Artisan'}</span>
              </button>
            )}
          </div>

          <div className="flex items-center gap-1.5 font-medium text-[#C5B49E]">
            <span>{isAr ? 'حرفي الأجبان' : 'Maître Fromager'}</span>
            <strong className="text-[#F3E5AB]">Omar Hdhili</strong>
          </div>
        </div>

      </div>
    </footer>
  );
}
