import React from 'react';
import { Link } from 'react-router-dom';
import { Search, Target, TrendingUp, Shield, Zap, Users } from 'lucide-react';
import { PublicHeader } from '../layout/PublicHeader';

export const LandingPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-white">
      <PublicHeader />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-purple-50 to-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-gray-900 mb-6">
                Connectez votre influence au bon partenaire
              </h1>
              <p className="text-gray-600 mb-8">
                InfluMatch simplifie la mise en relation entre influenceurs et entreprises. 
                Trouvez les opportunités qui correspondent vraiment à votre profil.
              </p>
              <Link 
                to="/signup"
                className="inline-block px-8 py-4 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
              >
                Créer un compte gratuitement
              </Link>
            </div>
            <div>
              <img 
                src="https://images.unsplash.com/photo-1759393852314-59dc00faeed3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzb2NpYWwlMjBtZWRpYSUyMGluZmx1ZW5jZXIlMjBjb250ZW50JTIwY3JlYXRpb258ZW58MXx8fHwxNzY0NDQ1NDExfDA&ixlib=rb-4.1.0&q=80&w=1080"
                alt="Content creation"
                className="rounded-lg shadow-xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-gray-900 mb-4">Le marché de l'influence manque de transparence</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Les influenceurs perdent du temps à chercher des opportunités. Les entreprises 
              peinent à trouver les bons profils. InfluMatch résout ces deux problèmes.
            </p>
          </div>
        </div>
      </section>

      {/* For Influencers Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-gray-900 mb-12 text-center">Pour les influenceurs</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-gray-900 mb-2">Recherche simplifiée</h3>
              <p className="text-gray-600">
                Trouvez des opportunités qui correspondent exactement à votre profil et vos valeurs
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-gray-900 mb-2">Visibilité accrue</h3>
              <p className="text-gray-600">
                Mettez en avant vos statistiques et votre expertise pour attirer les bonnes marques
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Zap className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-gray-900 mb-2">Process rapide</h3>
              <p className="text-gray-600">
                Candidatez en quelques clics et suivez vos candidatures depuis un tableau de bord unique
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* For Companies Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-gray-900 mb-12 text-center">Pour les entreprises</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Target className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-gray-900 mb-2">Recrutement ciblé</h3>
              <p className="text-gray-600">
                Trouvez rapidement les influenceurs qui correspondent à votre image de marque
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-gray-900 mb-2">Transparence totale</h3>
              <p className="text-gray-600">
                Accédez aux statistiques réelles et aux tarifs clairement affichés
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-gray-900 mb-2">Filtres avancés</h3>
              <p className="text-gray-600">
                Affinez votre recherche par domaine, plateforme, budget et engagement
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features MVP Section */}
      <section id="features" className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-gray-900 mb-12 text-center">Fonctionnalités clés du MVP</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="p-6 border border-gray-200 rounded-lg">
              <h3 className="text-gray-900 mb-2">Authentification sécurisée</h3>
              <p className="text-gray-600">
                Inscription et connexion protégées avec validation stricte
              </p>
            </div>
            <div className="p-6 border border-gray-200 rounded-lg">
              <h3 className="text-gray-900 mb-2">Profil influenceur complet</h3>
              <p className="text-gray-600">
                Créez votre profil avec statistiques, tarifs et domaines d'expertise
              </p>
            </div>
            <div className="p-6 border border-gray-200 rounded-lg">
              <h3 className="text-gray-900 mb-2">Marketplace d'offres</h3>
              <p className="text-gray-600">
                Parcourez et filtrez les offres de collaboration disponibles
              </p>
            </div>
            <div className="p-6 border border-gray-200 rounded-lg">
              <h3 className="text-gray-900 mb-2">Système de candidatures</h3>
              <p className="text-gray-600">
                Postulez aux offres et suivez l'état de vos candidatures
              </p>
            </div>
            <div className="p-6 border border-gray-200 rounded-lg">
              <h3 className="text-gray-900 mb-2">Dashboard personnalisé</h3>
              <p className="text-gray-600">
                Visualisez vos statistiques et vos offres recommandées
              </p>
            </div>
            <div className="p-6 border border-gray-200 rounded-lg">
              <h3 className="text-gray-900 mb-2">Notifications temps réel</h3>
              <p className="text-gray-600">
                Restez informé des réponses et nouvelles opportunités
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-purple-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-white mb-6">Prêt à booster votre influence ?</h2>
          <p className="text-purple-100 mb-8 max-w-2xl mx-auto">
            Rejoignez InfluMatch et accédez aux meilleures opportunités de collaboration
          </p>
          <Link 
            to="/signup"
            className="inline-block px-8 py-4 bg-white text-purple-600 rounded-lg hover:bg-gray-100 transition-colors"
          >
            Créer un compte
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-white mb-4">InfluMatch</h3>
              <p>La plateforme qui connecte influenceurs et entreprises</p>
            </div>
            <div>
              <h4 className="text-white mb-4">Légal</h4>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-white transition-colors">Mentions légales</a></li>
                <li><a href="#" className="hover:text-white transition-colors">CGU</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Politique de confidentialité</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white mb-4">Contact</h4>
              <p>contact@influmatch.fr</p>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-800 text-center">
            <p>&copy; 2025 InfluMatch. Tous droits réservés.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};
