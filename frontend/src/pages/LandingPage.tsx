import { Link } from 'react-router-dom';
import { Search, Target, Zap, TrendingUp, Shield, Clock } from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="min-vh-100 bg-white">
      {/* Header */}
      <nav className="navbar navbar-expand-lg navbar-light bg-white border-bottom">
        <div className="container">
          <Link className="navbar-brand d-flex align-items-center" to="/">
            <Target className="me-2" size={32} color="#0d6efd" />
            <span className="fw-bold text-primary fs-4">InfluMatch</span>
          </Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <a className="nav-link" href="#accueil">Accueil</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#fonctionnalites">Fonctionnalités</a>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/connexion">Connexion</Link>
              </li>
              <li className="nav-item ms-2">
                <Link className="btn btn-primary" to="/inscription">Inscription</Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="accueil" className="py-5 hero-gradient">
        <div className="container">
          <div className="row py-5">
            <div className="col-lg-8 mx-auto text-center">
              <h1 className="display-3 fw-bold mb-4">Connectez talents et opportunités</h1>
              <p className="lead text-muted mb-4">
                La plateforme qui simplifie la collaboration entre influenceurs et entreprises
              </p>
              <div className="d-flex gap-3 justify-content-center flex-wrap">
                <Link to="/inscription" className="btn btn-primary btn-lg px-5 py-3">
                  Créer un compte gratuitement
                </Link>
                <Link to="/connexion" className="btn btn-outline-primary btn-lg px-5 py-3">
                  Se connecter
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Problématique */}
      <section className="py-5">
        <div className="container">
          <div className="row">
            <div className="col-lg-8 mx-auto text-center">
              <h2 className="display-5 mb-4">Le marché est fragmenté</h2>
              <p className="lead text-muted">
                Aujourd'hui, influenceurs et entreprises peinent à se trouver. Les outils existants manquent de transparence et les processus sont chronophages. InfluMatch résout ces problèmes en centralisant les opportunités.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Pour les influenceurs */}
      <section className="py-5 bg-light">
        <div className="container">
          <h2 className="display-6 text-center mb-5">Pour les influenceurs</h2>
          <div className="row g-4">
            <div className="col-md-4">
              <div className="card h-100 border-0 shadow-sm card-hover">
                <div className="card-body p-4">
                  <div className="icon-container primary mb-3">
                    <Search size={28} />
                  </div>
                  <h5 className="card-title mb-3">Recherche simplifiée</h5>
                  <p className="card-text text-muted">
                    Trouvez des opportunités adaptées à votre profil en quelques clics
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card h-100 border-0 shadow-sm card-hover">
                <div className="card-body p-4">
                  <div className="icon-container primary mb-3">
                    <TrendingUp size={28} />
                  </div>
                  <h5 className="card-title mb-3">Visibilité accrue</h5>
                  <p className="card-text text-muted">
                    Mettez en valeur vos statistiques et votre expertise
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card h-100 border-0 shadow-sm card-hover">
                <div className="card-body p-4">
                  <div className="icon-container primary mb-3">
                    <Zap size={28} />
                  </div>
                  <h5 className="card-title mb-3">Process rapide</h5>
                  <p className="card-text text-muted">
                    Candidatez directement et suivez l'évolution de vos demandes
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pour les entreprises */}
      <section className="py-5">
        <div className="container">
          <h2 className="display-6 text-center mb-5">Pour les entreprises</h2>
          <div className="row g-4">
            <div className="col-md-4">
              <div className="card h-100 bg-light border-0">
                <div className="card-body p-4">
                  <div className="icon-container primary mb-3">
                    <Target size={28} />
                  </div>
                  <h5 className="card-title mb-3">Recrutement ciblé</h5>
                  <p className="card-text text-muted">
                    Accédez à une base d'influenceurs qualifiés et vérifiés
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card h-100 bg-light border-0">
                <div className="card-body p-4">
                  <div className="icon-container primary mb-3">
                    <Shield size={28} />
                  </div>
                  <h5 className="card-title mb-3">Transparence totale</h5>
                  <p className="card-text text-muted">
                    Consultez les statistiques réelles et les tarifs indicatifs
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card h-100 bg-light border-0">
                <div className="card-body p-4">
                  <div className="icon-container primary mb-3">
                    <Clock size={28} />
                  </div>
                  <h5 className="card-title mb-3">Gain de temps</h5>
                  <p className="card-text text-muted">
                    Filtres avancés pour trouver le profil idéal rapidement
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Fonctionnalités MVP */}
      <section id="fonctionnalites" className="py-5 bg-primary text-white">
        <div className="container">
          <h2 className="display-6 text-center mb-5">Fonctionnalités clés</h2>
          <div className="row g-4 text-center">
            <div className="col-6 col-md">
              <div className="p-3 bg-white bg-opacity-10 rounded mb-3">
                <Shield size={32} />
              </div>
              <p className="mb-0">Authentification sécurisée</p>
            </div>
            <div className="col-6 col-md">
              <div className="p-3 bg-white bg-opacity-10 rounded mb-3">
                <Target size={32} />
              </div>
              <p className="mb-0">Profil Influenceur complet</p>
            </div>
            <div className="col-6 col-md">
              <div className="p-3 bg-white bg-opacity-10 rounded mb-3">
                <Search size={32} />
              </div>
              <p className="mb-0">Marketplace d'offres</p>
            </div>
            <div className="col-6 col-md">
              <div className="p-3 bg-white bg-opacity-10 rounded mb-3">
                <Zap size={32} />
              </div>
              <p className="mb-0">Candidatures simplifiées</p>
            </div>
            <div className="col-6 col-md">
              <div className="p-3 bg-white bg-opacity-10 rounded mb-3">
                <TrendingUp size={32} />
              </div>
              <p className="mb-0">Dashboard analytique</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-5">
        <div className="container">
          <div className="row py-5">
            <div className="col-lg-8 mx-auto text-center">
              <h2 className="display-5 mb-4">Prêt à commencer ?</h2>
              <p className="lead text-muted mb-4">
                Rejoignez InfluMatch et développez votre activité
              </p>
              <div className="d-flex gap-3 justify-content-center flex-wrap">
                <Link to="/inscription" className="btn btn-primary btn-lg px-5 py-3">
                  Créer un compte
                </Link>
                <Link to="/connexion" className="btn btn-outline-primary btn-lg px-5 py-3">
                  Se connecter
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-dark text-white py-4">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-md-6">
              <div className="d-flex align-items-center">
                <Target size={24} className="me-2" />
                <span>InfluMatch</span>
              </div>
            </div>
            <div className="col-md-6 text-md-end mt-3 mt-md-0">
              <a href="#" className="text-white text-decoration-none me-3">Mentions légales</a>
              <a href="#" className="text-white text-decoration-none me-3">CGU</a>
              <a href="#" className="text-white text-decoration-none">Contact</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
