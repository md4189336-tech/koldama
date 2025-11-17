import { Link } from 'react-router-dom';
import { BookOpen, Map, Globe, ChevronRight, Users } from 'lucide-react';
import { useFetchData } from '@/hooks/useFetchData';
import heroImage from '@/assets/hero-kolda.jpg';
import siteImage from '@/assets/site-historique.jpg';

const CtaSection = ({ title, icon: Icon, description, targetPage }: {
  title: string;
  icon: React.ElementType;
  description: string;
  targetPage: string;
}) => (
  <div className="p-4 sm:p-6 bg-card rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border-b-4 border-accent">
    <div className="flex items-center mb-3">
      <Icon className="w-6 h-6 sm:w-8 sm:h-8 text-accent mr-2 sm:mr-3 flex-shrink-0" />
      <h3 className="text-lg sm:text-xl font-bold text-card-foreground">{title}</h3>
    </div>
    <p className="text-sm sm:text-base text-muted-foreground mb-4 line-clamp-2">{description}</p>
    <Link
      to={targetPage}
      className="text-xs sm:text-sm font-semibold text-primary hover:text-accent flex items-center transition-colors"
    >
      Explorer <ChevronRight className="w-4 h-4 ml-1 flex-shrink-0" />
    </Link>
  </div>
);

const Home = () => {
  const { data: sitesData } = useFetchData('sites');
  const { data: partnersData } = useFetchData('partners');

  return (
    <div className="space-y-8 sm:space-y-12">
      {/* Hero Section */}
      <header className="relative h-48 sm:h-64 md:h-80 lg:h-96 flex items-center justify-center text-center shadow-2xl overflow-hidden rounded-b-3xl">
        <img src={heroImage} alt="Kolda Heritage" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="relative p-4 sm:p-6 max-w-4xl z-10 px-4">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-white mb-2 sm:mb-4 leading-tight">
            Découvrez l'âme culturelle de Kolda
          </h2>
          <p className="text-sm sm:text-base lg:text-lg text-gray-200 font-medium">
            À travers une plateforme moderne et accessible.
          </p>
        </div>
      </header>

      {/* CTA Grid */}
      <section className="container mx-auto px-3 sm:px-4 lg:px-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
        <CtaSection
          title="Bibliothèque Virtuelle"
          icon={BookOpen}
          description="Accédez aux livres, contes et recherches des auteurs du Fouladou."
          targetPage="/bibliotheque"
        />
        <CtaSection
          title="Sites Historiques"
          icon={Map}
          description="Localisez les monuments, lieux sacrés et chefferies de la région."
          targetPage="/sites"
        />
        <CtaSection
          title="Actualités & Traditions"
          icon={Globe}
          description="Plongez au cœur des traditions, danses et histoires de Kolda."
          targetPage="/actualites"
        />
      </section>

      {/* Featured Site */}
      <section className="container mx-auto px-3 sm:px-4 lg:px-6">
        <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 text-foreground">Site Historique du Jour</h2>
        <div className="flex flex-col md:flex-row bg-card rounded-xl shadow-lg overflow-hidden">
          <div className="md:flex-shrink-0 w-full md:w-56">
            <img 
              className="h-48 sm:h-56 md:h-full w-full object-cover" 
              src={siteImage} 
              alt="Arbre de Moussamolo" 
            />
          </div>
          <div className="p-4 sm:p-6 lg:p-8">
            <div className="uppercase tracking-wide text-xs sm:text-sm font-semibold text-accent mb-1">
              Lieu de Mémoire
            </div>
            <p className="block mt-1 text-lg sm:text-xl leading-tight font-medium text-card-foreground">
              {sitesData?.[0]?.name}
            </p>
            <p className="mt-2 text-sm sm:text-base text-muted-foreground line-clamp-3 md:line-clamp-none">
              {sitesData?.[0]?.description}
            </p>
            <Link 
              to="/sites" 
              className="mt-4 inline-flex items-center text-xs sm:text-sm font-bold text-primary hover:text-accent transition-colors"
            >
              Voir la fiche complète <ChevronRight className="w-4 h-4 ml-1" />
            </Link>
          </div>
        </div>
      </section>

      {/* Premium Partners */}
      <section className="py-8 sm:py-12 bg-primary text-primary-foreground">
        <div className="container mx-auto px-3 sm:px-4 lg:px-6">
          <h2 className="text-2xl sm:text-3xl font-bold text-center mb-6 sm:mb-8">Nos Partenaires Premium</h2>
          <div className="flex flex-wrap justify-center gap-4 sm:gap-6">
            {partnersData?.filter(p => p.isPremium).map(p => (
              <div 
                key={p.id} 
                className="p-4 sm:p-6 bg-card rounded-lg shadow-xl text-center w-32 sm:w-40 lg:w-48 transform hover:scale-105 transition-transform"
              >
                <div className="h-12 sm:h-16 flex items-center justify-center mb-2 sm:mb-3">
                  <div className="w-20 sm:w-24 h-8 sm:h-12 bg-muted rounded flex items-center justify-center text-[10px] sm:text-xs font-bold text-muted-foreground px-1">
                    {p.name}
                  </div>
                </div>
                <p className="text-xs sm:text-sm font-semibold text-card-foreground truncate">{p.name}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-6 sm:mt-8">
            <Link 
              to="/partenaires" 
              className="inline-flex items-center bg-accent text-accent-foreground font-bold py-2 sm:py-3 px-4 sm:px-6 rounded-full shadow-lg hover:opacity-90 transition-opacity text-sm sm:text-base"
            >
              Devenir Partenaire <Users className="w-4 h-4 sm:w-5 sm:h-5 ml-2" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
