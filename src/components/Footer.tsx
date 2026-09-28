import { BookOpen, Map, Globe, Users } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Footer = () => (
  <footer className="mt-8 sm:mt-12 p-4 sm:p-6 lg:p-8 bg-primary text-primary-foreground">
    <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
        <div className="text-center sm:text-left">
          <h4 className="font-bold text-base sm:text-lg mb-3">Kolda Heritage</h4>
          <p className="text-xs sm:text-sm text-primary-foreground/80">
            Plateforme de valorisation du patrimoine du Fouladou.
          </p>
        </div>
        <div className="text-center sm:text-left">
          <h4 className="font-bold text-base sm:text-lg mb-3">Ressources</h4>
          <ul className="space-y-2 text-xs sm:text-sm text-primary-foreground/80">
            <li><a href="#" className="hover:text-accent transition-colors">Auteurs</a></li>
            <li><Link to="/actualites" className="hover:text-accent transition-colors">Contes et Légendes</Link></li>
            <li><Link to="/galerie" className="hover:text-accent transition-colors">Galerie Photos</Link></li>
            <li><a href="#" className="hover:text-accent transition-colors">Médiathèque</a></li>
          </ul>
        </div>
        <div className="text-center sm:text-left">
          <h4 className="font-bold text-base sm:text-lg mb-3">Partenariat</h4>
          <ul className="space-y-2 text-xs sm:text-sm text-primary-foreground/80">
            <li><a href="#" className="hover:text-accent transition-colors">Devenir Partenaire</a></li>
            <li><Link to="/admin" className="hover:text-accent transition-colors">Espace Admin</Link></li>
            <li><a href="#" className="hover:text-accent transition-colors">Mentions Légales</a></li>
          </ul>
        </div>
        <div className="text-center sm:text-left">
          <h4 className="font-bold text-base sm:text-lg mb-3">Suivez-nous</h4>
          <div className="flex space-x-3 justify-center sm:justify-start">
            <Globe className="w-5 h-5 sm:w-6 sm:h-6 hover:text-accent cursor-pointer transition-colors" />
            <Users className="w-5 h-5 sm:w-6 sm:h-6 hover:text-accent cursor-pointer transition-colors" />
          </div>
        </div>
      </div>
      <div className="mt-6 sm:mt-8 pt-4 border-t border-primary-foreground/20 text-center text-xs sm:text-sm text-primary-foreground/60">
        © {new Date().getFullYear()} Kolda Heritage. Tous droits réservés.
      </div>
    </div>
  </footer>
);
