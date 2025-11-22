import { useState, memo, useCallback } from 'react';
import { Smartphone, BookOpen, Map } from 'lucide-react';
import { WhatsAppButton } from '@/components/WhatsAppButton';

const Contact = memo(() => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }, []);

  const handleSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    console.log('Formulaire de contact soumis:', formData);
    alert('Merci ! Votre message a été envoyé avec succès.');
    setFormData({ name: '', email: '', message: '' });
  }, []);

  return (
    <div className="container mx-auto px-3 sm:px-4 lg:px-6 py-4 sm:py-6 lg:py-8">
      <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold mb-4 sm:mb-6 lg:mb-8 text-primary">
        Contact & Contribuer au Projet
      </h2>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
        {/* Contact Form */}
        <div className="lg:col-span-2 bg-card p-4 sm:p-6 rounded-xl shadow-lg">
          <h3 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 text-card-foreground">
            Envoyez-nous un message
          </h3>
          <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
            <div>
              <label htmlFor="name" className="block text-xs sm:text-sm font-medium text-foreground mb-1">
                Nom / Organisation
              </label>
              <input 
                type="text" 
                id="name" 
                name="name" 
                value={formData.name} 
                onChange={handleChange} 
                required
                className="w-full text-sm sm:text-base border border-border bg-background rounded-md shadow-sm p-2 focus:ring-2 focus:ring-accent focus:border-accent transition-all"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-xs sm:text-sm font-medium text-foreground mb-1">
                Email
              </label>
              <input 
                type="email" 
                id="email" 
                name="email" 
                value={formData.email} 
                onChange={handleChange} 
                required
                className="w-full text-sm sm:text-base border border-border bg-background rounded-md shadow-sm p-2 focus:ring-2 focus:ring-accent focus:border-accent transition-all"
              />
            </div>
            <div>
              <label htmlFor="message" className="block text-xs sm:text-sm font-medium text-foreground mb-1">
                Votre message ou proposition de contenu
              </label>
              <textarea 
                id="message" 
                name="message" 
                rows={4} 
                value={formData.message} 
                onChange={handleChange} 
                required
                className="w-full text-sm sm:text-base border border-border bg-background rounded-md shadow-sm p-2 focus:ring-2 focus:ring-accent focus:border-accent transition-all resize-none"
              ></textarea>
            </div>
            <button 
              type="submit" 
              className="w-full bg-accent text-accent-foreground font-bold py-2 sm:py-3 px-4 rounded-lg shadow-md hover:opacity-90 transition-opacity text-sm sm:text-base"
            >
              Envoyer
            </button>
          </form>
        </div>

        {/* Contact Info */}
        <div className="p-4 sm:p-6 rounded-xl shadow-lg bg-muted/50">
          <h3 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 text-foreground">Coordonnées</h3>
          <div className="space-y-3 sm:space-y-4 text-foreground">
            <div className="flex items-start">
              <Smartphone className="w-4 h-4 sm:w-5 sm:h-5 mr-2 sm:mr-3 text-primary mt-1 flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-sm sm:text-base">WhatsApp Direct</p>
                <p className="text-xs sm:text-sm text-muted-foreground">+221 78 456 78 90</p>
                <WhatsAppButton number="784567890" className="mt-2 w-full text-xs sm:text-sm" />
              </div>
            </div>
            <div className="flex items-center">
              <BookOpen className="w-4 h-4 sm:w-5 sm:h-5 mr-2 sm:mr-3 text-primary flex-shrink-0" />
              <p className="text-xs sm:text-sm truncate">koldaheritage@contact.sn</p>
            </div>
            <div className="flex items-start">
              <Map className="w-4 h-4 sm:w-5 sm:h-5 mr-2 sm:mr-3 text-primary flex-shrink-0 mt-0.5" />
              <p className="text-xs sm:text-sm">Kolda, Haute-Casamance, Sénégal</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

Contact.displayName = 'Contact';

export default Contact;
