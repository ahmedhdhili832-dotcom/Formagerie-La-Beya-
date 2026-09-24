import { MapPin, Navigation, Clock, Phone, MessageCircle, ExternalLink, Compass } from 'lucide-react';
import { Language } from '../types';
import { WHATSAPP_PHONE_RAW, WHATSAPP_PHONE_DISPLAY, getWhatsAppDirectUrl } from '../utils/whatsapp';

interface LocationSectionProps {
  currentLang: Language;
}

export function LocationSection({ currentLang }: LocationSectionProps) {
  const isAr = currentLang === 'ar';

  // Exact coordinates and place provided by user: https://maps.app.goo.gl/iacAvMyoRFXy2PqGA
  // Place: GQ3J+2C6 أجبان البية, Jendouba, Tunisie
  const lat = 36.50256;
  const lng = 8.78106;
  const plusCode = 'GQ3J+2C6 Jendouba';
  const directMapsLink = 'https://maps.app.goo.gl/iacAvMyoRFXy2PqGA';
  const directionsLink = `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`;
  
  // High-precision OpenStreetMap embed centered on the exact coordinates with marker
  const mapEmbedUrl = `https://www.openstreetmap.org/export/embed.html?bbox=${lng - 0.008}%2C${lat - 0.006}%2C${lng + 0.008}%2C${lat + 0.006}&layer=mapnik&marker=${lat}%2C${lng}`;

  return (
    <section id="localisation" className="py-16 sm:py-24 bg-[#FAF7F2] border-b border-[#E8DFC8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header (Zero-Pill Discipline) */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-2.5">
          <div className="text-xs uppercase tracking-[0.25em] font-semibold text-[#8C6226]">
            {isAr ? 'الموقع الرسمي المعتمد على خرائط جوجل' : 'Position Officielle Google Maps'}
          </div>

          <h2 className="font-serif-brand text-3xl sm:text-5xl font-extrabold text-[#1A130E] tracking-tight [text-wrap:balance]">
            {isAr ? (
              <span className="font-arabic">موقعنا على خرائط جوجل (Google Maps)</span>
            ) : (
              'Retrouvez-Nous sur Google Maps'
            )}
          </h2>

          <p className="font-arabic text-base sm:text-lg text-[#615143] leading-relaxed [text-wrap:balance]">
            {isAr
              ? 'مرحباً بكم في مقر وورشة أجبان البية بإشراف عمر هذيلي بجندوبة، مع خدمة التوصيل المبرد لكافة ولايات تونس.'
              : 'Bienvenue au siège de la Fromagerie La Beya par Omar Hdhili à Jendouba, avec service de livraison fraîche dans toute la Tunisie.'}
          </p>
        </div>

        {/* Location Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Details Card */}
          <div className="lg:col-span-5 bg-[#FFFDF9] rounded-3xl p-6 sm:p-8 border border-[#E8DFC8] shadow-sm flex flex-col justify-between space-y-6">
            <div className="space-y-6">
              
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-xs font-bold text-[#8C6226] tracking-wider uppercase">
                  <Compass className="w-4 h-4 text-[#C89B3C]" />
                  <span>{isAr ? 'المقر الرئيسي والورشة' : 'Atelier de Fabrication'}</span>
                </div>
                <h3 className="font-serif-brand text-2xl font-bold text-[#1A130E]">
                  FROMAGERIE LA BEYA
                </h3>
                <p className="font-arabic text-sm text-[#736253]">
                  {isAr ? 'أجبان البية · عمر هذيلي (جندوبة)' : 'Omar Hdhili (Jendouba)'}
                </p>
              </div>

              {/* Exact Address & Plus Code */}
              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-2xl bg-[#F4EDE2] flex items-center justify-center text-[#8C6226] shrink-0 mt-0.5">
                  <MapPin className="w-5 h-5 text-[#C89B3C]" />
                </div>
                <div>
                  <div className="text-xs font-bold text-[#554435] uppercase tracking-wider">
                    {isAr ? 'العنوان والإحداثيات:' : 'Adresse & Coordonnées :'}
                  </div>
                  <div className="font-bold text-sm text-[#1A130E] mt-0.5">
                    {isAr
                      ? 'أجبان البية، جندوبة، تونس'
                      : 'Fromagerie La Beya, Jendouba, Tunisie'}
                  </div>
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-1 mt-1.5 rounded-lg bg-[#F2EADB] border border-[#E0D3C1] text-xs font-mono text-[#785B33]">
                    <span className="font-semibold text-[11px] text-[#A67C38]">Plus Code:</span>
                    <span className="font-bold">{plusCode}</span>
                  </div>
                  <div className="text-xs text-[#8A7969] mt-1.5">
                    {isAr
                      ? 'خدمة التوصيل المبرد تغطي كامل الجمهورية التونسية'
                      : 'Livraison express réfrigérée dans toute la Tunisie'}
                  </div>
                </div>
              </div>

              {/* Hours */}
              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-2xl bg-[#F4EDE2] flex items-center justify-center text-[#8C6226] shrink-0 mt-0.5">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-bold text-[#554435] uppercase tracking-wider">
                    {isAr ? 'أوقات العمل والاستقبال:' : 'Horaires d\'ouverture :'}
                  </div>
                  <div className="font-semibold text-sm text-[#1A130E]">
                    {isAr ? 'من الإثنين إلى السبت: 08:30 – 19:30' : 'Du Lundi au Samedi : 08h30 – 19h30'}
                  </div>
                  <div className="text-xs text-[#8A7969] mt-0.5">
                    {isAr ? 'الأحد: 09:00 – 14:00 (تسليم الطلبيات)' : 'Dimanche : 09h00 – 14h00'}
                  </div>
                </div>
              </div>

              {/* Phone & WhatsApp */}
              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-2xl bg-[#F4EDE2] flex items-center justify-center text-[#8C6226] shrink-0 mt-0.5">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-bold text-[#554435] uppercase tracking-wider">
                    {isAr ? 'الهاتف المباشر والواتساب:' : 'Téléphone & WhatsApp :'}
                  </div>
                  <a
                    href="tel:+21653216859"
                    className="font-black text-lg text-[#1A130E] hover:text-[#8C6226] transition-colors block font-mono"
                    dir="ltr"
                  >
                    53 216 859
                  </a>
                  <div className="text-xs text-[#8A7969]">
                    {isAr ? 'تواصل فوري للطلبيات والاستفسارات' : 'Disponible 7j/7 pour vos commandes'}
                  </div>
                </div>
              </div>

            </div>

            {/* Action buttons */}
            <div className="pt-4 flex flex-col gap-2.5">
              {/* Main button to exact Google Maps link */}
              <a
                href={directMapsLink}
                target="_blank"
                rel="noopener noreferrer"
                id="open-google-maps-btn"
                className="w-full inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-2xl bg-[#1A130E] hover:bg-[#2F2218] text-[#F3E5AB] font-bold text-sm shadow-md transition-all transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
              >
                <Navigation className="w-4 h-4 text-[#C89B3C]" />
                <span>{isAr ? 'فتح على تطبيق خرائط جوجل (Google Maps)' : 'Ouvrir sur Google Maps'}</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>

              <div className="flex gap-2.5">
                <a
                  href={directionsLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-3 rounded-2xl bg-[#EAE2D4] hover:bg-[#DDD2C0] text-[#1A130E] font-semibold text-xs transition-colors"
                >
                  <Compass className="w-4 h-4 text-[#8C6226]" />
                  <span>{isAr ? 'خط السير (Itinéraire)' : 'Itinéraire GPS'}</span>
                </a>

                <a
                  href={getWhatsAppDirectUrl('Bonjour Fromagerie La Beya, je souhaite venir récupérer une commande à votre atelier de Jendouba.')}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-3 rounded-2xl bg-[#25D366] hover:bg-[#20be5a] text-white font-semibold text-xs transition-colors"
                >
                  <MessageCircle className="w-4 h-4 fill-white" />
                  <span>{isAr ? 'واتساب 53216859' : 'WhatsApp direct'}</span>
                </a>
              </div>
            </div>

          </div>

          {/* Interactive Map Embed */}
          <div className="lg:col-span-7 bg-[#FFFDF9] rounded-3xl overflow-hidden border border-[#E8DFC8] shadow-sm flex flex-col min-h-[460px]">
            <div className="p-4 bg-[#F5EFE6] border-b border-[#E2D4BF] flex items-center justify-between text-xs text-[#6B5A4B]">
              <div className="flex items-center gap-2 font-semibold">
                <span className="w-2.5 h-2.5 rounded-full bg-[#25D366] animate-pulse" />
                <span>{isAr ? 'إحداثيات GPS المباشرة: 36.50256 N, 8.78106 E' : 'GPS : 36.50256 N, 8.78106 E'}</span>
              </div>
              <a
                href={directMapsLink}
                target="_blank"
                rel="noopener noreferrer"
                className="font-bold text-[#8C6226] hover:underline flex items-center gap-1"
              >
                <span>{isAr ? 'عرض في نافذة كاملة' : 'Agrandir la carte'}</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>

            <div className="relative flex-1 w-full bg-[#EAE2D4] min-h-[380px]">
              <iframe
                title="Carte d'accès Fromagerie La Beya - Omar Hdhili Jendouba"
                src={mapEmbedUrl}
                className="w-full h-full border-0 absolute inset-0"
                loading="lazy"
              />

              {/* Floating Overlay Badge on Map */}
              <div className="absolute top-4 left-4 z-10 bg-[#1A130E]/90 backdrop-blur-md text-white p-3 rounded-2xl border border-[#C89B3C]/50 shadow-xl max-w-xs pointer-events-auto">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-[#C89B3C]" />
                  <strong className="text-xs font-serif-brand tracking-wider text-[#F3E5AB]">
                    FROMAGERIE LA BEYA
                  </strong>
                </div>
                <p className="text-[11px] text-[#DDD2C4] font-arabic mt-1">
                  أجبان البية • جندوبة (عمر هذيلي)
                </p>
                <a
                  href={directMapsLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 text-[10px] text-[#F3E5AB] font-bold hover:underline flex items-center gap-1"
                >
                  <span>{isAr ? 'اضغط لفتح في Google Maps' : 'Ouvrir l\'itinéraire Google Maps'}</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
