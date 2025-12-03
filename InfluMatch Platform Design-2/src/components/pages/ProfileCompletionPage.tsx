import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Check, AlertCircle } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { domains, platformsList } from '../../data/mockData';

type Tab = 'info' | 'domains' | 'platforms' | 'pricing';

export const ProfileCompletionPage: React.FC = () => {
  const { user, updateProfile } = useAuth();
  const navigate = useNavigate();
  
  const [activeTab, setActiveTab] = useState<Tab>('info');
  const [name, setName] = useState('');
  const [pseudo, setPseudo] = useState('');
  const [bio, setBio] = useState('');
  const [location, setLocation] = useState('');
  const [selectedDomains, setSelectedDomains] = useState<string[]>([]);
  const [platforms, setPlatforms] = useState<{ name: string; handle: string; followers: number; engagement: number }[]>([]);
  const [pricing, setPricing] = useState({
    story: 0,
    post: 0,
    video: 0,
    negotiable: true,
  });

  useEffect(() => {
    if (user?.profile) {
      setName(user.profile.name || '');
      setPseudo(user.profile.pseudo || '');
      setBio(user.profile.bio || '');
      setLocation(user.profile.location || '');
      setSelectedDomains(user.profile.domains || []);
      setPlatforms(user.profile.platforms || []);
      setPricing(user.profile.pricing || { story: 0, post: 0, video: 0, negotiable: true });
    }
  }, [user]);

  const calculateCompletion = () => {
    let completion = 0;
    if (name) completion += 15;
    if (pseudo) completion += 15;
    if (bio) completion += 10;
    if (location) completion += 10;
    if (selectedDomains.length > 0) completion += 20;
    if (platforms.length > 0) completion += 20;
    if (pricing.story || pricing.post || pricing.video) completion += 10;
    return completion;
  };

  const completionPercent = calculateCompletion();

  const handleSave = () => {
    updateProfile({
      name,
      pseudo,
      bio,
      location,
      domains: selectedDomains,
      platforms,
      pricing,
      completionPercent,
    });
  };

  const handleComplete = () => {
    if (completionPercent === 100) {
      handleSave();
      navigate('/dashboard');
    }
  };

  const toggleDomain = (domain: string) => {
    if (selectedDomains.includes(domain)) {
      setSelectedDomains(selectedDomains.filter(d => d !== domain));
    } else {
      setSelectedDomains([...selectedDomains, domain]);
    }
  };

  const addPlatform = () => {
    setPlatforms([...platforms, { name: '', handle: '', followers: 0, engagement: 0 }]);
  };

  const updatePlatform = (index: number, field: string, value: string | number) => {
    const updated = [...platforms];
    updated[index] = { ...updated[index], [field]: value };
    setPlatforms(updated);
  };

  const removePlatform = (index: number) => {
    setPlatforms(platforms.filter((_, i) => i !== index));
  };

  const tabs = [
    { id: 'info' as Tab, name: 'Informations', percent: 50 },
    { id: 'domains' as Tab, name: 'Domaines', percent: 20 },
    { id: 'platforms' as Tab, name: 'Plateformes', percent: 20 },
    { id: 'pricing' as Tab, name: 'Tarifs', percent: 10 },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-5xl mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-sm">
          {/* Header */}
          <div className="p-6 border-b border-gray-200">
            <h1 className="text-gray-900 mb-2">Complétez votre profil</h1>
            <p className="text-gray-600 mb-4">
              Remplissez toutes les sections pour maximiser votre visibilité
            </p>
            
            {/* Progress Bar */}
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-gray-600">Complétion du profil</span>
                <span className="text-purple-600">{completionPercent}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-purple-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${completionPercent}%` }}
                />
              </div>
            </div>

            {completionPercent < 100 && (
              <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg flex items-start gap-2">
                <AlertCircle className="w-5 h-5 text-yellow-600 mt-0.5" />
                <p className="text-yellow-800 text-sm">
                  Profil incomplet = visibilité réduite. Complétez toutes les sections pour accéder aux meilleures opportunités.
                </p>
              </div>
            )}
          </div>

          {/* Tabs */}
          <div className="border-b border-gray-200">
            <nav className="flex">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex-1 px-6 py-4 text-center border-b-2 transition-colors ${
                    activeTab === tab.id
                      ? 'border-purple-600 text-purple-600'
                      : 'border-transparent text-gray-600 hover:text-gray-900 hover:border-gray-300'
                  }`}
                >
                  {tab.name}
                </button>
              ))}
            </nav>
          </div>

          {/* Content */}
          <div className="p-6">
            {/* Info Tab */}
            {activeTab === 'info' && (
              <div className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-gray-700 mb-2">Nom complet *</label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
                      placeholder="Sophie Martin"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 mb-2">Pseudo *</label>
                    <input
                      type="text"
                      value={pseudo}
                      onChange={(e) => setPseudo(e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
                      placeholder="@sophiestyle"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-gray-700 mb-2">Localisation *</label>
                  <input
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
                    placeholder="Paris, France"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 mb-2">Bio *</label>
                  <textarea
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                    rows={4}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
                    placeholder="Parlez de vous, de votre style de contenu, de vos valeurs..."
                  />
                </div>
              </div>
            )}

            {/* Domains Tab */}
            {activeTab === 'domains' && (
              <div>
                <p className="text-gray-600 mb-4">
                  Sélectionnez au moins un domaine d'expertise (minimum 1 requis)
                </p>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {domains.map((domain) => (
                    <button
                      key={domain}
                      onClick={() => toggleDomain(domain)}
                      className={`p-4 border-2 rounded-lg transition-colors ${
                        selectedDomains.includes(domain)
                          ? 'border-purple-600 bg-purple-50 text-purple-600'
                          : 'border-gray-200 text-gray-700 hover:border-gray-300'
                      }`}
                    >
                      {domain}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Platforms Tab */}
            {activeTab === 'platforms' && (
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <p className="text-gray-600">
                    Ajoutez au moins une plateforme avec vos statistiques
                  </p>
                  <button
                    onClick={addPlatform}
                    className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                  >
                    Ajouter une plateforme
                  </button>
                </div>

                {platforms.map((platform, index) => (
                  <div key={index} className="p-4 border border-gray-200 rounded-lg">
                    <div className="grid md:grid-cols-2 gap-4 mb-4">
                      <div>
                        <label className="block text-gray-700 mb-2">Plateforme</label>
                        <select
                          value={platform.name}
                          onChange={(e) => updatePlatform(index, 'name', e.target.value)}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
                        >
                          <option value="">Sélectionner</option>
                          {platformsList.map((p) => (
                            <option key={p} value={p}>{p}</option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="block text-gray-700 mb-2">Handle</label>
                        <input
                          type="text"
                          value={platform.handle}
                          onChange={(e) => updatePlatform(index, 'handle', e.target.value)}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
                          placeholder="@username"
                        />
                      </div>
                    </div>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-gray-700 mb-2">Abonnés</label>
                        <input
                          type="number"
                          value={platform.followers || ''}
                          onChange={(e) => updatePlatform(index, 'followers', parseInt(e.target.value) || 0)}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
                          placeholder="45000"
                        />
                        {platform.followers === 0 && (
                          <p className="text-yellow-600 text-sm mt-1">⚠️ Statistiques incohérentes</p>
                        )}
                      </div>
                      <div>
                        <label className="block text-gray-700 mb-2">Engagement (%)</label>
                        <input
                          type="number"
                          step="0.1"
                          value={platform.engagement || ''}
                          onChange={(e) => updatePlatform(index, 'engagement', parseFloat(e.target.value) || 0)}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
                          placeholder="4.2"
                        />
                      </div>
                    </div>
                    <button
                      onClick={() => removePlatform(index)}
                      className="mt-4 text-red-600 hover:text-red-700 text-sm"
                    >
                      Supprimer cette plateforme
                    </button>
                  </div>
                ))}

                {platforms.length === 0 && (
                  <div className="text-center py-8 text-gray-500">
                    Aucune plateforme ajoutée. Cliquez sur "Ajouter une plateforme" pour commencer.
                  </div>
                )}
              </div>
            )}

            {/* Pricing Tab */}
            {activeTab === 'pricing' && (
              <div className="space-y-6">
                <p className="text-gray-600">
                  Indiquez vos tarifs indicatifs pour différents types de contenu
                </p>
                
                <div className="grid md:grid-cols-3 gap-6">
                  <div>
                    <label className="block text-gray-700 mb-2">Story (€)</label>
                    <input
                      type="number"
                      value={pricing.story || ''}
                      onChange={(e) => setPricing({ ...pricing, story: parseInt(e.target.value) || 0 })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
                      placeholder="150"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 mb-2">Post (€)</label>
                    <input
                      type="number"
                      value={pricing.post || ''}
                      onChange={(e) => setPricing({ ...pricing, post: parseInt(e.target.value) || 0 })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
                      placeholder="500"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 mb-2">Vidéo (€)</label>
                    <input
                      type="number"
                      value={pricing.video || ''}
                      onChange={(e) => setPricing({ ...pricing, video: parseInt(e.target.value) || 0 })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
                      placeholder="800"
                    />
                  </div>
                </div>

                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="negotiable"
                    checked={pricing.negotiable}
                    onChange={(e) => setPricing({ ...pricing, negotiable: e.target.checked })}
                    className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-600"
                  />
                  <label htmlFor="negotiable" className="ml-2 text-gray-700">
                    Tarifs négociables
                  </label>
                </div>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="p-6 border-t border-gray-200 flex justify-between">
            <button
              onClick={handleSave}
              className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Sauvegarder
            </button>
            <button
              onClick={handleComplete}
              disabled={completionPercent < 100}
              className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              {completionPercent === 100 && <Check className="w-5 h-5" />}
              Terminer
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
