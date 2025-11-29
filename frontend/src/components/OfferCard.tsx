import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Users, Euro } from 'lucide-react';
import { Offer } from '../services/mockData';

interface OfferCardProps {
  offer: Offer;
}

export const OfferCard: React.FC<OfferCardProps> = ({ offer }) => {
  const isExpired = offer.status === 'expired';
  const isIncompatible = offer.isCompatible === false;
  const isApplied = offer.isApplied;

  return (
    <Link
      to={isIncompatible ? '#' : `/offer/${offer.id}`}
      className={`block bg-white border border-gray-200 rounded-lg p-6 transition-all ${
        isIncompatible || isExpired
          ? 'opacity-50 cursor-not-allowed'
          : 'hover:shadow-lg hover:border-purple-300'
      }`}
      onClick={(e) => {
        if (isIncompatible || isExpired) {
          e.preventDefault();
        }
      }}
    >
      <div className="flex items-start gap-4 mb-4">
        <img
          src={offer.companyLogo}
          alt={offer.companyName}
          className="w-12 h-12 rounded-lg object-cover"
        />
        <div className="flex-1">
          <h3 className="text-gray-900 mb-1">{offer.title}</h3>
          <p className="text-gray-600 text-sm">{offer.companyName}</p>
        </div>
        {isApplied && (
          <span className="px-3 py-1 bg-green-100 text-green-700 text-sm rounded-full">
            Candidature envoyée
          </span>
        )}
        {isIncompatible && (
          <span className="px-3 py-1 bg-gray-100 text-gray-600 text-sm rounded-full">
            Incompatible
          </span>
        )}
      </div>

      <p className="text-gray-600 text-sm mb-4 line-clamp-2">
        {offer.description}
      </p>

      <div className="flex flex-wrap gap-2 mb-4">
        <span className="px-3 py-1 bg-purple-50 text-purple-600 text-sm rounded-full">
          {offer.domain}
        </span>
        {offer.platforms.map((platform) => (
          <span
            key={platform}
            className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full"
          >
            {platform}
          </span>
        ))}
      </div>

      <div className="flex items-center justify-between text-sm">
        <div className="flex items-center gap-4 text-gray-600">
          <div className="flex items-center gap-1">
            <Euro className="w-4 h-4" />
            <span>{offer.budget}€</span>
          </div>
          <div className="flex items-center gap-1">
            <Users className="w-4 h-4" />
            <span>{offer.applicants} candidats</span>
          </div>
          <div className="flex items-center gap-1">
            <Calendar className="w-4 h-4" />
            <span>
              {new Date(offer.deadline).toLocaleDateString('fr-FR', {
                day: 'numeric',
                month: 'short',
              })}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};
