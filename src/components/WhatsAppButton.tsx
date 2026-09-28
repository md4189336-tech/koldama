import { Smartphone } from 'lucide-react';

interface WhatsAppButtonProps {
  number: string;
  className?: string;
}

export const WhatsAppButton = ({ number, className = "" }: WhatsAppButtonProps) => {
  const digits = number.replace(/\D/g, '').replace(/^0/, '');
  const whatsappNumber = digits.startsWith('221') ? digits : `221${digits}`;

  return (
    <a
      href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent('Bonjour, je vous contacte depuis Kolda Heritage...')}`}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center justify-center bg-primary text-primary-foreground font-bold py-2 px-3 sm:px-4 rounded-full shadow-lg hover:opacity-90 transition-all duration-300 text-xs sm:text-sm ${className}`}
    >
      <Smartphone className="w-4 h-4 mr-1.5 sm:mr-2 flex-shrink-0" />
      <span className="truncate">Contacter via WhatsApp</span>
    </a>
  );
};
