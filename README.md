# InfluMatch

> Plateforme de mise en relation entre influenceurs et entreprises

InfluMatch est une application web moderne permettant aux entreprises de publier des offres de collaboration et aux influenceurs de découvrir et postuler à ces opportunités. La plateforme facilite la mise en relation entre les deux parties grâce à un système de marketplace intuitif.

## 🚀 Fonctionnalités

### Pour les Influenceurs
- **Inscription et authentification** sécurisée avec JWT
- **Profil personnalisable** avec informations détaillées
- **Marketplace** pour découvrir les offres de collaboration
- **Système de candidature** pour postuler aux offres
- **Tableau de bord** pour suivre les candidatures
- **Notifications** pour rester informé

### Pour les Entreprises
- **Gestion de profil** entreprise
- **Publication d'offres** de collaboration
- **Consultation des candidatures** reçues
- **Gestion des collaborations** avec les influenceurs

## 🛠️ Technologies

### Backend
- **Django 5.2.7** - Framework web Python
- **Django REST Framework 3.14.0** - API REST
- **Django REST Framework Simple JWT 5.3.1** - Authentification JWT
- **Django CORS Headers 4.3.1** - Gestion CORS
- **Django Filter 23.5** - Filtrage avancé
- **MySQL Connector Python 9.5.0** - Connecteur MySQL
- **Python-dotenv 1.0.0** - Gestion des variables d'environnement

### Frontend
- **React 18.3.1** - Bibliothèque UI
- **TypeScript** - Typage statique
- **Vite 6.3.5** - Build tool moderne
- **React Router DOM 7.9.6** - Routing
- **Bootstrap 5.3.3** - Framework CSS
- **React Bootstrap 2.10.2** - Composants React Bootstrap
- **React Hook Form 7.55.0** - Gestion des formulaires
- **Lucide React 0.487.0** - Icônes
- **Recharts 2.15.2** - Graphiques et visualisations

### Base de données
- **MySQL 8.0+** (par défaut)
- **SQLite** (optionnel pour le développement)

## 📁 Structure du Projet

```
influmatch/
├── 📄 manage.py                    # Script de gestion Django
├── 📄 requirements.txt             # Dépendances Python
├── 📄 db.sqlite3                   # Base de données SQLite (si utilisée)
├── 📄 README.md                    # Documentation principale
│
├── 📁 backend/                      # Configuration Django
│   ├── __init__.py
│   ├── settings.py                 # Configuration Django
│   ├── urls.py                     # URLs principales
│   ├── wsgi.py                     # WSGI config
│   └── asgi.py                     # ASGI config
│
├── 📁 api/                         # Application Django principale
│   ├── __init__.py
│   ├── admin.py                    # Configuration admin Django
│   ├── apps.py                     # Configuration de l'app
│   ├── urls.py                     # Routes API
│   ├── signals.py                  # Signaux Django
│   ├── tests.py                    # Tests unitaires
│   │
│   ├── 📁 models/                  # Modèles de données
│   │   ├── __init__.py
│   │   ├── user.py                 # Modèle User
│   │   ├── influencer.py           # Modèle Influenceur
│   │   ├── company.py              # Modèle Company
│   │   └── application.py          # Modèle Application
│   │
│   ├── 📁 views/                   # Vues API
│   │   ├── __init__.py
│   │   ├── auth_views.py           # Authentification (login, signup)
│   │   ├── user_views.py           # Vues utilisateur
│   │   └── profile_views.py        # Vues profil
│   │
│   ├── 📁 serializers/             # Sérialiseurs DRF
│   │   └── __init__.py
│   │
│   ├── 📁 migrations/              # Migrations Django
│   │   ├── __init__.py
│   │   ├── 0001_initial.py
│   │   ├── 0002_alter_user_options_alter_user_managers_and_more.py
│   │   └── 0003_rename_utilisateur_email_1cb90f_idx_idx_email_and_more.py
│   │
│   └── 📁 management/              # Commandes de gestion
│       └── commands/
│           ├── __init__.py
│           └── load_initial_data.py
│
├── 📁 frontend/                     # Application React
│   ├── 📄 package.json             # Dépendances Node.js
│   ├── 📄 package-lock.json        # Lock file npm
│   ├── 📄 vite.config.ts           # Configuration Vite
│   ├── 📄 tsconfig.json            # Configuration TypeScript
│   ├── 📄 tsconfig.node.json       # Configuration TypeScript pour Node
│   ├── 📄 index.html               # Point d'entrée HTML
│   │
│   ├── 📁 build/                   # Build de production (généré)
│   │   ├── index.html
│   │   └── assets/                 # Assets compilés
│   │
│   └── 📁 src/                     # Code source React
│       ├── 📄 main.tsx             # Point d'entrée React
│       ├── 📄 App.tsx              # Composant principal + Routing
│       ├── 📄 index.css            # Styles globaux
│       ├── 📄 vite-env.d.ts        # Types TypeScript pour Vite
│       │
│       ├── 📁 pages/               # Pages de l'application
│       │   ├── LandingPage.tsx     # Page d'accueil
│       │   ├── LoginPage.tsx       # Page de connexion
│       │   ├── SignupPage.tsx      # Page d'inscription
│       │   ├── DashboardPage.tsx   # Tableau de bord
│       │   ├── ProfilePage.tsx     # Page de profil
│       │   ├── ProfileCompletionPage.tsx  # Complétion de profil
│       │   ├── MarketplacePage.tsx # Marketplace
│       │   ├── OfferDetailPage.tsx # Détails d'une offre
│       │   ├── ApplicationsPage.tsx # Page des candidatures
│       │   └── NotificationsPage.tsx # Page des notifications
│       │
│       ├── 📁 components/          # Composants réutilisables
│       │   ├── 📁 layout/          # Composants de layout
│       │   │   ├── Sidebar.tsx     # Barre latérale
│       │   │   └── TopBar.tsx      # Barre supérieure
│       │   └── OfferCard.tsx       # Carte d'offre
│       │
│       ├── 📁 services/            # Services API
│       │   ├── api.ts              # Service API principal
│       │   └── mockData.ts         # Données fictives
│       │
│       ├── 📁 contexts/            # Contextes React
│       │   └── AuthContext.tsx     # Contexte d'authentification
│       │
│       └── 📁 styles/              # Styles CSS
│           ├── bootstrap-custom.css # Styles Bootstrap personnalisés
│           └── globals.css         # Styles globaux personnalisés
│
├── 📁 rapport/                     # Dossier du rapport LaTeX
│   ├── rapport.tex                 # Fichier principal du rapport
│   ├── pagedegarde.tex            # Page de garde
│   ├── sample.bib                 # Bibliographie
│   ├── logo_Paris_Nanterre_couleur_RVB.png  # Logo université
│   ├── PageAccueil.png            # Capture d'écran
│   ├── PageConnexion.png          # Capture d'écran
│   ├── PageInscription.png        # Capture d'écran
│   ├── Dashboard.png              # Capture d'écran
│   ├── Marketplace.png            # Capture d'écran
│   ├── Profil.png                 # Capture d'écran
│   ├── Candidature.png            # Capture d'écran
│   └── Bordure.png                # Image de bordure
│
└── 📁 venv/                        # Environnement virtuel Python (ignoré par Git)
```

## 🏗️ Architecture

Le projet suit une architecture **MVC (Model-View-Controller)** :

### Model (Backend)
- **Django Models** (`api/models/`) : Définition des entités de données
  - `User` : Utilisateurs de la plateforme
  - `Influencer` : Profils d'influenceurs
  - `Company` : Profils d'entreprises
  - `Application` : Candidatures aux offres

### View (Frontend)
- **React Pages** (`frontend/src/pages/`) : Pages principales de l'application
- **React Components** (`frontend/src/components/`) : Composants réutilisables
- **Bootstrap 5** : Framework CSS pour le styling

### Controller
- **Backend** : Django Views (`api/views/`) - Gestion des requêtes API
- **Frontend** : Services (`frontend/src/services/`) - Communication avec l'API

## 📦 Installation

### Prérequis

- **Python** 3.8+ (recommandé: Python 3.11+)
- **Node.js** 18+ et npm
- **MySQL** 8.0+ (requis par défaut) ou SQLite (optionnel)
- **Git**

### Étape 1 : Cloner le projet

```bash
git clone https://github.com/nourane-hammouda/InfluMatch.git
cd InfluMatch
```

### Étape 2 : Configuration de la Base de Données

#### Option A : MySQL (recommandé)

1. Créer une base de données MySQL :
```sql
CREATE DATABASE InfluMatch CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

2. (Optionnel) Importer le schéma initial si disponible :
```bash
mysql -u root -p InfluMatch < InfluMatch.sql
```

#### Option B : SQLite (pour le développement)

Aucune configuration nécessaire. SQLite sera utilisé automatiquement si `USE_SQLITE=true` est défini dans le fichier `.env`.

### Étape 3 : Configuration du Backend (Django)

1. **Créer un environnement virtuel Python** :
```bash
python3 -m venv venv
```

2. **Activer l'environnement virtuel** :
   - **Sur macOS/Linux** :
   ```bash
   source venv/bin/activate
   ```
   - **Sur Windows** :
   ```bash
   venv\Scripts\activate
   ```

3. **Installer les dépendances Python** :
```bash
pip install -r requirements.txt
```

4. **Créer le fichier `.env`** à la racine du projet :
```bash
touch .env
```

5. **Configurer le fichier `.env`** avec vos paramètres :

**Pour MySQL** :
```env
SECRET_KEY=votre_secret_key_django_très_long_et_aléatoire
DEBUG=True
DB_NAME=InfluMatch
DB_USER=root
DB_PASSWORD=votre_mot_de_passe_mysql
DB_HOST=localhost
DB_PORT=3306
```

**Pour SQLite** :
```env
SECRET_KEY=votre_secret_key_django_très_long_et_aléatoire
DEBUG=True
USE_SQLITE=true
```

**Générer une SECRET_KEY** :
```python
python -c "from django.core.management.utils import get_random_secret_key; print(get_random_secret_key())"
```

6. **Appliquer les migrations** :
```bash
python manage.py migrate
```

7. **(Optionnel) Créer un superutilisateur** pour l'admin Django :
```bash
python manage.py createsuperuser
```

8. **Lancer le serveur Django** :
```bash
python manage.py runserver
```

Le backend sera accessible sur : **http://127.0.0.1:8000**  
L'admin Django sera accessible sur : **http://127.0.0.1:8000/admin/**

### Étape 4 : Configuration du Frontend (React)

1. **Aller dans le dossier frontend** :
```bash
cd frontend
```

2. **Installer les dépendances Node.js** :
```bash
npm install
```

3. **(Optionnel) Créer un fichier `.env`** dans le dossier `frontend/` pour configurer l'URL de l'API :
```env
VITE_API_URL=http://127.0.0.1:8000/api
```

4. **Lancer le serveur de développement** :
```bash
npm run dev
```

Le frontend sera accessible sur : **http://localhost:5173** (ou le port indiqué dans le terminal)

### Étape 5 : Vérification

1. **Vérifier que le backend fonctionne** :
   - Ouvrir : http://127.0.0.1:8000/api/
   - Vous devriez voir un message JSON

2. **Vérifier que le frontend fonctionne** :
   - Ouvrir : http://localhost:5173
   - Vous devriez voir la page d'accueil InfluMatch

3. **Tester l'inscription et la connexion** :
   - Créer un compte depuis la page d'inscription
   - Se connecter avec les identifiants créés

## 🔧 Commandes Utiles

### Backend

```bash
# Créer les migrations après modification des models
python manage.py makemigrations

# Appliquer les migrations
python manage.py migrate

# Créer un superutilisateur
python manage.py createsuperuser

# Charger des données initiales
python manage.py load_initial_data

# Lancer le serveur de développement
python manage.py runserver
```

### Frontend

```bash
# Lancer le serveur de développement
npm run dev

# Construire pour la production
npm run build
```

## 🔌 Endpoints API

### Authentification
- `POST /api/auth/register/` - Inscription d'un nouvel utilisateur
- `POST /api/auth/token/` - Connexion (obtention du token JWT)
- `POST /api/auth/token/refresh/` - Rafraîchir le token JWT
- `GET /api/auth/user/` - Informations de l'utilisateur connecté

### Utilisateurs
- `GET /api/users/` - Liste des utilisateurs (authentifié)
- `GET /api/users/{id}/` - Détails d'un utilisateur

### Profils
- `GET /api/profile/` - Profil de l'utilisateur connecté
- `PUT /api/profile/` - Mettre à jour le profil
- `PATCH /api/profile/` - Mettre à jour partiellement le profil

## 🗄️ Structure de la Base de Données

La base de données utilise **MySQL 8.0+** par défaut. Les migrations Django définissent le schéma complet. Pour utiliser **SQLite** à la place, ajouter `USE_SQLITE=true` dans le fichier `.env`.

### Modèles principaux

- **User** : Utilisateurs de la plateforme (influenceurs et entreprises)
- **Influencer** : Profils détaillés des influenceurs
- **Company** : Profils détaillés des entreprises
- **Application** : Candidatures des influenceurs aux offres

## 🧪 Tests

```bash
# Lancer les tests du backend
python manage.py test
```

## 📝 Contribution

Les contributions sont les bienvenues ! Pour contribuer :

1. Fork le projet
2. Créer une branche pour votre fonctionnalité (`git checkout -b feature/AmazingFeature`)
3. Commit vos changements (`git commit -m 'Add some AmazingFeature'`)
4. Push vers la branche (`git push origin feature/AmazingFeature`)
5. Ouvrir une Pull Request

## 📄 Licence

Ce projet est un projet académique réalisé dans le cadre d'un cours à l'Université Paris Nanterre.

## 🙏 Remerciements

- Université Paris Nanterre
- Django REST Framework
- React Community
