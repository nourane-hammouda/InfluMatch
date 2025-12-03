import { useState } from 'react';
import { Link } from 'react-router-dom';
import Sidebar from './Sidebar';
import TopBar from './TopBar';
import { FileText, Calendar, Building2, ExternalLink } from 'lucide-react';
import { mockApplications, mockOffers } from '../lib/mockData';

interface ApplicationsPageProps {
  onLogout: () => void;
}

export default function ApplicationsPage({ onLogout }: ApplicationsPageProps) {
  const [activeTab, setActiveTab] = useState('all');

  const getStatusBadge = (status: string) => {
    const classes: Record<string, string> = {
      pending: 'badge-pending',
      accepted: 'badge-accepted',
      rejected: 'badge-rejected',
      expired: 'badge-expired'
    };
    const labels: Record<string, string> = {
      pending: 'En attente',
      accepted: 'Acceptée',
      rejected: 'Refusée',
      expired: 'Expirée'
    };
    return <span className={`badge ${classes[status]}`}>{labels[status]}</span>;
  };

  const filteredApplications = activeTab === 'all' 
    ? mockApplications 
    : mockApplications.filter(app => app.status === activeTab);

  const statusCounts = {
    all: mockApplications.length,
    pending: mockApplications.filter(app => app.status === 'pending').length,
    accepted: mockApplications.filter(app => app.status === 'accepted').length,
    rejected: mockApplications.filter(app => app.status === 'rejected').length
  };

  return (
    <div className="d-flex min-vh-100 bg-light">
      <Sidebar onLogout={onLogout} />
      <div className="flex-grow-1 d-flex flex-column">
        <TopBar />
        
        <main className="flex-grow-1 p-4">
          <div className="container-fluid" style={{ maxWidth: '1200px' }}>
            {/* Header */}
            <div className="mb-4">
              <h1 className="display-5 mb-2">Mes candidatures</h1>
              <p className="text-muted">Suivez l'évolution de vos candidatures</p>
            </div>

            {/* Stats */}
            <div className="row g-4 mb-4">
              <div className="col-md-3">
                <div className="card border-0 shadow-sm">
                  <div className="card-body">
                    <div className="text-muted mb-1">Total</div>
                    <div className="display-6">{statusCounts.all}</div>
                  </div>
                </div>
              </div>
              <div className="col-md-3">
                <div className="card border-0 shadow-sm">
                  <div className="card-body">
                    <div className="text-muted mb-1">En attente</div>
                    <div className="display-6 text-warning">{statusCounts.pending}</div>
                  </div>
                </div>
              </div>
              <div className="col-md-3">
                <div className="card border-0 shadow-sm">
                  <div className="card-body">
                    <div className="text-muted mb-1">Acceptées</div>
                    <div className="display-6 text-success">{statusCounts.accepted}</div>
                  </div>
                </div>
              </div>
              <div className="col-md-3">
                <div className="card border-0 shadow-sm">
                  <div className="card-body">
                    <div className="text-muted mb-1">Refusées</div>
                    <div className="display-6 text-danger">{statusCounts.rejected}</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Applications List */}
            <div className="card border-0 shadow-sm">
              <div className="card-header bg-white border-bottom">
                <ul className="nav nav-tabs card-header-tabs">
                  <li className="nav-item">
                    <button 
                      className={`nav-link ${activeTab === 'all' ? 'active' : ''}`}
                      onClick={() => setActiveTab('all')}
                    >
                      Toutes ({statusCounts.all})
                    </button>
                  </li>
                  <li className="nav-item">
                    <button 
                      className={`nav-link ${activeTab === 'pending' ? 'active' : ''}`}
                      onClick={() => setActiveTab('pending')}
                    >
                      En attente ({statusCounts.pending})
                    </button>
                  </li>
                  <li className="nav-item">
                    <button 
                      className={`nav-link ${activeTab === 'accepted' ? 'active' : ''}`}
                      onClick={() => setActiveTab('accepted')}
                    >
                      Acceptées ({statusCounts.accepted})
                    </button>
                  </li>
                  <li className="nav-item">
                    <button 
                      className={`nav-link ${activeTab === 'rejected' ? 'active' : ''}`}
                      onClick={() => setActiveTab('rejected')}
                    >
                      Refusées ({statusCounts.rejected})
                    </button>
                  </li>
                </ul>
              </div>

              <div className="card-body p-4">
                {filteredApplications.length > 0 ? (
                  <div className="d-flex flex-column gap-3">
                    {filteredApplications.map((application) => {
                      const offer = mockOffers.find(o => o.id === application.offerId);
                      return (
                        <div key={application.id} className="card border card-hover">
                          <div className="card-body p-4">
                            <div className="d-flex justify-content-between align-items-start mb-3">
                              <div className="flex-grow-1">
                                <div className="d-flex align-items-center gap-3 mb-2">
                                  <h5 className="mb-0">{application.offerTitle}</h5>
                                  {getStatusBadge(application.status)}
                                </div>
                                <div className="d-flex align-items-center gap-2 text-muted mb-2">
                                  <Building2 size={16} />
                                  <span>{application.company}</span>
                                </div>
                                <div className="d-flex align-items-center gap-2 text-muted small">
                                  <Calendar size={16} />
                                  <span>Candidature envoyée le {new Date(application.appliedDate).toLocaleDateString('fr-FR')}</span>
                                </div>
                              </div>
                            </div>

                            {/* Message */}
                            <div className="p-3 bg-light rounded mb-3">
                              <div className="small text-muted mb-1">Votre message</div>
                              <p className="mb-0">{application.message}</p>
                            </div>

                            {/* Offer Details */}
                            {offer && (
                              <div className="d-flex justify-content-between align-items-center">
                                <div className="d-flex gap-2">
                                  <span className="badge bg-light text-dark">{offer.domain}</span>
                                  <span className="badge bg-light text-dark">{offer.budget}€</span>
                                  {offer.platforms.map(platform => (
                                    <span key={platform} className="badge bg-light text-dark">{platform}</span>
                                  ))}
                                </div>
                                <Link to={`/offre/${offer.id}`} className="btn btn-sm btn-outline-primary">
                                  Voir l'offre
                                  <ExternalLink size={14} className="ms-2" />
                                </Link>
                              </div>
                            )}

                            {/* Status Messages */}
                            {application.status === 'accepted' && (
                              <div className="alert alert-success mt-3 mb-0 small">
                                ✓ Félicitations ! Votre candidature a été acceptée. L'entreprise vous contactera prochainement.
                              </div>
                            )}
                            {application.status === 'rejected' && (
                              <div className="alert alert-danger mt-3 mb-0 small">
                                Votre candidature n'a pas été retenue cette fois-ci. Continuez à explorer d'autres opportunités !
                              </div>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <div className="text-center py-5">
                    <FileText size={64} className="text-muted mb-4" />
                    <h5 className="mb-2">Aucune candidature</h5>
                    <p className="text-muted mb-4">
                      {activeTab === 'all' 
                        ? "Vous n'avez pas encore envoyé de candidature"
                        : `Aucune candidature avec le statut "${activeTab}"`
                      }
                    </p>
                    <Link to="/marketplace" className="btn btn-primary">
                      Explorer les offres
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
