import { MessageCircle, ShoppingBag, Award, ShieldCheck, Sparkles, Phone, ArrowDown, MapPin } from 'lucide-react';
import { Language } from '../types';
import { getWhatsAppDirectUrl, WHATSAPP_PHONE_DISPLAY } from '../utils/whatsapp';

interface HeroProps {
  currentLang: Language;
  onExploreClick: () => void;
  onOrderClick: () => void;
}

export function Hero({ currentLang, onExploreClick, onOrderClick }: HeroProps) {
  const isAr = currentLang === 'ar';

  return (
    <section className="relative overflow-hidden bg-[#120D09] text-[#F5EFEB] pt-10 pb-20 sm:pt-16 sm:pb-28 border-b border-[#2C1F14]">
      {/* Subtle warm ambient lighting */}
      <div className="absolute top-0 right-1/4 -mt-32 w-[32rem] h-[32rem] rounded-full bg-[#C89B3C]/10 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-96 h-96 rounded-full bg-[#8C6226]/15 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* Main Content Column */}
          <div className="lg:col-span-7 flex flex-col items-start text-start space-y-6">
            
            {/* Editorial Kicker (Zero-Pill Discipline) */}
            <div className="flex items-center gap-2.5 text-xs tracking-[0.2em] uppercase font-semibold text-[#D4AF37]">
              <span>Maison Artisane</span>
              <span className="text-[#8C6226]" aria-hidden="true">·</span>
              <span>Omar Hdhili</span>
              <span className="text-[#8C6226]" aria-hidden="true">·</span>
              <span>Jendouba</span>
            </div>

            {/* Main Brand Typography: Big French + Arabic Title */}
            <div className="space-y-3 w-full">
              <h1 className="font-serif-brand text-4xl sm:text-6xl xl:text-7xl font-extrabold tracking-tight text-[#FAF7F2] uppercase leading-[1.05] drop-shadow-sm [text-wrap:balance]">
                FROMAGERIE<br />
                <span className="gold-foil-text font-black tracking-normal">
                  LA BEYA
                </span>
              </h1>

              {/* Arabic Title right underneath */}
              <h2 className="font-arabic text-3xl sm:text-5xl font-extrabold text-[#E6C687] tracking-normal pt-1 [text-wrap:balance]">
                أجبان البية
              </h2>

              <p className="font-arabic text-base sm:text-lg text-[#C5B49E] font-medium leading-relaxed max-w-2xl pt-2">
                {isAr
                  ? 'أجبان طبيعية فاخرة مصنعة بحرفية عالية من أجود أنواع الحليب الطازج في جندوبة، معتقة على الطريقة التقليدية لترضي الذواقة وأصحاب المطاعم والمناسبات الخاصة.'
                  : 'L\'art de l\'affinage traditionnel et l\'excellence du lait pur du terroir de Jendouba. Des créations fromagères d\'une noblesse et d\'un goût incomparables.'}
              </p>
            </div>

            {/* High-Impact WhatsApp Button with number 53216859 + CTAs */}
            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 w-full sm:w-auto">
              {/* WhatsApp Button */}
              <a
                href={getWhatsAppDirectUrl('Salam, je vous contacte depuis le site Fromagerie La Beya pour une commande.')}
                target="_blank"
                rel="noopener noreferrer"
                id="hero-whatsapp-order-btn"
                className="group flex items-center justify-center gap-3.5 bg-[#25D366] hover:bg-[#20be5a] text-white font-bold text-base px-6 py-3.5 rounded-2xl shadow-lg shadow-[#25D366]/20 transition-all transform hover:-translate-y-0.5 active:translate-y-0"
              >
                <div className="relative">
                  <MessageCircle className="w-5 h-5 fill-white" />
                  <span className="absolute -top-1 -right-1 w-2 h-2 bg-white rounded-full animate-ping" />
                </div>
                <div className="flex flex-col text-start leading-tight">
                  <span className="text-[10px] font-semibold text-emerald-100 uppercase tracking-wider">
                    {isAr ? 'طلب فوري ومباشر' : 'Commande directe WhatsApp'}
                  </span>
                  <span className="text-lg font-black tracking-wide font-mono" dir="ltr">
                    53 216 859
                  </span>
                </div>
              </a>

              {/* Direct Order Form Button */}
              <button
                type="button"
                id="hero-direct-order-btn"
                onClick={onOrderClick}
                className="flex items-center justify-center gap-2.5 bg-[#FAF7F2] hover:bg-[#EAE2D4] text-[#140E0A] font-bold text-base px-6 py-3.5 rounded-2xl transition-all shadow-md transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
              >
                <ShoppingBag className="w-5 h-5 text-[#8C6226]" />
                <span>{isAr ? 'نموذج الطلب والكميات' : 'Composer votre commande'}</span>
              </button>
            </div>

            {/* Quality Seals Bar (Unboxed Metadata) */}
            <div className="pt-4 grid grid-cols-3 gap-3 border-t border-[#2C1F14] w-full text-xs text-[#B5A593]">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#C89B3C] shrink-0" />
                <span>{isAr ? 'حليب بلدي 100%' : '100% Lait Pur'}</span>
              </div>
              <div className="flex items-center gap-2">
                <Award className="w-4 h-4 text-[#C89B3C] shrink-0" />
                <span>{isAr ? 'تعتيق بطيء وطبيعي' : 'Affinage Artisanal'}</span>
              </div>
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#C89B3C] shrink-0" />
                <span>{isAr ? 'توصيل لكافة الولايات' : 'Toute la Tunisie'}</span>
              </div>
            </div>

          </div>

          {/* Hero Visual Showcase / Gastronomic Terroir Presentation */}
          <div className="lg:col-span-5 relative">
            <div 
              className="relative rounded-3xl overflow-hidden shadow-2xl border border-[#C89B3C]/40 bg-[#17100B] p-6 sm:p-7 flex flex-col justify-between min-h-[390px] sm:min-h-[440px]"
              style={{
                background: 'radial-gradient(circle at 50% 20%, #291C12 0%, #150E09 70%, #0D0805 100%)',
                boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.9), 0 0 35px rgba(200, 155, 60, 0.18)',
              }}
            >
              {/* Background Artisanal Cheese Photo with Gastronomic Lighting */}
              <div className="absolute inset-0 z-0 pointer-events-none">
                <img
                  src="https://images.unsplash.com/photo-1486297678162-eb2a19b0a32d?auto=format&fit=crop&w=1000&q=80"
                  alt="Sélection artisanale Fromagerie La Beya"
                  className="w-full h-full object-cover object-center opacity-45 scale-105"
                  loading="lazy"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0E0905]/98 via-[#1A120B]/80 to-[#0E0905]/75" />
              </div>

              {/* Gold borders filigree */}
              <div className="absolute top-3 left-3 w-6 h-6 border-t-2 border-l-2 border-[#C89B3C]/70 rounded-tl-sm pointer-events-none z-10" />
              <div className="absolute top-3 right-3 w-6 h-6 border-t-2 border-r-2 border-[#C89B3C]/70 rounded-tr-sm pointer-events-none z-10" />
              <div className="absolute bottom-3 left-3 w-6 h-6 border-b-2 border-l-2 border-[#C89B3C]/70 rounded-bl-sm pointer-events-none z-10" />
              <div className="absolute bottom-3 right-3 w-6 h-6 border-b-2 border-r-2 border-[#C89B3C]/70 rounded-br-sm pointer-events-none z-10" />

              {/* Top Showcase Bar */}
              <div className="flex items-center justify-between z-10">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#E6C687] to-[#A07025] p-0.5 flex items-center justify-center shadow-xs">
                    <div className="w-full h-full bg-[#18110B] rounded-[6px] flex items-center justify-center text-[#F5DEB3] font-serif-brand font-black text-xs">
                      LB
                    </div>
                  </div>
                  <span className="text-[11px] font-semibold text-[#D4AF37] tracking-[0.2em] uppercase">
                    {isAr ? 'إنتاج حرفي أصيل' : 'Terroir & Affinage'}
                  </span>
                </div>

                <div className="text-[11px] text-[#C5B49E] font-medium flex items-center gap-1.5 bg-[#2A1C12]/80 px-2.5 py-1 rounded-full border border-[#C89B3C]/30">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#25D366] animate-pulse" />
                  <span>{isAr ? 'جندوبة · تونس' : 'Jendouba, Tunisie'}</span>
                </div>
              </div>

              {/* Center Presentation */}
              <div className="text-center my-auto py-6 z-10 space-y-2.5">
                <div className="text-[11px] font-semibold text-[#C89B3C] uppercase tracking-[0.25em]">
                  {isAr ? 'تشكيلة الأجبان المعتقة والطازجة' : 'Sélection Gastronomique'}
                </div>

                {/* Big French Title */}
                <h3 className="font-serif-brand text-2xl sm:text-3xl font-extrabold uppercase tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-[#FFF5E6] via-[#F3E5AB] to-[#C89B3C] drop-shadow-sm">
                  FROMAGERIE LA BEYA
                </h3>

                {/* Arabic Title */}
                <div className="font-arabic text-2xl sm:text-3xl font-extrabold text-[#FAF7F2] tracking-tight">
                  أجبان البية
                </div>

                {/* Omar Hdhili Artisan Credit */}
                <div className="pt-1 flex items-center justify-center gap-1.5 text-xs sm:text-sm text-[#D4A373] font-arabic">
                  <span>صناعة الحرفي:</span>
                  <strong className="text-[#FAF7F2] font-bold border-b border-[#C89B3C] pb-0.5 tracking-wide">
                    عمر هذيلي
                  </strong>
                </div>

                {/* Highlights chips */}
                <div className="pt-2 flex flex-wrap items-center justify-center gap-1.5 text-[11px] text-[#E8DCCB]">
                  <span className="bg-[#24170E]/80 border border-[#4A3420] px-2.5 py-0.5 rounded-md">غودا معتق</span>
                  <span className="bg-[#24170E]/80 border border-[#4A3420] px-2.5 py-0.5 rounded-md">موزاريلا طازجة</span>
                  <span className="bg-[#24170E]/80 border border-[#4A3420] px-2.5 py-0.5 rounded-md">كاممبير فاخر</span>
                  <span className="bg-[#24170E]/80 border border-[#4A3420] px-2.5 py-0.5 rounded-md">توم بالأعشاب</span>
                </div>
              </div>

              {/* Bottom Details & Direct Navigation */}
              <div className="pt-3 border-t border-[#C89B3C]/25 flex items-center justify-between z-10">
                <div className="flex items-center gap-2 text-xs">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#25D366] animate-pulse" />
                  <span className="text-[#A89885] text-[11px]">WhatsApp:</span>
                  <span className="font-bold text-[#F5DEB3] text-sm tracking-wider font-mono" dir="ltr">
                    53 216 859
                  </span>
                </div>

                <button
                  type="button"
                  onClick={onExploreClick}
                  className="text-xs text-[#C89B3C] hover:text-[#FAF7F2] font-semibold flex items-center gap-1 transition-colors cursor-pointer"
                >
                  <span>{isAr ? 'استكشف التشكيلة الحرفية' : 'Voir les fromages'}</span>
                  <ArrowDown className="w-3.5 h-3.5" />
                </button>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
