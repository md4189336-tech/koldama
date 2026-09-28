import { useEffect, useState } from 'react';
import { ArrowLeft, ArrowRight, Building2, Landmark, Map, Users, X } from 'lucide-react';
import { KoldaImage } from '@/components/KoldaImage';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from '@/components/ui/dialog';
import { koldaGalleryPhotos } from '@/lib/koldaMedia';

const categories = [
  'Tous',
  'Sites Historiques',
  'Culture & Traditions',
  'Paysages',
  'Hébergements',
] as const;

type GalleryCategory = typeof categories[number];

const photos = koldaGalleryPhotos;
const fallbackIcons = { landmark: Landmark, culture: Users, landscape: Map, lodging: Building2 };

const Galerie = () => {
  const [activeCategory, setActiveCategory] = useState<GalleryCategory>('Tous');
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const visiblePhotos = activeCategory === 'Tous'
    ? photos
    : photos.filter(photo => photo.category === activeCategory);
  const selectedPhoto = selectedIndex === null ? null : visiblePhotos[selectedIndex];

  useEffect(() => {
    if (selectedIndex === null || visiblePhotos.length < 2) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'ArrowLeft') {
        setSelectedIndex(index => index === null ? null : (index - 1 + visiblePhotos.length) % visiblePhotos.length);
      }
      if (event.key === 'ArrowRight') {
        setSelectedIndex(index => index === null ? null : (index + 1) % visiblePhotos.length);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedIndex, visiblePhotos.length]);

  const moveSelection = (direction: -1 | 1) => {
    setSelectedIndex(index => index === null ? null : (index + direction + visiblePhotos.length) % visiblePhotos.length);
  };

  return (
    <main className="container mx-auto px-3 py-8 sm:px-4 lg:px-6 lg:py-12">
      <header className="mb-6 border-b border-border pb-5 sm:mb-8">
        <p className="text-xs font-semibold uppercase text-accent">Kolda · Fouladou</p>
        <h1 className="mt-2 text-2xl font-extrabold text-foreground sm:text-3xl lg:text-4xl">Galerie du Patrimoine</h1>
        <p className="mt-2 max-w-2xl text-sm text-muted-foreground sm:text-base">
          Lieux, paysages et scènes de vie qui racontent le Fouladou.
        </p>
      </header>

      <div className="mb-6 flex flex-wrap gap-2" aria-label="Filtrer les photos par catégorie">
        {categories.map(category => (
          <button
            key={category}
            type="button"
            aria-pressed={activeCategory === category}
            onClick={() => {
              setActiveCategory(category);
              setSelectedIndex(null);
            }}
            className={`rounded-md border px-3 py-2 text-sm font-medium transition-colors ${activeCategory === category
              ? 'border-primary bg-primary text-primary-foreground'
              : 'border-border bg-card text-card-foreground hover:bg-muted'
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      <section className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 lg:grid-cols-4" aria-label="Photos du patrimoine de Kolda">
        {visiblePhotos.map((item, index) => (
          <button
            key={item.id}
            type="button"
            onClick={() => setSelectedIndex(index)}
            aria-label={`Agrandir : ${item.title}`}
            className="group overflow-hidden rounded-md border border-border bg-card text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
          >
            <div className="aspect-[4/3] overflow-hidden bg-gradient-to-br from-emerald-950 via-stone-900 to-amber-950">
              <KoldaImage
                src={item.src}
                alt={item.title}
                fallbackIcon={fallbackIcons[item.icon]}
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
            </div>
            <div className="p-3">
              <h2 className="truncate text-sm font-semibold text-card-foreground">{item.title}</h2>
              <p className="mt-1 text-xs text-muted-foreground">{item.category}</p>
              <p className="mt-1 line-clamp-2 text-xs text-muted-foreground">{item.description}</p>
            </div>
          </button>
        ))}
      </section>

      <Dialog open={selectedPhoto !== null} onOpenChange={open => { if (!open) setSelectedIndex(null); }}>
        {selectedPhoto && (
          <DialogContent className="w-[calc(100vw-1.5rem)] max-w-5xl border-border bg-black p-3 text-white sm:p-5">
            <DialogTitle className="pr-10 text-left text-base text-white sm:text-lg">{selectedPhoto.title}</DialogTitle>
            <DialogDescription className="-mt-3 text-left text-white/70">{selectedPhoto.category} · {selectedPhoto.description}</DialogDescription>
            <div className="relative flex min-h-48 items-center justify-center overflow-hidden bg-gradient-to-br from-emerald-950 via-stone-900 to-amber-950 sm:min-h-96">
              <KoldaImage
                src={selectedPhoto.src}
                alt={selectedPhoto.title}
                fallbackIcon={fallbackIcons[selectedPhoto.icon]}
                className="max-h-[70vh] w-full object-contain"
              />
              {visiblePhotos.length > 1 && (
                <>
                  <button type="button" onClick={() => moveSelection(-1)} aria-label="Photo précédente" className="absolute left-2 inline-flex h-10 w-10 items-center justify-center rounded-full bg-black/65 text-white hover:bg-black/85">
                    <ArrowLeft className="h-5 w-5" />
                  </button>
                  <button type="button" onClick={() => moveSelection(1)} aria-label="Photo suivante" className="absolute right-2 inline-flex h-10 w-10 items-center justify-center rounded-full bg-black/65 text-white hover:bg-black/85">
                    <ArrowRight className="h-5 w-5" />
                  </button>
                </>
              )}
            </div>
            <div className="flex items-center justify-between gap-3">
              <p className="text-sm text-white/70">{selectedIndex! + 1} / {visiblePhotos.length}</p>
              <button type="button" onClick={() => setSelectedIndex(null)} className="inline-flex items-center gap-2 rounded-md border border-white/30 px-3 py-2 text-sm font-medium text-white hover:bg-white/10">
                <X className="h-4 w-4" /> Fermer
              </button>
            </div>
          </DialogContent>
        )}
      </Dialog>
    </main>
  );
};

export default Galerie;