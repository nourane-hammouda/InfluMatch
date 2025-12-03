# Description des Fichiers et Dossiers - InfluMatch

## 📁 Structure Racine

### Fichiers Principaux

- **`manage.py`** : Point d'entrée Django pour les commandes de gestion (migrations, serveur, shell, etc.)
- **`requirements.txt`** : Liste des dépendances Python du projet (Django, DRF, MySQL, etc.)
- **`README.md`** : Documentation principale du projet avec instructions d'installation et d'utilisation
- **`rapport.tex`** : Rapport LaTeX complet du projet avec toutes les fonctionnalités et exemples de code
- **`.env`** : Variables d'environnement locales (mot de passe DB, SECRET_KEY) - **NE PAS COMMITER**
- **`.env.example`** : Template des variables d'environnement pour les autres développeurs
- **`.gitignore`** : Fichiers et dossiers ignorés par Git (venv, node_modules, __pycache__, etc.)

---

## 📁 backend/ - Configuration Django

### Fichiers

- **`__init__.py`** : Fichier Python vide qui fait de `backend` un package Python
- **`settings.py`** : Configuration principale Django
  - Base de données MySQL
  - Applications installées
  - Middleware
  - REST Framework (JWT, pagination, filtres)
  - CORS pour autoriser le frontend
  - Variables d'environnement pour la sécurité
- **`urls.py`** : Routes principales de l'application
  - `/admin/` → Interface d'administration Django
  - `/api/` → Routes API (déléguées à `api/urls.py`)
  - Route racine avec informations API
- **`wsgi.py`** : Configuration WSGI pour le déploiement en production
- **`asgi.py`** : Configuration ASGI pour le support asynchrone (WebSockets, etc.)

---

## 📁 api/ - Application Django Principale

### Fichiers Racine

- **`__init__.py`** : Fichier Python vide
- **`apps.py`** : Configuration de l'application Django
- **`admin.py`** : Configuration de l'interface d'administration Django
  - Enregistrement des modèles (User, Influenceur, Entreprise, Campagne, etc.)
  - Personnalisation des listes, filtres et recherches
- **`urls.py`** : Routes API
  - `/api/auth/register/` → Inscription
  - `/api/auth/token/` → Connexion JWT
  - `/api/auth/token/refresh/` → Rafraîchissement token
  - `/api/auth/user/` → Informations utilisateur
  - `/api/profile/update/` → Mise à jour profil
- **`signals.py`** : Signaux Django pour les actions automatiques (création de profil, etc.)
- **`tests.py`** : Tests unitaires de l'application

### 📁 api/models/ - Modèles de Données (MVC: Model)

- **`__init__.py`** : Exporte tous les modèles pour faciliter les imports
- **`user.py`** : Modèle User personnalisé
  - Hérite de `AbstractBaseUser` pour personnaliser l'authentification
  - Champs : email, type_utilisateur (influenceur/entreprise), est_actif, est_verifie
  - UserManager pour créer des utilisateurs et superutilisateurs
- **`influencer.py`** : Modèles liés aux influenceurs
  - `Influenceur` : Profil influenceur (pseudo, biographie, localisation, statistiques)
  - `DomaineExpertise` : Domaines d'expertise (Mode, Tech, Sport, etc.)
  - `PlateformeSociale` : Plateformes (Instagram, TikTok, YouTube, etc.)
  - `InfluenceurPlateforme` : Lien influenceur/plateforme avec nombre d'abonnés
  - `InfluenceurTarif` : Tarifs (post, story, vidéo)
  - `InfluenceurExpertise` : Table de liaison ManyToMany
- **`company.py`** : Modèles liés aux entreprises
  - `Entreprise` : Profil entreprise (nom, description, secteur, taille)
  - `Campagne` : Campagnes publicitaires (titre, description, budget, dates)
  - `CampagneDomaine` : Table de liaison ManyToMany
  - `CampagnePlateforme` : Table de liaison ManyToMany
- **`application.py`** : Modèles liés aux candidatures
  - `Candidature` : Candidatures des influenceurs aux campagnes
  - `Notification` : Notifications utilisateurs
  - `RechercheSauvegardee` : Recherches sauvegardées par les entreprises

### 📁 api/views/ - Vues API (MVC: Controller)

- **`__init__.py`** : Fichier Python vide
- **`auth_views.py`** : Vues d'authentification
  - `register()` : Inscription d'un nouvel utilisateur
  - Génération de tokens JWT après inscription
- **`user_views.py`** : Vues utilisateur
  - `current_user()` : Récupération des informations de l'utilisateur connecté
  - Inclut les données de profil (influenceur ou entreprise)
  - Calcul du pourcentage de complétion
- **`profile_views.py`** : Vues de profil
  - `update_profile()` : Mise à jour complète du profil influenceur
  - Gestion des domaines, plateformes et tarifs
  - Calcul automatique du pourcentage de complétion

### 📁 api/serializers/ - Sérialiseurs DRF

- **`__init__.py`** : Contient `CustomTokenObtainPairSerializer`
  - Personnalise la réponse de connexion JWT pour inclure l'email au lieu du username

### 📁 api/migrations/ - Migrations Base de Données

- **`__init__.py`** : Fichier Python vide
- **`0001_initial.py`** : Migration initiale créant toutes les tables
- **`0002_alter_user_options_alter_user_managers_and_more.py`** : Migration pour ajuster le modèle User

### 📁 api/management/commands/ - Commandes Django Personnalisées

- **`__init__.py`** : Fichier Python vide
- **`load_initial_data.py`** : Commande pour charger des données initiales (domaines, plateformes, etc.)
  - Usage : `python manage.py load_initial_data`

---

## 📁 frontend/ - Application React

### Fichiers Racine

- **`package.json`** : Configuration npm avec dépendances et scripts
  - Dépendances : React, TypeScript, Vite, shadcn/ui, react-router-dom
  - Scripts : `npm run dev` (développement), `npm run build` (production)
- **`package-lock.json`** : Verrouillage des versions exactes des dépendances
- **`vite.config.ts`** : Configuration Vite (build tool)
  - Port 5173
  - Proxy vers le backend Django
- **`index.html`** : Point d'entrée HTML de l'application
- **`README.md`** : Documentation du frontend
- **`build/`** : Dossier de build de production (généré par `npm run build`)

### 📁 frontend/src/ - Code Source React

#### Fichiers Principaux

- **`main.tsx`** : Point d'entrée React
  - Rend l'application dans le DOM
  - Importe les styles globaux
- **`App.tsx`** : Composant racine de l'application
  - Configuration du routing avec React Router
  - Gestion de l'authentification et de la complétion du profil
  - Protection des routes selon l'état de connexion
- **`index.css`** : Styles CSS globaux

#### 📁 frontend/src/pages/ - Pages Principales (MVC: View)

- **`LandingPage.tsx`** : Page d'accueil publique
  - Présentation de la plateforme
  - Liens vers inscription/connexion
  - Fonctionnalités principales
- **`LoginPage.tsx`** : Page de connexion
  - Formulaire email/mot de passe
  - Gestion des erreurs et tentatives de connexion
  - Protection contre les attaques par force brute
- **`SignupPage.tsx`** : Page d'inscription
  - Choix du type d'utilisateur (influenceur/entreprise)
  - Validation des données
  - Redirection après inscription
- **`ProfileCompletionPage.tsx`** : Page de complétion du profil
  - 4 onglets : Informations, Domaines, Plateformes, Tarifs
  - Validation progressive
  - Calcul du pourcentage de complétion
  - Sauvegarde des données
- **`ProfilePage.tsx`** : Page de profil utilisateur
  - Affichage et édition du profil
  - Statistiques personnelles
- **`DashboardPage.tsx`** : Tableau de bord principal
  - Vue d'ensemble des statistiques
  - Accès rapide aux fonctionnalités
  - Indicateurs de performance
- **`MarketplacePage.tsx`** : Marketplace des campagnes
  - Liste des campagnes disponibles
  - Filtres et recherche
  - Candidature aux campagnes
- **`OfferDetailPage.tsx`** : Détail d'une campagne
  - Informations complètes de la campagne
  - Formulaire de candidature
  - Historique des candidatures
- **`ApplicationsPage.tsx`** : Page des candidatures
  - Liste des candidatures de l'influenceur
  - Statut (en attente, acceptée, refusée)
  - Filtres et tri
- **`NotificationsPage.tsx`** : Page des notifications
  - Liste des notifications
  - Marquage comme lues
  - Filtres par type

#### 📁 frontend/src/components/ - Composants Réutilisables

##### 📁 frontend/src/components/layout/ - Composants de Layout

- **`Sidebar.tsx`** : Barre latérale de navigation
  - Menu de navigation principal
  - Liens vers les différentes pages
  - Bouton de déconnexion
- **`TopBar.tsx`** : Barre supérieure
  - Informations utilisateur
  - Notifications
  - Recherche

##### 📁 frontend/src/components/ui/ - Composants UI (shadcn/ui)

Composants UI réutilisables basés sur Radix UI et Tailwind CSS :
- **`button.tsx`** : Boutons stylisés
- **`input.tsx`** : Champs de saisie
- **`card.tsx`** : Cartes conteneurs
- **`dialog.tsx`** : Modales/dialogs
- **`form.tsx`** : Formulaires avec validation
- **`table.tsx`** : Tableaux
- **`select.tsx`** : Sélecteurs
- **`checkbox.tsx`** : Cases à cocher
- **`tabs.tsx`** : Onglets
- **`alert.tsx`** : Alertes
- **`badge.tsx`** : Badges
- Et 30+ autres composants UI...

- **`utils.ts`** : Utilitaires (cn pour fusionner les classes CSS)

##### Autres Composants

- **`OfferCard.tsx`** : Carte d'affichage d'une campagne/offre
  - Utilisé dans la marketplace
  - Affiche les informations principales

#### 📁 frontend/src/services/ - Services API (MVC: Controller)

- **`api.ts`** : Service principal de communication avec l'API Django
  - Gestion des tokens JWT (stockage, rafraîchissement)
  - Fonctions : `authAPI.login()`, `authAPI.signup()`, `authAPI.getCurrentUser()`, etc.
  - Gestion automatique du rafraîchissement des tokens
  - Gestion des erreurs HTTP
- **`mockData.ts`** : Données de test/mock pour le développement
  - Utilisé avant l'intégration avec le backend

#### 📁 frontend/src/contexts/ - Contextes React

- **`AuthContext.tsx`** : Contexte d'authentification global
  - État utilisateur global
  - Fonctions : `login()`, `signup()`, `logout()`, `updateProfile()`
  - Gestion des tentatives de connexion
  - Protection contre les attaques par force brute

#### 📁 frontend/src/styles/ - Styles CSS

- **`globals.css`** : Styles CSS globaux
  - Variables CSS personnalisées
  - Styles de base
- **`bootstrap-custom.css`** : Personnalisation Bootstrap
  - Override des styles Bootstrap par défaut
  - Thème personnalisé

---

## 📁 venv/ - Environnement Virtuel Python

- **`bin/`** : Exécutables Python
  - `python`, `pip`, `django-admin`, etc.
- **`lib/`** : Bibliothèques Python installées
  - Django, DRF, MySQL connector, etc.
- **`pyvenv.cfg`** : Configuration de l'environnement virtuel

**Note** : Ce dossier est ignoré par Git (dans `.gitignore`)

---

## 📁 node_modules/ - Dépendances npm

- Toutes les dépendances npm installées
- Généré automatiquement par `npm install`

**Note** : Ce dossier est ignoré par Git (dans `.gitignore`)

---

## 📁 __pycache__/ - Cache Python

- Fichiers `.pyc` compilés par Python
- Générés automatiquement

**Note** : Ce dossier est ignoré par Git (dans `.gitignore`)

---

## 🔄 Flux de Données

### Backend → Frontend
1. **API REST** (`api/views/`) → **Services** (`frontend/src/services/api.ts`) → **Pages/Composants**

### Authentification
1. **Login** → `auth_views.py` → Génère JWT → Stocké dans localStorage
2. **Requêtes API** → Token dans header → `JWTAuthentication` → Accès aux données

### Complétion du Profil
1. **ProfileCompletionPage** → Formulaire multi-étapes
2. **Soumission** → `profile_views.py` → Sauvegarde en base
3. **Calcul completion** → Mise à jour automatique

---

## 📝 Notes Importantes

- **Sécurité** : Les credentials sont dans `.env` (non versionné)
- **Base de données** : MySQL avec schéma personnalisé
- **Authentification** : JWT avec rotation automatique des tokens
- **Architecture** : MVC avec séparation claire backend/frontend
- **Build** : Frontend compilé avec Vite, backend avec Django

---

## 🚀 Commandes Utiles

```bash
# Backend
python manage.py runserver          # Démarrer le serveur Django
python manage.py migrate            # Appliquer les migrations
python manage.py createsuperuser    # Créer un admin
python manage.py load_initial_data  # Charger données initiales

# Frontend
npm run dev                         # Démarrer le serveur de développement
npm run build                       # Build de production
```

---

*Document généré le $(date)*

