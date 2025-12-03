// Temporary mock data for development
// TODO: Replace with real API calls

export interface Offer {
  id: number;
  title: string;
  company: string;
  domain: string;
  budget: string;
  deadline: string;
  status?: string;
  logo?: string;
  platforms?: string[];
  description?: string;
  minFollowers?: number;
  applicationsCount?: number;
  isCompatible?: boolean;
  isApplied?: boolean;
  companyLogo?: string;
  companyName?: string;
  applicants?: number;
}

export interface Application {
  id: number;
  offerId: number;
  offerTitle: string;
  company: string;
  status: string;
  appliedDate: string;
  message?: string;
}

export interface Notification {
  id: number;
  type: string;
  title: string;
  message: string;
  date: string;
  read: boolean;
}

export const mockOffers: Offer[] = [
  {
    id: 1,
    title: 'Campagne Mode Printemps 2024',
    company: 'Fashion Brand',
    domain: 'Mode & Beauté',
    budget: '5000',
    deadline: '2024-12-15',
    status: 'active',
    logo: '👗',
    platforms: ['Instagram', 'TikTok'],
    description: 'Recherche influenceurs mode pour promouvoir notre nouvelle collection printemps. Collaboration sur 3 posts Instagram et 2 vidéos TikTok.',
    minFollowers: 10000,
    applicationsCount: 12,
    isCompatible: true,
    isApplied: false,
    companyLogo: 'https://via.placeholder.com/48',
    companyName: 'Fashion Brand',
    applicants: 12
  },
  {
    id: 2,
    title: 'Lancement Produit Tech',
    company: 'TechStart',
    domain: 'Tech & Gaming',
    budget: '8000',
    deadline: '2024-12-20',
    status: 'active',
    logo: '💻',
    platforms: ['YouTube', 'Instagram'],
    description: 'Partenaire recherché pour le lancement de notre nouveau produit tech. Vidéos YouTube et stories Instagram requises.',
    minFollowers: 50000,
    applicationsCount: 8,
    isCompatible: true,
    isApplied: false,
    companyLogo: 'https://via.placeholder.com/48',
    companyName: 'TechStart',
    applicants: 8
  },
  {
    id: 3,
    title: 'Événement Sportif',
    company: 'SportPro',
    domain: 'Sport & Fitness',
    budget: '3000',
    deadline: '2024-12-10',
    status: 'active',
    logo: '⚽',
    platforms: ['Instagram', 'Twitter'],
    description: 'Couverture événement sportif majeur. Posts Instagram et live Twitter pendant l\'événement.',
    minFollowers: 20000,
    applicationsCount: 15,
    isCompatible: true,
    isApplied: true,
    companyLogo: 'https://via.placeholder.com/48',
    companyName: 'SportPro',
    applicants: 15
  },
  {
    id: 4,
    title: 'Collection Voyage',
    company: 'Travel Agency',
    domain: 'Voyage',
    budget: '6000',
    deadline: '2024-12-25',
    status: 'active',
    logo: '✈️',
    platforms: ['Instagram', 'YouTube', 'TikTok'],
    description: 'Promotion de nos nouvelles destinations. Contenu voyage authentique avec photos et vidéos.',
    minFollowers: 30000,
    applicationsCount: 6,
    isCompatible: true,
    isApplied: false,
    companyLogo: 'https://via.placeholder.com/48',
    companyName: 'Travel Agency',
    applicants: 6
  },
  {
    id: 5,
    title: 'Ligne Cuisine Bio',
    company: 'BioFood',
    domain: 'Cuisine',
    budget: '4000',
    deadline: '2024-12-18',
    status: 'active',
    logo: '🍳',
    platforms: ['Instagram', 'TikTok'],
    description: 'Recherche créateurs culinaires pour promouvoir notre nouvelle ligne de produits bio. Recettes et tutos vidéo.',
    minFollowers: 15000,
    applicationsCount: 10,
    isCompatible: true,
    isApplied: false,
    companyLogo: 'https://via.placeholder.com/48',
    companyName: 'BioFood',
    applicants: 10
  },
  {
    id: 6,
    title: 'Festival Musique',
    company: 'MusicFest',
    domain: 'Lifestyle',
    budget: '7000',
    deadline: '2024-12-30',
    status: 'active',
    logo: '🎵',
    platforms: ['Instagram', 'TikTok', 'YouTube'],
    description: 'Couverture complète du festival. Contenu avant, pendant et après l\'événement. Accès VIP inclus.',
    minFollowers: 40000,
    applicationsCount: 4,
    isCompatible: false,
    isApplied: false,
    companyLogo: 'https://via.placeholder.com/48',
    companyName: 'MusicFest',
    applicants: 4
  }
];

export const mockApplications: Application[] = [
  {
    id: 1,
    offerId: 3,
    offerTitle: 'Événement Sportif',
    company: 'SportPro',
    status: 'pending',
    appliedDate: '2024-11-25',
    message: 'Très intéressé par cette collaboration !'
  },
  {
    id: 2,
    offerId: 1,
    offerTitle: 'Campagne Mode Printemps 2024',
    company: 'Fashion Brand',
    status: 'accepted',
    appliedDate: '2024-11-20',
    message: 'Merci pour cette opportunité !'
  }
];

export const mockNotifications: Notification[] = [
  {
    id: 1,
    type: 'reponse_candidature',
    title: 'Candidature acceptée',
    message: 'Votre candidature pour "Campagne Mode Printemps 2024" a été acceptée !',
    date: '2024-11-28',
    read: false
  },
  {
    id: 2,
    type: 'nouvelle_campagne',
    title: 'Nouvelle offre disponible',
    message: 'Une nouvelle offre dans votre domaine est disponible : "Lancement Produit Tech"',
    date: '2024-11-27',
    read: false
  }
];
export interface Stats {
  totalApplications: number;
  accepted: number;
  pending: number;
  rejected: number;
  activeCollaborations?: number;
  profileViews?: number;
  matchingOffers?: number;
  acceptedApplications?: number;
}

export interface Platform {
  name: string;
  followers: number;
  engagementRate?: number;
}

export interface UserProfile {
  name: string;
  pseudo: string;
  email: string;
  completionPercent: number;
  platforms?: Platform[];
}

export const mockStats: Stats = {
  totalApplications: 2,
  accepted: 1,
  pending: 1,
  rejected: 0,
  activeCollaborations: 1,
  profileViews: 156,
  matchingOffers: 4,
  acceptedApplications: 1
};

export const mockUserProfile: UserProfile = {
  name: '',
  pseudo: '',
  email: '',
  completionPercent: 0,
  platforms: []
};

