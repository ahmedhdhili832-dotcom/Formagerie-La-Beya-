import { CheeseProduct, Language } from '../types';
import { getWhatsAppDirectUrl } from '../utils/whatsapp';
import { X, ShoppingBag, MessageCircle, Milk, Clock } from 'lucide-react';

interface ProductQuickViewModalProps {
  product: CheeseProduct | null;
  currentLang: Language;
  onClose: () => void;
  onSelectForOrder: (product: CheeseProduct) => void;
}

export function ProductQuickViewModal({
  product,
  currentLang,
  onClose,
  onSelectForOrder,
}: ProductQuickViewModalProps) {
  if (!product) return null;

  const isAr = currentLang === 'ar';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-xs">
      <div className="relative w-full max-w-2xl bg-[#FAF7F2] rounded-3xl overflow-hidden shadow-2xl border border-[#E8DFC8] animate-in fade-in zoom-in-95 duration-200">
        
        {/* Close button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 rounded-xl bg-white/90 hover:bg-white text-[#1A130E] shadow-sm transition-transform hover:scale-105 cursor-pointer"
          aria-label="Fermer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 sm:grid-cols-2">
          {/* Image side */}
          <div className="relative h-64 sm:h-full bg-[#EAE2D4]">
            <img
              src={product.image}
              alt={isAr ? product.nameAr : product.nameFr}
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent sm:hidden" />
          </div>

          {/* Details side */}
          <div className="p-6 sm:p-8 flex flex-col justify-between space-y-4">
            <div className="space-y-2">
              <div className="text-xs font-bold text-[#8C6226] uppercase tracking-[0.2em]">
                {isAr ? 'حرفي الأجبان عمر هذيلي' : 'Omar Hdhili · Fromager'}
              </div>

              <h3 className="font-serif-brand text-2xl font-bold text-[#1A130E]">
                {isAr ? product.nameAr : product.nameFr}
              </h3>
              <div className="text-xs font-semibold text-[#8C6226]">
                {isAr ? product.nameFr : product.nameAr}
              </div>

              <p className="text-xs sm:text-sm text-[#615143] leading-relaxed pt-1">
                {isAr ? product.descriptionAr : product.descriptionFr}
              </p>

              {/* Specifics */}
              <div className="pt-3 border-t border-[#E8DFC8] space-y-2 text-xs text-[#6B5A4B]">
                <div className="flex items-center gap-2">
                  <Milk className="w-4 h-4 text-[#8C6226] shrink-0" />
                  <span>
                    <strong>{isAr ? 'الحليب:' : 'Lait :'}</strong>{' '}
                    {isAr ? product.milkTypeAr : product.milkTypeFr}
                  </span>
                </div>

                {product.agingFr && (
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-[#8C6226] shrink-0" />
                    <span>
                      <strong>{isAr ? 'التعتيق:' : 'Affinage :'}</strong>{' '}
                      {isAr ? product.agingAr : product.agingFr}
                    </span>
                  </div>
                )}

                {/* Pairings */}
                <div className="pt-1">
                  <span className="font-bold text-[#1A130E] block mb-1">
                    {isAr ? 'يقدّم مع:' : 'Accords parfaits :'}
                  </span>
                  <div className="text-xs text-[#554435] leading-relaxed">
                    {(isAr ? product.pairingsAr : product.pairingsFr).join(' · ')}
                  </div>
                </div>
              </div>
            </div>

            {/* Packaging / Format & Actions (No Price) */}
            <div className="pt-4 border-t border-[#E8DFC8] space-y-3">
              <div>
                <span className="text-[10px] uppercase tracking-wider font-semibold text-[#8C6226] block">
                  {isAr ? 'الحجم والعبوة المتوفرة' : 'Format / Conditionnement'}
                </span>
                <span className="text-sm font-bold text-[#1A130E]">
                  {isAr ? product.unitAr : product.unitFr}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <a
                  href={getWhatsAppDirectUrl(
                    `Bonjour Omar Hdhili, je veux commander : ${product.nameFr} (${product.unitFr})`
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-1.5 py-3 px-3 rounded-xl bg-[#25D366] hover:bg-[#20be5a] text-white font-bold text-xs shadow-xs cursor-pointer"
                >
                  <MessageCircle className="w-4 h-4 fill-white" />
                  <span>WhatsApp</span>
                </a>

                <button
                  type="button"
                  onClick={() => {
                    onSelectForOrder(product);
                    onClose();
                  }}
                  className="inline-flex items-center justify-center gap-1.5 py-3 px-3 rounded-xl bg-[#1A130E] hover:bg-[#2F2218] text-[#F3E5AB] font-bold text-xs cursor-pointer"
                >
                  <ShoppingBag className="w-4 h-4 text-[#C89B3C]" />
                  <span>{isAr ? 'نموذج الطلب' : 'Commander'}</span>
                </button>
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
