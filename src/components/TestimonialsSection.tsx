import { useState } from 'react';
import { CustomerReview, Language } from '../types';
import { INITIAL_REVIEWS } from '../data/reviews';
import { Star, MessageSquare, Plus, CheckCircle2, ShieldCheck, Heart, Sparkles, X } from 'lucide-react';

interface TestimonialsSectionProps {
  currentLang: Language;
}

export function TestimonialsSection({ currentLang }: TestimonialsSectionProps) {
  const isAr = currentLang === 'ar';

  const [reviews, setReviews] = useState<CustomerReview[]>(INITIAL_REVIEWS);
  const [modalOpen, setModalOpen] = useState(false);
  const [newAuthorName, setNewAuthorName] = useState('');
  const [newAuthorCity, setNewAuthorCity] = useState('');
  const [newRating, setNewRating] = useState(5);
  const [newComment, setNewComment] = useState('');
  const [newFavoriteCheese, setNewFavoriteCheese] = useState('Gouda Affiné Prestige');

  const handleAddReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAuthorName.trim() || !newComment.trim()) return;

    const created: CustomerReview = {
      id: 'rev-' + Date.now(),
      authorNameFr: newAuthorName,
      authorNameAr: newAuthorName,
      authorCityFr: newAuthorCity || 'Tunis',
      authorCityAr: newAuthorCity || 'تونس',
      rating: newRating,
      commentFr: newComment,
      commentAr: newComment,
      dateFr: 'Aujourd\'hui',
      dateAr: 'اليوم',
      favoriteCheeseFr: newFavoriteCheese,
      favoriteCheeseAr: newFavoriteCheese,
      avatar: `https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80`,
      verified: true,
    };

    setReviews([created, ...reviews]);
    setModalOpen(false);
    setNewAuthorName('');
    setNewAuthorCity('');
    setNewComment('');
  };

  return (
    <section id="avis" className="py-16 sm:py-24 bg-[#F5EFE6] border-b border-[#E2D5C1]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="space-y-2.5 max-w-2xl">
            {/* Zero-Pill Kicker */}
            <div className="text-xs uppercase tracking-[0.25em] font-semibold text-[#8C6226]">
              {isAr ? 'شهادات وآراء الحرفاء والذواقة' : 'Témoignages & Avis Gourmets'}
            </div>

            <h2 className="font-serif-brand text-3xl sm:text-5xl font-extrabold text-[#1A130E] tracking-tight [text-wrap:balance]">
              {isAr ? (
                <span className="font-arabic">ماذا يقول عشاق أجبان البية</span>
              ) : (
                'Ils Partagent Leur Expérience'
              )}
            </h2>

            <p className="font-arabic text-base sm:text-lg text-[#615143] leading-relaxed [text-wrap:balance]">
              {isAr
                ? 'ثقة حرفائنا الكرام وملاحظاتهم هي أكبر حافز للمعلم عمر هذيلي لمواصلة التميز وتقديم أشهى الأجبان.'
                : 'Découvrez les retours authentiques de nos clients, chefs restaurateurs et fins gourmets séduits par la production d\'Omar Hdhili.'}
            </p>
          </div>

          {/* Average Rating Badge & Add Review Button */}
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-3 p-3.5 rounded-2xl bg-[#FFFDF9] border border-[#E0D5C3] shadow-xs">
              <div className="text-3xl font-black text-[#1A130E] tabular-nums">4.9</div>
              <div>
                <div className="flex text-[#C89B3C]">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>
                <div className="text-[11px] text-[#786655] font-medium">
                  {isAr ? '+180 تقييم معتمد' : '+180 avis vérifiés'}
                </div>
              </div>
            </div>

            <button
              type="button"
              id="add-review-modal-trigger-btn"
              onClick={() => setModalOpen(true)}
              className="inline-flex items-center gap-2 px-5 py-3.5 rounded-2xl bg-[#1A130E] hover:bg-[#2F2218] text-[#F3E5AB] text-xs sm:text-sm font-bold shadow-xs hover:shadow transition-all cursor-pointer whitespace-nowrap"
            >
              <Plus className="w-4 h-4 text-[#C89B3C]" />
              <span>{isAr ? 'أضف تقييمك' : 'Laisser un avis'}</span>
            </button>
          </div>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {reviews.map((rev) => (
            <div
              key={rev.id}
              className="p-6 rounded-3xl bg-[#FFFDF9] border border-[#E2D6C4] shadow-sm flex flex-col justify-between space-y-4 hover:border-[#C89B3C]/60 transition-colors"
            >
              <div className="space-y-3">
                {/* Rating stars */}
                <div className="flex items-center justify-between">
                  <div className="flex text-[#C89B3C]">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>
                  <span className="text-[11px] text-[#9E8B79]">{isAr ? rev.dateAr : rev.dateFr}</span>
                </div>

                {/* Review comment */}
                <p className="text-xs sm:text-sm text-[#4E3F31] leading-relaxed italic">
                  « {isAr ? rev.commentAr : rev.commentFr} »
                </p>
              </div>

              {/* Author info & favorite cheese */}
              <div className="pt-3 border-t border-[#EFE8DC] space-y-2">
                <div className="flex items-center gap-3">
                  <img
                    src={rev.avatar}
                    alt={rev.authorNameFr}
                    className="w-10 h-10 rounded-full object-cover border border-[#D5C6B1]"
                    loading="lazy"
                    referrerPolicy="no-referrer"
                  />
                  <div>
                    <div className="font-bold text-xs text-[#1A130E] flex items-center gap-1">
                      <span>{isAr ? rev.authorNameAr : rev.authorNameFr}</span>
                      {rev.verified && <CheckCircle2 className="w-3.5 h-3.5 text-[#25D366]" />}
                    </div>
                    <div className="text-[11px] text-[#8A7969]">
                      {isAr ? rev.authorCityAr : rev.authorCityFr}
                    </div>
                  </div>
                </div>

                <div className="text-[11px] text-[#8C6226] font-medium">
                  🧀 {isAr ? rev.favoriteCheeseAr : rev.favoriteCheeseFr}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Add Review Modal */}
        {modalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
            <div className="bg-[#FFFDF9] rounded-3xl max-w-lg w-full p-6 sm:p-8 border border-[#E8DFC8] shadow-2xl relative">
              <button
                type="button"
                onClick={() => setModalOpen(false)}
                className="absolute top-5 right-5 text-[#8C7A68] hover:text-[#1A130E] cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              <h3 className="text-xl font-bold text-[#1A130E] mb-4">
                {isAr ? 'شاركنا رأيك في أجبان البية' : 'Votre avis sur Fromagerie La Beya'}
              </h3>

              <form onSubmit={handleAddReview} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-[#5A4839] mb-1">
                    {isAr ? 'الاسم الكريم' : 'Nom complet'}
                  </label>
                  <input
                    type="text"
                    required
                    value={newAuthorName}
                    onChange={(e) => setNewAuthorName(e.target.value)}
                    placeholder={isAr ? 'مثال: سامي' : 'Ex: Sami'}
                    className="w-full px-3.5 py-2 rounded-xl bg-[#FAF7F2] border border-[#D5C6B1] text-sm text-[#1A130E] focus:ring-2 focus:ring-[#C89B3C] focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-[#5A4839] mb-1">
                      {isAr ? 'المدينة' : 'Ville'}
                    </label>
                    <input
                      type="text"
                      value={newAuthorCity}
                      onChange={(e) => setNewAuthorCity(e.target.value)}
                      placeholder={isAr ? 'مثال: تونس، جندوبة' : 'Ex: Tunis, Jendouba'}
                      className="w-full px-3.5 py-2 rounded-xl bg-[#FAF7F2] border border-[#D5C6B1] text-sm text-[#1A130E] focus:ring-2 focus:ring-[#C89B3C] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#5A4839] mb-1">
                      {isAr ? 'التقييم (من 5 نجوم)' : 'Note (sur 5)'}
                    </label>
                    <select
                      value={newRating}
                      onChange={(e) => setNewRating(Number(e.target.value))}
                      className="w-full px-3.5 py-2 rounded-xl bg-[#FAF7F2] border border-[#D5C6B1] text-sm text-[#1A130E] focus:ring-2 focus:ring-[#C89B3C] focus:outline-none"
                    >
                      <option value={5}>⭐⭐⭐⭐⭐ (5/5)</option>
                      <option value={4}>⭐⭐⭐⭐ (4/5)</option>
                      <option value={3}>⭐⭐⭐ (3/5)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#5A4839] mb-1">
                    {isAr ? 'الجبن المفضل لديك' : 'Fromage préféré'}
                  </label>
                  <input
                    type="text"
                    value={newFavoriteCheese}
                    onChange={(e) => setNewFavoriteCheese(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl bg-[#FAF7F2] border border-[#D5C6B1] text-sm text-[#1A130E] focus:ring-2 focus:ring-[#C89B3C] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#5A4839] mb-1">
                    {isAr ? 'رأيك وتجربتك' : 'Votre commentaire'}
                  </label>
                  <textarea
                    rows={3}
                    required
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder={isAr ? 'أخبرنا عن طعم الجبن وجودته...' : 'Partagez votre avis gustatif...'}
                    className="w-full px-3.5 py-2 rounded-xl bg-[#FAF7F2] border border-[#D5C6B1] text-sm text-[#1A130E] focus:ring-2 focus:ring-[#C89B3C] focus:outline-none"
                  />
                </div>

                <div className="pt-2 flex justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setModalOpen(false)}
                    className="px-4 py-2 rounded-xl text-xs font-semibold text-[#665646] hover:bg-[#FAF7F2] cursor-pointer"
                  >
                    {isAr ? 'إلغاء' : 'Annuler'}
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 rounded-xl bg-[#1A130E] hover:bg-[#2F2218] text-[#F3E5AB] text-xs font-bold shadow-xs cursor-pointer"
                  >
                    {isAr ? 'نشر التقييم' : 'Publier l\'avis'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

      </div>
    </section>
  );
}
