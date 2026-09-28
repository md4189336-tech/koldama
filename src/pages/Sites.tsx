import { memo } from 'react';
import { ChevronRight, Landmark } from 'lucide-react';
import { useFetchData } from '@/hooks/useFetchData';
import { StatusView } from '@/components/StatusView';
import { KoldaImage } from '@/components/KoldaImage';
import Map, { type MapPoint } from '@/components/Map';
import { koldaMedia } from '@/lib/koldaMedia';

const Sites = memo(() => {
  const { data: sites, loading, error } = useFetchData('sites');
  const territories: MapPoint[] = [
    { id: 'kolda', name: 'Kolda', description: 'Chef-lieu de la région et cœur du Fouladou.', lat: 12.8833, lng: -14.95, image: koldaMedia.aerialBridge },
    { id: 'velingara', name: 'Vélingara', description: 'Département au sud-est de la région de Kolda.', lat: 13.15, lng: -14.1167 },
    { id: 'medina-yoro-foulah', name: 'Médina Yoro Foulah', description: 'Département du nord de la région de Kolda.', lat: 13.4, lng: -14.75 },
  ];

  return (
    <div className="container mx-auto px-3 sm:px-4 lg:px-6 py-4 sm:py-6 lg:py-8">
      <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold mb-4 sm:mb-6 lg:mb-8 text-primary">
        Carte Interactive des Sites Historiques
      </h2>
      <StatusView loading={loading} error={error} />

      <div className="relative mb-6 sm:mb-8 h-40 sm:h-56 overflow-hidden rounded-lg">
        <KoldaImage src={koldaMedia.aerialBridge} alt="Vue aérienne du pont et du fleuve de Kolda" className="h-full w-full object-cover" />
        <div className="absolute inset-0 flex items-end bg-gradient-to-t from-black/65 to-transparent p-4 sm:p-6">
          <h3 className="text-xl sm:text-2xl font-bold text-white">Repères historiques et territoires du Fouladou</h3>
        </div>
      </div>

      <div className="mb-6 overflow-hidden rounded-lg bg-muted p-2 sm:p-4">
        <KoldaImage
          src={koldaMedia.regionalMap}
          alt="Carte géographique de la région de Kolda et des territoires du Fouladou"
          className="mx-auto max-h-[26rem] w-full object-contain"
          loading="lazy"
        />
      </div>

      {sites && <Map sites={sites.map(site => ({ ...site, image: site.image ?? (site.name.includes('Mosquée') ? koldaMedia.mosque : undefined) }))} />}

      {/* Sites Grid */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
        {sites?.map(site => {
          const siteImage = site.image ?? (site.name.includes('Mosquée') ? koldaMedia.mosque : site.name.includes('Carrefour') ? koldaMedia.crossroads : null);

          return (
          <div 
            key={site.id} 
            className="bg-card rounded-xl shadow-lg overflow-hidden transition-shadow hover:shadow-2xl"
          >
            {siteImage ? (
              <KoldaImage src={siteImage} alt={site.name} className="h-48 sm:h-56 lg:h-64 w-full object-cover" loading="lazy" />
            ) : (
              <div role="img" aria-label={`${site.name} — photo à ajouter`} className="flex h-48 w-full items-center justify-center bg-gradient-to-br from-emerald-950 via-stone-900 to-amber-950 text-white/80 sm:h-56 lg:h-64">
                <Landmark aria-hidden="true" className="h-12 w-12" />
              </div>
            )}
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
          );
        })}
      </section>
      <section className="mt-10 border-t border-border pt-8">
        <h3 className="mb-2 text-xl font-bold text-foreground">Territoires du Fouladou</h3>
        <p className="mb-5 text-sm text-muted-foreground">Kolda, Vélingara et Médina Yoro Foulah</p>
        <Map sites={territories} />
      </section>
    </div>
  );
});

Sites.displayName = 'Sites';

export default Sites;
