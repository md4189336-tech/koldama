import { useState } from 'react';
import { easfBooks } from '@/lib/easfBooks';

const collections = ["Tous", "Arc-en-Ciel", "Hiéroglyphes", "Agora", "Kurukanfuga", "Naange"];

export const EasfCatalogue = () => {
  const [selected, setSelected] = useState("Tous");
  const books = selected === "Tous" ? easfBooks : easfBooks.filter(b => b.collection === selected);
  return (
    <section className="mb-8 sm:mb-12">
      <div className="text-center mb-6">
        <h3 className="text-xl sm:text-2xl font-bold text-foreground mb-1">Éditions Aminata Sow Fall</h3>
        <p className="text-sm text-muted-foreground">Ouvrages du catalogue officiel EASF 2026</p>
      </div>
      <div className="flex flex-wrap justify-center gap-2 mb-6">
        {collections.map(col => (
          <button key={col} onClick={() => setSelected(col)}
            className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-semibold transition-colors ${selected === col ? 'bg-primary text-primary-foreground shadow-md' : 'bg-card text-card-foreground border border-border hover:bg-muted'}`}>
            {col}
          </button>
        ))}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {books.map(book => (
          <article key={book.id} className="bg-card rounded-xl shadow-md border border-border flex flex-col justify-between overflow-hidden hover:shadow-lg transition-shadow">
            <div className="p-5">
              <div className="flex justify-between items-start gap-2 mb-3">
                <span className="bg-primary/10 text-primary text-xs font-semibold px-2.5 py-1 rounded-full">{book.collection}</span>
                <span className="text-accent font-bold text-sm whitespace-nowrap">{book.price}</span>
              </div>
              <h4 className="text-lg font-bold text-card-foreground mb-1">{book.title}</h4>
              <p className="text-sm text-muted-foreground mb-3">Par {book.author}</p>
              <p className="text-sm text-card-foreground">{book.description}</p>
            </div>
            <div className="px-5 py-3 bg-muted/50 border-t border-border flex justify-between gap-2 text-xs text-muted-foreground">
              <span>{book.pages} pages</span>
              <span className="truncate">ISBN : {book.isbn}</span>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};
