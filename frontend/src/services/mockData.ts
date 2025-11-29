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

export const mockOffers: Offer[] = [];
export const mockApplications: Application[] = [];
export const mockNotifications: Notification[] = [];
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
  totalApplications: 0,
  accepted: 0,
  pending: 0,
  rejected: 0,
  activeCollaborations: 0,
  profileViews: 0,
  matchingOffers: 0,
  acceptedApplications: 0
};

export const mockUserProfile: UserProfile = {
  name: '',
  pseudo: '',
  email: '',
  completionPercent: 0,
  platforms: []
};

