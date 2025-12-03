import { useState } from 'react';
import { Link } from 'react-router-dom';
import Sidebar from './Sidebar';
import TopBar from './TopBar';
import { Filter, Calendar, TrendingUp, Users } from 'lucide-react';
import { mockOffers, mockApplications } from '../lib/mockData';

interface MarketplacePageProps {
  onLogout: () => void;
}

const DOMAINS = ['Mode & Beauté', 'Tech & Gaming', 'Sport & Fitness', 'Voyage', 'Cuisine', 'Lifestyle', 'Business', 'Art & Culture'];
const PLATFORMS = ['Instagram', 'TikTok', 'YouTube', 'Twitter', 'LinkedIn', 'Twitch'];

export default function MarketplacePage({ onLogout }: MarketplacePageProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDomains, setSelectedDomains] = useState<string[]>([]);
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>([]);
  const [minBudget, setMinBudget] = useState('');
  const [maxBudget, setMaxBudget] = useState('');
  const [minFollowers, setMinFollowers] = useState('');
  const [sortBy, setSortBy] = useState('recent');

  const appliedOfferIds = mockApplications.map(app => app.offerId);

  const filteredOffers = mockOffers
    .filter(offer => {
      if (searchQuery && !offer.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
          !offer.description.toLowerCase().includes(searchQuery.toLowerCase())) {
        return false;
      }
      if (selectedDomains.length > 0 && !selectedDomains.includes(offer.domain)) {
        return false;
      }
      if (selectedPlatforms.length > 0 && !offer.platforms.some(p => selectedPlatforms.includes(p))) {
        return false;
      }
      if (minBudget && offer.budget < parseInt(minBudget)) {
        return false;
      }
      if (maxBudget && offer.budget > parseInt(maxBudget)) {
        return false;
      }
      if (minFollowers && offer.minFollowers < parseInt(minFollowers)) {
        return false;
      }
      return true;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'budget-asc':
          return a.budget - b.budget;
        case 'budget-desc':
          return b.budget - a.budget;
        case 'popular':
          return b.applicationsCount - a.applicationsCount;
        case 'recent':
        default:
          return new Date(b.deadline).getTime() - new Date(a.deadline).getTime();
      }
    });

  const toggleDomain = (domain: string) => {
    if (selectedDomains.includes(domain)) {
      setSelectedDomains(selectedDomains.filter(d => d !== domain));
    } else {
      setSelectedDomains([...selectedDomains, domain]);
    }
  };

  const togglePlatform = (platform: string) => {
    if (selectedPlatforms.includes(platform)) {
      setSelectedPlatforms(selectedPlatforms.filter(p => p !== platform));
    } else {
      setSelectedPlatforms([...selectedPlatforms, platform]);
    }
  };

  const clearFilters = () => {
    setSelectedDomains([]);
    setSelectedPlatforms([]);
    setMinBudget('');
    setMaxBudget('');
    setMinFollowers('');
  };

  return (
    <div className="d-flex min-vh-100 bg-light">
      <Sidebar onLogout={onLogout} />
      <div className="flex-grow-1 d-flex flex-column">
        <TopBar onSearch={setSearchQuery} />
        
        <main className="flex-grow-1 p-4">
          <div className="container-fluid" style={{ maxWidth: '1400px' }}>
            {/* Header */}
            <div className="mb-4">
              <h1 className="display-5 mb-2">Marketplace</h1>
              <p className="text-muted">Découvrez les opportunités qui correspondent à votre profil</p>
            </div>

            <div className="row g-4">
              {/* Filters Sidebar */}
              <div className="col-lg-3">
                <div className="card border-0 shadow-sm filter-sidebar">
                  <div className="card-body">
                    <div className="d-flex justify-content-between align-items-center mb-4">
                      <div className="d-flex align-items-center gap-2">
                        <Filter size={20} />
                        <h5 className="mb-0">Filtres</h5>
                      </div>
                      <button className="btn btn-sm btn-link text-decoration-none" onClick={clearFilters}>
                        Effacer
                      </button>
                    </div>

                    {/* Domain Filter */}
                    <div className="mb-4">
                      <h6 className="mb-3">Domaine</h6>
                      <div className="d-flex flex-column gap-2">
                        {DOMAINS.map(domain => (
                          <div key={domain} className="form-check">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              id={`domain-${domain}`}
                              checked={selectedDomains.includes(domain)}
                              onChange={() => toggleDomain(domain)}
                            />
                            <label className="form-check-label small" htmlFor={`domain-${domain}`}>
                              {domain}
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Platform Filter */}
                    <div className="mb-4">
                      <h6 className="mb-3">Plateforme</h6>
                      <div className="d-flex flex-column gap-2">
                        {PLATFORMS.map(platform => (
                          <div key={platform} className="form-check">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              id={`platform-${platform}`}
                              checked={selectedPlatforms.includes(platform)}
                              onChange={() => togglePlatform(platform)}
                            />
                            <label className="form-check-label small" htmlFor={`platform-${platform}`}>
                              {platform}
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Budget Filter */}
                    <div className="mb-4">
                      <h6 className="mb-3">Budget (€)</h6>
                      <div className="d-flex flex-column gap-2">
                        <input
                          type="number"
                          className="form-control form-control-sm"
                          placeholder="Min"
                          value={minBudget}
                          onChange={(e) => setMinBudget(e.target.value)}
                        />
                        <input
                          type="number"
                          className="form-control form-control-sm"
                          placeholder="Max"
                          value={maxBudget}
                          onChange={(e) => setMaxBudget(e.target.value)}
                        />
                      </div>
                    </div>

                    {/* Followers Filter */}
                    <div>
                      <h6 className="mb-3">Abonnés requis</h6>
                      <input
                        type="number"
                        className="form-control form-control-sm"
                        placeholder="Minimum"
                        value={minFollowers}
                        onChange={(e) => setMinFollowers(e.target.value)}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Offers Grid */}
              <div className="col-lg-9">
                {/* Sort */}
                <div className="d-flex justify-content-between align-items-center mb-4">
                  <p className="text-muted mb-0">
                    {filteredOffers.length} offre{filteredOffers.length > 1 ? 's' : ''} trouvée{filteredOffers.length > 1 ? 's' : ''}
                  </p>
                  <select 
                    className="form-select form-select-sm" 
                    style={{ width: 'auto' }}
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                  >
                    <option value="recent">Plus récent</option>
                    <option value="budget-desc">Budget décroissant</option>
                    <option value="budget-asc">Budget croissant</option>
                    <option value="popular">Popularité</option>
                  </select>
                </div>

                {filteredOffers.length > 0 ? (
                  <div className="row g-4">
                    {filteredOffers.map((offer) => {
                      const hasApplied = appliedOfferIds.includes(offer.id);
                      const isExpired = new Date(offer.deadline) < new Date();
                      
                      return (
                        <div className="col-md-6" key={offer.id}>
                          <Link
                            to={`/offre/${offer.id}`}
                            className={`card card-hover h-100 border-0 shadow-sm text-decoration-none ${
                              isExpired ? 'opacity-50' : ''
                            }`}
                          >
                            <div className="card-body p-4">
                              <div className="d-flex gap-3 mb-3">
                                <div style={{ fontSize: '2rem' }}>{offer.logo}</div>
                                <div className="flex-grow-1">
                                  <h5 className="mb-1">{offer.title}</h5>
                                  <p className="small text-muted">{offer.company}</p>
                                </div>
                                {hasApplied && (
                                  <span className="badge badge-pending align-self-start">Candidature envoyée</span>
                                )}
                              </div>

                              <p className="small text-muted mb-3 line-clamp-2">
                                {offer.description}
                              </p>

                              <div className="d-flex flex-wrap gap-2 mb-3">
                                <span className="badge bg-light text-dark">{offer.domain}</span>
                                {offer.platforms.map(platform => (
                                  <span key={platform} className="badge bg-light text-dark">{platform}</span>
                                ))}
                              </div>

                              <div className="d-flex justify-content-between align-items-center text-muted small">
                                <div className="d-flex gap-3">
                                  <span className="d-flex align-items-center gap-1">
                                    <TrendingUp size={14} />
                                    {offer.budget}€
                                  </span>
                                  <span className="d-flex align-items-center gap-1">
                                    <Users size={14} />
                                    {offer.applicationsCount}
                                  </span>
                                  <span className="d-flex align-items-center gap-1">
                                    <Calendar size={14} />
                                    {new Date(offer.deadline).toLocaleDateString('fr-FR', { day: '2-digit', month: '2-digit' })}
                                  </span>
                                </div>
                              </div>
                            </div>
                          </Link>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <div className="card border-0 shadow-sm">
                    <div className="card-body text-center py-5">
                      <p className="text-muted mb-3">Aucune offre ne correspond à vos critères</p>
                      <button className="btn btn-primary" onClick={clearFilters}>
                        Effacer les filtres
                      </button>
                    </div>
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
