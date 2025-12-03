import { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import Sidebar from './Sidebar';
import TopBar from './TopBar';
import { ArrowLeft, Calendar, TrendingUp, Users, Building2, CheckCircle2 } from 'lucide-react';
import { mockOffers, mockApplications } from '../lib/mockData';

interface OfferDetailPageProps {
  onLogout: () => void;
}

export default function OfferDetailPage({ onLogout }: OfferDetailPageProps) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [showApplicationModal, setShowApplicationModal] = useState(false);
  const [applicationMessage, setApplicationMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const offer = mockOffers.find(o => o.id === id);
  const hasApplied = mockApplications.some(app => app.offerId === id);

  if (!offer) {
    return (
      <div className="d-flex min-vh-100 bg-light">
        <Sidebar onLogout={onLogout} />
        <div className="flex-grow-1 d-flex align-items-center justify-content-center">
          <div className="text-center">
            <h2 className="mb-4">Offre non trouvée</h2>
            <Link to="/marketplace" className="btn btn-primary">Retour au marketplace</Link>
          </div>
        </div>
      </div>
    );
  }

  const isExpired = new Date(offer.deadline) < new Date();

  const handleSubmitApplication = () => {
    setSubmitted(true);
    setTimeout(() => {
      setShowApplicationModal(false);
      navigate('/candidatures');
    }, 2000);
  };

  return (
    <div className="d-flex min-vh-100 bg-light">
      <Sidebar onLogout={onLogout} />
      <div className="flex-grow-1 d-flex flex-column">
        <TopBar />
        
        <main className="flex-grow-1 p-4">
          <div className="container" style={{ maxWidth: '900px' }}>
            {/* Back Button */}
            <Link to="/marketplace" className="btn btn-link text-decoration-none mb-4 p-0">
              <ArrowLeft size={20} className="me-2" />
              Retour au marketplace
            </Link>

            <div className="card border-0 shadow-sm">
              {/* Header */}
              <div className="card-body p-5 border-bottom">
                <div className="d-flex gap-4 mb-4">
                  <div style={{ fontSize: '3rem' }}>{offer.logo}</div>
                  <div className="flex-grow-1">
                    <h1 className="mb-3">{offer.title}</h1>
                    <div className="d-flex align-items-center gap-2 mb-3">
                      <Building2 size={20} className="text-muted" />
                      <span className="fs-5 text-muted">{offer.company}</span>
                    </div>
                    <div className="d-flex flex-wrap gap-2">
                      <span className="badge bg-primary">{offer.domain}</span>
                      {offer.platforms.map(platform => (
                        <span key={platform} className="badge bg-light text-dark">{platform}</span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="row g-4 p-3 bg-light rounded">
                  <div className="col-md-3">
                    <div className="d-flex align-items-center gap-2 text-muted mb-1 small">
                      <TrendingUp size={16} />
                      <span>Budget</span>
                    </div>
                    <div className="fs-4">{offer.budget}€</div>
                  </div>
                  <div className="col-md-3">
                    <div className="d-flex align-items-center gap-2 text-muted mb-1 small">
                      <Users size={16} />
                      <span>Candidatures</span>
                    </div>
                    <div className="fs-4">{offer.applicationsCount}</div>
                  </div>
                  <div className="col-md-3">
                    <div className="d-flex align-items-center gap-2 text-muted mb-1 small">
                      <Calendar size={16} />
                      <span>Date limite</span>
                    </div>
                    <div className="fs-5">{new Date(offer.deadline).toLocaleDateString('fr-FR')}</div>
                  </div>
                  <div className="col-md-3">
                    <div className="d-flex align-items-center gap-2 text-muted mb-1 small">
                      <Users size={16} />
                      <span>Abonnés min</span>
                    </div>
                    <div className="fs-5">{offer.minFollowers.toLocaleString('fr-FR')}</div>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="card-body p-5">
                {/* Description */}
                <div className="mb-5">
                  <h4 className="mb-3">Description</h4>
                  <p className="text-muted">{offer.description}</p>
                </div>

                {/* Requirements */}
                <div className="mb-5">
                  <h4 className="mb-3">Contraintes et exigences</h4>
                  <ul className="list-unstyled">
                    {offer.requirements.map((req, index) => (
                      <li key={index} className="d-flex gap-2 mb-2">
                        <CheckCircle2 size={20} className="text-success flex-shrink-0 mt-1" />
                        <span className="text-muted">{req}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* CTA */}
                <div>
                  {hasApplied ? (
                    <button className="btn btn-secondary w-100" disabled>
                      Candidature déjà envoyée
                    </button>
                  ) : isExpired ? (
                    <button className="btn btn-secondary w-100" disabled>
                      Offre expirée
                    </button>
                  ) : (
                    <button 
                      className="btn btn-primary w-100"
                      data-bs-toggle="modal" 
                      data-bs-target="#applicationModal"
                      onClick={() => setShowApplicationModal(true)}
                    >
                      Postuler à cette offre
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* Application Modal */}
      {showApplicationModal && (
        <div className="modal fade show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog modal-dialog-centered modal-lg">
            <div className="modal-content">
              <div className="modal-header">
                <div>
                  <h5 className="modal-title">Postuler à cette offre</h5>
                  <p className="text-muted small mb-0">Envoyez votre candidature à {offer.company}</p>
                </div>
                <button 
                  type="button" 
                  className="btn-close" 
                  onClick={() => setShowApplicationModal(false)}
                ></button>
              </div>

              <div className="modal-body">
                {submitted ? (
                  <div className="text-center py-5">
                    <CheckCircle2 size={64} className="text-success mb-4" />
                    <h4 className="mb-2">Candidature envoyée !</h4>
                    <p className="text-muted">
                      Vous serez notifié de la réponse de l'entreprise
                    </p>
                  </div>
                ) : (
                  <div>
                    {/* Offer Summary */}
                    <div className="p-3 bg-light rounded mb-4">
                      <h6 className="mb-2">{offer.title}</h6>
                      <p className="small text-muted mb-0">{offer.company} • {offer.budget}€</p>
                    </div>

                    {/* Profile Preview */}
                    <div className="card mb-4">
                      <div className="card-body">
                        <h6 className="small mb-2">Votre profil visible par l'entreprise</h6>
                        <div className="small text-muted">
                          <p className="mb-1">• Domaines : Mode & Beauté, Lifestyle</p>
                          <p className="mb-1">• Plateformes : Instagram (45K), TikTok (32K)</p>
                          <p className="mb-0">• Taux d'engagement moyen : 5%</p>
                        </div>
                      </div>
                    </div>

                    {/* Message */}
                    <div className="mb-4">
                      <label className="form-label">Message de motivation</label>
                      <textarea
                        className="form-control"
                        rows={6}
                        value={applicationMessage}
                        onChange={(e) => setApplicationMessage(e.target.value)}
                        placeholder="Expliquez pourquoi vous êtes le bon profil pour cette collaboration..."
                      />
                    </div>
                  </div>
                )}
              </div>

              {!submitted && (
                <div className="modal-footer">
                  <button 
                    type="button" 
                    className="btn btn-outline-secondary"
                    onClick={() => setShowApplicationModal(false)}
                  >
                    Annuler
                  </button>
                  <button 
                    type="button" 
                    className="btn btn-primary"
                    onClick={handleSubmitApplication}
                  >
                    Envoyer ma candidature
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
