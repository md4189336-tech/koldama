import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, BookOpen, Map, DollarSign, Briefcase, Calendar, MessageSquare, Globe, Menu, X, Zap } from 'lucide-react';

const menuItems = [
  { id: '/', label: 'Accueil', icon: Home },
  { id: '/bibliotheque', label: 'Bibliothèque', icon: BookOpen },
  { id: '/sites', label: 'Sites Historiques', icon: Map },
  { id: '/hotels', label: 'Hôtels', icon: DollarSign },
  { id: '/partenaires', label: 'Partenaires', icon: Briefcase },
  { id: '/actualites', label: 'Actualités', icon: Calendar },
  { id: '/contact', label: 'Contact', icon: MessageSquare },
];

export const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const NavItem = ({ item }: { item: typeof menuItems[0] }) => {
    const isActive = location.pathname === item.id;
    
  return (
    <Link
      to={item.id}
      onClick={() => setIsOpen(false)}
      className={`flex items-center px-4 py-2.5 text-sm font-medium transition-all duration-300 rounded-md ${
        isActive
          ? 'bg-accent text-accent-foreground shadow-md'
          : 'text-foreground/70 hover:text-accent-foreground hover:bg-primary'
      }`}
    >
      <item.icon className="w-4 h-4 mr-2 flex-shrink-0" />
      <span className="truncate">{item.label}</span>
    </Link>
  );
  };

  return (
    <nav className="sticky top-0 z-50 bg-card shadow-lg border-b border-border">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-14 sm:h-16">
          <div className="flex-shrink-0 flex items-center min-w-0">
            <Link to="/" className="text-base sm:text-xl font-extrabold text-foreground flex items-center hover:text-primary transition-colors truncate">
              <Zap className="w-5 h-5 sm:w-6 sm:h-6 mr-1.5 sm:mr-2 text-accent flex-shrink-0" />
              <span className="truncate">Kolda Heritage</span>
            </Link>
          </div>

          <div className="hidden lg:flex lg:space-x-2 xl:space-x-4 items-center">
            {menuItems.map((item) => (
              <NavItem key={item.id} item={item} />
            ))}
          </div>

          <div className="lg:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-foreground hover:text-accent hover:bg-muted focus:outline-none transition-colors"
              aria-label="Menu de navigation"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="lg:hidden px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-card shadow-xl border-b border-border max-h-[calc(100vh-3.5rem)] overflow-y-auto">
          {menuItems.map((item) => (
            <NavItem key={item.id} item={item} />
          ))}
        </div>
      )}
    </nav>
  );
};
