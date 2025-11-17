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
  <div className="p-6 bg-card rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border-b-4 border-accent">
    <div className="flex items-center mb-3">
      <Icon className="w-8 h-8 text-accent mr-3" />
      <h3 className="text-xl font-bold text-card-foreground">{title}</h3>
    </div>
    <p className="text-muted-foreground mb-4">{description}</p>
    <Link
      to={targetPage}
      className="text-sm font-semibold text-primary hover:text-accent flex items-center transition-colors"
    >
      Explorer <ChevronRight className="w-4 h-4 ml-1" />
    </Link>
  </div>
);

const Home = () => {
  const { data: sitesData } = useFetchData('sites');
  const { data: partnersData } = useFetchData('partners');

  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <header className="relative h-64 md:h-96 flex items-center justify-center text-center shadow-2xl overflow-hidden rounded-b-3xl">
        <img src={heroImage} alt="Kolda Heritage" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="relative p-4 max-w-4xl z-10">
          <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-4 leading-tight">
            Découvrez l'âme culturelle de Kolda
          </h2>
          <p className="text-lg text-gray-200 font-medium">
            À travers une plateforme moderne et accessible.
          </p>
        </div>
      </header>

      {/* CTA Grid */}
      <section className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
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
      <section className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-6 text-foreground">Site Historique du Jour</h2>
        <div className="md:flex bg-card rounded-xl shadow-lg overflow-hidden">
          <div className="md:flex-shrink-0">
            <img 
              className="h-48 w-full object-cover md:w-56" 
              src={siteImage} 
              alt="Arbre de Moussamolo" 
            />
          </div>
          <div className="p-8">
            <div className="uppercase tracking-wide text-sm font-semibold text-accent">
              Lieu de Mémoire
            </div>
            <p className="block mt-1 text-xl leading-tight font-medium text-card-foreground">
              {sitesData?.[0]?.name}
            </p>
            <p className="mt-2 text-muted-foreground">{sitesData?.[0]?.description}</p>
            <Link 
              to="/sites" 
              className="mt-4 inline-flex items-center text-sm font-bold text-primary hover:text-accent transition-colors"
            >
              Voir la fiche complète <ChevronRight className="w-4 h-4 ml-1" />
            </Link>
          </div>
        </div>
      </section>

      {/* Premium Partners */}
      <section className="py-12 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">Nos Partenaires Premium</h2>
          <div className="flex flex-wrap justify-center gap-6">
            {partnersData?.filter(p => p.isPremium).map(p => (
              <div 
                key={p.id} 
                className="p-6 bg-card rounded-lg shadow-xl text-center w-40 md:w-48 transform hover:scale-105 transition-transform"
              >
                <div className="h-16 flex items-center justify-center mb-3">
                  <div className="w-24 h-12 bg-muted rounded flex items-center justify-center text-xs font-bold text-muted-foreground">
                    {p.name}
                  </div>
                </div>
                <p className="text-sm font-semibold text-card-foreground">{p.name}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link 
              to="/partenaires" 
              className="inline-flex items-center bg-accent text-accent-foreground font-bold py-3 px-6 rounded-full shadow-lg hover:opacity-90 transition-opacity"
            >
              Devenir Partenaire <Users className="w-5 h-5 ml-2" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
