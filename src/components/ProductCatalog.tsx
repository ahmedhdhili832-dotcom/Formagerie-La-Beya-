import { useState } from 'react';
import { CheeseCategory, CheeseProduct, Language } from '../types';
import { CHEESE_PRODUCTS } from '../data/products';
import { getWhatsAppDirectUrl } from '../utils/whatsapp';
import { Sparkles, MessageCircle, ShoppingBag, Eye, Star, Search, X } from 'lucide-react';

interface ProductCatalogProps {
  currentLang: Language;
  onSelectProductForOrder: (product: CheeseProduct) => void;
  onQuickView: (product: CheeseProduct) => void;
}

export function ProductCatalog({ currentLang, onSelectProductForOrder, onQuickView }: ProductCatalogProps) {
  const [selectedCategory, setSelectedCategory] = useState<CheeseCategory>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const isAr = currentLang === 'ar';

  const categories: { id: CheeseCategory; labelFr: string; labelAr: string }[] = [
    { id: 'all', labelFr: 'Tous les Fromages', labelAr: 'جميع الأصناف' },
    { id: 'affines', labelFr: 'Fromages Affinés', labelAr: 'الأجبان المعتقة' },
    { id: 'frais', labelFr: 'Pâtes Fraîches & Filées', labelAr: 'الأجبان الطازجة' },
    { id: 'pates_molles', labelFr: 'Pâtes Molles & Fleuries', labelAr: 'الأجبان الكريمية' },
    { id: 'speciaux', labelFr: 'Spécialités & Fumés', labelAr: 'المتبل والمدخن' },
    { id: 'plateaux', labelFr: 'Plateaux & Coffrets', labelAr: 'أطباق الضيافة' },
  ];

  const filteredProducts = CHEESE_PRODUCTS.filter((product) => {
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    const query = searchQuery.toLowerCase().trim();
    if (!query) return matchesCategory;

    const matchesName =
      product.nameFr.toLowerCase().includes(query) ||
      product.nameAr.toLowerCase().includes(query) ||
      product.descriptionFr.toLowerCase().includes(query) ||
      product.descriptionAr.toLowerCase().includes(query);

    return matchesCategory && matchesName;
  });

  return (
    <section id="produits" className="py-16 sm:py-24 bg-[#FAF7F2] border-b border-[#E8DFC8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 space-y-3">
          <div className="text-xs uppercase tracking-[0.25em] font-semibold text-[#8C6226]">
            {isAr ? 'كتالوج الأجبان الحرفية · إنتاج طبيعي' : 'Catalogue Artisanal · Terroir de Tunisie'}
          </div>

          <h2 className="font-serif-brand text-3xl sm:text-5xl font-extrabold text-[#1A130E] tracking-tight [text-wrap:balance]">
            {isAr ? (
              <span className="font-arabic">إبداعات أجبان البية</span>
            ) : (
              'Nos Trésors Fromagers'
            )}
          </h2>

          <p className="font-arabic text-base sm:text-lg text-[#615143] leading-relaxed [text-wrap:balance]">
            {isAr
              ? 'تشكيلة متكاملة من الأجبان الطبيعية الأصيلة بنكهات غنية وجودة استثنائية، مصنوعة بحرفية وإتقان تحت إشراف عمر هذيلي.'
              : 'Découvrez notre sélection exclusive de fromages au lait pur, affinés selon des méthodes artisanales par Omar Hdhili.'}
          </p>
        </div>

        {/* Search & Segmented Filter Bar */}
        <div className="max-w-4xl mx-auto mb-12 space-y-4">
          
          {/* Search Input */}
          <div className="relative max-w-md mx-auto">
            <Search className="w-4 h-4 text-[#8C6226] absolute top-1/2 -translate-y-1/2 left-3.5 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={isAr ? 'ابحث عن صنف جبن (غودا، موتزاريلا، كاممبير...)' : 'Rechercher un fromage (Gouda, Mozzarella, Tomme...)'}
              className="w-full pl-10 pr-10 py-2.5 bg-[#FFFDF9] border border-[#D5C6B1] rounded-xl text-sm text-[#1A130E] placeholder-[#9E8B7A] focus:outline-none focus:ring-2 focus:ring-[#C89B3C]/50 transition-all shadow-xs"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute top-1/2 -translate-y-1/2 right-3 p-1 text-[#8C6226] hover:text-[#1A130E] cursor-pointer"
                title="Effacer la recherche"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Interactive Category Segmented Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-1.5 p-1.5 bg-[#EDE6D9] rounded-2xl border border-[#D9CEBC]/80">
            {categories.map((cat) => {
              const isActive = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition-all duration-200 cursor-pointer whitespace-nowrap ${
                    isActive
                      ? 'bg-[#1A130E] text-[#F3E5AB] shadow-sm'
                      : 'text-[#5C4A3A] hover:text-[#1A130E] hover:bg-black/5'
                  }`}
                >
                  {isAr ? cat.labelAr : cat.labelFr}
                </button>
              );
            })}
          </div>

        </div>

        {/* Empty Search Result State */}
        {filteredProducts.length === 0 && (
          <div className="text-center py-16 px-4 bg-[#FFFDF9] rounded-3xl border border-[#E8DFC8] max-w-md mx-auto">
            <p className="text-[#615143] font-medium text-sm">
              {isAr ? 'لم نتمكن من العثور على أجبان مطابقة لبحثك.' : 'Aucun fromage ne correspond à votre recherche.'}
            </p>
            <button
              type="button"
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('all');
              }}
              className="mt-3 text-xs font-bold text-[#8C6226] hover:underline cursor-pointer"
            >
              {isAr ? 'عرض جميع الأصناف' : 'Réinitialiser les filtres'}
            </button>
          </div>
        )}

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              id={`product-card-${product.id}`}
              className="group bg-[#FFFDF9] rounded-3xl overflow-hidden border border-[#E8DFC8] shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
            >
              {/* Product Visual Container */}
              <div className="relative aspect-4/3 overflow-hidden bg-[#EAE2D4]">
                <img
                  src={product.image}
                  alt={isAr ? product.nameAr : product.nameFr}
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                  referrerPolicy="no-referrer"
                />

                {/* Subtle scrim on hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                {/* Clean Status Tag */}
                {product.isBestSeller && (
                  <div className="absolute top-3 left-3 bg-[#1A130E]/90 backdrop-blur-xs text-[#F3E5AB] font-bold text-[11px] px-2.5 py-1 rounded-lg border border-[#C89B3C]/40">
                    {isAr ? 'الأكثر طلباً' : 'Bestseller'}
                  </div>
                )}
                {product.isArtisanSpecial && !product.isBestSeller && (
                  <div className="absolute top-3 left-3 bg-[#1A130E]/90 backdrop-blur-xs text-[#E6C687] font-semibold text-[11px] px-2.5 py-1 rounded-lg border border-[#C89B3C]/40">
                    {isAr ? 'صنعة المعلم' : 'Spécialité Omar H.'}
                  </div>
                )}

                {/* Quick view button overlay */}
                <button
                  type="button"
                  onClick={() => onQuickView(product)}
                  className="absolute bottom-3 right-3 p-2.5 rounded-xl bg-white/90 hover:bg-white text-[#1A130E] shadow-md transition-transform hover:scale-105 focus:outline-none cursor-pointer"
                  title={isAr ? 'معاينة تفاصيل الجبن' : 'Détails du fromage'}
                >
                  <Eye className="w-4 h-4 text-[#8C6226]" />
                </button>
              </div>

              {/* Card Body */}
              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-1.5">
                  <h3 className="font-serif-brand font-bold text-xl text-[#1A130E] group-hover:text-[#8C6226] transition-colors leading-snug">
                    {isAr ? product.nameAr : product.nameFr}
                  </h3>

                  {/* Secondary title */}
                  <div className="text-xs font-semibold text-[#8C6226]">
                    {isAr ? product.nameFr : product.nameAr}
                  </div>

                  <p className="text-xs sm:text-sm text-[#665646] line-clamp-2 leading-relaxed pt-1">
                    {isAr ? product.descriptionAr : product.descriptionFr}
                  </p>
                </div>

                {/* Attributes: milk, aging, intensity */}
                <div className="pt-3 border-t border-[#EFE8DC] space-y-1.5 text-xs text-[#736252]">
                  <div className="flex items-center justify-between">
                    <span className="text-[#968370]">{isAr ? 'الحليب:' : 'Lait :'}</span>
                    <span className="font-medium text-[#1A130E]">
                      {isAr ? product.milkTypeAr : product.milkTypeFr}
                    </span>
                  </div>

                  {product.agingFr && (
                    <div className="flex items-center justify-between">
                      <span className="text-[#968370]">{isAr ? 'التعتيق:' : 'Affinage :'}</span>
                      <span className="font-medium text-[#8C6226]">
                        {isAr ? product.agingAr : product.agingFr}
                      </span>
                    </div>
                  )}

                  {/* Flavor Intensity dots */}
                  <div className="flex items-center justify-between">
                    <span className="text-[#968370]">{isAr ? 'كثافة الطعم:' : 'Intensité :'}</span>
                    <div className="flex items-center gap-1">
                      {[1, 2, 3, 4, 5].map((lvl) => (
                        <span
                          key={lvl}
                          className={`w-2 h-2 rounded-full ${
                            lvl <= product.intensity ? 'bg-[#C89B3C]' : 'bg-[#E2D8CA]'
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                </div>

                {/* Format presentation & Order Action Bar (No prices) */}
                <div className="pt-4 border-t border-[#EFE8DC] flex items-center justify-between gap-3">
                  <div>
                    <span className="text-[10px] uppercase tracking-wider font-semibold text-[#8C6226] block">
                      {isAr ? 'الحجم / العبوة' : 'Format / Portion'}
                    </span>
                    <div className="text-xs sm:text-sm font-bold text-[#1A130E]">
                      {isAr ? product.unitAr : product.unitFr}
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    {/* Direct WhatsApp Quick Order */}
                    <a
                      href={getWhatsAppDirectUrl(
                        `Bonjour Fromagerie La Beya, je souhaite commander : ${product.nameFr} (${product.unitFr})`
                      )}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2.5 rounded-xl bg-[#25D366] hover:bg-[#20be5a] text-white shadow-xs hover:shadow transition-colors"
                      title={isAr ? 'طلب سريع عبر واتساب' : 'Commander par WhatsApp'}
                    >
                      <MessageCircle className="w-4 h-4 fill-white" />
                    </a>

                    {/* Add to order form */}
                    <button
                      type="button"
                      onClick={() => onSelectProductForOrder(product)}
                      className="inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl bg-[#1A130E] hover:bg-[#2F2218] text-[#F3E5AB] font-bold text-xs shadow-xs hover:shadow transition-all cursor-pointer whitespace-nowrap"
                    >
                      <ShoppingBag className="w-3.5 h-3.5 text-[#C89B3C]" />
                      <span>{isAr ? 'طلب الصنف' : 'Commander'}</span>
                    </button>
                  </div>
                </div>

              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
