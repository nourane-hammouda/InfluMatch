import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import './styles/bootstrap-custom.css';
import LandingPage from './pages/LandingPage';
import SignupPage from './pages/SignupPage';
import LoginPage from './pages/LoginPage';
import ProfileCompletionPage from './pages/ProfileCompletionPage';
import ProfilePage from './pages/ProfilePage';
import DashboardPage from './pages/DashboardPage';
import MarketplacePage from './pages/MarketplacePage';
import OfferDetailPage from './pages/OfferDetailPage';
import ApplicationsPage from './pages/ApplicationsPage';
import NotificationsPage from './pages/NotificationsPage';
import React from 'react';
import { authAPI, getToken } from './services/api';

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [profileCompleted, setProfileCompleted] = useState(false);
  const [loading, setLoading] = useState(true);

  // Check authentication and profile status on mount
  useEffect(() => {
    const checkAuth = async () => {
      const token = getToken();
      if (token) {
        try {
          const userData = await authAPI.getCurrentUser() as any;
          setIsAuthenticated(true);
          // Check if profile is completed (completion_percent >= 100 or profile_complete is true)
          const isComplete = userData.completion_percent >= 100 || userData.profile_complete || false;
          setProfileCompleted(isComplete);
        } catch (error) {
          // Token invalid, clear it
          setIsAuthenticated(false);
          setProfileCompleted(false);
        }
      }
      setLoading(false);
    };
    checkAuth();
  }, []);

  const handleLogin = async () => {
    setIsAuthenticated(true);
    // Check profile status after login
    try {
      const userData = await authAPI.getCurrentUser() as any;
      const isComplete = userData.completion_percent >= 100 || userData.profile_complete || false;
      setProfileCompleted(isComplete);
    } catch (error) {
      setProfileCompleted(false);
    }
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

  if (loading) {
    return <div className="d-flex justify-content-center align-items-center min-vh-100">Chargement...</div>;
  }

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/inscription" element={<SignupPage onSignup={handleSignup} />} />
        <Route path="/connexion" element={<LoginPage onLogin={handleLogin} />} />
        
        {isAuthenticated ? (
          <>
            {/* Page de completion du profil - toujours accessible */}
            <Route path="/profil/completion" element={<ProfileCompletionPage onComplete={handleProfileComplete} />} />
            
            {/* Page profil - toujours accessible */}
            <Route path="/profil" element={<ProfilePage onLogout={handleLogout} />} />
            
            {/* Dashboard - toujours accessible après connexion */}
            <Route path="/dashboard" element={<DashboardPage onLogout={handleLogout} />} />
            
            {/* Autres pages - accessibles même si profil non complété */}
            <Route path="/marketplace" element={<MarketplacePage onLogout={handleLogout} />} />
            <Route path="/offre/:id" element={<OfferDetailPage onLogout={handleLogout} />} />
            <Route path="/candidatures" element={<ApplicationsPage onLogout={handleLogout} />} />
            <Route path="/notifications" element={<NotificationsPage onLogout={handleLogout} />} />
            
            {/* Redirection par défaut - toujours vers dashboard */}
            <Route path="*" element={<Navigate to="/dashboard" />} />
          </>
        ) : (
          <Route path="*" element={<Navigate to="/" />} />
        )}
      </Routes>
    </Router>
  );
}
