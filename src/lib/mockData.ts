import { koldaMedia } from '@/lib/koldaMedia';

export const mockData = {
  livres: [
    { 
      id: 1, 
      title: "L'Arbre de Moussamolo", 
      auteur: "Fatou Diatta", 
      categorie: "Histoire", 
      summary: "Récit des origines et de la fondation de Kolda.", 
      telecharger: true 
    },
    { 
      id: 2, 
      title: "Contes du Fouladou", 
      auteur: "Mamadou Ba", 
      categorie: "Contes", 
      summary: "Collection de légendes Peulh et Mandingues.", 
      telecharger: true 
    },
    { 
      id: 3, 
      title: "La Gastronomie Koldoise", 
      auteur: "Aïsha Tall", 
      categorie: "Recherches", 
      summary: "Étude sur les plats typiques du Sénégal oriental.", 
      telecharger: false 
    },
    { 
      id: 4, 
      title: "Traditions Peulh", 
      auteur: "Fatou Diatta", 
      categorie: "Culture", 
      summary: "Exploration des rites et coutumes pastorales.", 
      telecharger: true 
    },
    { 
      id: 5, 
      title: "Histoire du Fouladou", 
      auteur: "Mamadou Ba", 
      categorie: "Histoire", 
      summary: "Chroniques des royaumes précoloniaux.", 
      telecharger: true 
    },
    { 
      id: 6, 
      title: "Un Souvenir de Solférino", 
      auteur: "Henry Dunant", 
      categorie: "Histoire", 
      summary: "Récit fondateur de la Croix-Rouge sur la bataille de Solférino (1859).", 
      telecharger: true,
      pdfUrl: "/books/souvenir-solferino.pdf"
    },
  ],
  auteurs: [
    { 
      id: 101, 
      name: "Fatou Diatta", 
      bio: "Historienne locale spécialisée dans les traditions de Basse-Casamance. Ses œuvres préservent la mémoire orale et les récits ancestraux de la région.", 
    },
    { 
      id: 102, 
      name: "Mamadou Ba", 
      bio: "Poète et conteur, il s'efforce de numériser les contes ancestraux du Fouladou pour les générations futures.", 
    },
    { 
      id: 103, 
      name: "Aïsha Tall", 
      bio: "Chercheuse en anthropologie culturelle, elle documente les traditions culinaires et artisanales de Kolda.", 
    },
    { 
      id: 104, 
      name: "Henry Dunant", 
      bio: "Fondateur de la Croix-Rouge et prix Nobel de la paix (1901). Son récit 'Un Souvenir de Solférino' a inspiré la création du mouvement humanitaire international.", 
    },
  ],
  sites: [
    { 
      id: 201, 
      name: "Arbre de Moussamolo", 
      description: "Lieu sacré, symbole d'unité et de résistance. Point de ralliement historique où se tenaient les grandes assemblées des chefs traditionnels.", 
      role: "Sacré", 
      lat: 12.87, 
      lng: -14.95 
    },
    { 
      id: 202, 
      name: "Ancienne Chefferie de Dabo", 
      description: "Vestiges d'un ancien royaume, témoignage de l'organisation sociale précoloniale et de la richesse culturelle de la région.", 
      role: "Historique", 
      lat: 12.91, 
      lng: -14.88 
    },
    { 
      id: 203, 
      name: "Grande Mosquée de Kolda", 
      description: "Lieu de culte emblématique de Kolda, reconnaissable à son dôme vert et à son minaret.", 
      role: "Religieux", 
      lat: 12.8833, 
      lng: -14.95,
      image: koldaMedia.mosque
    },
    {
      id: 204,
      name: "Carrefour urbain de Kolda",
      description: "Repère du centre urbain de Kolda et de ses échanges quotidiens.",
      role: "Patrimoine urbain",
      lat: 12.884,
      lng: -14.94,
      image: koldaMedia.crossroads
    },
  ],
  hotels: [],
  partners: [
    { 
      id: 401, 
      name: "Fondation Culturelle Fouladou", 
      category: "ONG", 
      isPremium: true, 
      contact: "fondation@email.org", 
      description: "Soutien aux initiatives éducatives et culturelles dans la région de Kolda."
    },
    { 
      id: 402, 
      name: "Agri Kolda SARL", 
      category: "PME", 
      isPremium: false, 
      contact: "agri@email.org", 
      description: "Entreprise agricole promouvant les cultures locales et l'autonomie alimentaire."
    },
    { 
      id: 403, 
      name: "Tech Services Sénégal", 
      category: "PMI", 
      isPremium: true, 
      contact: "tech@email.org", 
      description: "Solutions numériques et services d'archivage pour la préservation culturelle."
    },
    { 
      id: 404, 
      name: "Association des Griots", 
      category: "ONG", 
      isPremium: false, 
      contact: "griots@email.org", 
      description: "Préservation et transmission des traditions orales du Fouladou."
    },
  ],
  actualites: [
    { 
      id: 501, 
      title: "Fête des récoltes à Dabo : Célébration traditionnelle", 
      type: "Article", 
      date: "15 Nov 2024", 
      content: "Un événement vibrant marquant la fin de la saison agricole, rassemblant les communautés autour des danses et chants traditionnels." 
    },
    { 
      id: 502, 
      title: "Danses traditionnelles Peulh en vidéo", 
      type: "Vidéo", 
      date: "10 Nov 2024", 
      content: "Performance captivante d'un groupe de danse local préservant les chorégraphies ancestrales." 
    },
    { 
      id: 503, 
      title: "Nouveau livre : Mémoires du Fouladou", 
      type: "Article", 
      date: "5 Nov 2024", 
      content: "Publication d'un ouvrage collectif retraçant l'histoire orale de la région à travers témoignages." 
    },
  ],
};
