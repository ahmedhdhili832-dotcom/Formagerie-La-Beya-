import { Award, CheckCircle2, HeartHandshake, Milk, Sparkles, Clock, ShieldCheck } from 'lucide-react';
import { Language } from '../types';
import { getWhatsAppDirectUrl } from '../utils/whatsapp';

interface ArtisanStoryProps {
  currentLang: Language;
}

export function ArtisanStory({ currentLang }: ArtisanStoryProps) {
  const isAr = currentLang === 'ar';

  const pillars = [
    {
      icon: Milk,
      titleFr: 'Lait Pur de Ferme',
      titleAr: 'حليب بلدي نقي 100%',
      descFr: 'Collecté chaque aube auprès d\'éleveurs locaux de confiance du nord-ouest tunisien, sans additifs ni conservateurs.',
      descAr: 'يتم جلبه يومياً مع فجر كل صباح من مزارع محلية موثوقة في ربوع الشمال الغربي دون أي إضافات كيميائية أو بودرة.',
    },
    {
      icon: Clock,
      titleFr: 'Affinage en Cave Naturelle',
      titleAr: 'تعتيق بطيء في كهوف طبيعية',
      descFr: 'Patience, maîtrise de l\'hygrométrie et soins manuels quotidiens par le maître artisan Omar Hdhili.',
      descAr: 'صبر وعناية يدوية يومية بكل قرص لضبط الرطوبة وتطوير النكهات الغنية الأصيلة.',
    },
    {
      icon: Award,
      titleFr: 'Rigueur & Savoir-Faire',
      titleAr: 'دقة واحترافية الصانع',
      descFr: 'Un équilibre subtil entre héritage méditerranéen et standards stricts d\'hygiène alimentaire.',
      descAr: 'توليفة محكمة تجمع بين أسرار الموروث المتوسطي وأعلى معايير النظافة والجودة الغذائية.',
    },
  ];

  return (
    <section id="artisan" className="py-16 sm:py-24 bg-[#F2EDE4] border-b border-[#E0D5C3] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Visual Showcase / Artisan Profile photo & certificate */}
          <div className="lg:col-span-5 relative order-2 lg:order-1">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Photo */}
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-[#FFFDF9]">
                <img
                  src="https://images.unsplash.com/photo-1552767059-ce182ead6c1b?auto=format&fit=crop&w=800&q=80"
                  alt="Omar Hdhili - Fromagerie La Beya"
                  className="w-full h-[450px] object-cover"
                  loading="lazy"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#140E0A]/90 via-[#140E0A]/25 to-transparent" />
                
                {/* Overlay Quote */}
                <div className="absolute bottom-6 inset-x-6 text-[#FAF7F2] space-y-1.5">
                  <div className="font-serif-brand text-2xl font-bold tracking-wide">
                    OMAR HDHILI
                  </div>
                  <div className="text-xs text-[#F3E5AB] font-arabic font-medium">
                    {isAr ? 'حرفي أجبان ومؤسس أجبان البية · جندوبة' : 'Maître Fromager Artisan & Fondateur · Jendouba'}
                  </div>
                  <p className="text-xs text-[#DDD2C4] italic pt-1 leading-relaxed">
                    « {isAr
                      ? 'الجبن الحقيقي يبدأ من احترام الحليب الطازج وحفظ سر الصنعة بالصبر على النضوج.'
                      : 'Le véritable fromage naît de la pureté du lait et de la patience du temps.'} »
                  </p>
                </div>
              </div>

              {/* Floating Quality Seal Badge */}
              <div className="absolute -top-5 -right-5 bg-[#140E0A] text-[#F3E5AB] p-4 rounded-2xl shadow-xl border border-[#C89B3C]/50 flex items-center gap-3">
                <ShieldCheck className="w-8 h-8 text-[#C89B3C]" />
                <div>
                  <div className="text-[10px] text-[#A69380] uppercase tracking-wider font-semibold">
                    {isAr ? 'ضمان الحرفية' : 'Label Artisan'}
                  </div>
                  <div className="font-bold text-sm text-[#FAF7F2]">
                    {isAr ? 'عمر هذيلي' : 'Omar Hdhili'}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Story Content */}
          <div className="lg:col-span-7 space-y-6 text-start order-1 lg:order-2">
            
            {/* Editorial kicker (Zero-Pill Discipline) */}
            <div className="text-xs uppercase tracking-[0.25em] font-semibold text-[#8C6226]">
              {isAr ? 'الموروث الحرفي وأصالة الشمال الغربي' : 'Savoir-Faire & Terroir de Tunisie'}
            </div>

            <div className="space-y-3">
              <h2 className="font-serif-brand text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#1A130E] leading-tight [text-wrap:balance]">
                {isAr ? (
                  <span className="font-arabic">
                    حرفية وإتقان <span className="text-[#8C6226]">عمر هذيلي</span>
                  </span>
                ) : (
                  <>
                    L'Excellence selon <span className="text-[#8C6226]">Omar Hdhili</span>
                  </>
                )}
              </h2>

              <p className="font-arabic text-base sm:text-lg text-[#554536] leading-relaxed [text-wrap:balance]">
                {isAr
                  ? 'في "أجبان البية"، نعتبر صناعة الأجبان فناً عريقاً لا يقبل التنازل عن الجودة. يشرف الحرفي عمر هذيلي شخصياً على كل تفاصيل التجبين والتخمير والتقليب والتعتيق في غرف مصممة خصيصاً لتمنح كل قرص جبن هويته الذوقية المتميزة.'
                  : 'À la Fromagerie La Beya, nous perpétuons l\'artisanat avec noblesse. Sous la direction passionnée d\'Omar Hdhili, chaque meule est affinée avec une rigueur absolue pour vous offrir une texture fondante et des saveurs d\'une pureté incomparable.'}
              </p>
            </div>

            {/* Feature pillars */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
              {pillars.map((pill, idx) => {
                const Icon = pill.icon;
                return (
                  <div
                    key={idx}
                    className="p-4 rounded-2xl bg-[#FFFDF9]/90 border border-[#E0D5C3] shadow-xs space-y-2"
                  >
                    <div className="w-9 h-9 rounded-xl bg-[#EBE2D3] flex items-center justify-center text-[#8C6226]">
                      <Icon className="w-5 h-5" />
                    </div>
                    <h4 className="font-bold text-sm text-[#1A130E]">
                      {isAr ? pill.titleAr : pill.titleFr}
                    </h4>
                    <p className="text-xs text-[#6B5A4B] leading-relaxed">
                      {isAr ? pill.descAr : pill.descFr}
                    </p>
                  </div>
                );
              })}
            </div>

            {/* Direct inquiry button */}
            <div className="pt-2 flex items-center gap-4">
              <a
                href={getWhatsAppDirectUrl('Bonjour Omar Hdhili, j\'aimerais avoir des détails sur vos méthodes d\'affinage et vos disponibilités.')}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-[#1A130E] hover:bg-[#2F2218] text-[#F3E5AB] font-semibold text-sm px-6 py-3.5 rounded-2xl border border-[#C89B3C]/40 shadow-sm transition-all cursor-pointer"
              >
                <HeartHandshake className="w-4 h-4 text-[#C89B3C]" />
                <span>{isAr ? 'تحدث مباشرة مع المعلم عمر هذيلي' : 'Échanger avec Omar Hdhili'}</span>
              </a>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
