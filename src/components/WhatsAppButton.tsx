import { Smartphone } from 'lucide-react';

interface WhatsAppButtonProps {
  number: string;
  className?: string;
}

export const WhatsAppButton = ({ number, className = "" }: WhatsAppButtonProps) => (
  <a
    href={`https://wa.me/${number.replace(/\s/g, '')}`}
    target="_blank"
    rel="noopener noreferrer"
    className={`inline-flex items-center justify-center bg-primary text-primary-foreground font-bold py-2 px-4 rounded-full shadow-lg hover:opacity-90 transition-all duration-300 ${className}`}
  >
    <Smartphone className="w-5 h-5 mr-2" />
    Contacter via WhatsApp
  </a>
);
