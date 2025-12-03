export interface Offer {
  id: string;
  companyName: string;
  companyLogo: string;
  title: string;
  description: string;
  budget: number;
  domain: string;
  platforms: string[];
  deadline: string;
  minFollowers: number;
  requirements: string[];
  applicants: number;
  status?: 'open' | 'closed' | 'expired';
  isApplied?: boolean;
  isCompatible?: boolean;
}

export interface Application {
  id: string;
  offerId: string;
  offerTitle: string;
  companyName: string;
  appliedDate: string;
  status: 'pending' | 'accepted' | 'rejected' | 'expired';
  message: string;
}

export interface Notification {
  id: string;
  type: 'offer' | 'application' | 'message';
  title: string;
  message: string;
  date: string;
  read: boolean;
}

export const mockOffers: Offer[] = [
  {
    id: '1',
    companyName: 'BeautyLux',
    companyLogo: 'https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?w=100&h=100&fit=crop',
    title: 'Campagne Rouge à Lèvres Automne 2025',
    description: 'Nous recherchons des influenceurs mode et beauté pour promouvoir notre nouvelle collection de rouges à lèvres. Contenu requis : 3 posts Instagram + 5 stories.',
    budget: 800,
    domain: 'Beauté',
    platforms: ['Instagram'],
    deadline: '2025-12-15',
    minFollowers: 30000,
    requirements: ['Contenu de qualité professionnelle', 'Engagement minimum 3%', 'Disponibilité immédiate'],
    applicants: 12,
    status: 'open',
    isCompatible: true,
  },
  {
    id: '2',
    companyName: 'TechNova',
    companyLogo: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=100&h=100&fit=crop',
    title: 'Lancement Nouveau Smartphone',
    description: 'Recherche influenceurs tech pour présenter nos nouveaux smartphones. Vidéo unboxing + review détaillée.',
    budget: 1500,
    domain: 'Technologie',
    platforms: ['YouTube', 'TikTok'],
    deadline: '2025-12-20',
    minFollowers: 50000,
    requirements: ['Expérience en review tech', 'Équipement vidéo de qualité'],
    applicants: 8,
    status: 'open',
    isCompatible: false,
  },
  {
    id: '3',
    companyName: 'FitLife',
    companyLogo: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=100&h=100&fit=crop',
    title: 'Programme Fitness 30 Jours',
    description: 'Promotion de notre application de fitness avec challenge 30 jours. Stories quotidiennes + 2 posts par semaine.',
    budget: 1200,
    domain: 'Sport & Fitness',
    platforms: ['Instagram', 'TikTok'],
    deadline: '2025-12-10',
    minFollowers: 40000,
    requirements: ['Créateur de contenu fitness', 'Authenticité'],
    applicants: 15,
    status: 'open',
    isCompatible: false,
  },
  {
    id: '4',
    companyName: 'EcoMode',
    companyLogo: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=100&h=100&fit=crop',
    title: 'Collection Éco-responsable',
    description: 'Présentation de notre nouvelle ligne de vêtements éco-responsables. Lookbook + stories + engagement communauté.',
    budget: 600,
    domain: 'Mode',
    platforms: ['Instagram'],
    deadline: '2025-12-25',
    minFollowers: 25000,
    requirements: ['Sensibilité écologique', 'Style moderne'],
    applicants: 20,
    status: 'open',
    isCompatible: true,
  },
  {
    id: '5',
    companyName: 'GourmetBox',
    companyLogo: 'https://images.unsplash.com/photo-1516594798947-e65505dbb29d?w=100&h=100&fit=crop',
    title: 'Box Culinaire Mensuelle',
    description: 'Collaboration long terme pour notre box culinaire. Unboxing + recettes + code promo personnalisé.',
    budget: 400,
    domain: 'Cuisine',
    platforms: ['Instagram', 'YouTube'],
    deadline: '2025-12-08',
    minFollowers: 20000,
    requirements: ['Passion cuisine', 'Présentation soignée'],
    applicants: 18,
    status: 'open',
    isCompatible: false,
  },
  {
    id: '6',
    companyName: 'LuxTravel',
    companyLogo: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=100&h=100&fit=crop',
    title: 'Destination Maldives',
    description: 'Voyage sponsorisé aux Maldives. Couverture complète du séjour avec contenu quotidien.',
    budget: 3000,
    domain: 'Voyage',
    platforms: ['Instagram', 'YouTube', 'TikTok'],
    deadline: '2025-12-30',
    minFollowers: 80000,
    requirements: ['Portfolio voyage', 'Disponibilité 7 jours'],
    applicants: 45,
    status: 'open',
    isCompatible: false,
  },
];

export const mockApplications: Application[] = [
  {
    id: 'app1',
    offerId: '1',
    offerTitle: 'Campagne Rouge à Lèvres Automne 2025',
    companyName: 'BeautyLux',
    appliedDate: '2025-11-25',
    status: 'pending',
    message: 'Je serais ravie de collaborer sur cette campagne. Mon audience est très engagée dans le domaine de la beauté.',
  },
  {
    id: 'app2',
    offerId: '4',
    offerTitle: 'Collection Éco-responsable',
    companyName: 'EcoMode',
    appliedDate: '2025-11-22',
    status: 'accepted',
    message: 'Passionnée par la mode durable, je pense être la candidate idéale pour cette collaboration.',
  },
  {
    id: 'app3',
    offerId: '3',
    offerTitle: 'Programme Fitness 30 Jours',
    companyName: 'FitLife',
    appliedDate: '2025-11-20',
    status: 'rejected',
    message: 'Intéressée par le fitness et le bien-être.',
  },
];

export const mockNotifications: Notification[] = [
  {
    id: 'notif1',
    type: 'application',
    title: 'Candidature acceptée',
    message: 'EcoMode a accepté votre candidature pour "Collection Éco-responsable"',
    date: '2025-11-28T10:30:00',
    read: false,
  },
  {
    id: 'notif2',
    type: 'offer',
    title: 'Nouvelle offre compatible',
    message: 'Une nouvelle offre "Campagne Rouge à Lèvres" correspond à votre profil',
    date: '2025-11-27T14:20:00',
    read: false,
  },
  {
    id: 'notif3',
    type: 'application',
    title: 'Candidature rejetée',
    message: 'FitLife a décliné votre candidature pour "Programme Fitness 30 Jours"',
    date: '2025-11-26T09:15:00',
    read: true,
  },
  {
    id: 'notif4',
    type: 'offer',
    title: 'Offre bientôt expirée',
    message: 'L\'offre "Box Culinaire Mensuelle" expire dans 2 jours',
    date: '2025-11-25T16:00:00',
    read: true,
  },
];

export const domains = [
  'Mode',
  'Beauté',
  'Lifestyle',
  'Sport & Fitness',
  'Cuisine',
  'Voyage',
  'Technologie',
  'Gaming',
  'Éducation',
  'Art & Culture',
];

export const platformsList = [
  'Instagram',
  'TikTok',
  'YouTube',
  'Facebook',
  'Twitter',
  'LinkedIn',
  'Twitch',
  'Pinterest',
];
