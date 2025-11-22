import { memo } from 'react';
import { useFetchData } from '@/hooks/useFetchData';
import { StatusView } from '@/components/StatusView';

const Partenaires = memo(() => {
  const { data: partners, loading, error } = useFetchData('partners');
  const categories = ['ONG', 'PME', 'PMI'];

  return (
    <div className="container mx-auto px-3 sm:px-4 lg:px-6 py-4 sm:py-6 lg:py-8">
      <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold mb-4 sm:mb-6 lg:mb-8 text-primary">
        Nos Partenaires
      </h2>
      <p className="text-sm sm:text-base text-muted-foreground mb-6 sm:mb-8">
        Ces organisations soutiennent la valorisation du patrimoine de Kolda.
      </p>
      <StatusView loading={loading} error={error} />

      {/* Premium Partners */}
      <section className="p-4 sm:p-6 mb-8 sm:mb-12 rounded-xl shadow-xl bg-muted/50">
        <h3 className="text-xl sm:text-2xl font-bold text-center mb-4 sm:mb-6 text-foreground">
          Partenaires Premium ⭐
        </h3>
        <div className="flex overflow-x-auto gap-3 sm:gap-4 lg:gap-6 pb-4 -mx-2 px-2 sm:mx-0 sm:px-0">
          {partners?.filter(p => p.isPremium).map(p => (
            <div 
              key={p.id} 
              className="min-w-[160px] sm:min-w-[180px] lg:min-w-[200px] bg-card p-3 sm:p-4 rounded-lg shadow-md border-b-4 border-accent flex-shrink-0"
            >
              <div className="h-8 sm:h-10 flex items-center justify-center mb-2 sm:mb-3">
                <img 
                  src={p.logo} 
                  alt={p.name} 
                  className="h-full object-contain"
                  loading="lazy"
                />
              </div>
              <p className="text-center font-bold text-card-foreground text-xs sm:text-sm truncate">{p.name}</p>
              <p className="text-center text-[10px] sm:text-xs text-muted-foreground mt-1 line-clamp-2">
                {p.description.substring(0, 50)}...
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Categories */}
      {categories.map(cat => (
        <section key={cat} className="mb-6 sm:mb-8 lg:mb-10">
          <h3 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 border-l-4 border-accent pl-2 sm:pl-3">
            {cat} ({partners?.filter(p => p.category === cat).length})
          </h3>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
            {partners?.filter(p => p.category === cat).map(p => (
              <div key={p.id} className="flex items-center bg-card p-3 sm:p-4 rounded-lg shadow">
                <img 
                  src={p.logo} 
                  alt={p.name} 
                  className="w-12 h-12 sm:w-16 sm:h-16 object-contain rounded mr-3 sm:mr-4 flex-shrink-0"
                  loading="lazy"
                />
                <div className="min-w-0 flex-1">
                  <h4 className="text-base sm:text-lg font-bold text-card-foreground truncate">{p.name}</h4>
                  <p className="text-xs sm:text-sm text-muted-foreground line-clamp-2">{p.description}</p>
                  <p className="text-[10px] sm:text-xs text-primary mt-1 truncate">Contact: {p.contact}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      ))}

      <div className="text-center mt-8 sm:mt-12">
        <h3 className="text-xl sm:text-2xl font-bold text-foreground mb-3 sm:mb-4">Soutenez le Patrimoine</h3>
        <button className="inline-flex items-center bg-accent text-accent-foreground font-bold py-2 sm:py-3 px-4 sm:px-6 rounded-full shadow-lg hover:opacity-90 transition-opacity text-sm sm:text-base">
          Devenir Partenaire Officiel
        </button>
      </div>
    </div>
  );
});

Partenaires.displayName = 'Partenaires';

export default Partenaires;
