import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { TrendingUp, Target, FileText, Briefcase, AlertCircle, ChevronRight } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { Sidebar } from '../layout/Sidebar';
import { OfferCard } from '../OfferCard';
import { mockOffers, mockApplications, Offer } from '../../data/mockData';

export const DashboardPage: React.FC = () => {
  const { user } = useAuth();
  const [recommendedOffers, setRecommendedOffers] = useState<Offer[]>([]);
  const [recentApplications, setRecentApplications] = useState(mockApplications.slice(0, 3));

  useEffect(() => {
    // Filter offers based on user's domains
    if (user?.profile?.domains) {
      const filtered = mockOffers
        .filter(offer => 
          user.profile!.domains.some(domain => offer.domain === domain)
        )
        .slice(0, 3);
      
      // Mark offers as compatible and add matching score
      const withCompatibility = filtered.map(offer => ({
        ...offer,
        isCompatible: true,
        isApplied: mockApplications.some(app => app.offerId === offer.id),
      }));
      
      setRecommendedOffers(withCompatibility);
    }
  }, [user]);

  const stats = [
    {
      label: 'Candidatures envoyées',
      value: mockApplications.length,
      icon: FileText,
      color: 'text-blue-600',
      bg: 'bg-blue-50',
    },
    {
      label: 'Candidatures acceptées',
      value: mockApplications.filter(app => app.status === 'accepted').length,
      icon: Target,
      color: 'text-green-600',
      bg: 'bg-green-50',
    },
    {
      label: 'En attente',
      value: mockApplications.filter(app => app.status === 'pending').length,
      icon: Briefcase,
      color: 'text-yellow-600',
      bg: 'bg-yellow-50',
    },
    {
      label: 'Taux d\'acceptation',
      value: `${Math.round((mockApplications.filter(app => app.status === 'accepted').length / mockApplications.length) * 100)}%`,
      icon: TrendingUp,
      color: 'text-purple-600',
      bg: 'bg-purple-50',
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'accepted':
        return 'bg-green-100 text-green-700';
      case 'rejected':
        return 'bg-red-100 text-red-700';
      case 'pending':
        return 'bg-yellow-100 text-yellow-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'accepted':
        return 'Acceptée';
      case 'rejected':
        return 'Refusée';
      case 'pending':
        return 'En attente';
      case 'expired':
        return 'Expirée';
      default:
        return status;
    }
  };

  const profileCompletion = user?.profile?.completionPercent || 0;

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      
      <div className="flex-1 overflow-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-gray-900 mb-2">
              Bonjour {user?.profile?.name || 'Influenceur'} 👋
            </h1>
            <p className="text-gray-600">
              Voici un aperçu de votre activité sur InfluMatch
            </p>
          </div>

          {/* Profile Completion Warning */}
          {profileCompletion < 100 && (
            <div className="mb-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-yellow-600 mt-0.5" />
              <div className="flex-1">
                <p className="text-yellow-800">
                  Votre profil est complété à {profileCompletion}%. Complétez-le pour maximiser votre visibilité.
                </p>
                <Link to="/profile" className="text-yellow-900 hover:underline mt-1 inline-block">
                  Compléter mon profil →
                </Link>
              </div>
            </div>
          )}

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {stats.map((stat) => {
              const Icon = stat.icon;
              return (
                <div key={stat.label} className="bg-white rounded-lg p-6 border border-gray-200">
                  <div className="flex items-center justify-between mb-4">
                    <div className={`w-12 h-12 ${stat.bg} rounded-lg flex items-center justify-center`}>
                      <Icon className={`w-6 h-6 ${stat.color}`} />
                    </div>
                  </div>
                  <p className="text-gray-600 text-sm mb-1">{stat.label}</p>
                  <p className="text-gray-900">{stat.value}</p>
                </div>
              );
            })}
          </div>

          {/* Recommended Offers Section */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-gray-900">Offres recommandées pour vous</h2>
              <Link to="/marketplace" className="flex items-center gap-1 text-purple-600 hover:text-purple-700">
                Voir tout
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>

            {recommendedOffers.length > 0 ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {recommendedOffers.map((offer) => (
                  <OfferCard key={offer.id} offer={offer} />
                ))}
              </div>
            ) : (
              <div className="bg-white border border-gray-200 rounded-lg p-12 text-center">
                <p className="text-gray-600 mb-4">
                  Aucune offre recommandée pour le moment
                </p>
                <Link
                  to="/marketplace"
                  className="inline-block px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                >
                  Parcourir toutes les offres
                </Link>
              </div>
            )}
          </div>

          {/* Recent Applications Section */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-gray-900">Candidatures récentes</h2>
              <Link to="/applications" className="flex items-center gap-1 text-purple-600 hover:text-purple-700">
                Voir tout
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>

            {recentApplications.length > 0 ? (
              <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                      <th className="px-6 py-3 text-left text-gray-700">Offre</th>
                      <th className="px-6 py-3 text-left text-gray-700">Entreprise</th>
                      <th className="px-6 py-3 text-left text-gray-700">Date</th>
                      <th className="px-6 py-3 text-left text-gray-700">Statut</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {recentApplications.map((app) => (
                      <tr key={app.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4">
                          <Link to={`/offer/${app.offerId}`} className="text-purple-600 hover:text-purple-700">
                            {app.offerTitle}
                          </Link>
                        </td>
                        <td className="px-6 py-4 text-gray-900">{app.companyName}</td>
                        <td className="px-6 py-4 text-gray-600">
                          {new Date(app.appliedDate).toLocaleDateString('fr-FR')}
                        </td>
                        <td className="px-6 py-4">
                          <span className={`px-3 py-1 rounded-full text-sm ${getStatusColor(app.status)}`}>
                            {getStatusLabel(app.status)}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="bg-white border border-gray-200 rounded-lg p-12 text-center">
                <p className="text-gray-600 mb-4">
                  Vous n'avez pas encore postulé à des offres
                </p>
                <Link
                  to="/marketplace"
                  className="inline-block px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                >
                  Découvrir les offres
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
