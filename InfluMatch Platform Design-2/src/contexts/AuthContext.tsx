import React, { createContext, useContext, useState, ReactNode } from 'react';

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
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loginAttempts, setLoginAttempts] = useState(0);
  const [isBlocked, setIsBlocked] = useState(false);

  const signup = async (email: string, password: string, type: 'influencer' | 'company') => {
    // Mock signup
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Check for duplicate email
    const existingUsers = ['test@example.com'];
    if (existingUsers.includes(email)) {
      throw new Error('Cet email est déjà utilisé');
    }

    const newUser: User = {
      id: Math.random().toString(36).substr(2, 9),
      email,
      type,
      profileComplete: false,
    };
    setUser(newUser);
  };

  const login = async (email: string, password: string) => {
    await new Promise(resolve => setTimeout(resolve, 500));

    if (isBlocked) {
      throw new Error('Compte bloqué temporairement. Réessayez dans 15 minutes.');
    }

    // Mock login validation
    if (password !== 'password123') {
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
      throw new Error(`Mot de passe incorrect. Tentatives restantes : ${5 - loginAttempts - 1}`);
    }

    // Successful login
    setLoginAttempts(0);
    setUser({
      id: '1',
      email,
      type: 'influencer',
      profileComplete: true,
      profile: {
        name: 'Sophie Martin',
        pseudo: '@sophiestyle',
        photo: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop',
        bio: 'Créatrice de contenu lifestyle et mode',
        location: 'Paris, France',
        domains: ['Mode', 'Lifestyle', 'Beauté'],
        platforms: [
          { name: 'Instagram', handle: '@sophiestyle', followers: 45000, engagement: 4.2 },
          { name: 'TikTok', handle: '@sophiestyle', followers: 32000, engagement: 6.8 },
        ],
        pricing: {
          story: 150,
          post: 500,
          video: 800,
          negotiable: true,
        },
        completionPercent: 100,
      },
    });
  };

  const logout = () => {
    setUser(null);
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
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, updateProfile, loginAttempts, isBlocked }}>
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
