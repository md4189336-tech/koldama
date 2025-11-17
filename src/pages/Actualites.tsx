import { useFetchData } from '@/hooks/useFetchData';
import { StatusView } from '@/components/StatusView';
import cultureImage from '@/assets/culture-danse.jpg';

const Actualites = () => {
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

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-4xl font-extrabold mb-8 text-accent">
        Actualités Culturelles & Traditions du Fouladou
      </h2>
      <StatusView loading={loading} error={error} />

      {/* News Feed */}
      <section className="mb-12">
        <h3 className="text-2xl font-bold mb-6 text-primary">
          Fil d'Actualité ({news?.length || 0})
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {news?.map(item => (
            <div 
              key={item.id} 
              className="bg-card rounded-xl shadow-lg overflow-hidden transition-shadow hover:shadow-xl"
            >
              <img src={cultureImage} alt={item.title} className="h-48 w-full object-cover" />
              <div className="p-4">
                <div className="flex justify-between items-center text-xs text-muted-foreground mb-2">
                  <span className={`font-semibold ${item.type === 'Vidéo' ? 'text-destructive' : 'text-primary'}`}>
                    {item.type}
                  </span>
                  <span>{item.date}</span>
                </div>
                <h4 className="text-lg font-bold text-card-foreground line-clamp-2">{item.title}</h4>
                <p className="text-sm text-muted-foreground mt-2 line-clamp-3">{item.content}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Culture & Traditions */}
      <section className="p-6 rounded-xl shadow-inner bg-muted/50">
        <h3 className="text-2xl font-bold mb-6 text-accent">Guide Culture & Traditions</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {traditions.map(t => (
            <div key={t.id} className="bg-card rounded-lg shadow-md overflow-hidden">
              <div className="h-32 w-full bg-muted flex items-center justify-center">
                <img src={cultureImage} alt={t.title} className="h-full w-full object-cover" />
              </div>
              <div className="p-4">
                <h4 className="font-bold text-card-foreground mb-1">{t.title}</h4>
                <p className="text-sm text-muted-foreground line-clamp-3">{t.content}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Actualites;
