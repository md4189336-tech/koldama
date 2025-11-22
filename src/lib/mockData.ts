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
      name: "Mosquée Historique de Médina Gounass", 
      description: "Centre spirituel et lieu de pèlerinage, architecture traditionnelle remarquable datant du XIXe siècle.", 
      role: "Religieux", 
      lat: 12.85, 
      lng: -14.92 
    },
  ],
  hotels: [
    { 
      id: 301, 
      name: "Hôtel Kolda Oasis", 
      services: ["Piscine", "Climatisation", "Wifi", "Restaurant"], 
      whatsapp: "77 123 45 67", 
      description: "Hôtel moderne au cœur de Kolda, offrant confort et services de qualité." 
    },
    { 
      id: 302, 
      name: "Résidence du Fouladou", 
      services: ["Restaurant", "Parking sécurisé", "Wifi"], 
      whatsapp: "70 987 65 43", 
      description: "Ambiance chaleureuse et authentique dans un cadre verdoyant." 
    },
    { 
      id: 303, 
      name: "Auberge Tradition", 
      services: ["Climatisation", "Petit-déjeuner inclus"], 
      whatsapp: "76 555 44 33", 
      description: "Hébergement économique avec accueil familial." 
    },
  ],
  partners: [
    { 
      id: 401, 
      name: "Fondation Culturelle Fouladou", 
      category: "ONG", 
      isPremium: true, 
      contact: "fondation@email.org", 
      description: "Soutien aux initiatives éducatives et culturelles dans la région de Kolda.",
      logo: "https://placehold.co/100x50/50c878/ffffff?text=ONG+1"
    },
    { 
      id: 402, 
      name: "Agri Kolda SARL", 
      category: "PME", 
      isPremium: false, 
      contact: "agri@email.org", 
      description: "Entreprise agricole promouvant les cultures locales et l'autonomie alimentaire.",
      logo: "https://placehold.co/100x50/a52a2a/ffffff?text=PME+1"
    },
    { 
      id: 403, 
      name: "Tech Services Sénégal", 
      category: "PMI", 
      isPremium: true, 
      contact: "tech@email.org", 
      description: "Solutions numériques et services d'archivage pour la préservation culturelle.",
      logo: "https://placehold.co/100x50/8b4513/ffffff?text=PMI+1"
    },
    { 
      id: 404, 
      name: "Association des Griots", 
      category: "ONG", 
      isPremium: false, 
      contact: "griots@email.org", 
      description: "Préservation et transmission des traditions orales du Fouladou.",
      logo: "https://placehold.co/100x50/50c878/ffffff?text=ONG+2"
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
