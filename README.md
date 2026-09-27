# Kolda Explorer

import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { ChevronRight, BookOpen, Map, Home, Briefcase, Users, MessageSquare, Menu, X, Globe, DollarSign, Calendar, Zap, Smartphone } from 'lucide-react';

// --- CONFIGURATION & DONNÉES SIMULÉES (MOCK DATA) ---

// Couleurs basées sur le thème culturel africain moderne
const COLORS = {
  primary: 'bg-emerald-700', // Vert foncé
  accent: 'bg-amber-600',    // Ocre / Terre
  text: 'text-stone-800',
  softBg: 'bg-stone-50',
};

// Structure de données simulées pour la connexion future à Supabase
const mockData = {
  // Données pour la Bibliothèque
  livres: [
    { id: 1, title: "L'Arbre de Moussamolo", auteur: "Fatou Diatta", categorie: "Histoire", couverture: "https://placehold.co/100x150/50c878/ffffff?text=Livre+1", summary: "Récit des origines et de la fondation de Kolda.", telecharger: true },
    { id: 2, title: "Contes du Fouladou", auteur: "Mamadou Ba", categorie: "Contes", couverture: "https://placehold.co/100x150/a52a2a/ffffff?text=Livre+2", summary: "Collection de légendes Peulh et Mandingues.", telecharger: true },
    { id: 3, title: "La Gastronomie Koldoise", auteur: "Aïsha Tall", categorie: "Recherches", couverture: "https://placehold.co/100x150/8b4513/ffffff?text=Livre+3", summary: "Étude sur les plats typiques du Sénégal oriental.", telecharger: false },
  ],
  auteurs: [
    { id: 101, name: "Fatou Diatta", bio: "Historienne locale spécialisée dans les traditions de Basse-Casamance. Ses œuvres préservent la mémoire orale.", photo: "https://placehold.co/150x150/50c878/ffffff?text=F.D" },
    { id: 102, name: "Mamadou Ba", bio: "Poète et conteur, il s'efforce de numériser les contes ancestraux du Fouladou.", photo: "https://placehold.co/150x150/a52a2a/ffffff?text=M.B" },
  ],
  // Données pour les Sites Historiques
  sites: [
    { id: 201, name: "Arbre de Moussamolo", description: "Lieu sacré, symbole d'unité et de résistance. Point de ralliement historique.", role: "Sacré", image: "https://placehold.co/600x400/8b4513/ffffff?text=Arbre+Sacré", lat: 12.87, lng: -14.95 },
    { id: 202, name: "Ancienne Chefferie de Dabo", description: "Vestiges d'un ancien royaume, témoignage de l'organisation sociale précoloniale.", role: "Historique", image: "https://placehold.co/600x400/50c878/ffffff?text=Chefferie+Dabo", lat: 12.91, lng: -14.88 },
  ],
  // Données pour les Hôtels
  hotels: [
    { id: 301, name: "Hôtel Kolda Oasis", services: ["Piscine", "Climatisation", "Wifi"], whatsapp: "77 123 45 67", image: "https://placehold.co/400x300/a52a2a/ffffff?text=Hotel+Oasis" },
    { id: 302, name: "Résidence du Fouladou", services: ["Restaurant", "Parking sécurisé"], whatsapp: "70 987 65 43", image: "https://placehold.co/400x300/8b4513/ffffff?text=Residence+Fouladou" },
  ],
  // Données pour les Partenaires
  partners: [
    { id: 401, name: "Fondation Culturelle", category: "ONG", logo: "https://placehold.co/100x50/50c878/ffffff?text=ONG+1", isPremium: true, contact: "fondation@email.org", description: "Soutien aux initiatives éducatives et culturelles." },
    { id: 402, name: "Agri Kolda SARL", category: "PME", logo: "https://placehold.co/100x50/a52a2a/ffffff?text=PME+1", isPremium: false, contact: "agri@email.org", description: "Entreprise agricole promouvant les cultures locales." },
    { id: 403, name: "Tech Services", category: "PMI", logo: "https://placehold.co/100x50/8b4513/ffffff?text=PMI+1", isPremium: true, contact: "tech@email.org", description: "Services numériques et solutions d'archivage." },
  ],
  // Données pour Actualités
  actualites: [
    { id: 501, title: "Rapport sur la Fête des récoltes à Dabo", type: "Article", date: "15 Nov 2024", content: "Un événement vibrant marquant la fin de la saison agricole...", image: "https://placehold.co/800x450/50c878/ffffff?text=Fete+Recoltes" },
    { id: 502, title: "Vidéo : Danses traditionnelles Peulh", type: "Vidéo", date: "10 Nov 2024", content: "Performance captivante d'un groupe de danse local.", image: "https://placehold.co/800x450/a52a2a/ffffff?text=Danses" },
  ],
};

// --- SIMULATION D'APPELS API (Supabase) ---

// Fonction générique pour simuler un appel de données
const useFetchData = (dataType) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Dans une vraie app React/Supabase, on ferait ici :
    // supabase.from(dataType).select('*').then(...)
    const fetchData = () => {
      try {
        setLoading(true);
        // Simulation d'une latence réseau
        setTimeout(() => {
          setData(mockData[dataType]);
          setLoading(false);
        }, 500);
      } catch (err) {
        console.error("Erreur de chargement des données", err);
        setError("Impossible de charger les données. Vérifiez la connexion Supabase.");
        setLoading(false);
      }
    };
    fetchData();
  }, [dataType]);

  return { data, loading, error };
};


// --- COMPOSANTS DE L'APPLICATION ---

// 1. Navigation
const NavBar = ({ currentPage, setPage }) => {
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    { id: 'Accueil', label: 'Accueil', icon: Home },
    { id: 'Culture', label: 'Culture', icon: Globe },
    { id: 'Bibliothèque', label: 'Bibliothèque', icon: BookOpen },
    { id: 'Sites', label: 'Sites Historiques', icon: Map },
    { id: 'Hôtels', label: 'Hôtels', icon: DollarSign },
    { id: 'Partenaires', label: 'Partenaires', icon: Briefcase },
    { id: 'Actualités', label: 'Actualités', icon: Calendar },
    { id: 'Contact', label: 'Contact', icon: MessageSquare },
  ];

  const NavItem = ({ item }) => (
    <button
      onClick={() => {
        setPage(item.id);
        setIsOpen(false);
      }}
      className={`px-3 py-2 text-sm font-medium transition duration-300 rounded-md
        ${currentPage === item.id
          ? `${COLORS.accent} text-white shadow-md`
          : `text-stone-700 hover:text-white hover:${COLORS.primary}`
        }`}
    >
      <item.icon className="inline w-4 h-4 mr-2 md:hidden" />
      {item.label}
    </button>
  );

  return (
    <nav className={`sticky top-0 z-50 shadow-lg ${COLORS.softBg}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo/Title */}
          <div className="flex-shrink-0 flex items-center">
            <h1 className={`text-xl font-extrabold ${COLORS.text} flex items-center`}>
              <Zap className={`w-6 h-6 mr-2 text-amber-600`} />
              Kolda Heritage
            </h1>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex md:space-x-4 items-center">
            {menuItems.map((item) => (
              <NavItem key={item.id} item={item} />
            ))}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`inline-flex items-center justify-center p-2 rounded-md ${COLORS.text} hover:text-white hover:${COLORS.accent} focus:outline-none`}
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Panel */}
      {isOpen && (
        <div className="md:hidden px-2 pt-2 pb-3 space-y-1 sm:px-3 absolute w-full bg-white shadow-xl">
          {menuItems.map((item) => (
            <NavItem key={item.id} item={item} />
          ))}
        </div>
      )}
    </nav>
  );
};


// 2. Composant de chargement/erreur
const StatusView = ({ loading, error }) => (
  <div className="p-8 text-center min-h-60 flex flex-col justify-center items-center">
    {loading && (
      <div className="text-xl font-semibold text-gray-500">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-700 mb-4 mx-auto"></div>
        Chargement des données...
      </div>
    )}
    {error && (
      <div className="text-red-600 border border-red-300 bg-red-50 p-4 rounded-lg">
        <p className="font-bold">Erreur :</p>
        <p>{error}</p>
      </div>
    )}
  </div>
);

// 3. Bouton WhatsApp réutilisable
const WhatsAppButton = ({ number }) => (
  <a
    href={`https://wa.me/${number.replace(/\s/g, '')}`}
    target="_blank"
    rel="noopener noreferrer"
    className={`flex items-center justify-center ${COLORS.primary} text-white font-bold py-2 px-4 rounded-full shadow-lg hover:opacity-90 transition duration-300 mt-3`}
  >
    <Smartphone className="w-5 h-5 mr-2" />
    Contacter via WhatsApp
  </a>
);

// --- PAGES DE L'APPLICATION ---

// PAGE 1 : ACCUEIL
const HomePage = ({ setPage }) => {
  const { data: sitesData } = useFetchData('sites');
  const { data: livresData } = useFetchData('livres');
  const { data: partnersData } = useFetchData('partners');

  // Section CTA
  const CtaSection = ({ title, icon: Icon, description, targetPage }) => (
    <div className={`p-6 ${COLORS.softBg} rounded-xl shadow-lg hover:shadow-xl transition duration-300 border-b-4 border-amber-600`}>
      <div className="flex items-center mb-3">
        <Icon className={`w-8 h-8 text-amber-600 mr-3`} />
        <h3 className="text-xl font-bold text-stone-700">{title}</h3>
      </div>
      <p className="text-stone-600 mb-4">{description}</p>
      <button
        onClick={() => setPage(targetPage)}
        className={`text-sm font-semibold text-emerald-700 hover:text-amber-600 flex items-center`}
      >
        Explorer <ChevronRight className="w-4 h-4 ml-1" />
      </button>
    </div>
  );

  return (
    <div className="space-y-12">
      {/* Grand Bandeau d'Entrée */}
      <header className={`relative h-64 md:h-96 ${COLORS.primary} flex items-center justify-center text-center shadow-2xl overflow-hidden rounded-b-3xl`}>
        <div className="absolute inset-0 bg-black opacity-30"></div>
        <div className="relative p-4 max-w-4xl">
          <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-4 leading-tight">
            Découvrez l’âme culturelle de Kolda
          </h2>
          <p className="text-lg text-gray-200 font-medium">
            À travers une plateforme moderne et accessible.
          </p>
        </div>
      </header>

      {/* Section CTA Principale */}
      <section className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
        <CtaSection
          title="Bibliothèque Virtuelle"
          icon={BookOpen}
          description="Accédez aux livres, contes et recherches des auteurs du Fouladou."
          targetPage="Bibliothèque"
        />
        <CtaSection
          title="Sites Historiques"
          icon={Map}
          description="Localisez les monuments, lieux sacrés et chefferies de la région."
          targetPage="Sites"
        />
        <CtaSection
          title="Actualités & Traditions"
          icon={Globe}
          description="Plongez au cœur des traditions, danses et histoires de Kolda."
          targetPage="Actualités"
        />
      </section>

      {/* Mise en avant : Site Historique du Jour (Arbre de Moussamolo) */}
      <section className="container mx-auto px-4">
        <h2 className={`text-3xl font-bold mb-6 ${COLORS.text}`}>Site Historique du Jour</h2>
        <div className="md:flex bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="md:flex-shrink-0">
            <img className="h-48 w-full object-cover md:w-56" src={sitesData?.[0]?.image || "https://placehold.co/224x192/8b4513/ffffff?text=Image"} alt="Arbre de Moussamolo" />
          </div>
          <div className="p-8">
            <div className={`uppercase tracking-wide text-sm font-semibold ${COLORS.accent.replace('bg', 'text')}`}>
              Lieu de Mémoire
            </div>
            <p className="block mt-1 text-xl leading-tight font-medium text-stone-900">{sitesData?.[0]?.name}</p>
            <p className="mt-2 text-stone-600">{sitesData?.[0]?.description}</p>
            <button onClick={() => setPage('Sites')} className={`mt-4 inline-flex items-center text-sm font-bold ${COLORS.primary.replace('bg', 'text')} hover:underline`}>
              Voir la fiche complète <ChevronRight className="w-4 h-4 ml-1" />
            </button>
          </div>
        </div>
      </section>

      {/* Aperçu Partenaires Premium */}
      <section className={`py-12 ${COLORS.primary} text-white`}>
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">Nos Partenaires Premium</h2>
          <div className="flex flex-wrap justify-center gap-6">
            {partnersData?.filter(p => p.isPremium).map(p => (
              <div key={p.id} className="p-4 bg-white rounded-lg shadow-xl text-center w-32 md:w-40 transform hover:scale-105 transition">
                <img src={p.logo} alt={p.name} className="mx-auto h-12 mb-2 object-contain" />
                <p className={`text-xs font-semibold ${COLORS.primary.replace('bg', 'text')}`}>{p.name}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-8">
            <button onClick={() => setPage('Partenaires')} className={`inline-flex items-center ${COLORS.accent} text-white font-bold py-3 px-6 rounded-full shadow-lg hover:opacity-90 transition`}>
              Devenir Partenaire <Users className="w-5 h-5 ml-2" />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};


// PAGE 2 : BIBLIOTHÈQUE VIRTUELLE
const BibliothequePage = () => {
  const { data: livres, loading: loadingLivres, error: errorLivres } = useFetchData('livres');
  const { data: auteurs, loading: loadingAuteurs, error: errorAuteurs } = useFetchData('auteurs');
  const [selectedCategory, setSelectedCategory] = useState('Tous');

  const categories = useMemo(() => {
    const all = livres?.map(l => l.categorie) || [];
    return ['Tous', ...new Set(all)];
  }, [livres]);

  const filteredLivres = useMemo(() => {
    if (selectedCategory === 'Tous') return livres;
    return livres?.filter(l => l.categorie === selectedCategory);
  }, [livres, selectedCategory]);

  const getAuteur = (auteurName) => auteurs?.find(a => a.name === auteurName);

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className={`text-4xl font-extrabold mb-8 ${COLORS.accent.replace('bg', 'text')}`}>Bibliothèque Virtuelle du Fouladou</h2>
      <StatusView loading={loadingLivres || loadingAuteurs} error={errorLivres || errorAuteurs} />

      {/* Filtres par Catégorie */}
      <div className="mb-8">
        <h3 className="text-xl font-semibold mb-3">Filtrer par Thème :</h3>
        <div className="flex flex-wrap gap-2">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-full text-sm font-semibold transition duration-300 ${
                selectedCategory === cat
                  ? `${COLORS.accent} text-white shadow-md`
                  : `bg-white text-stone-700 border border-stone-300 hover:bg-stone-100`
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Liste des Livres */}
      <section className="mb-12">
        <h3 className={`text-2xl font-bold mb-6 ${COLORS.text}`}>Catalogue des Œuvres ({filteredLivres?.length || 0})</h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6">
          {filteredLivres?.map(livre => (
            <div key={livre.id} className="bg-white rounded-lg shadow-md p-4 flex flex-col items-center text-center transition hover:shadow-xl">
              <img src={livre.couverture} alt={`Couverture de ${livre.title}`} className="w-full h-auto object-cover rounded mb-3 shadow-lg" />
              <p className="font-bold text-stone-800 text-lg line-clamp-2">{livre.title}</p>
              <p className="text-sm text-stone-600 italic">Par {livre.auteur}</p>
              <button
                className={`mt-3 w-full py-2 text-sm rounded-full font-bold transition duration-300 ${
                  livre.telecharger
                    ? `${COLORS.primary} text-white hover:opacity-90`
                    : 'bg-gray-200 text-gray-500 cursor-not-allowed'
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

      {/* Section Auteurs de Kolda */}
      <section className={`p-6 md:p-10 rounded-xl ${COLORS.softBg} shadow-inner`}>
        <h3 className={`text-2xl font-bold mb-6 ${COLORS.primary.replace('bg', 'text')}`}>Auteurs de Kolda (Auteur du mois : {auteurs?.[0]?.name})</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {auteurs?.map(auteur => (
            <div key={auteur.id} className="flex items-start bg-white p-4 rounded-lg shadow">
              <img src={auteur.photo} alt={`Photo de ${auteur.name}`} className="w-20 h-20 object-cover rounded-full mr-4 shadow-md" />
              <div>
                <h4 className={`text-xl font-bold ${COLORS.text}`}>{auteur.name}</h4>
                <p className="text-sm text-stone-500 mb-2">Auteur/Historien</p>
                <p className="text-stone-600 text-sm line-clamp-3">{auteur.bio}</p>
                <p className="mt-2 text-xs font-semibold text-emerald-600">Œuvres principales : {livres?.filter(l => l.auteur === auteur.name).map(l => l.title).join(', ')}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-6 text-center">
            <button className={`inline-flex items-center ${COLORS.accent} text-white font-bold py-2 px-4 rounded-full shadow-md hover:opacity-90 transition`}>
              Proposer votre livre
            </button>
        </div>
      </section>
    </div>
  );
};


// PAGE 3 : SITES HISTORIQUES
const SitesPage = () => {
  const { data: sites, loading, error } = useFetchData('sites');

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className={`text-4xl font-extrabold mb-8 ${COLORS.primary.replace('bg', 'text')}`}>Carte Interactive des Sites Historiques</h2>
      <StatusView loading={loading} error={error} />

      {/* Carte Simulé */}
      <div className="mb-8 p-4 bg-gray-200 rounded-xl shadow-inner relative overflow-hidden h-96">
        <Map className="w-10 h-10 text-gray-500 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
        <img
          src="https://placehold.co/1200x400/D2B48C/333333?text=CARTE+SIMULÉE+DE+KOLDA"
          alt="Carte Simulee de Kolda"
          className="absolute inset-0 w-full h-full object-cover opacity-70"
        />
        <div className="absolute top-4 left-4 bg-white p-3 rounded-lg shadow-lg">
            <p className="font-semibold text-stone-800">Localisation approximative des lieux</p>
            <p className="text-sm text-stone-500">Moussamolo, Dabo, etc.</p>
        </div>
      </div>

      {/* Liste des Fiches Détaillées */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {sites?.map(site => (
          <div key={site.id} className="bg-white rounded-xl shadow-lg overflow-hidden transition hover:shadow-2xl">
            <img src={site.image} alt={site.name} className="h-64 w-full object-cover" />
            <div className="p-6">
              <div className={`text-xs font-bold uppercase tracking-wider ${COLORS.accent.replace('bg', 'text')} mb-1`}>{site.role}</div>
              <h3 className="text-2xl font-bold text-stone-900 mb-3">{site.name}</h3>
              <p className="text-stone-700 mb-4">{site.description}</p>
              <a
                href={`https://www.google.com/maps/search/?api=1&query=${site.lat},${site.lng}`}
                target="_blank"
                rel="noopener noreferrer"
                className={`inline-flex items-center text-sm font-bold ${COLORS.primary.replace('bg', 'text')} hover:underline`}
              >
                Voir Itinéraire (Google Maps) <ChevronRight className="w-4 h-4 ml-1" />
              </a>
            </div>
          </div>
        ))}
      </section>
      <p className="text-center mt-8 text-stone-500">Fonction "Découvrir près de moi" à implémenter.</p>
    </div>
  );
};


// PAGE 4 : HÔTELS ET HÉBERGEMENTS
const HotelsPage = () => {
  const { data: hotels, loading, error } = useFetchData('hotels');

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className={`text-4xl font-extrabold mb-8 ${COLORS.accent.replace('bg', 'text')}`}>Hôtels et Hébergements à Kolda</h2>
      <p className="text-stone-600 mb-8">Informations complètes pour planifier votre séjour. Contactez directement par WhatsApp !</p>
      <StatusView loading={loading} error={error} />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {hotels?.map(hotel => (
          <div key={hotel.id} className="bg-white rounded-xl shadow-lg overflow-hidden transition hover:shadow-2xl">
            <img src={hotel.image} alt={hotel.name} className="h-56 w-full object-cover" />
            <div className="p-5">
              <h3 className="text-xl font-bold text-stone-900 mb-2">{hotel.name}</h3>
              <div className="flex flex-wrap gap-2 mb-3">
                {hotel.services.map(service => (
                  <span key={service} className={`px-3 py-1 text-xs font-semibold rounded-full ${COLORS.softBg} text-stone-700 border border-stone-300`}>
                    {service}
                  </span>
                ))}
              </div>
              <p className="text-sm text-stone-500 mb-4">Contact : {hotel.whatsapp}</p>
              <WhatsAppButton number={hotel.whatsapp} />
            </div>
          </div>
        ))}
      </div>
      <div className="mt-12 text-center p-6 border-t border-stone-200">
        <p className="font-semibold text-stone-700 mb-3">Vous êtes propriétaire d'un hébergement ?</p>
        <button className={`inline-flex items-center ${COLORS.primary} text-white font-bold py-3 px-6 rounded-full shadow-lg hover:opacity-90 transition`}>
          Ajouter votre établissement
        </button>
      </div>
    </div>
  );
};


// PAGE 5 : PARTENAIRES
const PartenairesPage = () => {
  const { data: partners, loading, error } = useFetchData('partners');

  const categories = ['ONG', 'PME', 'PMI'];

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className={`text-4xl font-extrabold mb-8 ${COLORS.primary.replace('bg', 'text')}`}>Nos Partenaires</h2>
      <p className="text-stone-600 mb-8">Ces organisations soutiennent la valorisation du patrimoine de Kolda.</p>
      <StatusView loading={loading} error={error} />

      {/* Section Partenaires Premium (Carrousel simulé) */}
      <section className={`p-6 mb-12 rounded-xl shadow-xl ${COLORS.softBg}`}>
        <h3 className="text-2xl font-bold text-center mb-6 text-stone-700">Partenaires Premium ⭐</h3>
        <div className="flex overflow-x-auto gap-6 pb-4">
          {partners?.filter(p => p.isPremium).map(p => (
            <div key={p.id} className="min-w-[200px] bg-white p-4 rounded-lg shadow-md border-b-4 border-amber-600">
              <img src={p.logo} alt={p.name} className="h-10 mx-auto mb-3 object-contain" />
              <p className="text-center font-bold text-stone-900">{p.name}</p>
              <p className="text-center text-xs text-stone-500 mt-1">{p.description.substring(0, 50)}...</p>
            </div>
          ))}
        </div>
      </section>

      {/* Liste par Catégorie */}
      {categories.map(cat => (
        <section key={cat} className="mb-10">
          <h3 className={`text-2xl font-bold mb-4 border-l-4 pl-3 ${COLORS.accent.replace('bg', 'border')}`}>{cat} ({partners?.filter(p => p.category === cat).length})</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {partners?.filter(p => p.category === cat).map(p => (
              <div key={p.id} className="flex items-center bg-white p-4 rounded-lg shadow">
                <img src={p.logo} alt={p.name} className="w-16 h-16 object-contain mr-4" />
                <div>
                  <h4 className="text-lg font-bold text-stone-900">{p.name}</h4>
                  <p className="text-sm text-stone-600 line-clamp-2">{p.description}</p>
                  <p className="text-xs text-emerald-600 mt-1">Contact: {p.contact}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      ))}

      <div className="text-center mt-12">
        <h3 className="text-2xl font-bold text-stone-700 mb-4">Soutenez le Patrimoine</h3>
        <button className={`inline-flex items-center ${COLORS.accent} text-white font-bold py-3 px-6 rounded-full shadow-lg hover:opacity-90 transition`}>
          Devenir Partenaire Officiel
        </button>
      </div>
    </div>
  );
};

// PAGE 6 : ACTUALITÉS & CULTURE
const ActualitesPage = () => {
  const { data: news, loading, error } = useFetchData('actualites');

  const traditions = [
    { id: 1, title: "Présentation des ethnies de Kolda", content: "Peulhs, Mandingues, Diolas : découvrez la diversité et l'harmonie des cultures.", image: "https://placehold.co/400x300/a52a2a/ffffff?text=Ethnies" },
    { id: 2, title: "La Gastronomie Koldoise : Rites et Recettes", content: "Du Thiéboudienne local aux plats pastoraux, un voyage culinaire.", image: "https://placehold.co/400x300/50c878/ffffff?text=Cuisine" },
    { id: 3, title: "Les Rituels de l'eau en Haute-Casamance", content: "Immersion dans les traditions liées aux fleuves et aux saisons.", image: "https://placehold.co/400x300/8b4513/ffffff?text=Rituels" },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className={`text-4xl font-extrabold mb-8 ${COLORS.accent.replace('bg', 'text')}`}>Actualités Culturelles & Traditions du Fouladou</h2>
      <StatusView loading={loading} error={error} />

      {/* Section Actualités (Articles/Vidéos) */}
      <section className="mb-12">
        <h3 className={`text-2xl font-bold mb-6 ${COLORS.primary.replace('bg', 'text')}`}>Fil d'Actualité ({news?.length || 0})</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {news?.map(item => (
            <div key={item.id} className="bg-white rounded-xl shadow-lg overflow-hidden transition hover:shadow-xl">
              <img src={item.image} alt={item.title} className="h-48 w-full object-cover" />
              <div className="p-4">
                <div className="flex justify-between items-center text-xs text-stone-500 mb-2">
                  <span className={`font-semibold ${item.type === 'Vidéo' ? 'text-red-500' : 'text-blue-500'}`}>{item.type}</span>
                  <span>{item.date}</span>
                </div>
                <h4 className="text-lg font-bold text-stone-900 line-clamp-2">{item.title}</h4>
                <p className="text-sm text-stone-600 mt-2 line-clamp-3">{item.content}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Section Culture & Traditions */}
      <section className={`p-6 rounded-xl shadow-inner ${COLORS.softBg}`}>
        <h3 className={`text-2xl font-bold mb-6 ${COLORS.accent.replace('bg', 'text')}`}>Guide Culture & Traditions</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {traditions.map(t => (
            <div key={t.id} className="bg-white rounded-lg shadow-md overflow-hidden">
              <img src={t.image} alt={t.title} className="h-32 w-full object-cover" />
              <div className="p-4">
                <h4 className="font-bold text-stone-900 mb-1">{t.title}</h4>
                <p className="text-sm text-stone-600 line-clamp-3">{t.content}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
};

// PAGE 7 : CONTACT
const ContactPage = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulation d'envoi de formulaire
    console.log('Formulaire de contact soumis:', formData);
    alert('Merci ! Votre message a été envoyé avec succès.');
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className={`text-4xl font-extrabold mb-8 ${COLORS.primary.replace('bg', 'text')}`}>Contact & Contribuer au Projet</h2>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Formulaire */}
        <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow-lg">
          <h3 className="text-2xl font-bold mb-4 text-stone-800">Envoyez-nous un message</h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-stone-700">Nom / Organisation</label>
              <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required
                className="mt-1 block w-full border border-stone-300 rounded-md shadow-sm p-2 focus:ring-amber-600 focus:border-amber-600" />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-stone-700">Email</label>
              <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required
                className="mt-1 block w-full border border-stone-300 rounded-md shadow-sm p-2 focus:ring-amber-600 focus:border-amber-600" />
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-stone-700">Votre message ou proposition de contenu</label>
              <textarea id="message" name="message" rows="4" value={formData.message} onChange={handleChange} required
                className="mt-1 block w-full border border-stone-300 rounded-md shadow-sm p-2 focus:ring-amber-600 focus:border-amber-600"></textarea>
            </div>
            <button type="submit" className={`w-full ${COLORS.accent} text-white font-bold py-3 px-4 rounded-lg shadow-md hover:opacity-90 transition`}>
              Envoyer
            </button>
          </form>
        </div>

        {/* Coordonnées */}
        <div className={`p-6 rounded-xl shadow-lg ${COLORS.softBg}`}>
          <h3 className="text-2xl font-bold mb-4 text-stone-800">Coordonnées</h3>
          <div className="space-y-4 text-stone-700">
            <div className="flex items-start">
              <Smartphone className="w-5 h-5 mr-3 text-emerald-700 mt-1" />
              <div>
                <p className="font-semibold">WhatsApp Direct</p>
                <p className="text-sm">+221 78 456 78 90</p>
                <WhatsAppButton number="784567890" />
              </div>
            </div>
            <div className="flex items-center">
              <BookOpen className="w-5 h-5 mr-3 text-emerald-700" />
              <p className="text-sm">koldaheritage@contact.sn</p>
            </div>
            <div className="flex items-center">
              <Map className="w-5 h-5 mr-3 text-emerald-700" />
              <p className="text-sm">Kolda, Haute-Casamance, Sénégal</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// 8. PIED DE PAGE
const Footer = () => (
  <footer className={`mt-12 p-8 ${COLORS.primary} text-white`}>
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
        <div>
          <h4 className="font-bold text-lg mb-3">Kolda Heritage</h4>
          <p className="text-sm text-gray-300">Plateforme de valorisation du patrimoine du Fouladou.</p>
        </div>
        <div>
          <h4 className="font-bold text-lg mb-3">Ressources</h4>
          <ul className="space-y-2 text-sm text-gray-300">
            <li><a href="#" className="hover:text-amber-300">Auteurs</a></li>
            <li><a href="#" className="hover:text-amber-300">Contes et Légendes</a></li>
            <li><a href="#" className="hover:text-amber-300">Médiathèque</a></li>
          </ul>
        </div>
        <div>
          <h4 className="font-bold text-lg mb-3">Partenariat</h4>
          <ul className="space-y-2 text-sm text-gray-300">
            <li><a href="#" className="hover:text-amber-300">Devenir Partenaire</a></li>
            <li><a href="#" className="hover:text-amber-300">Espace Admin (futur)</a></li>
            <li><a href="#" className="hover:text-amber-300">Mentions Légales</a></li>
          </ul>
        </div>
        <div>
          <h4 className="font-bold text-lg mb-3">Suivez-nous</h4>
          {/* Placeholder Social Links */}
          <div className="flex space-x-3">
            <Globe className="w-6 h-6 hover:text-amber-300 cursor-pointer" />
            <Users className="w-6 h-6 hover:text-amber-300 cursor-pointer" />
          </div>
        </div>
      </div>
      <div className="mt-8 pt-4 border-t border-emerald-600 text-center text-sm text-gray-400">
        © {new Date().getFullYear()} Kolda Heritage. Tous droits réservés.
      </div>
    </div>
  </footer>
);


// COMPOSANT PRINCIPAL
const App = () => {
  const [currentPage, setCurrentPage] = useState('Accueil');

  const renderPage = useCallback(() => {
    switch (currentPage) {
      case 'Accueil':
        return <HomePage setPage={setCurrentPage} />;
      case 'Bibliothèque':
        return <BibliothequePage />;
      case 'Sites':
        return <SitesPage />;
      case 'Hôtels':
        return <HotelsPage />;
      case 'Partenaires':
        return <PartenairesPage />;
      case 'Actualités':
        return <ActualitesPage />;
      case 'Contact':
        return <ContactPage />;
      default:
        return <HomePage setPage={setCurrentPage} />;
    }
  }, [currentPage]);

  return (
    <div className={`min-h-screen flex flex-col ${COLORS.softBg} font-sans`}>
      {/* Intégration de Tailwind CSS via CDN - non nécessaire dans un environnement React local, mais inclus pour la compatibilité */}
      <script src="https://cdn.tailwindcss.com"></script>

      <NavBar currentPage={currentPage} setPage={setCurrentPage} />

      <main className="flex-grow">
        {renderPage()}
      </main>

      <Footer />
    </div>
  );
};

export default App;

This project was built with [Lovable](https://lovable.dev).

**Live app**: https://koldama.lovable.app

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/7c40cd4a-4b06-40eb-b9a6-ab49a93eb513).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
