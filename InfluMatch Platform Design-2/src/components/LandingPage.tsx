import { Link } from 'react-router-dom';
import { Search, Target, Zap, TrendingUp, Shield, Clock, Sparkles, Award, Users, Heart, Star, Rocket, Globe, Gift } from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="min-vh-100 bg-white">
      {/* Header */}
      <nav className="navbar navbar-expand-lg navbar-light bg-white sticky-top">
        <div className="container">
          <Link className="navbar-brand d-flex align-items-center" to="/">
            <div className="icon-container primary me-2" style={{ width: '48px', height: '48px' }}>
              <Target size={24} />
            </div>
            <span className="fw-bold fs-4" style={{ background: 'var(--gradient-1)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>InfluMatch</span>
          </Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto align-items-center">
              <li className="nav-item">
                <a className="nav-link fw-semibold" href="#accueil">Accueil</a>
              </li>
              <li className="nav-item">
                <a className="nav-link fw-semibold" href="#fonctionnalites">Fonctionnalités</a>
              </li>
              <li className="nav-item">
                <Link className="nav-link fw-semibold" to="/connexion">Connexion</Link>
              </li>
              <li className="nav-item ms-2">
                <Link className="btn btn-gradient-primary" to="/inscription">
                  <Sparkles size={18} className="me-2" />
                  Inscription
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="accueil" className="py-5 position-relative overflow-hidden">
        <div className="position-absolute top-0 start-0 w-100 h-100" style={{ background: 'var(--gradient-1)', opacity: 0.05, zIndex: 0 }}></div>
        <div className="container position-relative" style={{ zIndex: 1 }}>
          <div className="row py-5 align-items-center">
            <div className="col-lg-6">
              <div className="d-inline-flex align-items-center gap-2 mb-4 px-3 py-2 bg-white rounded-pill shadow-sm">
                <Star className="text-warning" size={20} fill="currentColor" />
                <span className="small fw-semibold">Plateforme #1 pour influenceurs</span>
              </div>
              <h1 className="display-3 fw-bold mb-4">
                Connectez <span style={{ background: 'var(--gradient-2)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>talents</span> et <span style={{ background: 'var(--gradient-1)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>opportunités</span>
              </h1>
              <p className="lead text-muted mb-4 fs-5">
                La plateforme qui simplifie la collaboration entre influenceurs et entreprises avec intelligence et transparence
              </p>
              <div className="d-flex gap-3 flex-wrap">
                <Link to="/inscription" className="btn btn-gradient-primary btn-lg px-4">
                  <Rocket size={20} className="me-2" />
                  Créer un compte gratuit
                </Link>
                <a href="#fonctionnalites" className="btn btn-outline-primary btn-lg px-4">
                  <Globe size={20} className="me-2" />
                  Découvrir
                </a>
              </div>
            </div>
            <div className="col-lg-6 text-center mt-5 mt-lg-0">
              <div className="position-relative">
                <div className="icon-container primary float-animation" style={{ width: '120px', height: '120px', margin: '0 auto' }}>
                  <Target size={60} />
                </div>
                <div className="position-absolute" style={{ top: '0', right: '20%' }}>
                  <div className="icon-container pink" style={{ width: '80px', height: '80px' }}>
                    <Heart size={40} />
                  </div>
                </div>
                <div className="position-absolute" style={{ bottom: '20%', left: '10%' }}>
                  <div className="icon-container orange" style={{ width: '70px', height: '70px' }}>
                    <Sparkles size={35} />
                  </div>
                </div>
                <div className="position-absolute" style={{ top: '30%', right: '10%' }}>
                  <div className="icon-container success" style={{ width: '60px', height: '60px' }}>
                    <Award size={30} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Problématique */}
      <section className="py-5 bg-light">
        <div className="container">
          <div className="row">
            <div className="col-lg-8 mx-auto text-center">
              <div className="icon-container warning mb-4" style={{ width: '80px', height: '80px', margin: '0 auto' }}>
                <TrendingUp size={40} />
              </div>
              <h2 className="display-5 fw-bold mb-4">Le marché est fragmenté</h2>
              <p className="lead text-muted">
                Aujourd'hui, influenceurs et entreprises peinent à se trouver. Les outils existants manquent de transparence et les processus sont chronophages. InfluMatch résout ces problèmes en centralisant les opportunités.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Pour les influenceurs */}
      <section className="py-5">
        <div className="container">
          <div className="text-center mb-5">
            <span className="badge badge-pink px-4 py-2 mb-3">
              <Users size={16} className="me-2" />
              Pour les influenceurs
            </span>
            <h2 className="display-6 fw-bold">Développez votre activité</h2>
          </div>
          <div className="row g-4">
            <div className="col-md-4">
              <div className="card h-100 border-0 shadow feature-card">
                <div className="card-body p-4 text-center">
                  <div className="icon-container primary mb-4" style={{ margin: '0 auto' }}>
                    <Search size={28} />
                  </div>
                  <h5 className="card-title fw-bold mb-3">Recherche simplifiée</h5>
                  <p className="card-text text-muted">
                    Trouvez des opportunités adaptées à votre profil en quelques clics grâce à notre algorithme intelligent
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card h-100 border-0 shadow feature-card">
                <div className="card-body p-4 text-center">
                  <div className="icon-container pink mb-4" style={{ margin: '0 auto' }}>
                    <TrendingUp size={28} />
                  </div>
                  <h5 className="card-title fw-bold mb-3">Visibilité accrue</h5>
                  <p className="card-text text-muted">
                    Mettez en valeur vos statistiques et votre expertise auprès des meilleures marques
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card h-100 border-0 shadow feature-card">
                <div className="card-body p-4 text-center">
                  <div className="icon-container orange mb-4" style={{ margin: '0 auto' }}>
                    <Zap size={28} />
                  </div>
                  <h5 className="card-title fw-bold mb-3">Process rapide</h5>
                  <p className="card-text text-muted">
                    Candidatez directement et suivez l'évolution de vos demandes en temps réel
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pour les entreprises */}
      <section className="py-5 bg-light">
        <div className="container">
          <div className="text-center mb-5">
            <span className="badge badge-purple px-4 py-2 mb-3">
              <Award size={16} className="me-2" />
              Pour les entreprises
            </span>
            <h2 className="display-6 fw-bold">Trouvez les talents parfaits</h2>
          </div>
          <div className="row g-4">
            <div className="col-md-4">
              <div className="card h-100 border-0 shadow feature-card">
                <div className="card-body p-4 text-center">
                  <div className="icon-container purple mb-4" style={{ margin: '0 auto' }}>
                    <Target size={28} />
                  </div>
                  <h5 className="card-title fw-bold mb-3">Recrutement ciblé</h5>
                  <p className="card-text text-muted">
                    Accédez à une base d'influenceurs qualifiés et vérifiés avec précision
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card h-100 border-0 shadow feature-card">
                <div className="card-body p-4 text-center">
                  <div className="icon-container success mb-4" style={{ margin: '0 auto' }}>
                    <Shield size={28} />
                  </div>
                  <h5 className="card-title fw-bold mb-3">Transparence totale</h5>
                  <p className="card-text text-muted">
                    Consultez les statistiques réelles et les tarifs indicatifs en toute clarté
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card h-100 border-0 shadow feature-card">
                <div className="card-body p-4 text-center">
                  <div className="icon-container info mb-4" style={{ margin: '0 auto' }}>
                    <Clock size={28} />
                  </div>
                  <h5 className="card-title fw-bold mb-3">Gain de temps</h5>
                  <p className="card-text text-muted">
                    Filtres avancés pour trouver le profil idéal en quelques secondes
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Fonctionnalités MVP */}
      <section id="fonctionnalites" className="py-5 position-relative overflow-hidden">
        <div className="position-absolute top-0 start-0 w-100 h-100 bg-gradient-purple" style={{ opacity: 0.95 }}></div>
        <div className="container position-relative text-white" style={{ zIndex: 1 }}>
          <div className="text-center mb-5">
            <Sparkles size={48} className="mb-3" />
            <h2 className="display-6 fw-bold">Fonctionnalités clés</h2>
            <p className="lead opacity-75">Tout ce dont vous avez besoin pour réussir</p>
          </div>
          <div className="row g-4 text-center">
            <div className="col-6 col-md">
              <div className="p-4 bg-white bg-opacity-10 rounded-4 backdrop-blur">
                <Shield size={36} className="mb-3" />
                <p className="mb-0 fw-semibold">Authentification sécurisée</p>
              </div>
            </div>
            <div className="col-6 col-md">
              <div className="p-4 bg-white bg-opacity-10 rounded-4 backdrop-blur">
                <Target size={36} className="mb-3" />
                <p className="mb-0 fw-semibold">Profil complet</p>
              </div>
            </div>
            <div className="col-6 col-md">
              <div className="p-4 bg-white bg-opacity-10 rounded-4 backdrop-blur">
                <Search size={36} className="mb-3" />
                <p className="mb-0 fw-semibold">Marketplace</p>
              </div>
            </div>
            <div className="col-6 col-md">
              <div className="p-4 bg-white bg-opacity-10 rounded-4 backdrop-blur">
                <Zap size={36} className="mb-3" />
                <p className="mb-0 fw-semibold">Candidatures</p>
              </div>
            </div>
            <div className="col-6 col-md">
              <div className="p-4 bg-white bg-opacity-10 rounded-4 backdrop-blur">
                <TrendingUp size={36} className="mb-3" />
                <p className="mb-0 fw-semibold">Analytics</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-5">
        <div className="container">
          <div className="row py-5">
            <div className="col-lg-8 mx-auto text-center">
              <div className="icon-container pink mb-4" style={{ width: '100px', height: '100px', margin: '0 auto' }}>
                <Gift size={50} />
              </div>
              <h2 className="display-5 fw-bold mb-4">Prêt à commencer ?</h2>
              <p className="lead text-muted mb-4">
                Rejoignez InfluMatch et développez votre activité dès aujourd'hui
              </p>
              <Link to="/inscription" className="btn btn-gradient-pink btn-lg px-5 py-3">
                <Rocket size={24} className="me-2" />
                Créer un compte gratuit
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-4 position-relative overflow-hidden">
        <div className="position-absolute top-0 start-0 w-100 h-100 bg-gradient-ocean" style={{ opacity: 0.95 }}></div>
        <div className="container position-relative text-white" style={{ zIndex: 1 }}>
          <div className="row align-items-center">
            <div className="col-md-6">
              <div className="d-flex align-items-center">
                <Target size={28} className="me-2" />
                <span className="fw-bold fs-5">InfluMatch</span>
              </div>
            </div>
            <div className="col-md-6 text-md-end mt-3 mt-md-0">
              <a href="#" className="text-white text-decoration-none me-3 opacity-75 hover-opacity-100">Mentions légales</a>
              <a href="#" className="text-white text-decoration-none me-3 opacity-75 hover-opacity-100">CGU</a>
              <a href="#" className="text-white text-decoration-none opacity-75 hover-opacity-100">Contact</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
