import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { authAPI, getToken } from '../services/api';

interface User {
  id: string;
  email: string;
  type: 'influencer' | 'company';
  profileComplete: boolean;
  profile?: InfluencerProfile;
}

interface InfluencerProfile {
  name: string;
  pseudo: string;
  photo?: string;
  bio: string;
  location: string;
  domains: string[];
  platforms: Platform[];
  pricing: {
    story?: number;
    post?: number;
    video?: number;
    negotiable: boolean;
  };
  completionPercent: number;
}

interface Platform {
  name: string;
  handle: string;
  followers: number;
  engagement: number;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string, type: 'influencer' | 'company') => Promise<void>;
  logout: () => void;
  updateProfile: (profile: Partial<InfluencerProfile>) => void;
  loginAttempts: number;
  isBlocked: boolean;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loginAttempts, setLoginAttempts] = useState(0);
  const [isBlocked, setIsBlocked] = useState(false);
  const [loading, setLoading] = useState(true);

  // Check if user is already logged in on mount
  useEffect(() => {
    const checkAuth = async () => {
      const token = getToken();
      if (token) {
        try {
      const userData = await authAPI.getCurrentUser() as any;
      // Map Django user data to frontend User interface
      setUser({
        id: userData.id.toString(),
        email: userData.email,
        type: userData.type_utilisateur === 'influenceur' ? 'influencer' : 'company',
        profileComplete: userData.profile_complete || false,
        // Add profile data if available
      });
        } catch (error) {
          // Token invalid, clear it
          authAPI.logout();
        }
      }
      setLoading(false);
    };
    checkAuth();
  }, []);

  const signup = async (email: string, password: string, type: 'influencer' | 'company') => {
    try {
      // Map frontend type to Django type
      const djangoType = type === 'influencer' ? 'influenceur' : 'entreprise';
      await authAPI.signup(email, password, djangoType as any);
      
      // After signup, try to login to get user data
      await login(email, password);
    } catch (error: any) {
      if (error.message.includes('déjà utilisé') || error.message.includes('already exists')) {
        throw new Error('Cet email est déjà utilisé');
      }
      throw error;
    }
  };

  const login = async (email: string, password: string) => {
    if (isBlocked) {
      throw new Error('Compte bloqué temporairement. Réessayez dans 15 minutes.');
    }

    try {
      await authAPI.login(email, password);
      
      // Fetch user data after successful login
      const userData = await authAPI.getCurrentUser() as any;
      setUser({
        id: userData.id.toString(),
        email: userData.email,
        type: userData.type_utilisateur === 'influenceur' ? 'influencer' : 'company',
        profileComplete: userData.profile_complete || false,
        // Add profile data if available from API
      });
      
      setLoginAttempts(0);
    } catch (error: any) {
      setLoginAttempts(prev => {
        const newAttempts = prev + 1;
        if (newAttempts >= 5) {
          setIsBlocked(true);
          setTimeout(() => {
            setIsBlocked(false);
            setLoginAttempts(0);
          }, 15 * 60 * 1000);
        }
        return newAttempts;
      });
      
      if (error.message.includes('No active account') || error.message.includes('Invalid')) {
        throw new Error(`Email ou mot de passe incorrect. Tentatives restantes : ${5 - loginAttempts - 1}`);
      }
      throw error;
    }
  };

  const logout = () => {
    authAPI.logout();
    setUser(null);
    setLoginAttempts(0);
    setIsBlocked(false);
  };

  const updateProfile = (profileUpdate: Partial<InfluencerProfile>) => {
    if (user && user.type === 'influencer') {
      const updatedProfile = { ...user.profile, ...profileUpdate } as InfluencerProfile;
      
      // Calculate completion percent
      let completion = 0;
      if (updatedProfile.name) completion += 15;
      if (updatedProfile.pseudo) completion += 15;
      if (updatedProfile.bio) completion += 10;
      if (updatedProfile.location) completion += 10;
      if (updatedProfile.domains?.length > 0) completion += 20;
      if (updatedProfile.platforms?.length > 0) completion += 20;
      if (updatedProfile.pricing) completion += 10;
      
      updatedProfile.completionPercent = completion;

      setUser({
        ...user,
        profileComplete: completion === 100,
        profile: updatedProfile,
      });
      
      // TODO: Make API call to update profile on backend
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, updateProfile, loginAttempts, isBlocked, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
