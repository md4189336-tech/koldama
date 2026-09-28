import { useState, useMemo, memo } from 'react';
import { KoldaImage } from '@/components/KoldaImage';
import { useFetchData } from '@/hooks/useFetchData';
import { StatusView } from '@/components/StatusView';
import libraryImage from '@/assets/library-books.jpg';

const Bibliotheque = memo(() => {
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
    <div className="container mx-auto px-3 sm:px-4 lg:px-6 py-4 sm:py-6 lg:py-8">
      <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold mb-4 sm:mb-6 lg:mb-8 text-accent">
        Bibliothèque Virtuelle du Fouladou
      </h2>
      <StatusView loading={loadingLivres || loadingAuteurs} error={errorLivres || errorAuteurs} />

      {/* Filters */}
      <div className="mb-6 sm:mb-8">
        <h3 className="text-lg sm:text-xl font-semibold mb-3">Filtrer par Thème :</h3>
        <div className="flex flex-wrap gap-2">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-semibold transition-all duration-300 ${
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
      <section className="mb-8 sm:mb-12">
        <h3 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-foreground">
          Catalogue des Œuvres ({filteredLivres?.length || 0})
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4 lg:gap-6">
          {filteredLivres?.map(livre => (
            <div 
              key={livre.id} 
              className="bg-card rounded-lg shadow-md p-3 sm:p-4 flex flex-col items-center text-center transition-shadow hover:shadow-xl"
            >
              <div className="w-full aspect-[2/3] bg-muted rounded mb-2 sm:mb-3 shadow-lg flex items-center justify-center overflow-hidden">
                <KoldaImage
                  src={libraryImage} 
                  alt={`Couverture de ${livre.title}`} 
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
              <p className="font-bold text-card-foreground text-sm sm:text-base lg:text-lg line-clamp-2 mb-1">
                {livre.title}
              </p>
              <p className="text-xs sm:text-sm text-muted-foreground italic mb-2 truncate w-full">
                Par {livre.auteur}
              </p>
              <button
                className={`mt-auto w-full py-1.5 sm:py-2 text-xs sm:text-sm rounded-full font-bold transition-all duration-300 ${
                  livre.telecharger
                    ? 'bg-primary text-primary-foreground hover:opacity-90'
                    : 'bg-muted text-muted-foreground cursor-not-allowed'
                }`}
                disabled={!livre.telecharger}
                onClick={() => {
                  if (livre.telecharger && (livre as any).pdfUrl) {
                    window.open((livre as any).pdfUrl, '_blank');
                  } else if (livre.telecharger) {
                    alert(`Livre disponible : ${livre.title}`);
                  }
                }}
              >
                {livre.telecharger ? 'Lire' : 'En ligne'}
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Authors Section */}
      <section className="p-4 sm:p-6 lg:p-10 rounded-xl bg-muted/50 shadow-inner">
        <h3 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-primary">
          Auteurs de Kolda
          <span className="block sm:inline text-sm sm:text-base font-normal text-muted-foreground mt-1 sm:mt-0 sm:ml-2">
            (Auteur du mois : {auteurs?.[0]?.name})
          </span>
        </h3>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
          {auteurs?.map(auteur => (
            <div key={auteur.id} className="flex items-start bg-card p-3 sm:p-4 rounded-lg shadow">
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-muted rounded-full mr-3 sm:mr-4 shadow-md flex items-center justify-center text-lg sm:text-2xl font-bold text-muted-foreground flex-shrink-0">
                {auteur.name.split(' ').map(n => n[0]).join('')}
              </div>
              <div className="min-w-0 flex-1">
                <h4 className="text-lg sm:text-xl font-bold text-card-foreground truncate">{auteur.name}</h4>
                <p className="text-xs sm:text-sm text-muted-foreground mb-2">Auteur/Historien</p>
                <p className="text-xs sm:text-sm text-card-foreground line-clamp-3">{auteur.bio}</p>
                <p className="mt-2 text-[10px] sm:text-xs font-semibold text-primary line-clamp-2">
                  Œuvres : {livres?.filter(l => l.auteur === auteur.name).map(l => l.title).join(', ')}
                </p>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-4 sm:mt-6 text-center">
          <button className="inline-flex items-center bg-accent text-accent-foreground font-bold py-2 px-4 sm:py-2.5 sm:px-5 rounded-full shadow-md hover:opacity-90 transition-opacity text-sm sm:text-base">
            Proposer votre livre
          </button>
        </div>
      </section>
    </div>
  );
});

Bibliotheque.displayName = 'Bibliotheque';

export default Bibliotheque;
