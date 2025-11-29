import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Target, User, Briefcase, BarChart3, DollarSign, AlertCircle, Check } from 'lucide-react';

interface ProfileCompletionPageProps {
  onComplete: () => void;
}

const DOMAINS = [
  'Mode & Beauté', 'Tech & Gaming', 'Sport & Fitness', 'Voyage',
  'Cuisine', 'Lifestyle', 'Business', 'Art & Culture'
];

const PLATFORMS = ['Instagram', 'TikTok', 'YouTube', 'Twitter', 'LinkedIn', 'Twitch'];

export default function ProfileCompletionPage({ onComplete }: ProfileCompletionPageProps) {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState(0);
  const [completion, setCompletion] = useState(0);
  const [loading, setLoading] = useState(true);

  const [name, setName] = useState('');
  const [pseudo, setPseudo] = useState('');
  const [bio, setBio] = useState('');
  const [location, setLocation] = useState('');
  const [selectedDomains, setSelectedDomains] = useState<string[]>([]);
  const [showOtherDomain, setShowOtherDomain] = useState(false);
  const [customDomain, setCustomDomain] = useState('');
  const [platforms, setPlatforms] = useState<Record<string, { active: boolean; followers: string }>>({
    Instagram: { active: false, followers: '' },
    TikTok: { active: false, followers: '' },
    YouTube: { active: false, followers: '' },
    Twitter: { active: false, followers: '' },
    LinkedIn: { active: false, followers: '' },
    Twitch: { active: false, followers: '' }
  });
  const [rates, setRates] = useState({ story: '', post: '', video: '', negotiable: false });
  const [errors, setErrors] = useState<string[]>([]);
  const [profileCompleted, setProfileCompleted] = useState(false);

  // Load existing profile data on mount
  useEffect(() => {
    const loadProfileData = async () => {
      try {
        const { authAPI } = await import('../services/api');
        const userData = await authAPI.getCurrentUser() as any;
        
        if (userData.profile) {
          const profile = userData.profile;
          // Load existing data
          if (profile.name) setName(profile.name);
          if (profile.pseudo) setPseudo(profile.pseudo);
          if (profile.bio) setBio(profile.bio);
          if (profile.location) setLocation(profile.location);
          if (profile.domains && profile.domains.length > 0) {
            setSelectedDomains(profile.domains);
          }
          if (profile.platforms) {
            setPlatforms(profile.platforms);
          }
          if (profile.rates) {
            setRates({
              story: profile.rates.story || '',
              post: profile.rates.post || '',
              video: profile.rates.video || '',
              negotiable: profile.rates.negotiable || false
            });
          }
        }
        
        setCompletion(userData.completion_percent || 0);
        setLoading(false);
      } catch (error) {
        console.error('Error loading profile data:', error);
        setLoading(false);
      }
    };
    loadProfileData();
  }, []);

  const calculateCompletion = () => {
    let score = 0;
    if (name) score += 15;
    if (pseudo) score += 15;
    if (bio) score += 10;
    if (location) score += 10;
    if (selectedDomains.length > 0) score += 20;
    const activePlatforms = Object.values(platforms).filter(p => p.active);
    if (activePlatforms.length > 0) score += 20;
    if (rates.story || rates.post || rates.video) score += 10;
    return score;
  };

  const validateAndNext = () => {
    const newErrors: string[] = [];

    if (activeTab === 0) {
      if (!name) newErrors.push('Le nom est obligatoire');
      if (!pseudo) newErrors.push('Le pseudo est obligatoire');
    }

    if (activeTab === 1) {
      if (selectedDomains.length === 0) {
        newErrors.push('Sélectionnez au moins un domaine d\'expertise');
      }
      if (showOtherDomain && !customDomain.trim()) {
        newErrors.push('Veuillez préciser votre domaine personnalisé');
      }
    }

    if (activeTab === 2) {
      const activePlatforms = Object.values(platforms).filter(p => p.active);
      if (activePlatforms.length === 0) {
        newErrors.push('Ajoutez au moins une plateforme');
      }
    }

    setErrors(newErrors);

    if (newErrors.length === 0) {
      if (activeTab < 3) {
        setActiveTab(activeTab + 1);
      } else {
        handleComplete();
      }
      setCompletion(calculateCompletion());
    }
  };

  const handleComplete = async () => {
    try {
      // Check if token exists
      const { getToken } = await import('../services/api');
      const token = getToken();
      if (!token) {
        setErrors(['Vous devez être connecté pour sauvegarder votre profil. Veuillez vous reconnecter.']);
        return;
      }

      // Prepare profile data
      const profileData = {
        name: name,
        pseudo: pseudo,
        bio: bio,
        location: location,
        domains: selectedDomains,
        platforms: platforms,
        rates: rates
      };

      // Send to backend
      const { authAPI } = await import('../services/api');
      const response = await authAPI.updateProfile(profileData) as any;
      
      // Update completion state
      setCompletion(response.completion_percent || 100);
      setProfileCompleted(true);
      onComplete();
      
      // Redirect to dashboard after successful save
      navigate('/dashboard');
    } catch (error: any) {
      const errorMessage = error.message || 'Erreur lors de la sauvegarde du profil';
      if (errorMessage.includes('authentification') || errorMessage.includes('token') || errorMessage.includes('401')) {
        setErrors(['Vous devez être connecté pour sauvegarder votre profil. Veuillez vous reconnecter.']);
      } else {
        setErrors([errorMessage]);
      }
    }
  };

  const toggleDomain = (domain: string) => {
    if (domain === 'Autre') {
      setShowOtherDomain(!showOtherDomain);
      if (showOtherDomain && customDomain) {
        // Remove custom domain if toggling off
        setSelectedDomains(selectedDomains.filter(d => d !== customDomain));
        setCustomDomain('');
      }
    } else {
      if (selectedDomains.includes(domain)) {
        setSelectedDomains(selectedDomains.filter(d => d !== domain));
      } else {
        setSelectedDomains([...selectedDomains, domain]);
      }
    }
  };

  const handleCustomDomainChange = (value: string) => {
    setCustomDomain(value);
    // Remove old custom domain if exists
    const oldCustom = selectedDomains.find(d => !DOMAINS.includes(d));
    if (oldCustom) {
      setSelectedDomains(selectedDomains.filter(d => d !== oldCustom));
    }
    // Add new custom domain if not empty
    if (value.trim()) {
      setSelectedDomains([...selectedDomains.filter(d => DOMAINS.includes(d)), value.trim()]);
    }
  };

  const tabs = [
    { icon: User, label: 'Informations' },
    { icon: Briefcase, label: 'Domaines' },
    { icon: BarChart3, label: 'Plateformes' },
    { icon: DollarSign, label: 'Tarifs' }
  ];

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center min-vh-100">
        <div className="text-center">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Chargement...</span>
          </div>
          <p className="mt-3 text-muted">Chargement de votre profil...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="d-flex min-vh-100 bg-light">
      {/* Sidebar */}
      <div className="sidebar bg-white" style={{ width: '280px' }}>
        <div className="p-4 border-bottom">
          <div className="d-flex align-items-center mb-4">
            <Target size={32} color="#0d6efd" className="me-2" />
            <span className="fs-4 fw-bold text-primary">InfluMatch</span>
          </div>
          <h5 className="mb-3">Complétion du profil</h5>
          <div className="d-flex align-items-center gap-2">
            <div className="progress flex-grow-1 progress-custom">
              <div className="progress-bar" style={{ width: `${completion}%` }}></div>
            </div>
            <span className="small text-muted">{completion}%</span>
          </div>
        </div>

        <nav className="p-3">
          {tabs.map((tab, index) => {
            const Icon = tab.icon;
            return (
              <button
                key={index}
                onClick={() => setActiveTab(index)}
                className={`sidebar-link w-100 border-0 bg-transparent ${activeTab === index ? 'active' : ''}`}
              >
                <Icon size={20} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-grow-1 p-4">
        <div className="container" style={{ maxWidth: '800px' }}>
          <div className="card shadow-sm border-0">
            <div className="card-body p-5">
              {errors.length > 0 && (
                <div className="alert alert-danger mb-4">
                  {errors.map((error, idx) => (
                    <div key={idx} className="d-flex align-items-center mb-1">
                      <AlertCircle size={16} className="me-2" />
                      <span>{error}</span>
                    </div>
                  ))}
                </div>
              )}

              {profileCompleted && (
                <div className="alert alert-success mb-4 d-flex align-items-center justify-content-between">
                  <div className="d-flex align-items-center">
                    <Check size={20} className="me-2" />
                    <span>Profil complété avec succès ! Vous pouvez continuer à le modifier ou accéder au dashboard.</span>
                  </div>
                  <button 
                    className="btn btn-sm btn-outline-success"
                    onClick={() => navigate('/dashboard')}
                  >
                    Aller au dashboard
                  </button>
                </div>
              )}

              {/* Tab 0: Personal Info */}
              {activeTab === 0 && (
                <div>
                  <h2 className="mb-4">Informations personnelles</h2>
                  
                  <div className="row g-3 mb-3">
                    <div className="col-md-6">
                      <label htmlFor="name" className="form-label">Nom complet *</label>
                      <input
                        type="text"
                        className="form-control"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Jean Dupont"
                      />
                    </div>
                    <div className="col-md-6">
                      <label htmlFor="pseudo" className="form-label">Pseudo *</label>
                      <input
                        type="text"
                        className="form-control"
                        id="pseudo"
                        value={pseudo}
                        onChange={(e) => setPseudo(e.target.value)}
                        placeholder="@jeandupont"
                      />
                    </div>
                  </div>

                  <div className="mb-3">
                    <label htmlFor="bio" className="form-label">Biographie</label>
                    <textarea
                      className="form-control"
                      id="bio"
                      value={bio}
                      onChange={(e) => setBio(e.target.value)}
                      placeholder="Parlez-nous de vous..."
                      rows={4}
                    />
                  </div>

                  <div className="mb-3">
                    <label htmlFor="location" className="form-label">Localisation</label>
                    <input
                      type="text"
                      className="form-control"
                      id="location"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      placeholder="Paris, France"
                    />
                  </div>
                </div>
              )}

              {/* Tab 1: Domains */}
              {activeTab === 1 && (
                <div>
                  <h2 className="mb-4">Domaines d'expertise</h2>
                  <p className="text-muted mb-4">Sélectionnez au moins un domaine</p>
                  
                  <div className="row g-3">
                    {DOMAINS.map((domain) => (
                      <div className="col-md-6" key={domain}>
                        <button
                          onClick={() => toggleDomain(domain)}
                          className={`w-100 p-3 text-start border rounded ${
                            selectedDomains.includes(domain)
                              ? 'border-primary border-2 bg-light'
                              : 'border-secondary'
                          }`}
                        >
                          <div className="d-flex justify-content-between align-items-center">
                            <span>{domain}</span>
                            {selectedDomains.includes(domain) && (
                              <Check size={20} className="text-primary" />
                            )}
                          </div>
                        </button>
                      </div>
                    ))}
                    
                    {/* Other Domain Option */}
                    <div className="col-md-6">
                      <button
                        onClick={() => toggleDomain('Autre')}
                        className={`w-100 p-3 text-start border rounded ${
                          showOtherDomain
                            ? 'border-primary border-2 bg-light'
                            : 'border-secondary'
                        }`}
                      >
                        <div className="d-flex justify-content-between align-items-center">
                          <span>Autre</span>
                          {showOtherDomain && (
                            <Check size={20} className="text-primary" />
                          )}
                        </div>
                      </button>
                    </div>
                  </div>
                  
                  {/* Custom Domain Input */}
                  {showOtherDomain && (
                    <div className="mt-3">
                      <label htmlFor="customDomain" className="form-label">Précisez votre domaine</label>
                      <input
                        type="text"
                        className="form-control"
                        id="customDomain"
                        value={customDomain}
                        onChange={(e) => handleCustomDomainChange(e.target.value)}
                        placeholder="Ex: Musique, Danse, Photographie, etc."
                      />
                      {customDomain && selectedDomains.includes(customDomain.trim()) && (
                        <div className="text-success small mt-2 d-flex align-items-center">
                          <Check size={16} className="me-1" />
                          Domaine personnalisé ajouté
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )}

              {/* Tab 2: Platforms */}
              {activeTab === 2 && (
                <div>
                  <h2 className="mb-4">Plateformes & Statistiques</h2>
                  <p className="text-muted mb-4">Ajoutez au moins une plateforme</p>
                  
                  <div className="row g-3">
                    {PLATFORMS.map((platform) => (
                      <div className="col-12" key={platform}>
                        <div className={`p-3 border rounded ${
                          platforms[platform].active ? 'border-primary border-2 bg-light' : ''
                        }`}>
                          <div className="form-check mb-3">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              id={platform}
                              checked={platforms[platform].active}
                              onChange={() =>
                                setPlatforms({
                                  ...platforms,
                                  [platform]: {
                                    ...platforms[platform],
                                    active: !platforms[platform].active
                                  }
                                })
                              }
                            />
                            <label className="form-check-label fw-semibold" htmlFor={platform}>
                              {platform}
                            </label>
                          </div>
                          {platforms[platform].active && (
                            <div className="ms-4">
                              <label className="form-label small">Nombre d'abonnés</label>
                              <input
                                type="number"
                                className="form-control"
                                value={platforms[platform].followers}
                                onChange={(e) =>
                                  setPlatforms({
                                    ...platforms,
                                    [platform]: {
                                      ...platforms[platform],
                                      followers: e.target.value
                                    }
                                  })
                                }
                                placeholder="10000"
                              />
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Tab 3: Rates */}
              {activeTab === 3 && (
                <div>
                  <h2 className="mb-4">Tarifs indicatifs</h2>
                  <p className="text-muted mb-4">Tarifs en euros (optionnel)</p>
                  
                  <div className="row g-3 mb-4">
                    <div className="col-md-4">
                      <label htmlFor="story" className="form-label">Story</label>
                      <input
                        type="number"
                        className="form-control"
                        id="story"
                        value={rates.story}
                        onChange={(e) => setRates({ ...rates, story: e.target.value })}
                        placeholder="50"
                      />
                    </div>
                    <div className="col-md-4">
                      <label htmlFor="post" className="form-label">Post</label>
                      <input
                        type="number"
                        className="form-control"
                        id="post"
                        value={rates.post}
                        onChange={(e) => setRates({ ...rates, post: e.target.value })}
                        placeholder="100"
                      />
                    </div>
                    <div className="col-md-4">
                      <label htmlFor="video" className="form-label">Vidéo</label>
                      <input
                        type="number"
                        className="form-control"
                        id="video"
                        value={rates.video}
                        onChange={(e) => setRates({ ...rates, video: e.target.value })}
                        placeholder="200"
                      />
                    </div>
                  </div>

                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="negotiable"
                      checked={rates.negotiable}
                      onChange={(e) => setRates({ ...rates, negotiable: e.target.checked })}
                    />
                    <label className="form-check-label" htmlFor="negotiable">
                      Tarifs négociables
                    </label>
                  </div>
                </div>
              )}

              {/* Navigation */}
              <div className="d-flex justify-content-between mt-5 pt-4 border-top">
                <button
                  className="btn btn-outline-secondary"
                  onClick={() => setActiveTab(Math.max(0, activeTab - 1))}
                  disabled={activeTab === 0}
                >
                  Précédent
                </button>
                <button className="btn btn-primary" onClick={validateAndNext}>
                  {activeTab === 3 ? 'Terminer' : 'Suivant'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
