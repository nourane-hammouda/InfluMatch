import React, { useState, useEffect } from 'react';
import  { Link } from 'react-router-dom';
import Sidebar from '../components/layout/Sidebar';
import TopBar from '../components/layout/TopBar';
import { TrendingUp, FileText, Briefcase, Eye, Star, ArrowRight } from 'lucide-react';
import { mockOffers, mockApplications, mockStats, mockUserProfile } from '../services/mockData';
import { authAPI } from '../services/api';

interface DashboardPageProps {
  onLogout: () => void;
}

export default function DashboardPage({ onLogout }: DashboardPageProps) {
  const [completionPercent, setCompletionPercent] = useState(0);
  const [userProfile, setUserProfile] = useState<any>(null);
  const recommendedOffers = mockOffers.slice(0, 3);
  const recentApplications = mockApplications.slice(0, 3);

  useEffect(() => {
    // Fetch user data to get completion percent and profile info
    const fetchUserData = async () => {
      try {
        const userData = await authAPI.getCurrentUser() as any;
        setCompletionPercent(userData.completion_percent || 0);
        if (userData.profile) {
          setUserProfile(userData.profile);
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };
    fetchUserData();
  }, []);

  const getStatusBadge = (status: string) => {
    const classes: Record<string, string> = {
      pending: 'badge-pending',
      accepted: 'badge-accepted',
      rejected: 'badge-rejected'
    };
    const labels: Record<string, string> = {
      pending: 'En attente',
      accepted: 'Acceptée',
      rejected: 'Refusée'
    };
    return <span className={`badge ${classes[status]}`}>{labels[status]}</span>;
  };

  return (
    <div className="d-flex min-vh-100 bg-light">
      <Sidebar onLogout={onLogout} />
      <div className="flex-grow-1 d-flex flex-column">
        <TopBar />
        
        <main className="flex-grow-1 p-4">
          <div className="container-fluid" style={{ maxWidth: '1400px' }}>
            {/* Header */}
            <div className="mb-4">
              <h1 className="display-5 mb-2">
                Bonjour {userProfile?.name || userProfile?.pseudo || 'Utilisateur'} 👋
              </h1>
              <p className="text-muted">
                {userProfile?.bio || 'Voici un aperçu de votre activité'}
              </p>
              {userProfile?.location && (
                <p className="text-muted small">
                  📍 {userProfile.location}
                </p>
              )}
              {userProfile?.domains && userProfile.domains.length > 0 && (
                <div className="d-flex gap-2 flex-wrap mt-2">
                  {userProfile.domains.map((domain: string, idx: number) => (
                    <span key={idx} className="badge bg-primary">{domain}</span>
                  ))}
                </div>
              )}
            </div>

            {/* Profile Completion Warning */}
            {completionPercent < 100 && (
              <div className="alert alert-warning mb-4">
                Profil incomplet ({completionPercent}%) = visibilité réduite. 
                <Link to="/profil/completion" className="alert-link ms-2">
                  Compléter mon profil
                </Link>
              </div>
            )}

            {/* Stats Cards */}
            <div className="row g-4 mb-4">
              <div className="col-md-6 col-lg-3">
                <div className="card stats-card primary h-100 border-0 shadow-sm">
                  <div className="card-body">
                    <div className="d-flex justify-content-between align-items-center mb-2">
                      <span className="text-muted">Candidatures</span>
                      <FileText size={20} className="text-primary" />
                    </div>
                    <div className="display-6 mb-1">{mockStats.totalApplications}</div>
                    <small className="text-muted">{mockStats.pending} en attente</small>
                  </div>
                </div>
              </div>

              <div className="col-md-6 col-lg-3">
                <div className="card stats-card success h-100 border-0 shadow-sm">
                  <div className="card-body">
                    <div className="d-flex justify-content-between align-items-center mb-2">
                      <span className="text-muted">Collaborations</span>
                      <Briefcase size={20} className="text-success" />
                    </div>
                    <div className="display-6 mb-1">{mockStats.activeCollaborations}</div>
                    <small className="text-muted">En cours</small>
                  </div>
                </div>
              </div>

              <div className="col-md-6 col-lg-3">
                <div className="card stats-card warning h-100 border-0 shadow-sm">
                  <div className="card-body">
                    <div className="d-flex justify-content-between align-items-center mb-2">
                      <span className="text-muted">Vues du profil</span>
                      <Eye size={20} className="text-warning" />
                    </div>
                    <div className="display-6 mb-1">{mockStats.profileViews}</div>
                    <small className="text-muted">Ce mois-ci</small>
                  </div>
                </div>
              </div>

              <div className="col-md-6 col-lg-3">
                <div className="card stats-card info h-100 border-0 shadow-sm">
                  <div className="card-body">
                    <div className="d-flex justify-content-between align-items-center mb-2">
                      <span className="text-muted">Offres compatibles</span>
                      <Star size={20} className="text-info" />
                    </div>
                    <div className="display-6 mb-1">{mockStats.matchingOffers}</div>
                    <small className="text-muted">Nouvelles</small>
                  </div>
                </div>
              </div>
            </div>

            <div className="row g-4 mb-4">
              {/* Recommended Offers */}
              <div className="col-lg-6">
                <div className="card border-0 shadow-sm h-100">
                  <div className="card-body">
                    <div className="d-flex justify-content-between align-items-center mb-4">
                      <h5 className="mb-0">Offres recommandées</h5>
                      <Link to="/marketplace" className="btn btn-sm btn-outline-primary">
                        Voir tout <ArrowRight size={16} className="ms-1" />
                      </Link>
                    </div>

                    {recommendedOffers.length > 0 ? (
                      <div className="d-flex flex-column gap-3">
                        {recommendedOffers.map((offer) => (
                          <Link
                            key={offer.id}
                            to={`/offre/${offer.id}`}
                            className="card card-hover border text-decoration-none"
                          >
                            <div className="card-body p-3">
                              <div className="d-flex gap-3">
                                <div style={{ fontSize: '2rem' }}>{offer.logo}</div>
                                <div className="flex-grow-1">
                                  <h6 className="mb-1">{offer.title}</h6>
                                  <p className="small text-muted mb-2">{offer.company}</p>
                                  <div className="d-flex gap-2 flex-wrap">
                                    <span className="badge bg-light text-dark">{offer.domain}</span>
                                    <span className="badge bg-light text-dark">{offer.budget}€</span>
                                    <span className="badge bg-success">
                                      <TrendingUp size={12} className="me-1" />
                                      95% match
                                    </span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </Link>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-5">
                        <p className="text-muted mb-3">Aucune offre recommandée pour le moment</p>
                        <Link to="/marketplace" className="btn btn-primary">
                          Explorer le marketplace
                        </Link>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Recent Applications */}
              <div className="col-lg-6">
                <div className="card border-0 shadow-sm h-100">
                  <div className="card-body">
                    <div className="d-flex justify-content-between align-items-center mb-4">
                      <h5 className="mb-0">Mes candidatures</h5>
                      <Link to="/candidatures" className="btn btn-sm btn-outline-primary">
                        Voir tout <ArrowRight size={16} className="ms-1" />
                      </Link>
                    </div>

                    {recentApplications.length > 0 ? (
                      <div className="d-flex flex-column gap-3">
                        {recentApplications.map((app) => (
                          <div key={app.id} className="card border">
                            <div className="card-body p-3">
                              <div className="d-flex justify-content-between align-items-start mb-2">
                                <h6 className="mb-0">{app.offerTitle}</h6>
                                {getStatusBadge(app.status)}
                              </div>
                              <p className="small text-muted mb-2">{app.company}</p>
                              <small className="text-muted">
                                Candidature envoyée le {new Date(app.appliedDate).toLocaleDateString('fr-FR')}
                              </small>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-5">
                        <p className="text-muted mb-3">Aucune candidature pour le moment</p>
                        <Link to="/marketplace" className="btn btn-primary">
                          Découvrir les offres
                        </Link>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="card bg-primary text-white border-0 shadow-sm">
              <div className="card-body p-4">
                <div className="row g-4 text-center">
                  <div className="col-md-4">
                    <div className="small opacity-75 mb-1">Taux d'engagement moyen</div>
                    <div className="h2 mb-0">
                      {mockUserProfile.platforms && mockUserProfile.platforms.length > 0
                        ? Math.round(
                            mockUserProfile.platforms.reduce((acc, p) => acc + (p.engagementRate || 0), 0) /
                            mockUserProfile.platforms.length
                          )
                        : 0}%
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="small opacity-75 mb-1">Audience totale</div>
                    <div className="h2 mb-0">
                      {mockUserProfile.platforms && mockUserProfile.platforms.length > 0
                        ? mockUserProfile.platforms
                            .reduce((acc, p) => acc + (p.followers || 0), 0)
                            .toLocaleString('fr-FR')
                        : '0'}
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="small opacity-75 mb-1">Taux d'acceptation</div>
                    <div className="h2 mb-0">
                      {mockStats.totalApplications > 0 && mockStats.acceptedApplications !== undefined
                        ? Math.round((mockStats.acceptedApplications / mockStats.totalApplications) * 100)
                        : 0}%
                    </div>
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
