import React, { useState, useEffect } from 'react';
import { CheeseProduct, Language, OrderSubmission, OrderItemEntry } from '../types';
import { CHEESE_PRODUCTS } from '../data/products';
import { saveCustomerOrder } from '../firebase';
import { WHATSAPP_PHONE_RAW, WHATSAPP_PHONE_DISPLAY } from '../utils/whatsapp';
import { 
  ShoppingBag, 
  MessageCircle, 
  Send, 
  CheckCircle2, 
  MapPin, 
  Phone, 
  User, 
  FileText, 
  Plus, 
  Minus, 
  Truck, 
  Building2,
  Sparkles,
  AlertCircle,
  Database,
  ArrowDown,
  Loader2
} from 'lucide-react';

interface OrderSectionProps {
  currentLang: Language;
  preselectedProduct?: CheeseProduct | null;
}

export function OrderSection({ currentLang, preselectedProduct }: OrderSectionProps) {
  const isAr = currentLang === 'ar';

  const [selectedCheeseId, setSelectedCheeseId] = useState<string>(
    preselectedProduct ? preselectedProduct.id : CHEESE_PRODUCTS[0].id
  );
  const [quantity, setQuantity] = useState<number>(1);
  const [customerName, setCustomerName] = useState<string>('');
  const [customerPhone, setCustomerPhone] = useState<string>('');
  const [city, setCity] = useState<string>('Jendouba (جندوبة)');
  const [address, setAddress] = useState<string>('');
  const [deliveryType, setDeliveryType] = useState<'delivery' | 'pickup'>('delivery');
  const [notes, setNotes] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [validationError, setValidationError] = useState<string | null>(null);
  const [orderConfirmed, setOrderConfirmed] = useState<OrderSubmission | null>(null);

  // Update selected product when preselectedProduct changes from catalog
  useEffect(() => {
    if (preselectedProduct) {
      setSelectedCheeseId(preselectedProduct.id);
    }
  }, [preselectedProduct]);

  const selectedProduct = CHEESE_PRODUCTS.find((p) => p.id === selectedCheeseId) || CHEESE_PRODUCTS[0];

  const handleIncrement = () => setQuantity((q) => Math.min(30, q + 1));
  const handleDecrement = () => setQuantity((q) => Math.max(1, q - 1));

  // Construct structured WhatsApp URL with order ID (without price)
  const deliveryText = deliveryType === 'delivery' 
    ? `Livraison à domicile (${city}${address ? ` - ${address}` : ''})` 
    : `Retrait sur place à la fromagerie (Jendouba)`;

  const getWhatsAppMessage = (orderId?: string) => {
    const cheeseName = `${selectedProduct.nameFr} (${selectedProduct.nameAr})`;
    const unitText = isAr ? selectedProduct.unitAr : selectedProduct.unitFr;
    
    return [
      `🧀 *COMMANDE FROMAGERIE LA BEYA (أجبان البية)* 🧀`,
      orderId ? `🔖 *N° Commande (Base de données) :* #${orderId.slice(-6).toUpperCase()}` : '',
      `👤 *Client :* ${customerName}`,
      `📞 *Téléphone :* ${customerPhone}`,
      `📦 *Fromage choisi :* ${cheeseName}`,
      `🔢 *Quantité :* ${quantity} x (${unitText})`,
      `🚚 *Mode :* ${deliveryText}`,
      notes ? `📝 *Remarques :* ${notes}` : '',
      `\n_Omar Hdhili - Jendouba (53 216 859)_`,
    ].filter(Boolean).join('\n');
  };

  const handleOrderSubmit = async (e: React.FormEvent, viaWhatsApp = false) => {
    e.preventDefault();
    setValidationError(null);

    if (!customerName.trim() || !customerPhone.trim()) {
      setValidationError(
        isAr 
          ? 'الرجاء إدخال الاسم ورقم الهاتف لتسجيل طلبك.' 
          : 'Veuillez saisir votre nom et numéro de téléphone pour continuer.'
      );
      return;
    }

    if (customerPhone.trim().length < 8) {
      setValidationError(
        isAr
          ? 'الرجاء إدخال رقم هاتف صحيح (8 أرقام على الأقل).'
          : 'Veuillez saisir un numéro de téléphone valide (au moins 8 chiffres).'
      );
      return;
    }

    setIsSubmitting(true);

    try {
      const orderItems: OrderItemEntry[] = [
        {
          productId: selectedProduct.id,
          productNameFr: selectedProduct.nameFr,
          productNameAr: selectedProduct.nameAr,
          quantity,
          weightOrUnit: isAr ? selectedProduct.unitAr : selectedProduct.unitFr,
        }
      ];

      // Save into Firestore Database
      const firestoreDocId = await saveCustomerOrder({
        customerName: customerName.trim(),
        phone: customerPhone.trim(),
        city: city.trim(),
        address: address.trim() || undefined,
        deliveryMethod: deliveryType,
        items: orderItems,
        notes: notes.trim() || undefined,
        status: 'new',
        createdAt: new Date().toLocaleString(isAr ? 'ar-TN' : 'fr-FR', {
          dateStyle: 'medium',
          timeStyle: 'short',
        }),
      });

      const confirmedData: OrderSubmission = {
        id: firestoreDocId,
        createdAt: new Date().toLocaleString(isAr ? 'ar-TN' : 'fr-FR'),
        customerName: customerName.trim(),
        phone: customerPhone.trim(),
        city,
        address,
        items: orderItems,
        deliveryMethod: deliveryType,
        notes,
        status: 'new',
      };

      setOrderConfirmed(confirmedData);

      if (viaWhatsApp) {
        const waUrl = `https://wa.me/21653216859?text=${encodeURIComponent(getWhatsAppMessage(firestoreDocId))}`;
        const tempLink = document.createElement('a');
        tempLink.href = waUrl;
        tempLink.target = '_blank';
        tempLink.rel = 'noopener noreferrer';
        document.body.appendChild(tempLink);
        tempLink.click();
        document.body.removeChild(tempLink);
      }
    } catch (err) {
      console.error('Error saving order to Firestore:', err);
      setValidationError(
        isAr 
          ? 'حدث خطأ أثناء الاتصال بقاعدة البيانات. يمكنك الإرسال مباشرة عبر واتساب.' 
          : 'Erreur lors de l\'enregistrement. Vous pouvez envoyer directement via WhatsApp.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const tunisianCities = [
    'Jendouba (جندوبة)',
    'Tunis (تونس الكبرى)',
    'Ariana (أريانة)',
    'Ben Arous (بن عروس)',
    'Manouba (منوبة)',
    'Béja (باجة)',
    'Bizerte (بنزرت)',
    'Nabeul / Hammamet (نابل / الحمامات)',
    'Sousse (سوسة)',
    'Monastir (المنستير)',
    'Sfax (صفاقس)',
    'Kairouan (القيروان)',
    'Autre gouvernorat (ولاية أخرى)'
  ];

  return (
    <section id="commande" className="py-16 sm:py-24 bg-[#FAF7F2] border-b border-[#E8DFC8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <div className="text-xs uppercase tracking-[0.25em] font-semibold text-[#8C6226]">
            {isAr ? 'الطلب المباشر والتوصيل المبرد · تونس' : 'Commande Directe & Livraison Fraîche · Tunisie'}
          </div>

          <h2 className="font-serif-brand text-3xl sm:text-5xl font-extrabold text-[#1A130E] tracking-tight [text-wrap:balance]">
            {isAr ? (
              <span className="font-arabic">سجل طلبك</span>
            ) : (
              'Commandez Vos Fromages Préférés'
            )}
          </h2>

          <p className="font-arabic text-base sm:text-lg text-[#615143] leading-relaxed [text-wrap:balance]">
            {isAr
              ? 'اختر نوع الجبن والكمية المرغوبة، وسنجهز طلبك طازجاً من ورشة عمر هذيلي مع التوصيل المبرد لكافة ولايات تونس.'
              : 'Choisissez votre fromage artisanal et la quantité. L\'équipe d\'Omar Hdhili prépare votre commande avec soin.'}
          </p>
        </div>

        {/* Validation Error Banner */}
        {validationError && (
          <div className="mb-6 p-4 rounded-2xl bg-amber-50 border border-amber-300 text-amber-900 max-w-3xl mx-auto flex items-center gap-3 text-sm">
            <AlertCircle className="w-5 h-5 text-amber-600 shrink-0" />
            <span>{validationError}</span>
          </div>
        )}

        {/* Confirmation Banner with Real Database Order Reference */}
        {orderConfirmed && (
          <div className="mb-10 p-6 sm:p-8 rounded-3xl bg-[#EBF7EE] border border-[#BDE5C8] shadow-md max-w-3xl mx-auto text-[#1C5E2D] animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-start gap-4">
              <CheckCircle2 className="w-8 h-8 text-[#25D366] shrink-0 mt-0.5" />
              <div className="space-y-3 flex-1">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <h3 className="font-bold text-lg sm:text-xl text-[#164923]">
                    {isAr ? 'تم تسجيل طلبك بنجاح!' : 'Commande enregistrée avec succès !'}
                  </h3>
                  <div className="font-mono text-xs font-black bg-[#164923] text-[#FAF7F2] px-3 py-1 rounded-lg">
                    #{orderConfirmed.id?.slice(-6).toUpperCase() || 'CMD'}
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-[#276837] leading-relaxed">
                  {isAr
                    ? `شكراً لك ${orderConfirmed.customerName}، تم تدوين طلبك في سجل ورشة عمر هذيلي. سنتواصل معك هاتفياً على الرقم ${orderConfirmed.phone} للتأكيد وتحديد موعد التسليم.`
                    : `Merci ${orderConfirmed.customerName}, votre bon de commande #${orderConfirmed.id?.slice(-6).toUpperCase()} est enregistré. L'artisan Omar Hdhili a bien reçu votre demande.`}
                </p>

                {/* Database receipt details */}
                <div className="p-3 bg-white/70 rounded-xl border border-[#BDE5C8] text-xs space-y-1 text-[#215A30]">
                  <div>
                    <strong>{isAr ? 'الطلب:' : 'Article :'}</strong>{' '}
                    {orderConfirmed.items[0]?.quantity} × {isAr ? orderConfirmed.items[0]?.productNameAr : orderConfirmed.items[0]?.productNameFr} ({orderConfirmed.items[0]?.weightOrUnit})
                  </div>
                  <div>
                    <strong>{isAr ? 'الوجهة:' : 'Destination :'}</strong> {orderConfirmed.city}
                  </div>
                </div>

                <div className="pt-2 flex flex-wrap items-center gap-3">
                  <a
                    href={`https://wa.me/21653216859?text=${encodeURIComponent(getWhatsAppMessage(orderConfirmed.id))}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#20be5a] text-white text-xs font-bold px-4 py-2.5 rounded-xl shadow-xs transition-colors"
                  >
                    <MessageCircle className="w-4 h-4 fill-white" />
                    <span>{isAr ? 'إرسال نسخة لواتساب (53216859)' : 'Envoyer copie WhatsApp (53216859)'}</span>
                  </a>

                  <button
                    type="button"
                    onClick={() => setOrderConfirmed(null)}
                    className="text-xs font-semibold text-[#667085] hover:text-[#164923] underline cursor-pointer"
                  >
                    {isAr ? 'تسجيل طلب آخر' : 'Nouvelle commande'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* The Ordering Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 max-w-6xl mx-auto">
          
          {/* Left Column: Product Picker & Quantity Form */}
          <div className="lg:col-span-7 bg-[#FFFDF9] rounded-3xl p-6 sm:p-8 border border-[#E8DFC8] shadow-sm space-y-6">
            <h3 className="text-xl font-bold text-[#1A130E] flex items-center gap-2">
              <span className="w-7 h-7 rounded-xl bg-[#1A130E] text-[#F3E5AB] text-xs flex items-center justify-center font-black">1</span>
              <span>{isAr ? 'اختر نوع الجبن والكمية' : 'Choix du Fromage & Quantité'}</span>
            </h3>

            {/* Cheese Selector Dropdown */}
            <div className="space-y-2">
              <label className="block text-xs font-bold uppercase tracking-wider text-[#5A4839]">
                {isAr ? 'نوع الجبن المفضل:' : 'Variété de Fromage :'}
              </label>
              <select
                id="cheese-type-selector"
                value={selectedCheeseId}
                onChange={(e) => setSelectedCheeseId(e.target.value)}
                className="w-full px-4 py-3 rounded-2xl bg-[#FAF7F2] border border-[#D5C6B1] text-[#1A130E] font-semibold text-sm focus:outline-none focus:ring-2 focus:ring-[#C89B3C]"
              >
                {CHEESE_PRODUCTS.map((prod) => (
                  <option key={prod.id} value={prod.id}>
                    {prod.nameFr} — {prod.nameAr} ({isAr ? prod.unitAr : prod.unitFr})
                  </option>
                ))}
              </select>
            </div>

            {/* Selected Cheese Preview Card */}
            <div className="p-4 rounded-2xl bg-[#FAF7F2] border border-[#E8DFC8] flex items-center gap-4">
              <img
                src={selectedProduct.image}
                alt={selectedProduct.nameFr}
                className="w-20 h-20 rounded-xl object-cover shrink-0 border border-[#D5C6B1]"
                referrerPolicy="no-referrer"
              />
              <div className="space-y-1 flex-1">
                <div className="font-bold text-sm text-[#1A130E]">
                  {isAr ? selectedProduct.nameAr : selectedProduct.nameFr}
                </div>
                <div className="text-xs text-[#8C6226] font-medium">
                  {isAr ? selectedProduct.milkTypeAr : selectedProduct.milkTypeFr} · {isAr ? (selectedProduct.agingAr || 'طازج') : (selectedProduct.agingFr || 'Frais')}
                </div>
                <div className="text-xs text-[#736354] line-clamp-1">
                  {isAr ? selectedProduct.descriptionAr : selectedProduct.descriptionFr}
                </div>
                <div className="text-xs font-semibold text-[#1A130E]">
                  <span className="text-[#8C6226]">{isAr ? 'الحجم والعبوة:' : 'Conditionnement :'}</span>{' '}
                  {isAr ? selectedProduct.unitAr : selectedProduct.unitFr}
                </div>
              </div>
            </div>

            {/* Quantity Selector */}
            <div className="space-y-2">
              <label className="block text-xs font-bold uppercase tracking-wider text-[#5A4839]">
                {isAr ? 'العدد / الكمية المطلوبة:' : 'Quantité Souhaitée :'}
              </label>
              <div className="flex items-center gap-4">
                <div className="flex items-center border border-[#D5C6B1] bg-[#FAF7F2] rounded-2xl p-1 shadow-xs">
                  <button
                    type="button"
                    onClick={handleDecrement}
                    className="w-10 h-10 rounded-xl bg-[#FFFDF9] hover:bg-[#E8DFC8] text-[#1A130E] flex items-center justify-center font-bold transition-colors cursor-pointer"
                    aria-label="Diminuer la quantité"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="w-14 text-center font-bold text-lg text-[#1A130E] tabular-nums">
                    {quantity}
                  </span>
                  <button
                    type="button"
                    onClick={handleIncrement}
                    className="w-10 h-10 rounded-xl bg-[#FFFDF9] hover:bg-[#E8DFC8] text-[#1A130E] flex items-center justify-center font-bold transition-colors cursor-pointer"
                    aria-label="Augmenter la quantité"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>

                <div className="text-xs text-[#6B5A4B]">
                  {isAr ? (
                    <>
                      المجموع:{' '}
                      <strong className="text-[#1A130E]">{quantity} × {selectedProduct.unitAr}</strong>
                    </>
                  ) : (
                    <>
                      Total sélection :{' '}
                      <strong className="text-[#1A130E]">{quantity} unité(s) de {selectedProduct.unitFr}</strong>
                    </>
                  )}
                </div>
              </div>
            </div>

            {/* Delivery Type Option */}
            <div className="space-y-2 pt-2">
              <label className="block text-xs font-bold uppercase tracking-wider text-[#5A4839]">
                {isAr ? 'طريقة الاستلام والتوصيل:' : 'Mode de Réception :'}
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setDeliveryType('delivery')}
                  className={`p-3.5 rounded-2xl border text-start flex items-center gap-3 transition-all cursor-pointer ${
                    deliveryType === 'delivery'
                      ? 'border-[#1A130E] bg-[#FAF7F2] ring-2 ring-[#C89B3C]/50'
                      : 'border-[#E8DFC8] bg-white opacity-80 hover:opacity-100'
                  }`}
                >
                  <Truck className="w-5 h-5 text-[#8C6226]" />
                  <div>
                    <div className="text-xs font-bold text-[#1A130E]">
                      {isAr ? 'توصيل مبرد لباب المنزل' : 'Livraison Fraîcheur'}
                    </div>
                    <div className="text-[11px] text-[#786655]">
                      {isAr ? 'تغطية كامل أنحاء تونس' : 'Toute la Tunisie'}
                    </div>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => setDeliveryType('pickup')}
                  className={`p-3.5 rounded-2xl border text-start flex items-center gap-3 transition-all cursor-pointer ${
                    deliveryType === 'pickup'
                      ? 'border-[#1A130E] bg-[#FAF7F2] ring-2 ring-[#C89B3C]/50'
                      : 'border-[#E8DFC8] bg-white opacity-80 hover:opacity-100'
                  }`}
                >
                  <Building2 className="w-5 h-5 text-[#8C6226]" />
                  <div>
                    <div className="text-xs font-bold text-[#1A130E]">
                      {isAr ? 'استلام من ورشة جندوبة' : 'Retrait à l\'Atelier (Jendouba)'}
                    </div>
                    <div className="text-[11px] text-[#786655]">
                      {isAr ? 'مباشرة من المعلم عمر هذيلي' : 'Direct chez Omar Hdhili'}
                    </div>
                  </div>
                </button>
              </div>
            </div>

          </div>

          {/* Right Column: Customer Details & Database Submission */}
          <div className="lg:col-span-5 bg-[#FFFDF9] rounded-3xl p-6 sm:p-8 border border-[#E8DFC8] shadow-sm flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-[#1A130E] flex items-center gap-2">
                <span className="w-7 h-7 rounded-xl bg-[#1A130E] text-[#F3E5AB] text-xs flex items-center justify-center font-black">2</span>
                <span>{isAr ? 'بيانات الزبون للتسجيل والتوصيل' : 'Vos Coordonnées'}</span>
              </h3>

              {/* Name */}
              <div className="space-y-1">
                <label className="text-xs font-bold text-[#5A4839] flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5 text-[#C89B3C]" />
                  <span>{isAr ? 'الاسم واللقب *' : 'Nom complet *'}</span>
                </label>
                <input
                  type="text"
                  id="order-customer-name"
                  required
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  placeholder={isAr ? 'مثال: محمد بن علي' : 'Ex: Karim Trabelsi'}
                  className="w-full px-4 py-2.5 rounded-xl bg-[#FAF7F2] border border-[#D5C6B1] text-sm text-[#1A130E] focus:ring-2 focus:ring-[#C89B3C] focus:outline-none"
                />
              </div>

              {/* Phone */}
              <div className="space-y-1">
                <label className="text-xs font-bold text-[#5A4839] flex items-center gap-1.5">
                  <Phone className="w-3.5 h-3.5 text-[#C89B3C]" />
                  <span>{isAr ? 'رقم الهاتف للتأكيد والتوصيل *' : 'Téléphone *'}</span>
                </label>
                <input
                  type="tel"
                  id="order-customer-phone"
                  required
                  value={customerPhone}
                  onChange={(e) => setCustomerPhone(e.target.value)}
                  placeholder={isAr ? 'مثال: 53 216 859' : 'Ex: 53 216 859'}
                  className="w-full px-4 py-2.5 rounded-xl bg-[#FAF7F2] border border-[#D5C6B1] text-sm text-[#1A130E] focus:ring-2 focus:ring-[#C89B3C] focus:outline-none"
                  dir="ltr"
                />
              </div>

              {/* City & Address */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-[#5A4839] flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-[#C89B3C]" />
                    <span>{isAr ? 'الولاية' : 'Gouvernorat'}</span>
                  </label>
                  <select
                    id="order-customer-city"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl bg-[#FAF7F2] border border-[#D5C6B1] text-xs font-medium text-[#1A130E] focus:ring-2 focus:ring-[#C89B3C] focus:outline-none"
                  >
                    {tunisianCities.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-[#5A4839]">
                    {isAr ? 'العنوان بالتفصيل' : 'Adresse'}
                  </label>
                  <input
                    type="text"
                    id="order-customer-address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder={isAr ? 'النهج، المدينة...' : 'Rue, quartier...'}
                    className="w-full px-3 py-2.5 rounded-xl bg-[#FAF7F2] border border-[#D5C6B1] text-xs text-[#1A130E] focus:ring-2 focus:ring-[#C89B3C] focus:outline-none"
                  />
                </div>
              </div>

              {/* Special notes */}
              <div className="space-y-1">
                <label className="text-xs font-bold text-[#5A4839] flex items-center gap-1">
                  <FileText className="w-3.5 h-3.5 text-[#C89B3C]" />
                  <span>{isAr ? 'ملاحظات خاصة (التغليف، وقت الاستلام...)' : 'Instructions spéciales'}</span>
                </label>
                <textarea
                  id="order-customer-notes"
                  rows={2}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder={isAr ? 'أي طلب خاص لعمر هذيلي...' : 'Ex: Emballage sous-vide...'}
                  className="w-full px-3 py-2 rounded-xl bg-[#FAF7F2] border border-[#D5C6B1] text-xs text-[#1A130E] focus:ring-2 focus:ring-[#C89B3C] focus:outline-none"
                />
              </div>

              {/* Order summary note (no prices) */}
              <div className="p-3.5 rounded-2xl bg-[#F5EFE6] border border-[#E2D4BF] space-y-1 text-xs text-[#615141]">
                <div className="font-bold text-[#1A130E] flex items-center justify-between">
                  <span>{isAr ? 'ملخص الطلب المختار:' : 'Résumé de sélection :'}</span>
                  <span className="text-[#8C6226] font-mono">{quantity} × {isAr ? selectedProduct.unitAr : selectedProduct.unitFr}</span>
                </div>
                <div className="text-[11px] text-[#7D6B58]">
                  {isAr ? selectedProduct.nameAr : selectedProduct.nameFr} · {deliveryType === 'delivery' ? (isAr ? 'توصيل مبرد' : 'Livraison') : (isAr ? 'استلام ورشة' : 'Retrait atelier')}
                </div>
              </div>

            </div>

            {/* Action Buttons: Save in Database + Optional WhatsApp */}
            <div className="space-y-2.5 pt-2">
              
              {/* Primary: Save directly in database */}
              <button
                type="button"
                id="submit-order-database-btn"
                disabled={isSubmitting}
                onClick={(e) => handleOrderSubmit(e, false)}
                className="w-full py-3.5 px-4 rounded-2xl bg-[#1A130E] hover:bg-[#2F2218] text-[#F3E5AB] font-bold text-sm shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60 whitespace-nowrap"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin text-[#C89B3C]" />
                    <span>{isAr ? 'جاري تسجيل الطلب...' : 'Enregistrement en cours...'}</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-4 h-4 text-[#C89B3C]" />
                    <span>{isAr ? 'سجل طلبك' : 'Valider la commande'}</span>
                  </>
                )}
              </button>

              {/* WhatsApp direct order */}
              <button
                type="button"
                id="submit-order-whatsapp-btn"
                disabled={isSubmitting}
                onClick={(e) => handleOrderSubmit(e, true)}
                className="w-full py-2.5 px-4 rounded-2xl bg-[#25D366] hover:bg-[#20be5a] text-white font-bold text-xs shadow-xs hover:shadow transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60 whitespace-nowrap"
              >
                <MessageCircle className="w-4 h-4 fill-white" />
                <span>
                  {isAr
                    ? 'تسجيل وإرسال عبر واتساب (53216859)'
                    : 'Enregistrer & Notifier via WhatsApp'}
                </span>
              </button>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
