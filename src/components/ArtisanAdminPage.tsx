import { useState, useEffect } from 'react';
import { CustomerOrder, subscribeToOrders, updateOrderStatus } from '../firebase';
import { Language } from '../types';
import { 
  Database, 
  Search, 
  Phone, 
  MessageCircle, 
  Lock, 
  Unlock, 
  Package, 
  MapPin, 
  Truck, 
  RefreshCw, 
  ArrowLeft, 
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Clock,
  LogOut,
  SlidersHorizontal,
  Store
} from 'lucide-react';

interface ArtisanAdminPageProps {
  currentLang: Language;
  onBackToStore: () => void;
  onToggleLang: (lang: Language) => void;
}

export function ArtisanAdminPage({ currentLang, onBackToStore, onToggleLang }: ArtisanAdminPageProps) {
  const isAr = currentLang === 'ar';

  const [orders, setOrders] = useState<CustomerOrder[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');
  
  // Persist session unlocked state in sessionStorage for convenience
  const [isUnlocked, setIsUnlocked] = useState<boolean>(() => {
    return sessionStorage.getItem('artisan_unlocked') === 'true';
  });
  const [passcode, setPasscode] = useState('');
  const [passcodeError, setPasscodeError] = useState(false);
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  // Real-time Firestore subscription
  useEffect(() => {
    const unsubscribe = subscribeToOrders((fetchedOrders) => {
      setOrders(fetchedOrders);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleUnlock = (e: React.FormEvent) => {
    e.preventDefault();
    if (passcode.trim() === '53216859' || passcode.trim() === '1234') {
      setIsUnlocked(true);
      sessionStorage.setItem('artisan_unlocked', 'true');
      setPasscodeError(false);
    } else {
      setPasscodeError(true);
    }
  };

  const handleLock = () => {
    setIsUnlocked(false);
    sessionStorage.removeItem('artisan_unlocked');
    setPasscode('');
  };

  const handleStatusChange = async (orderId: string, newStatus: CustomerOrder['status']) => {
    try {
      setUpdatingId(orderId);
      await updateOrderStatus(orderId, newStatus);
    } catch (err) {
      console.error('Failed to update status:', err);
    } finally {
      setUpdatingId(null);
    }
  };

  const filteredOrders = orders.filter((order) => {
    const matchesStatus = filterStatus === 'all' || order.status === filterStatus;
    const term = searchTerm.toLowerCase().trim();
    if (!term) return matchesStatus;

    const matchesSearch = 
      order.customerName.toLowerCase().includes(term) ||
      order.phone.includes(term) ||
      order.city.toLowerCase().includes(term) ||
      (order.items && order.items.some(i => i.productNameAr.toLowerCase().includes(term) || i.productNameFr.toLowerCase().includes(term)));

    return matchesStatus && matchesSearch;
  });

  const getStatusBadge = (status: CustomerOrder['status']) => {
    switch (status) {
      case 'new':
        return {
          bg: 'bg-amber-500/20 text-amber-300 border-amber-500/40',
          textAr: 'جديد (بانتظار التأكيد)',
          textFr: 'Nouvelle commande',
        };
      case 'confirmed':
        return {
          bg: 'bg-blue-500/20 text-blue-300 border-blue-500/40',
          textAr: 'تم التأكيد',
          textFr: 'Confirmée',
        };
      case 'preparing':
        return {
          bg: 'bg-purple-500/20 text-purple-300 border-purple-500/40',
          textAr: 'قيد التحضير والتجهيز',
          textFr: 'En préparation',
        };
      case 'delivered':
        return {
          bg: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40',
          textAr: 'تم التسليم / مكتملة',
          textFr: 'Livrée / Prête',
        };
      case 'cancelled':
        return {
          bg: 'bg-stone-500/20 text-stone-400 border-stone-500/40',
          textAr: 'ملغاة',
          textFr: 'Annulée',
        };
      default:
        return {
          bg: 'bg-stone-800 text-stone-300 border-stone-700',
          textAr: status,
          textFr: status,
        };
    }
  };

  return (
    <div className={`min-h-screen bg-[#0E0906] text-[#FAF7F2] flex flex-col ${isAr ? 'font-arabic' : 'font-sans'}`}>
      
      {/* Top Admin Navbar */}
      <header className="bg-[#140E0A] border-b border-[#2C1F14] sticky top-0 z-40 px-4 sm:px-8 py-3.5 flex items-center justify-between">
        
        {/* Brand & Page Title */}
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#E6C687] to-[#A07025] p-0.5 flex items-center justify-center shadow-sm">
            <div className="w-full h-full bg-[#1A130E] rounded-[10px] flex items-center justify-center">
              <span className="font-serif-brand font-black text-sm text-[#F3E5AB]">B</span>
            </div>
          </div>

          <div>
            <div className="font-serif-brand text-sm sm:text-base font-bold text-[#F3E5AB] flex items-center gap-2">
              <span>{isAr ? 'لوحة تحكم الحرفي · أجبان البية' : 'Espace Maître Fromager · La Beya'}</span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#2C1F14] text-[#C89B3C] border border-[#C89B3C]/30 font-mono">
                Admin
              </span>
            </div>
            <div className="text-[11px] text-[#A89885]">
              {isAr ? 'إدارة الطلبيات السحابية لعمر هذيلي' : 'Gestion des commandes Omar Hdhili'}
            </div>
          </div>
        </div>

        {/* Header Right Actions */}
        <div className="flex items-center gap-2.5">
          {/* Language Switch */}
          <button
            type="button"
            onClick={() => onToggleLang(isAr ? 'fr' : 'ar')}
            className="text-xs font-semibold px-2.5 py-1.5 rounded-lg bg-[#1C140E] hover:bg-[#2C1F14] border border-[#3D2C1D] text-[#C5B49E] transition-colors cursor-pointer"
          >
            {isAr ? 'Français' : 'العربية'}
          </button>

          {/* Return to Public Store */}
          <button
            type="button"
            onClick={onBackToStore}
            className="inline-flex items-center gap-1.5 text-xs font-bold px-3.5 py-1.5 rounded-xl bg-[#2C1F14] hover:bg-[#3D2C1D] text-[#F3E5AB] border border-[#C89B3C]/40 shadow-xs transition-all cursor-pointer"
          >
            <Store className="w-3.5 h-3.5 text-[#C89B3C]" />
            <span>{isAr ? 'العودة للمتجر' : 'Retour à la boutique'}</span>
          </button>
        </div>

      </header>

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8">
        
        {/* Passcode Lock View */}
        {!isUnlocked ? (
          <div className="min-h-[70vh] flex items-center justify-center py-12">
            <div className="w-full max-w-md bg-[#160F0A] border border-[#C89B3C]/40 rounded-3xl p-8 sm:p-10 shadow-2xl text-center space-y-6 animate-in fade-in zoom-in-95 duration-200">
              
              <div className="w-20 h-20 rounded-3xl bg-[#24170E] border border-[#C89B3C]/40 flex items-center justify-center mx-auto text-[#C89B3C] shadow-inner">
                <Lock className="w-10 h-10" />
              </div>

              <div className="space-y-2">
                <h1 className="font-serif-brand text-2xl font-bold text-[#F3E5AB]">
                  {isAr ? 'دخول لوحة تحكم الحرفي' : 'Accès Espace Maître Fromager'}
                </h1>
                <p className="text-xs text-[#A89885] leading-relaxed">
                  {isAr
                    ? 'أدخل رمز الحماية لمشاهدة جميع طلبيات الزبائن والتحكم بحالات التوصيل (الرمز الافتراضي: 53216859)'
                    : 'Entrez le code d\'accès pour consulter les commandes et gérer les livraisons (Code: 53216859)'}
                </p>
              </div>

              <form onSubmit={handleUnlock} className="space-y-4">
                <div>
                  <input
                    type="password"
                    autoFocus
                    value={passcode}
                    onChange={(e) => setPasscode(e.target.value)}
                    placeholder="53216859"
                    className="w-full px-4 py-3.5 rounded-xl bg-[#0D0805] border border-[#4A3420] text-center font-mono text-lg tracking-widest text-[#FAF7F2] placeholder-[#5A4535] focus:outline-none focus:ring-2 focus:ring-[#C89B3C]"
                  />
                  {passcodeError && (
                    <p className="text-xs text-rose-400 mt-2 font-medium">
                      {isAr ? 'الرمز غير صحيح، يرجى إدخال: 53216859' : 'Code incorrect, réessayez : 53216859'}
                    </p>
                  )}
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#AA7C28] hover:from-[#E6C687] hover:to-[#B8862D] text-[#120D08] font-bold text-sm shadow-md transition-all cursor-pointer flex items-center justify-center gap-2"
                >
                  <Unlock className="w-4 h-4" />
                  <span>{isAr ? 'دخول لوحة التحكم' : 'Déverrouiller le panneau'}</span>
                </button>
              </form>

              <div className="pt-2 border-t border-[#2C1F14]">
                <button
                  type="button"
                  onClick={onBackToStore}
                  className="text-xs text-[#A89885] hover:text-[#FAF7F2] transition-colors cursor-pointer inline-flex items-center gap-1.5"
                >
                  <span>{isAr ? '← الرجوع إلى متجر أجبان البية' : '← Retour au site public'}</span>
                </button>
              </div>

            </div>
          </div>
        ) : (
          /* Unlocked Admin Dashboard */
          <div className="space-y-8 animate-in fade-in duration-300">
            
            {/* Top Toolbar: Greeting & Lock Button */}
            <div className="flex flex-wrap items-center justify-between gap-4 bg-[#160F0A] p-4 sm:p-6 rounded-3xl border border-[#2C1F14]">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-[#25D366]" />
                  <h2 className="font-serif-brand text-xl sm:text-2xl font-bold text-[#F3E5AB]">
                    {isAr ? 'مرحباً عمر هذيلي · سجل الطلبيات' : 'Bienvenue Omar Hdhili · Commandes'}
                  </h2>
                </div>
                <p className="text-xs text-[#A89885]">
                  {isAr 
                    ? 'قاعدة البيانات السحابية متصلة بالإنترنت ومحدثة لحظياً.' 
                    : 'Base de données Firestore connectée et synchronisée en temps réel.'}
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleLock}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#24170E] hover:bg-[#332014] text-[#E8DCCB] text-xs font-semibold border border-[#4A3420] transition-colors cursor-pointer"
                >
                  <LogOut className="w-3.5 h-3.5 text-[#C89B3C]" />
                  <span>{isAr ? 'قفل الخروج' : 'Verrouiller'}</span>
                </button>
              </div>
            </div>

            {/* Metrics Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="bg-[#160F0A] p-4 sm:p-5 rounded-2xl border border-[#2C1F14] text-start">
                <div className="text-[11px] uppercase tracking-wider font-semibold text-[#A89885]">
                  {isAr ? 'إجمالي الطلبيات' : 'Total Commandes'}
                </div>
                <div className="text-2xl sm:text-3xl font-black text-[#FAF7F2] font-mono mt-1">
                  {orders.length}
                </div>
              </div>

              <div className="bg-[#160F0A] p-4 sm:p-5 rounded-2xl border border-amber-900/40 text-start">
                <div className="text-[11px] uppercase tracking-wider font-semibold text-amber-400">
                  {isAr ? 'طلبات جديدة' : 'Nouvelles'}
                </div>
                <div className="text-2xl sm:text-3xl font-black text-amber-300 font-mono mt-1">
                  {orders.filter(o => o.status === 'new').length}
                </div>
              </div>

              <div className="bg-[#160F0A] p-4 sm:p-5 rounded-2xl border border-blue-900/40 text-start">
                <div className="text-[11px] uppercase tracking-wider font-semibold text-blue-400">
                  {isAr ? 'قيد التجهيز' : 'En cours'}
                </div>
                <div className="text-2xl sm:text-3xl font-black text-blue-300 font-mono mt-1">
                  {orders.filter(o => o.status === 'confirmed' || o.status === 'preparing').length}
                </div>
              </div>

              <div className="bg-[#160F0A] p-4 sm:p-5 rounded-2xl border border-emerald-900/40 text-start">
                <div className="text-[11px] uppercase tracking-wider font-semibold text-emerald-400">
                  {isAr ? 'تم تسليمها' : 'Livrées'}
                </div>
                <div className="text-2xl sm:text-3xl font-black text-emerald-300 font-mono mt-1">
                  {orders.filter(o => o.status === 'delivered').length}
                </div>
              </div>
            </div>

            {/* Filter & Search Bar */}
            <div className="bg-[#160F0A] p-4 rounded-2xl border border-[#2C1F14] flex flex-col md:flex-row items-center justify-between gap-4">
              
              {/* Search */}
              <div className="relative w-full md:w-80">
                <Search className="w-4 h-4 text-[#8C6226] absolute top-1/2 -translate-y-1/2 left-3.5" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder={isAr ? 'بحث بالاسم، رقم الهاتف، أو الولاية...' : 'Recherche nom, tél, ville...'}
                  className="w-full pl-10 pr-4 py-2.5 bg-[#0D0805] border border-[#3D2C1D] rounded-xl text-xs sm:text-sm text-[#FAF7F2] placeholder-[#7D6B58] focus:outline-none focus:ring-1 focus:ring-[#C89B3C]"
                />
              </div>

              {/* Status Segmented Filter */}
              <div className="flex flex-wrap items-center gap-1.5 w-full md:w-auto">
                {[
                  { id: 'all', ar: 'الكل', fr: 'Tous' },
                  { id: 'new', ar: 'جديد', fr: 'Nouveau' },
                  { id: 'confirmed', ar: 'مؤكد', fr: 'Confirmé' },
                  { id: 'preparing', ar: 'تحضير', fr: 'Préparation' },
                  { id: 'delivered', ar: 'مكتمل', fr: 'Livré' },
                ].map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setFilterStatus(item.id)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                      filterStatus === item.id
                        ? 'bg-[#C89B3C] text-[#120D08]'
                        : 'text-[#A89885] hover:text-[#FAF7F2] hover:bg-[#24170E]'
                    }`}
                  >
                    {isAr ? item.ar : item.fr}
                  </button>
                ))}
              </div>

            </div>

            {/* Orders Feed */}
            {loading ? (
              <div className="text-center py-20 text-[#A89885] flex items-center justify-center gap-2">
                <RefreshCw className="w-5 h-5 animate-spin text-[#C89B3C]" />
                <span>{isAr ? 'جاري تحميل سجل الطلبيات لحظياً...' : 'Chargement des commandes en temps réel...'}</span>
              </div>
            ) : filteredOrders.length === 0 ? (
              <div className="text-center py-20 bg-[#160F0A] rounded-3xl border border-[#2C1F14] text-[#A89885] p-6">
                <Package className="w-12 h-12 mx-auto mb-3 opacity-30 text-[#C89B3C]" />
                <p className="font-semibold text-base">
                  {isAr ? 'لا توجد طلبيات مسجلة مطابقة لبحثك.' : 'Aucune commande trouvée.'}
                </p>
                <p className="text-xs text-[#7D6B58] mt-1.5 max-w-sm mx-auto">
                  {isAr 
                    ? 'عندما يقوم أي زبون بتسجيل طلب من الموقع الرئيسي، سيظهر هنا فوراً في قاعدة البيانات.' 
                    : 'Dès qu\'un client passe commande sur le site, elle apparaîtra instantanément ici.'}
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {filteredOrders.map((order) => {
                  const badge = getStatusBadge(order.status);
                  const isUpdating = updatingId === order.id;

                  return (
                    <div
                      key={order.id || Math.random()}
                      className="bg-[#160F0A] border border-[#2C1F14] rounded-2xl p-5 space-y-4 hover:border-[#C89B3C]/50 transition-all shadow-xl flex flex-col justify-between"
                    >
                      {/* Top Bar: ID, Date, Status */}
                      <div className="flex items-start justify-between gap-3 border-b border-[#24170E] pb-3">
                        <div>
                          <div className="text-xs font-mono font-bold text-[#E6C687] flex items-center gap-2">
                            <span>#{order.id?.slice(-6).toUpperCase() || 'CMD'}</span>
                            <span className="text-[10px] text-[#7D6B58] font-sans">
                              {order.createdAt}
                            </span>
                          </div>
                          <div className="text-base font-bold text-[#FAF7F2] mt-0.5">
                            {order.customerName}
                          </div>
                        </div>

                        {/* Status Badge */}
                        <div className={`px-2.5 py-1 rounded-full text-[11px] font-bold border ${badge.bg}`}>
                          {isAr ? badge.textAr : badge.textFr}
                        </div>
                      </div>

                      {/* Contact & Location */}
                      <div className="grid grid-cols-2 gap-2 text-xs text-[#C5B49E]">
                        <div className="flex items-center gap-2">
                          <Phone className="w-3.5 h-3.5 text-[#C89B3C] shrink-0" />
                          <span className="font-mono text-[#FAF7F2]" dir="ltr">{order.phone}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPin className="w-3.5 h-3.5 text-[#C89B3C] shrink-0" />
                          <span className="truncate">{order.city} {order.address ? `(${order.address})` : ''}</span>
                        </div>
                      </div>

                      {/* Items Ordered List */}
                      <div className="bg-[#0D0805] p-3.5 rounded-xl border border-[#24170E] space-y-2">
                        <div className="text-[10px] font-bold uppercase tracking-wider text-[#A89885]">
                          {isAr ? 'الأصناف المختارة:' : 'Fromages sélectionnés :'}
                        </div>
                        <ul className="space-y-1 text-xs">
                          {order.items.map((item, idx) => (
                            <li key={idx} className="flex items-center justify-between text-[#E8DCCB]">
                              <span className="font-semibold text-[#F3E5AB]">
                                {isAr ? item.productNameAr : item.productNameFr}
                              </span>
                              <span className="font-mono text-[#C89B3C]">
                                {item.quantity} × {item.weightOrUnit}
                              </span>
                            </li>
                          ))}
                        </ul>

                        {order.notes && (
                          <div className="pt-2 border-t border-[#24170E] text-[11px] text-[#A89885] italic">
                            "{order.notes}"
                          </div>
                        )}
                      </div>

                      {/* Mode and Quick Action Buttons */}
                      <div className="pt-2 flex flex-wrap items-center justify-between gap-2 border-t border-[#24170E]">
                        
                        <div className="flex items-center gap-1.5 text-[11px] text-[#A89885]">
                          <Truck className="w-3.5 h-3.5 text-[#C89B3C]" />
                          <span>
                            {order.deliveryMethod === 'delivery' 
                              ? (isAr ? 'توصيل للمنزل' : 'Livraison') 
                              : (isAr ? 'استلام من الورشة' : 'Retrait atelier')}
                          </span>
                        </div>

                        {/* Actions: Call & WhatsApp & Status updater */}
                        <div className="flex items-center gap-2">
                          {/* Call Client */}
                          <a
                            href={`tel:${order.phone}`}
                            className="p-2.5 rounded-xl bg-[#24170E] hover:bg-[#332014] text-[#F3E5AB] transition-colors"
                            title="Appeler le client"
                          >
                            <Phone className="w-3.5 h-3.5" />
                          </a>

                          {/* WhatsApp Client */}
                          <a
                            href={`https://wa.me/216${order.phone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
                              `Bonjour ${order.customerName}, c'est Omar Hdhili (Fromagerie La Beya) concernant votre commande #${order.id?.slice(-6).toUpperCase()}.`
                            )}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2.5 rounded-xl bg-[#25D366] hover:bg-[#20be5a] text-white transition-colors"
                            title="Discuter sur WhatsApp"
                          >
                            <MessageCircle className="w-3.5 h-3.5 fill-white" />
                          </a>

                          {/* Status Selector */}
                          <select
                            disabled={isUpdating}
                            value={order.status}
                            onChange={(e) => order.id && handleStatusChange(order.id, e.target.value as CustomerOrder['status'])}
                            className="text-xs bg-[#0D0805] border border-[#4A3420] text-[#FAF7F2] rounded-xl px-2.5 py-2 focus:outline-none focus:ring-1 focus:ring-[#C89B3C]"
                          >
                            <option value="new">{isAr ? 'جديد' : 'Nouveau'}</option>
                            <option value="confirmed">{isAr ? 'تأكيد' : 'Confirmer'}</option>
                            <option value="preparing">{isAr ? 'تحضير' : 'Préparation'}</option>
                            <option value="delivered">{isAr ? 'تم التسليم' : 'Livré'}</option>
                            <option value="cancelled">{isAr ? 'إلغاء' : 'Annuler'}</option>
                          </select>
                        </div>

                      </div>

                    </div>
                  );
                })}
              </div>
            )}

          </div>
        )}

      </main>

    </div>
  );
}
