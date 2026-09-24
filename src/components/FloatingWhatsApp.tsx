import { useState } from 'react';
import { MessageCircle, X, Sparkles, Send } from 'lucide-react';
import { Language } from '../types';
import { WHATSAPP_PHONE_RAW, WHATSAPP_PHONE_DISPLAY, getWhatsAppDirectUrl } from '../utils/whatsapp';

interface FloatingWhatsAppProps {
  currentLang: Language;
}

export function FloatingWhatsApp({ currentLang }: FloatingWhatsAppProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [userMsg, setUserMsg] = useState('');

  const isAr = currentLang === 'ar';

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    const finalMsg = userMsg.trim() || (isAr ? 'مرحباً، أود الاستفسار عن توفر الأجبان والطلب المباشر.' : 'Bonjour, je souhaite commander du fromage.');
    const waUrl = getWhatsAppDirectUrl(finalMsg);

    const tempLink = document.createElement('a');
    tempLink.href = waUrl;
    tempLink.target = '_blank';
    tempLink.rel = 'noopener noreferrer';
    document.body.appendChild(tempLink);
    tempLink.click();
    document.body.removeChild(tempLink);

    setUserMsg('');
    setIsOpen(false);
  };

  return (
    <div className={`fixed bottom-6 ${isAr ? 'left-6' : 'right-6'} z-50 flex flex-col items-end`}>
      {/* Pop-up quick chat box */}
      {isOpen && (
        <div className="mb-3 w-80 sm:w-88 bg-[#FAF7F2] rounded-3xl shadow-2xl border border-[#E8DFC8] overflow-hidden animate-in fade-in slide-in-from-bottom-5 duration-200">
          {/* Header */}
          <div className="bg-[#140E0A] text-[#FAF7F2] p-4 flex items-center justify-between border-b border-[#2C1F14]">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-10 h-10 rounded-full bg-[#25D366] flex items-center justify-center text-white shadow-xs">
                  <MessageCircle className="w-6 h-6 fill-white" />
                </div>
                <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-emerald-400 border-2 border-[#140E0A]" />
              </div>
              <div>
                <h4 className="font-serif-brand font-bold text-sm tracking-wide text-[#F3E5AB]">
                  FROMAGERIE LA BEYA
                </h4>
                <div className="text-[11px] text-[#C5B49E]">
                  {isAr ? 'عمر هذيلي · متاح الآن' : 'Omar Hdhili · En direct'}
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="p-1.5 rounded-full text-[#A89885] hover:text-white hover:bg-white/10 cursor-pointer"
              aria-label="Fermer le chat"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body greeting */}
          <div className="p-4 space-y-3 bg-[#FAF7F2]">
            <div className="p-3.5 rounded-2xl bg-[#FFFDF9] border border-[#E8DFC8] text-xs text-[#4A3B2C] leading-relaxed shadow-2xs">
              <p>
                {isAr
                  ? 'أهلاً بك في أجبان البية! أنا عمر هذيلي، كيف يمكنني مساعدتك في اختيار الجبن المناسب أو توصيل طلبيتك؟'
                  : 'Bonjour et bienvenue chez La Beya ! Je suis à votre écoute pour vous conseiller sur nos fromages affinés ou enregistrer votre commande.'}
              </p>
              <div className="text-[11px] text-[#8C6226] font-bold mt-2 font-mono" dir="ltr">
                WhatsApp: 53 216 859
              </div>
            </div>

            {/* Form */}
            <form onSubmit={handleSend} className="space-y-2">
              <input
                type="text"
                value={userMsg}
                onChange={(e) => setUserMsg(e.target.value)}
                placeholder={isAr ? 'اكتب رسالتك لعمر هذيلي...' : 'Votre message pour Omar Hdhili...'}
                className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#D5C6B1] text-xs text-[#1A130E] focus:outline-none focus:ring-2 focus:ring-[#25D366]"
              />

              <button
                type="submit"
                className="w-full py-2.5 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold text-xs shadow-xs transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>{isAr ? 'فتح المحادثة في واتساب' : 'Discuter sur WhatsApp'}</span>
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Floating Button with number 53216859 badge */}
      <button
        type="button"
        id="floating-whatsapp-trigger"
        onClick={() => setIsOpen(!isOpen)}
        className="group relative flex items-center gap-2.5 bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold px-4 py-3 rounded-2xl shadow-xl hover:shadow-2xl transition-all transform hover:scale-105 active:scale-95 cursor-pointer"
        aria-label="Contacter sur WhatsApp"
      >
        <div className="relative">
          <MessageCircle className="w-6 h-6 fill-white" />
          <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-white rounded-full animate-ping" />
        </div>
        <div className="flex flex-col text-start leading-tight">
          <span className="text-[10px] font-semibold text-emerald-100 uppercase tracking-wider">
            WhatsApp
          </span>
          <span className="text-xs font-black tracking-wide font-mono" dir="ltr">
            53216859
          </span>
        </div>
      </button>
    </div>
  );
}
