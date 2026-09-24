export const WHATSAPP_PHONE_RAW = '53216859';
export const WHATSAPP_PHONE_INTERNATIONAL = '+21653216859';
export const WHATSAPP_PHONE_DISPLAY = '+216 53 216 859';

export function getWhatsAppDirectUrl(customMessage?: string): string {
  const defaultMsg = 'Bonjour Fromagerie La Beya, je souhaite avoir des renseignements ou passer une commande.';
  const encoded = encodeURIComponent(customMessage || defaultMsg);
  return `https://wa.me/21653216859?text=${encoded}`;
}
