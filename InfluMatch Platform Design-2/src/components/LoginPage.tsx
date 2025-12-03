import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Target, AlertCircle } from 'lucide-react';

interface LoginPageProps {
  onLogin: () => void;
}

export default function LoginPage({ onLogin }: LoginPageProps) {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState('');
  const [attempts, setAttempts] = useState(0);
  const [blocked, setBlocked] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (blocked) {
      setError('Compte bloqué temporairement. Réessayez dans 15 minutes.');
      return;
    }

    if (email === 'demo@influmatch.com' && password === 'demo1234') {
      onLogin();
      navigate('/dashboard');
    } else {
      const newAttempts = attempts + 1;
      setAttempts(newAttempts);
      
      if (newAttempts >= 5) {
        setBlocked(true);
        setError('Trop de tentatives échouées. Compte bloqué pour 15 minutes.');
      } else {
        setError('Email ou mot de passe incorrect');
      }
    }
  };

  return (
    <div className="min-vh-100 bg-light d-flex flex-column">
      {/* Header */}
      <nav className="navbar navbar-light bg-white border-bottom">
        <div className="container">
          <Link className="navbar-brand d-flex align-items-center" to="/">
            <Target className="me-2" size={32} color="#0d6efd" />
            <span className="fw-bold text-primary fs-4">InfluMatch</span>
          </Link>
        </div>
      </nav>

      {/* Main Content */}
      <div className="flex-grow-1 d-flex align-items-center py-5">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-6 col-lg-5">
              <div className="card shadow-sm border-0">
                <div className="card-body p-5">
                  <h1 className="text-center mb-2">Connexion</h1>
                  <p className="text-center text-muted mb-4">Accédez à votre compte InfluMatch</p>

                  {/* Demo credentials hint */}
                  <div className="alert alert-info mb-4">
                    <small>
                      <strong>Démo:</strong> demo@influmatch.com / demo1234
                    </small>
                  </div>

                  <form onSubmit={handleSubmit}>
                    {/* Email */}
                    <div className="mb-3">
                      <label htmlFor="email" className="form-label">Email</label>
                      <input
                        type="email"
                        className="form-control"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="votre@email.com"
                        required
                      />
                    </div>

                    {/* Password */}
                    <div className="mb-3">
                      <label htmlFor="password" className="form-label">Mot de passe</label>
                      <input
                        type="password"
                        className="form-control"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Votre mot de passe"
                        required
                      />
                    </div>

                    {/* Error Message */}
                    {error && (
                      <div className="alert alert-danger d-flex align-items-center mb-3">
                        <AlertCircle size={20} className="me-2" />
                        <span>{error}</span>
                      </div>
                    )}

                    {/* Attempts Warning */}
                    {attempts > 0 && attempts < 5 && (
                      <div className="alert alert-warning text-center small mb-3">
                        Tentatives restantes : {5 - attempts}
                      </div>
                    )}

                    {/* Remember Me */}
                    <div className="form-check mb-4">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        id="remember"
                        checked={rememberMe}
                        onChange={(e) => setRememberMe(e.target.checked)}
                      />
                      <label className="form-check-label" htmlFor="remember">
                        Se souvenir de moi
                      </label>
                    </div>

                    <button type="submit" className="btn btn-primary w-100 py-2" disabled={blocked}>
                      {blocked ? 'Compte bloqué' : 'Se connecter'}
                    </button>
                  </form>

                  <div className="text-center mt-4">
                    <a href="#" className="d-block text-decoration-none small mb-2">
                      Mot de passe oublié ?
                    </a>
                    <p className="text-muted mb-0">
                      Pas encore de compte ?{' '}
                      <Link to="/inscription" className="text-decoration-none">
                        S'inscrire
                      </Link>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
