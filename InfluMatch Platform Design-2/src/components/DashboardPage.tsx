import { Link } from 'react-router-dom';
import Sidebar from './Sidebar';
import TopBar from './TopBar';
import { TrendingUp, FileText, Briefcase, Eye, Star, ArrowRight, Sparkles, Award, Target, Zap, Heart, Trophy, CheckCircle, Clock, Calendar, Users, Search } from 'lucide-react';
import { mockOffers, mockApplications, mockStats, mockUserProfile } from '../lib/mockData';

interface DashboardPageProps {
  onLogout: () => void;
}

export default function DashboardPage({ onLogout }: DashboardPageProps) {
  const recommendedOffers = mockOffers.slice(0, 3);
  const recentApplications = mockApplications.slice(0, 3);

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
    const icons: Record<string, any> = {
      pending: Clock,
      accepted: CheckCircle,
      rejected: FileText
    };
    const Icon = icons[status];
    return (
      <span className={`badge ${classes[status]} d-inline-flex align-items-center gap-1`}>
        <Icon size={14} />
        {labels[status]}
      </span>
    );
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
              <div className="d-flex align-items-center gap-3 mb-3">
                <div className="icon-container pink">
                  <Sparkles size={28} />
                </div>
                <div>
                  <h1 className="display-5 fw-bold mb-1">
                    Bonjour {mockUserProfile.name.split(' ')[0]} 👋
                  </h1>
                  <p className="text-muted mb-0">Voici un aperçu de votre activité</p>
                </div>
              </div>
            </div>

            {/* Profile Completion Warning */}
            {mockUserProfile.completionRate < 100 && (
              <div className="alert border-0 shadow-sm mb-4 position-relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #fef3c7 0%, #fde68a 100%)' }}>
                <div className="d-flex align-items-center gap-3">
                  <Award size={24} className="text-warning" />
                  <div>
                    <strong className="text-dark">Profil incomplet ({mockUserProfile.completionRate}%)</strong>
                    <p className="mb-0 small text-dark opacity-75">Complétez votre profil pour maximiser votre visibilité</p>
                  </div>
                  <Link to="/profil" className="btn btn-sm btn-dark ms-auto">
                    Compléter
                  </Link>
                </div>
              </div>
            )}

            {/* Stats Cards */}
            <div className="row g-4 mb-4">
              <div className="col-md-6 col-lg-3">
                <div className="card stats-card primary h-100 border-0 shadow-sm">
                  <div className="card-body">
                    <div className="d-flex justify-content-between align-items-start mb-3">
                      <div>
                        <p className="text-muted mb-1 small fw-semibold">Candidatures</p>
                        <h2 className="display-5 fw-bold mb-0">{mockStats.totalApplications}</h2>
                      </div>
                      <div className="icon-container primary">
                        <FileText size={24} />
                      </div>
                    </div>
                    <div className="d-flex align-items-center gap-2">
                      <TrendingUp size={16} className="text-success" />
                      <small className="text-muted">{mockStats.pendingApplications} en attente</small>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-md-6 col-lg-3">
                <div className="card stats-card success h-100 border-0 shadow-sm">
                  <div className="card-body">
                    <div className="d-flex justify-content-between align-items-start mb-3">
                      <div>
                        <p className="text-muted mb-1 small fw-semibold">Collaborations</p>
                        <h2 className="display-5 fw-bold mb-0">{mockStats.activeCollaborations}</h2>
                      </div>
                      <div className="icon-container success">
                        <Briefcase size={24} />
                      </div>
                    </div>
                    <div className="d-flex align-items-center gap-2">
                      <Zap size={16} className="text-success" />
                      <small className="text-muted">En cours</small>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-md-6 col-lg-3">
                <div className="card stats-card pink h-100 border-0 shadow-sm">
                  <div className="card-body">
                    <div className="d-flex justify-content-between align-items-start mb-3">
                      <div>
                        <p className="text-muted mb-1 small fw-semibold">Vues du profil</p>
                        <h2 className="display-5 fw-bold mb-0">{mockStats.profileViews}</h2>
                      </div>
                      <div className="icon-container pink">
                        <Eye size={24} />
                      </div>
                    </div>
                    <div className="d-flex align-items-center gap-2">
                      <TrendingUp size={16} className="text-success" />
                      <small className="text-muted">Ce mois-ci</small>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-md-6 col-lg-3">
                <div className="card stats-card info h-100 border-0 shadow-sm">
                  <div className="card-body">
                    <div className="d-flex justify-content-between align-items-start mb-3">
                      <div>
                        <p className="text-muted mb-1 small fw-semibold">Offres compatibles</p>
                        <h2 className="display-5 fw-bold mb-0">{mockStats.matchingOffers}</h2>
                      </div>
                      <div className="icon-container info">
                        <Star size={24} />
                      </div>
                    </div>
                    <div className="d-flex align-items-center gap-2">
                      <Sparkles size={16} className="text-info" />
                      <small className="text-muted">Nouvelles</small>
                    </div>
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
                      <div className="d-flex align-items-center gap-2">
                        <Target className="text-primary" size={24} />
                        <h5 className="mb-0 fw-bold">Offres recommandées</h5>
                      </div>
                      <Link to="/marketplace" className="btn btn-sm btn-gradient-primary">
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
                                <div style={{ fontSize: '2.5rem' }}>{offer.logo}</div>
                                <div className="flex-grow-1">
                                  <h6 className="mb-2 fw-bold">{offer.title}</h6>
                                  <p className="small text-muted mb-2">{offer.company}</p>
                                  <div className="d-flex gap-2 flex-wrap align-items-center">
                                    <span className="badge badge-purple">{offer.domain}</span>
                                    <span className="badge badge-orange">
                                      <TrendingUp size={12} className="me-1" />
                                      {offer.budget}€
                                    </span>
                                    <span className="match-score">
                                      <Heart size={12} fill="currentColor" />
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
                        <div className="icon-container warning mb-3" style={{ margin: '0 auto' }}>
                          <Target size={32} />
                        </div>
                        <p className="text-muted mb-3">Aucune offre recommandée</p>
                        <Link to="/marketplace" className="btn btn-gradient-primary">
                          <Search size={18} className="me-2" />
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
                      <div className="d-flex align-items-center gap-2">
                        <FileText className="text-success" size={24} />
                        <h5 className="mb-0 fw-bold">Mes candidatures</h5>
                      </div>
                      <Link to="/candidatures" className="btn btn-sm btn-gradient-pink">
                        Voir tout <ArrowRight size={16} className="ms-1" />
                      </Link>
                    </div>

                    {recentApplications.length > 0 ? (
                      <div className="d-flex flex-column gap-3">
                        {recentApplications.map((app) => (
                          <div key={app.id} className="card border">
                            <div className="card-body p-3">
                              <div className="d-flex justify-content-between align-items-start mb-2">
                                <h6 className="mb-0 fw-semibold">{app.offerTitle}</h6>
                                {getStatusBadge(app.status)}
                              </div>
                              <p className="small text-muted mb-2">
                                <Award size={14} className="me-1" />
                                {app.company}
                              </p>
                              <small className="text-muted d-flex align-items-center gap-1">
                                <Calendar size={14} />
                                {new Date(app.appliedDate).toLocaleDateString('fr-FR')}
                              </small>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-5">
                        <div className="icon-container info mb-3" style={{ margin: '0 auto' }}>
                          <FileText size={32} />
                        </div>
                        <p className="text-muted mb-3">Aucune candidature</p>
                        <Link to="/marketplace" className="btn btn-gradient-pink">
                          <Sparkles size={18} className="me-2" />
                          Découvrir les offres
                        </Link>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="card border-0 shadow position-relative overflow-hidden">
              <div className="position-absolute top-0 start-0 w-100 h-100 bg-gradient-purple" style={{ opacity: 0.95 }}></div>
              <div className="card-body p-4 position-relative text-white" style={{ zIndex: 1 }}>
                <div className="d-flex align-items-center gap-2 mb-4">
                  <Trophy size={28} />
                  <h5 className="mb-0 fw-bold">Vos performances</h5>
                </div>
                <div className="row g-4 text-center">
                  <div className="col-md-4">
                    <div className="p-3 bg-white bg-opacity-10 rounded-4">
                      <TrendingUp size={32} className="mb-2" />
                      <div className="small opacity-75 mb-1">Taux d'engagement moyen</div>
                      <div className="h2 mb-0 fw-bold">
                        {Object.values(mockUserProfile.platforms).reduce((acc, p) => acc + p.engagementRate, 0) / 
                         Object.keys(mockUserProfile.platforms).length}%
                      </div>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="p-3 bg-white bg-opacity-10 rounded-4">
                      <Users size={32} className="mb-2" />
                      <div className="small opacity-75 mb-1">Audience totale</div>
                      <div className="h2 mb-0 fw-bold">
                        {Object.values(mockUserProfile.platforms)
                          .reduce((acc, p) => acc + p.followers, 0)
                          .toLocaleString('fr-FR')}
                      </div>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="p-3 bg-white bg-opacity-10 rounded-4">
                      <Award size={32} className="mb-2" />
                      <div className="small opacity-75 mb-1">Taux d'acceptation</div>
                      <div className="h2 mb-0 fw-bold">
                        {Math.round((mockStats.acceptedApplications / mockStats.totalApplications) * 100)}%
                      </div>
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