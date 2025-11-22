import { memo } from 'react';
import { Map, ChevronRight } from 'lucide-react';
import { useFetchData } from '@/hooks/useFetchData';
import { StatusView } from '@/components/StatusView';
import siteImage from '@/assets/site-historique.jpg';

const Sites = memo(() => {
  const { data: sites, loading, error } = useFetchData('sites');

  return (
    <div className="container mx-auto px-3 sm:px-4 lg:px-6 py-4 sm:py-6 lg:py-8">
      <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold mb-4 sm:mb-6 lg:mb-8 text-primary">
        Carte Interactive des Sites Historiques
      </h2>
      <StatusView loading={loading} error={error} />

      {/* Map Placeholder */}
      <div className="mb-6 sm:mb-8 p-3 sm:p-4 bg-muted rounded-xl shadow-inner relative overflow-hidden h-64 sm:h-80 lg:h-96">
        <Map className="w-8 h-8 sm:w-10 sm:h-10 text-muted-foreground absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute inset-0 bg-heritage-earth/30 flex items-center justify-center p-4">
          <div className="bg-card p-3 sm:p-4 rounded-lg shadow-lg max-w-md">
            <p className="font-semibold text-card-foreground mb-2 text-sm sm:text-base">Carte Interactive</p>
            <p className="text-xs sm:text-sm text-muted-foreground">
              Localisation approximative des sites historiques de Kolda : Moussamolo, Dabo, Médina Gounass...
            </p>
          </div>
        </div>
      </div>

      {/* Sites Grid */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
        {sites?.map(site => (
          <div 
            key={site.id} 
            className="bg-card rounded-xl shadow-lg overflow-hidden transition-shadow hover:shadow-2xl"
          >
            <img 
              src={siteImage} 
              alt={site.name} 
              className="h-48 sm:h-56 lg:h-64 w-full object-cover"
              loading="lazy"
            />
            <div className="p-4 sm:p-5 lg:p-6">
              <div className="text-xs font-bold uppercase tracking-wider text-accent mb-1">
                {site.role}
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-card-foreground mb-2 sm:mb-3">{site.name}</h3>
              <p className="text-sm sm:text-base text-muted-foreground mb-3 sm:mb-4 line-clamp-3">{site.description}</p>
              <a
                href={`https://www.google.com/maps/search/?api=1&query=${site.lat},${site.lng}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center text-xs sm:text-sm font-bold text-primary hover:text-accent transition-colors"
              >
                Voir Itinéraire (Google Maps) <ChevronRight className="w-4 h-4 ml-1" />
              </a>
            </div>
          </div>
        ))}
      </section>
      <p className="text-center mt-6 sm:mt-8 text-sm sm:text-base text-muted-foreground">
        Fonction "Découvrir près de moi" à implémenter.
      </p>
    </div>
  );
});

Sites.displayName = 'Sites';

export default Sites;
