import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useState } from 'react';
import './styles/bootstrap-custom.css';
import LandingPage from './components/LandingPage';
import SignupPage from './components/SignupPage';
import LoginPage from './components/LoginPage';
import ProfileCompletionPage from './components/ProfileCompletionPage';
import DashboardPage from './components/DashboardPage';
import MarketplacePage from './components/MarketplacePage';
import OfferDetailPage from './components/OfferDetailPage';
import ApplicationsPage from './components/ApplicationsPage';
import NotificationsPage from './components/NotificationsPage';

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [profileCompleted, setProfileCompleted] = useState(false);

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  const handleSignup = () => {
    setIsAuthenticated(true);
    setProfileCompleted(false);
  };

  const handleProfileComplete = () => {
    setProfileCompleted(true);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setProfileCompleted(false);
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/inscription" element={<SignupPage onSignup={handleSignup} />} />
        <Route path="/connexion" element={<LoginPage onLogin={handleLogin} />} />
        
        {isAuthenticated ? (
          <>
            {!profileCompleted ? (
              <Route path="/profil/completion" element={<ProfileCompletionPage onComplete={handleProfileComplete} />} />
            ) : (
              <>
                <Route path="/dashboard" element={<DashboardPage onLogout={handleLogout} />} />
                <Route path="/marketplace" element={<MarketplacePage onLogout={handleLogout} />} />
                <Route path="/offre/:id" element={<OfferDetailPage onLogout={handleLogout} />} />
                <Route path="/candidatures" element={<ApplicationsPage onLogout={handleLogout} />} />
                <Route path="/notifications" element={<NotificationsPage onLogout={handleLogout} />} />
              </>
            )}
            <Route path="*" element={<Navigate to={profileCompleted ? "/dashboard" : "/profil/completion"} />} />
          </>
        ) : (
          <Route path="*" element={<Navigate to="/" />} />
        )}
      </Routes>
    </Router>
  );
}
