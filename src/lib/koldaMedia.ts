const localImage = (fileName: string) => `/images/${encodeURIComponent(fileName)}`;

export const koldaGalleryPhotos = [
  { id: 'mosquee', title: 'Grande Mosquée de Kolda', category: 'Sites Historiques', description: 'Grande Mosquée blanche de la ville', src: localImage('mosquee-kolda.jpg'), icon: 'landmark' },
  { id: 'carrefour', title: 'Carrefour urbain de Kolda', category: 'Sites Historiques', description: 'Rond-point principal et centre-ville', src: localImage('carrefour-kolda.jpg'), icon: 'landmark' },
  { id: 'vie-locale', title: 'La vie dans les rues de Kolda', category: 'Culture & Traditions', description: 'Scène de vie quotidienne dans les artères de Kolda', src: localImage('vie-locale.jpg'), icon: 'culture' },
  { id: 'pont', title: 'Vue aérienne du pont et du fleuve', category: 'Paysages', description: 'Vue panoramique du pont traversant Kolda', src: localImage('hero-kolda-aeriene.jpg'), icon: 'landscape' },
  { id: 'auberge', title: 'Auberge & Rue principale', category: 'Hébergements', description: 'Avenue principale menant aux hébergements', src: localImage('auberge-rue.jpg'), icon: 'lodging' },
  { id: 'carte', title: 'Carte du Fouladou', category: 'Paysages', description: 'Découpage géographique de la région de Kolda', src: localImage('carte-fouladou.png'), icon: 'landscape' },
] as const;

export const koldaMedia = {
  gallery: koldaGalleryPhotos,
  hero: koldaGalleryPhotos[3].src,
  mosque: koldaGalleryPhotos[0].src,
  crossroads: koldaGalleryPhotos[1].src,
  cultureStreet: koldaGalleryPhotos[2].src,
  aerialBridge: koldaGalleryPhotos[3].src,
  accommodationStreet: koldaGalleryPhotos[4].src,
  regionalMap: koldaGalleryPhotos[5].src,
};