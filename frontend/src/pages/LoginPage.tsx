import React , { useState } from 'react';
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (blocked) {
      setError('Compte bloqué temporairement. Réessayez dans 15 minutes.');
      return;
    }

    try {
      const { authAPI } = await import('../services/api');
      await authAPI.login(email, password);
      onLogin();
      
      // Rediriger vers le tableau de bord après connexion
        navigate('/dashboard');
    } catch (error: any) {
      const newAttempts = attempts + 1;
      setAttempts(newAttempts);
      
      if (newAttempts >= 5) {
        setBlocked(true);
        setError('Trop de tentatives échouées. Compte bloqué pour 15 minutes.');
        setTimeout(() => {
          setBlocked(false);
          setAttempts(0);
        }, 15 * 60 * 1000);
      } else {
        setError(error.message || 'Email ou mot de passe incorrect');
      }
    }
  };

  return (
    <div className="min-vh-100 d-flex flex-column" style={{ background: 'linear-gradient(180deg, #f8f9ff 0%, #ffffff 100%)' }}>
      {/* Header */}
      <nav className="navbar navbar-light bg-white border-bottom">
        <div className="container">
          <Link className="navbar-brand d-flex align-items-center" to="/">
            <Target className="me-2" size={32} style={{ color: '#6366f1' }} />
            <span className="fw-bold fs-4" style={{ color: '#6366f1' }}>InfluMatch</span>
          </Link>
        </div>
      </nav>

      {/* Main Content */}
      <div className="flex-grow-1 d-flex align-items-center py-5">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-6 col-lg-5">
              <div className="card shadow-lg border-0">
                <div className="card-body p-5">
                  <div className="text-center mb-4">
                    <div className="icon-container primary mx-auto mb-3" style={{ width: '64px', height: '64px' }}>
                      <Target size={32} />
                    </div>
                    <h1 className="mb-2 fw-bold">Bon retour !</h1>
                    <p className="text-muted mb-0">Connectez-vous à votre compte InfluMatch</p>
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

                    <button type="submit" className="btn btn-gradient-primary w-100 py-3" disabled={blocked}>
                      {blocked ? 'Compte bloqué' : 'Se connecter'}
                    </button>
                  </form>

                  <div className="text-center mt-4">
                    <a href="#" className="d-block text-decoration-none small mb-2" style={{ color: '#6366f1' }}>
                      Mot de passe oublié ?
                    </a>
                    <p className="text-muted mb-0">
                      Pas encore de compte ?{' '}
                      <Link to="/inscription" className="text-decoration-none fw-semibold" style={{ color: '#6366f1' }}>
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
