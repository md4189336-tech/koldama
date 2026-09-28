import { memo } from 'react';
import { useFetchData } from '@/hooks/useFetchData';
import { KoldaImage } from '@/components/KoldaImage';
import { StatusView } from '@/components/StatusView';
import { koldaMedia } from '@/lib/koldaMedia';

const Actualites = memo(() => {
  const { data: news, loading, error } = useFetchData('actualites');

  const traditions = [
    { 
      id: 1, 
      title: "Présentation des ethnies de Kolda", 
      content: "Peulhs, Mandingues, Diolas : découvrez la diversité et l'harmonie des cultures." 
    },
    { 
      id: 2, 
      title: "La Gastronomie Koldoise : Rites et Recettes", 
      content: "Du Thiéboudienne local aux plats pastoraux, un voyage culinaire." 
    },
    { 
      id: 3, 
      title: "Les Rituels de l'eau en Haute-Casamance", 
      content: "Immersion dans les traditions liées aux fleuves et aux saisons." 
    },
  ];
  const talesAudio = [
    { language: 'Pulaar', source: import.meta.env.VITE_CONTE_PULAAR_AUDIO_URL },
    { language: 'Français', source: import.meta.env.VITE_CONTE_FRANCAIS_AUDIO_URL },
  ];

  return (
    <div className="container mx-auto px-3 sm:px-4 lg:px-6 py-4 sm:py-6 lg:py-8">
      <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold mb-4 sm:mb-6 lg:mb-8 text-accent">
        Actualités Culturelles & Traditions du Fouladou
      </h2>
      <StatusView loading={loading} error={error} />

      {/* News Feed */}
      <section className="mb-8 sm:mb-12">
        <h3 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-primary">
          Fil d'Actualité ({news?.length || 0})
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {news?.map(item => (
            <div 
              key={item.id} 
              className="bg-card rounded-xl shadow-lg overflow-hidden transition-shadow hover:shadow-xl"
            >
              <KoldaImage
                src={koldaMedia.cultureStreet} 
                alt={item.title} 
                className="h-40 sm:h-48 w-full object-cover"
                loading="lazy"
              />
              <div className="p-3 sm:p-4">
                <div className="flex justify-between items-center text-[10px] sm:text-xs text-muted-foreground mb-2">
                  <span className={`font-semibold ${item.type === 'Vidéo' ? 'text-destructive' : 'text-primary'}`}>
                    {item.type}
                  </span>
                  <span>{item.date}</span>
                </div>
                <h4 className="text-base sm:text-lg font-bold text-card-foreground line-clamp-2">{item.title}</h4>
                <p className="text-xs sm:text-sm text-muted-foreground mt-2 line-clamp-3">{item.content}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Culture & Traditions */}
      <section className="p-4 sm:p-6 rounded-xl shadow-inner bg-muted/50">
        <h3 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-accent">Guide Culture & Traditions</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {traditions.map(t => (
            <div key={t.id} className="bg-card rounded-lg shadow-md overflow-hidden">
              <div className="h-24 sm:h-32 w-full bg-muted flex items-center justify-center">
                <KoldaImage
                  src={koldaMedia.cultureStreet} 
                  alt={t.title} 
                  className="h-full w-full object-cover"
                  loading="lazy"
                />
              </div>
              <div className="p-3 sm:p-4">
                <h4 className="font-bold text-card-foreground mb-1 text-sm sm:text-base line-clamp-2">{t.title}</h4>
                <p className="text-xs sm:text-sm text-muted-foreground line-clamp-3">{t.content}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-8 border-t border-border pt-6" aria-labelledby="tales-audio-title">
        <h3 id="tales-audio-title" className="text-xl sm:text-2xl font-bold text-foreground">Contes et Légendes du Fouladou</h3>
        <p className="mt-1 mb-5 text-sm text-muted-foreground">Narrations disponibles en Pulaar et en français.</p>
        <div className="grid gap-5 sm:grid-cols-2">
          {talesAudio.map(audio => (
            <div key={audio.language} className="border-t-2 border-accent py-3">
              <h4 className="mb-3 font-semibold text-card-foreground">Narration en {audio.language}</h4>
              {audio.source ? (
                <audio controls preload="none" className="w-full" aria-label={`Conte narré en ${audio.language}`}>
                  <source src={audio.source} />
                </audio>
              ) : (
                <p className="text-sm text-muted-foreground">Enregistrement à ajouter.</p>
              )}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
});

Actualites.displayName = 'Actualites';

export default Actualites;
