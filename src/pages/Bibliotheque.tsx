import { useState, useMemo } from 'react';
import { useFetchData } from '@/hooks/useFetchData';
import { StatusView } from '@/components/StatusView';
import libraryImage from '@/assets/library-books.jpg';

const Bibliotheque = () => {
  const { data: livres, loading: loadingLivres, error: errorLivres } = useFetchData('livres');
  const { data: auteurs, loading: loadingAuteurs, error: errorAuteurs } = useFetchData('auteurs');
  const [selectedCategory, setSelectedCategory] = useState('Tous');

  const categories = useMemo(() => {
    const all = livres?.map(l => l.categorie) || [];
    return ['Tous', ...Array.from(new Set(all))];
  }, [livres]);

  const filteredLivres = useMemo(() => {
    if (selectedCategory === 'Tous') return livres;
    return livres?.filter(l => l.categorie === selectedCategory);
  }, [livres, selectedCategory]);

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-4xl font-extrabold mb-8 text-accent">Bibliothèque Virtuelle du Fouladou</h2>
      <StatusView loading={loadingLivres || loadingAuteurs} error={errorLivres || errorAuteurs} />

      {/* Filters */}
      <div className="mb-8">
        <h3 className="text-xl font-semibold mb-3">Filtrer par Thème :</h3>
        <div className="flex flex-wrap gap-2">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${
                selectedCategory === cat
                  ? 'bg-accent text-accent-foreground shadow-md'
                  : 'bg-card text-card-foreground border border-border hover:bg-muted'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Books Grid */}
      <section className="mb-12">
        <h3 className="text-2xl font-bold mb-6 text-foreground">
          Catalogue des Œuvres ({filteredLivres?.length || 0})
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6">
          {filteredLivres?.map(livre => (
            <div 
              key={livre.id} 
              className="bg-card rounded-lg shadow-md p-4 flex flex-col items-center text-center transition-shadow hover:shadow-xl"
            >
              <div className="w-full h-48 bg-muted rounded mb-3 shadow-lg flex items-center justify-center overflow-hidden">
                <img 
                  src={libraryImage} 
                  alt={`Couverture de ${livre.title}`} 
                  className="w-full h-full object-cover"
                />
              </div>
              <p className="font-bold text-card-foreground text-lg line-clamp-2">{livre.title}</p>
              <p className="text-sm text-muted-foreground italic">Par {livre.auteur}</p>
              <button
                className={`mt-3 w-full py-2 text-sm rounded-full font-bold transition-all duration-300 ${
                  livre.telecharger
                    ? 'bg-primary text-primary-foreground hover:opacity-90'
                    : 'bg-muted text-muted-foreground cursor-not-allowed'
                }`}
                disabled={!livre.telecharger}
                onClick={() => livre.telecharger && alert(`Début du téléchargement de : ${livre.title}`)}
              >
                {livre.telecharger ? 'Lire / Télécharger' : 'Lecture en ligne seule'}
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Authors Section */}
      <section className="p-6 md:p-10 rounded-xl bg-muted/50 shadow-inner">
        <h3 className="text-2xl font-bold mb-6 text-primary">
          Auteurs de Kolda (Auteur du mois : {auteurs?.[0]?.name})
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {auteurs?.map(auteur => (
            <div key={auteur.id} className="flex items-start bg-card p-4 rounded-lg shadow">
              <div className="w-20 h-20 bg-muted rounded-full mr-4 shadow-md flex items-center justify-center text-2xl font-bold text-muted-foreground">
                {auteur.name.split(' ').map(n => n[0]).join('')}
              </div>
              <div>
                <h4 className="text-xl font-bold text-card-foreground">{auteur.name}</h4>
                <p className="text-sm text-muted-foreground mb-2">Auteur/Historien</p>
                <p className="text-card-foreground text-sm line-clamp-3">{auteur.bio}</p>
                <p className="mt-2 text-xs font-semibold text-primary">
                  Œuvres principales : {livres?.filter(l => l.auteur === auteur.name).map(l => l.title).join(', ')}
                </p>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-6 text-center">
          <button className="inline-flex items-center bg-accent text-accent-foreground font-bold py-2 px-4 rounded-full shadow-md hover:opacity-90 transition-opacity">
            Proposer votre livre
          </button>
        </div>
      </section>
    </div>
  );
};

export default Bibliotheque;
