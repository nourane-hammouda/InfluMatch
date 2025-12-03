import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles } from 'lucide-react';

export const PublicHeader: React.FC = () => {
  return (
    <header className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center gap-2">
            <Sparkles className="w-8 h-8 text-purple-600" />
            <span className="text-purple-600">InfluMatch</span>
          </Link>
          
          <nav className="hidden md:flex items-center gap-8">
            <Link to="/" className="text-gray-600 hover:text-gray-900 transition-colors">
              Accueil
            </Link>
            <Link to="/#features" className="text-gray-600 hover:text-gray-900 transition-colors">
              Fonctionnalités
            </Link>
          </nav>

          <div className="flex items-center gap-4">
            <Link 
              to="/login" 
              className="text-gray-600 hover:text-gray-900 transition-colors"
            >
              Connexion
            </Link>
            <Link 
              to="/signup" 
              className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
            >
              Inscription
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};
