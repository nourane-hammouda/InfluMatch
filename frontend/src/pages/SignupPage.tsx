import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Target, AlertCircle, Check } from 'lucide-react';

interface SignupPageProps {
  onSignup: () => void;
}

export default function SignupPage({ onSignup }: SignupPageProps) {
  const navigate = useNavigate();
  const [accountType, setAccountType] = useState<'influencer' | 'company'>('influencer');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateEmail = (email: string) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const validatePassword = (password: string) => {
    return password.length >= 8;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};

    if (!validateEmail(email)) {
      newErrors.email = 'Format email invalide';
    }

    if (!validatePassword(password)) {
      newErrors.password = 'Mot de passe trop faible (minimum 8 caractères)';
    }

    if (password !== confirmPassword) {
      newErrors.confirmPassword = 'Les mots de passe ne correspondent pas';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      // Use API to signup and store token
      const { authAPI } = await import('../services/api');
      await authAPI.signup(email, password, accountType);
      
      // Call onSignup to update App state
      onSignup();
      navigate('/profil/completion');
    } catch (error: any) {
      if (error.message.includes('déjà utilisé') || error.message.includes('already exists')) {
        setErrors({ email: 'Cet email est déjà utilisé' });
      } else {
        setErrors({ email: error.message || 'Erreur lors de l\'inscription' });
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
                  <h1 className="text-center mb-2">Créer un compte</h1>
                  <p className="text-center text-muted mb-4">Rejoignez InfluMatch aujourd'hui</p>

                  {/* Account Type Selector */}
                  <div className="mb-4">
                    <label className="form-label">Type de compte</label>
                    <div className="row g-3">
                      <div className="col-6">
                        <button
                          type="button"
                          onClick={() => setAccountType('influencer')}
                          className={`w-100 p-3 border rounded ${
                            accountType === 'influencer'
                              ? 'border-primary border-2 bg-light'
                              : 'border-secondary'
                          }`}
                        >
                          <div className="d-flex justify-content-between align-items-start mb-2">
                            <span className="fw-semibold">Influenceur</span>
                            {accountType === 'influencer' && <Check size={20} className="text-primary" />}
                          </div>
                          <small className="text-muted">Trouvez des opportunités</small>
                        </button>
                      </div>
                      <div className="col-6">
                        <button
                          type="button"
                          disabled
                          className="w-100 p-3 border rounded border-secondary bg-light opacity-50"
                        >
                          <span className="text-muted fw-semibold">Entreprise</span>
                          <br />
                          <small className="text-muted">Bientôt disponible</small>
                        </button>
                      </div>
                    </div>
                  </div>

                  <form onSubmit={handleSubmit}>
                    {/* Email */}
                    <div className="mb-3">
                      <label htmlFor="email" className="form-label">Email</label>
                      <input
                        type="email"
                        className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                        id="email"
                        value={email}
                        onChange={(e) => {
                          setEmail(e.target.value);
                          setErrors({ ...errors, email: '' });
                        }}
                        placeholder="votre@email.com"
                      />
                      {errors.email && (
                        <div className="invalid-feedback d-flex align-items-center">
                          <AlertCircle size={16} className="me-1" />
                          {errors.email}
                        </div>
                      )}
                    </div>

                    {/* Password */}
                    <div className="mb-3">
                      <label htmlFor="password" className="form-label">Mot de passe</label>
                      <input
                        type="password"
                        className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                        id="password"
                        value={password}
                        onChange={(e) => {
                          setPassword(e.target.value);
                          setErrors({ ...errors, password: '' });
                        }}
                        placeholder="Minimum 8 caractères"
                      />
                      {errors.password && (
                        <div className="invalid-feedback d-flex align-items-center">
                          <AlertCircle size={16} className="me-1" />
                          {errors.password}
                        </div>
                      )}
                      {password && !errors.password && validatePassword(password) && (
                        <div className="text-success small mt-1 d-flex align-items-center">
                          <Check size={16} className="me-1" />
                          Mot de passe valide
                        </div>
                      )}
                    </div>

                    {/* Confirm Password */}
                    <div className="mb-4">
                      <label htmlFor="confirmPassword" className="form-label">Confirmer le mot de passe</label>
                      <input
                        type="password"
                        className={`form-control ${errors.confirmPassword ? 'is-invalid' : ''}`}
                        id="confirmPassword"
                        value={confirmPassword}
                        onChange={(e) => {
                          setConfirmPassword(e.target.value);
                          setErrors({ ...errors, confirmPassword: '' });
                        }}
                        placeholder="Confirmer le mot de passe"
                      />
                      {errors.confirmPassword && (
                        <div className="invalid-feedback d-flex align-items-center">
                          <AlertCircle size={16} className="me-1" />
                          {errors.confirmPassword}
                        </div>
                      )}
                    </div>

                    <button type="submit" className="btn btn-primary w-100 py-2">
                      Créer mon compte
                    </button>
                  </form>

                  <div className="text-center mt-4">
                    <p className="text-muted mb-0">
                      Vous avez déjà un compte ?{' '}
                      <Link to="/connexion" className="text-decoration-none">
                        Se connecter
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
