import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Sidebar from '../components/layout/Sidebar';
import TopBar from '../components/layout/TopBar';
import { User, MapPin, Briefcase, DollarSign, Edit, Instagram, Youtube, Twitter, Linkedin } from 'lucide-react';
import { authAPI } from '../services/api';

interface ProfilePageProps {
  onLogout: () => void;
}

export default function ProfilePage({ onLogout }: ProfilePageProps) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState<any>(null);
  const [completionPercent, setCompletionPercent] = useState(0);

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const userData = await authAPI.getCurrentUser() as any;
        setProfile(userData.profile || {});
        setCompletionPercent(userData.completion_percent || 0);
        setLoading(false);
      } catch (error) {
        console.error('Error loading profile:', error);
        setLoading(false);
      }
    };
    loadProfile();
  }, []);

  const getPlatformIcon = (platformName: string) => {
    const icons: Record<string, any> = {
      'Instagram': Instagram,
      'YouTube': Youtube,
      'Twitter': Twitter,
      'LinkedIn': Linkedin,
    };
    return icons[platformName] || Briefcase;
  };

  if (loading) {
    return (
      <div className="d-flex min-vh-100 bg-light">
        <Sidebar onLogout={onLogout} />
        <div className="flex-grow-1 d-flex flex-column">
          <TopBar />
          <main className="flex-grow-1 p-4 d-flex justify-content-center align-items-center">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Chargement...</span>
            </div>
          </main>
        </div>
      </div>
    );
  }

  return (
    <div className="d-flex min-vh-100 bg-light">
      <Sidebar onLogout={onLogout} />
      <div className="flex-grow-1 d-flex flex-column">
        <TopBar />
        
        <main className="flex-grow-1 p-4">
          <div className="container-fluid" style={{ maxWidth: '1200px' }}>
            {/* Header */}
            <div className="d-flex justify-content-between align-items-center mb-4">
              <div>
                <h1 className="display-6 mb-2">Mon Profil</h1>
                <p className="text-muted">Gérez vos informations personnelles</p>
              </div>
              <Link to="/profil/completion" className="btn btn-primary">
                <Edit size={18} className="me-2" />
                Modifier le profil
              </Link>
            </div>

            {/* Completion Progress */}
            {completionPercent < 100 && (
              <div className="alert alert-warning mb-4">
                <div className="d-flex justify-content-between align-items-center">
                  <span>Profil incomplet ({completionPercent}%)</span>
                  <Link to="/profil/completion" className="alert-link">
                    Compléter maintenant
                  </Link>
                </div>
                <div className="progress mt-2" style={{ height: '8px' }}>
                  <div 
                    className="progress-bar bg-warning" 
                    style={{ width: `${completionPercent}%` }}
                  ></div>
                </div>
              </div>
            )}

            <div className="row g-4">
              {/* Informations Personnelles */}
              <div className="col-lg-8">
                <div className="card border-0 shadow-sm mb-4">
                  <div className="card-header bg-white border-bottom">
                    <h5 className="mb-0 d-flex align-items-center">
                      <User size={20} className="me-2 text-primary" />
                      Informations Personnelles
                    </h5>
                  </div>
                  <div className="card-body">
                    <div className="row g-3">
                      <div className="col-md-6">
                        <label className="form-label text-muted small">Nom / Pseudo</label>
                        <p className="mb-0 fw-semibold">
                          {profile?.name || profile?.pseudo || 'Non renseigné'}
                        </p>
                      </div>
                      <div className="col-md-6">
                        <label className="form-label text-muted small">Pseudo</label>
                        <p className="mb-0 fw-semibold">
                          {profile?.pseudo || 'Non renseigné'}
                        </p>
                      </div>
                      <div className="col-12">
                        <label className="form-label text-muted small">Biographie</label>
                        <p className="mb-0">
                          {profile?.bio || 'Aucune biographie renseignée'}
                        </p>
                      </div>
                      <div className="col-12">
                        <label className="form-label text-muted small d-flex align-items-center">
                          <MapPin size={16} className="me-1" />
                          Localisation
                        </label>
                        <p className="mb-0">
                          {profile?.location || 'Non renseignée'}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Domaines d'Expertise */}
                {profile?.domains && profile.domains.length > 0 && (
                  <div className="card border-0 shadow-sm mb-4">
                    <div className="card-header bg-white border-bottom">
                      <h5 className="mb-0 d-flex align-items-center">
                        <Briefcase size={20} className="me-2 text-primary" />
                        Domaines d'Expertise
                      </h5>
                    </div>
                    <div className="card-body">
                      <div className="d-flex flex-wrap gap-2">
                        {profile.domains.map((domain: string, idx: number) => (
                          <span key={idx} className="badge bg-primary fs-6 px-3 py-2">
                            {domain}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* Plateformes Sociales */}
                {profile?.platforms && Object.keys(profile.platforms).length > 0 && (
                  <div className="card border-0 shadow-sm mb-4">
                    <div className="card-header bg-white border-bottom">
                      <h5 className="mb-0 d-flex align-items-center">
                        <Briefcase size={20} className="me-2 text-primary" />
                        Plateformes Sociales
                      </h5>
                    </div>
                    <div className="card-body">
                      <div className="row g-3">
                        {Object.entries(profile.platforms).map(([platformName, platformData]: [string, any]) => {
                          if (!platformData.active) return null;
                          const Icon = getPlatformIcon(platformName);
                          return (
                            <div key={platformName} className="col-md-6">
                              <div className="d-flex align-items-center p-3 border rounded">
                                <Icon size={24} className="me-3 text-primary" />
                                <div className="flex-grow-1">
                                  <div className="fw-semibold">{platformName}</div>
                                  <div className="text-muted small">
                                    {parseInt(platformData.followers?.toString().replace(/\D/g, '') || '0').toLocaleString('fr-FR')} abonnés
                                  </div>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Tarifs */}
              <div className="col-lg-4">
                <div className="card border-0 shadow-sm">
                  <div className="card-header bg-white border-bottom">
                    <h5 className="mb-0 d-flex align-items-center">
                      <DollarSign size={20} className="me-2 text-primary" />
                      Tarifs
                    </h5>
                  </div>
                  <div className="card-body">
                    {profile?.rates && (
                      <>
                        {profile.rates.story && (
                          <div className="mb-3 pb-3 border-bottom">
                            <label className="form-label text-muted small">Story</label>
                            <p className="mb-0 fw-semibold fs-5">
                              {parseFloat(profile.rates.story).toLocaleString('fr-FR')} €
                            </p>
                          </div>
                        )}
                        {profile.rates.post && (
                          <div className="mb-3 pb-3 border-bottom">
                            <label className="form-label text-muted small">Post</label>
                            <p className="mb-0 fw-semibold fs-5">
                              {parseFloat(profile.rates.post).toLocaleString('fr-FR')} €
                            </p>
                          </div>
                        )}
                        {profile.rates.video && (
                          <div className="mb-3 pb-3 border-bottom">
                            <label className="form-label text-muted small">Vidéo</label>
                            <p className="mb-0 fw-semibold fs-5">
                              {parseFloat(profile.rates.video).toLocaleString('fr-FR')} €
                            </p>
                          </div>
                        )}
                        {profile.rates.negotiable !== undefined && (
                          <div className="mt-3">
                            <span className={`badge ${profile.rates.negotiable ? 'bg-success' : 'bg-secondary'}`}>
                              {profile.rates.negotiable ? 'Tarifs négociables' : 'Tarifs fixes'}
                            </span>
                          </div>
                        )}
                        {!profile.rates.story && !profile.rates.post && !profile.rates.video && (
                          <p className="text-muted mb-0">Aucun tarif renseigné</p>
                        )}
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

