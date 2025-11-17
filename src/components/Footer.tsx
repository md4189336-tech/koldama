import { BookOpen, Map, Globe, Users } from 'lucide-react';

export const Footer = () => (
  <footer className="mt-12 p-8 bg-primary text-primary-foreground">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
        <div>
          <h4 className="font-bold text-lg mb-3">Kolda Heritage</h4>
          <p className="text-sm text-primary-foreground/80">
            Plateforme de valorisation du patrimoine du Fouladou.
          </p>
        </div>
        <div>
          <h4 className="font-bold text-lg mb-3">Ressources</h4>
          <ul className="space-y-2 text-sm text-primary-foreground/80">
            <li><a href="#" className="hover:text-accent transition-colors">Auteurs</a></li>
            <li><a href="#" className="hover:text-accent transition-colors">Contes et Légendes</a></li>
            <li><a href="#" className="hover:text-accent transition-colors">Médiathèque</a></li>
          </ul>
        </div>
        <div>
          <h4 className="font-bold text-lg mb-3">Partenariat</h4>
          <ul className="space-y-2 text-sm text-primary-foreground/80">
            <li><a href="#" className="hover:text-accent transition-colors">Devenir Partenaire</a></li>
            <li><a href="#" className="hover:text-accent transition-colors">Espace Admin</a></li>
            <li><a href="#" className="hover:text-accent transition-colors">Mentions Légales</a></li>
          </ul>
        </div>
        <div>
          <h4 className="font-bold text-lg mb-3">Suivez-nous</h4>
          <div className="flex space-x-3">
            <Globe className="w-6 h-6 hover:text-accent cursor-pointer transition-colors" />
            <Users className="w-6 h-6 hover:text-accent cursor-pointer transition-colors" />
          </div>
        </div>
      </div>
      <div className="mt-8 pt-4 border-t border-primary-foreground/20 text-center text-sm text-primary-foreground/60">
        © {new Date().getFullYear()} Kolda Heritage. Tous droits réservés.
      </div>
    </div>
  </footer>
);
