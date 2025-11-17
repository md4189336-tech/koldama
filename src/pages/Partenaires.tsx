import { useFetchData } from '@/hooks/useFetchData';
import { StatusView } from '@/components/StatusView';

const Partenaires = () => {
  const { data: partners, loading, error } = useFetchData('partners');
  const categories = ['ONG', 'PME', 'PMI'];

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-4xl font-extrabold mb-8 text-primary">Nos Partenaires</h2>
      <p className="text-muted-foreground mb-8">
        Ces organisations soutiennent la valorisation du patrimoine de Kolda.
      </p>
      <StatusView loading={loading} error={error} />

      {/* Premium Partners */}
      <section className="p-6 mb-12 rounded-xl shadow-xl bg-muted/50">
        <h3 className="text-2xl font-bold text-center mb-6 text-foreground">Partenaires Premium ⭐</h3>
        <div className="flex overflow-x-auto gap-6 pb-4">
          {partners?.filter(p => p.isPremium).map(p => (
            <div 
              key={p.id} 
              className="min-w-[200px] bg-card p-4 rounded-lg shadow-md border-b-4 border-accent"
            >
              <div className="h-10 flex items-center justify-center mb-3">
                <div className="text-xs font-bold text-muted-foreground">{p.name}</div>
              </div>
              <p className="text-center font-bold text-card-foreground">{p.name}</p>
              <p className="text-center text-xs text-muted-foreground mt-1">
                {p.description.substring(0, 50)}...
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Categories */}
      {categories.map(cat => (
        <section key={cat} className="mb-10">
          <h3 className="text-2xl font-bold mb-4 border-l-4 border-accent pl-3">
            {cat} ({partners?.filter(p => p.category === cat).length})
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {partners?.filter(p => p.category === cat).map(p => (
              <div key={p.id} className="flex items-center bg-card p-4 rounded-lg shadow">
                <div className="w-16 h-16 bg-muted rounded flex items-center justify-center mr-4 text-xs font-bold text-muted-foreground">
                  Logo
                </div>
                <div>
                  <h4 className="text-lg font-bold text-card-foreground">{p.name}</h4>
                  <p className="text-sm text-muted-foreground line-clamp-2">{p.description}</p>
                  <p className="text-xs text-primary mt-1">Contact: {p.contact}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      ))}

      <div className="text-center mt-12">
        <h3 className="text-2xl font-bold text-foreground mb-4">Soutenez le Patrimoine</h3>
        <button className="inline-flex items-center bg-accent text-accent-foreground font-bold py-3 px-6 rounded-full shadow-lg hover:opacity-90 transition-opacity">
          Devenir Partenaire Officiel
        </button>
      </div>
    </div>
  );
};

export default Partenaires;
