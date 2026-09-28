import { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Home, BookOpen, Map, DollarSign, Briefcase, Calendar, MessageSquare, Menu, X, Zap, Search, Images } from 'lucide-react';
import { mockData } from '@/lib/mockData';

const menuItems = [
  { id: '/', label: 'Accueil', icon: Home },
  { id: '/bibliotheque', label: 'Bibliothèque', icon: BookOpen },
  { id: '/sites', label: 'Sites Historiques', icon: Map },
  { id: '/hotels', label: 'Hôtels', icon: DollarSign },
  { id: '/partenaires', label: 'Partenaires', icon: Briefcase },
  { id: '/actualites', label: 'Actualités', icon: Calendar },
  { id: '/galerie', label: 'Galerie', icon: Images },
  { id: '/contact', label: 'Contact', icon: MessageSquare },
];

const searchPaths: Record<string, string> = {
  livres: '/bibliotheque',
  auteurs: '/bibliotheque',
  sites: '/sites',
  hotels: '/hotels',
  partners: '/partenaires',
  actualites: '/actualites',
};

const findResults = (query: string) => {
  const normalizedQuery = query.trim().toLocaleLowerCase();
  if (normalizedQuery.length < 2) return [];

  return Object.entries(mockData).flatMap(([key, records]) => {
    const path = searchPaths[key];
    if (!path) return [];
    return (records as unknown as Array<Record<string, unknown>>)
      .filter(record => JSON.stringify(record).toLocaleLowerCase().includes(normalizedQuery))
      .map(record => ({
        id: String(record.id),
        title: String(record.title ?? record.name ?? 'Contenu'),
        category: String(record.role ?? record.categorie ?? record.type ?? key),
        path,
      }));
  }).slice(0, 6);
};

type EstablishmentSearchResult = {
  id: string;
  name: string;
  type: string;
  description: string;
  address: string;
};

export const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [establishmentResults, setEstablishmentResults] = useState<EstablishmentSearchResult[]>([]);
  const location = useLocation();
  const navigate = useNavigate();
  const searchResults = [
    ...findResults(searchQuery),
    ...establishmentResults.map(item => ({
      id: item.id,
      title: item.name,
      category: item.type,
      path: '/hotels',
    })),
  ].slice(0, 6);

  useEffect(() => {
    const query = searchQuery.trim().toLocaleLowerCase();
    if (!searchOpen || query.length < 2) {
      setEstablishmentResults([]);
      return;
    }

    let active = true;
    const timer = window.setTimeout(() => {
      void import('@/integrations/supabase/client').then(async ({ supabase }) => {
        const { data } = await supabase
          .from('establishments')
          .select('id, name, type, description, address')
          .eq('status', 'approved')
          .limit(500);
        if (!active) return;
        setEstablishmentResults((data ?? []).filter(item =>
          `${item.name} ${item.type} ${item.description} ${item.address}`.toLocaleLowerCase().includes(query),
        ));
      }).catch(() => {
        if (active) setEstablishmentResults([]);
      });
    }, 180);

    return () => {
      active = false;
      window.clearTimeout(timer);
    };
  }, [searchOpen, searchQuery]);

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

          <div className="relative ml-auto mr-2 lg:ml-3 lg:mr-0">
            <button
              type="button"
              onClick={() => setSearchOpen(open => !open)}
              aria-label="Rechercher dans Kolda Heritage"
              className="inline-flex h-10 w-10 items-center justify-center rounded-md text-foreground hover:bg-muted"
            >
              {searchOpen ? <X className="h-5 w-5" /> : <Search className="h-5 w-5" />}
            </button>
            {searchOpen && (
              <div className="absolute right-0 top-12 z-[60] w-[min(20rem,calc(100vw-1.5rem))] rounded-md border border-border bg-card p-3 shadow-xl">
                <input
                  autoFocus
                  type="search"
                  value={searchQuery}
                  onChange={event => setSearchQuery(event.target.value)}
                  placeholder="Rechercher un lieu, un conte…"
                  aria-label="Mots-clés de recherche"
                  className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm"
                />
                {searchQuery.trim().length >= 2 && (
                  <ul className="mt-2 max-h-72 overflow-y-auto">
                    {searchResults.length ? searchResults.map(result => (
                      <li key={`${result.path}-${result.id}`}>
                        <button
                          type="button"
                          onClick={() => {
                            navigate(result.path);
                            setSearchOpen(false);
                            setSearchQuery('');
                          }}
                          className="w-full border-b border-border/60 px-2 py-2 text-left hover:bg-muted"
                        >
                          <span className="block truncate text-sm font-semibold">{result.title}</span>
                          <span className="text-xs text-muted-foreground">{result.category}</span>
                        </button>
                      </li>
                    )) : <li className="px-2 py-3 text-sm text-muted-foreground">Aucun résultat.</li>}
                  </ul>
                )}
              </div>
            )}
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
