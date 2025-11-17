import { useState } from 'react';
import { Smartphone, BookOpen, Map } from 'lucide-react';
import { WhatsAppButton } from '@/components/WhatsAppButton';

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Formulaire de contact soumis:', formData);
    alert('Merci ! Votre message a été envoyé avec succès.');
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-4xl font-extrabold mb-8 text-primary">Contact & Contribuer au Projet</h2>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Contact Form */}
        <div className="lg:col-span-2 bg-card p-6 rounded-xl shadow-lg">
          <h3 className="text-2xl font-bold mb-4 text-card-foreground">Envoyez-nous un message</h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-foreground mb-1">
                Nom / Organisation
              </label>
              <input 
                type="text" 
                id="name" 
                name="name" 
                value={formData.name} 
                onChange={handleChange} 
                required
                className="w-full border border-border bg-background rounded-md shadow-sm p-2 focus:ring-2 focus:ring-accent focus:border-accent transition-all"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-foreground mb-1">
                Email
              </label>
              <input 
                type="email" 
                id="email" 
                name="email" 
                value={formData.email} 
                onChange={handleChange} 
                required
                className="w-full border border-border bg-background rounded-md shadow-sm p-2 focus:ring-2 focus:ring-accent focus:border-accent transition-all"
              />
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-foreground mb-1">
                Votre message ou proposition de contenu
              </label>
              <textarea 
                id="message" 
                name="message" 
                rows={4} 
                value={formData.message} 
                onChange={handleChange} 
                required
                className="w-full border border-border bg-background rounded-md shadow-sm p-2 focus:ring-2 focus:ring-accent focus:border-accent transition-all"
              ></textarea>
            </div>
            <button 
              type="submit" 
              className="w-full bg-accent text-accent-foreground font-bold py-3 px-4 rounded-lg shadow-md hover:opacity-90 transition-opacity"
            >
              Envoyer
            </button>
          </form>
        </div>

        {/* Contact Info */}
        <div className="p-6 rounded-xl shadow-lg bg-muted/50">
          <h3 className="text-2xl font-bold mb-4 text-foreground">Coordonnées</h3>
          <div className="space-y-4 text-foreground">
            <div className="flex items-start">
              <Smartphone className="w-5 h-5 mr-3 text-primary mt-1" />
              <div className="flex-1">
                <p className="font-semibold">WhatsApp Direct</p>
                <p className="text-sm text-muted-foreground">+221 78 456 78 90</p>
                <WhatsAppButton number="784567890" className="mt-2" />
              </div>
            </div>
            <div className="flex items-center">
              <BookOpen className="w-5 h-5 mr-3 text-primary" />
              <p className="text-sm">koldaheritage@contact.sn</p>
            </div>
            <div className="flex items-center">
              <Map className="w-5 h-5 mr-3 text-primary" />
              <p className="text-sm">Kolda, Haute-Casamance, Sénégal</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
