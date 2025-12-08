# InfluMatch

Platforme de mise en relation entre influenceurs et entreprises.

## 📁 Arborescence Complète du Projet

```
influmatch/
├── 📄 manage.py                    # Script de gestion Django
├── 📄 requirements.txt             # Dépendances Python
├── 📄 .env                         # Variables d'environnement (à créer)
├── 📄 .gitignore                   # Fichiers ignorés par Git
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
│   ├── 📁 models/                  # Modèles de données (MVC: Model)
│   │   ├── __init__.py
│   │   ├── user.py                 # Modèle User
│   │   ├── influencer.py           # Modèle Influenceur
│   │   ├── company.py              # Modèle Company
│   │   └── application.py          # Modèle Application
│   │
│   ├── 📁 views/                   # Vues API (MVC: Controller)
│   │   ├── __init__.py
│   │   ├── auth_views.py           # Authentification (login, signup)
│   │   ├── user_views.py           # Vues utilisateur
│   │   └── profile_views.py        # Vues profil
│   │
│   ├── 📁 serializers/             # Sérialiseurs DRF
│   │   └── __init__.py             # CustomTokenObtainPairSerializer
│   │
│   ├── 📁 migrations/              # Migrations Django
│   │   ├── __init__.py
│   │   ├── 0001_initial.py
│   │   └── 0002_alter_user_options_alter_user_managers_and_more.py
│   │
│   └── 📁 management/              # Commandes de gestion
│       └── commands/
│           ├── __init__.py
│           └── load_initial_data.py
│
├── 📁 frontend/                     # Application React
│   ├── 📄 package.json             # Dépendances Node.js
│   ├── 📄 vite.config.ts           # Configuration Vite
│   ├── 📄 index.html               # Point d'entrée HTML
│   │
│   └── 📁 src/                     # Code source React
│       ├── 📄 main.tsx             # Point d'entrée React
│       ├── 📄 App.tsx              # Composant principal + Routing
│       ├── 📄 index.css            # Styles globaux
│       │
│       ├── 📁 pages/               # Pages/Vues (MVC: View)
│       │   ├── LandingPage.tsx     # Page d'accueil
│       │   ├── LoginPage.tsx       # Page de connexion
│       │   ├── SignupPage.tsx      # Page d'inscription
│       │   ├── DashboardPage.tsx   # Tableau de bord
│       │   ├── ProfilePage.tsx     # Page de profil
│       │   ├── ProfileCompletionPage.tsx  # Complétion de profil
│       │   ├── MarketplacePage.tsx # Marketplace (offres fictives)
│       │   ├── OfferDetailPage.tsx  # Détails d'une offre
│       │   ├── ApplicationsPage.tsx # Page des candidatures
│       │   └── NotificationsPage.tsx # Page des notifications
│       │
│       ├── 📁 components/          # Composants réutilisables
│       │   ├── 📁 layout/         # Composants de layout
│       │   │   ├── Sidebar.tsx     # Barre latérale
│       │   │   └── TopBar.tsx      # Barre supérieure
│       │   ├── OfferCard.tsx       # Carte d'offre
│       │   └── 📁 ui/             # Composants UI (shadcn/ui)
│       │       ├── accordion.tsx
│       │       ├── alert.tsx
│       │       ├── avatar.tsx
│       │       ├── badge.tsx
│       │       ├── button.tsx
│       │       ├── card.tsx
│       │       ├── dialog.tsx
│       │       ├── form.tsx
│       │       ├── input.tsx
│       │       ├── select.tsx
│       │       ├── table.tsx
│       │       ├── tabs.tsx
│       │       └── ... (48 composants UI au total)
│       │
│       ├── 📁 services/            # Services API (MVC: Controller)
│       │   ├── api.ts              # Service API principal
│       │   └── mockData.ts         # Données fictives (offres, etc.)
│       │
│       ├── 📁 contexts/            # Contextes React
│       │   └── AuthContext.tsx     # Contexte d'authentification
│       │
│       └── 📁 styles/              # Styles CSS
│           ├── bootstrap-custom.css # Styles Bootstrap personnalisés
│           └── globals.css         # Styles globaux
│
├── 📁 venv/                        # Environnement virtuel Python (ignoré par Git)
├── 📄 README.md                    # Documentation principale
├── 📄 INSTALLATION.md              # Guide d'installation détaillé
├── 📄 REPARTITION_TACHES.md        # Répartition des tâches (4 personnes)
├── 📄 DESCRIPTION_FICHIERS.md       # Description des fichiers
└── 📄 rapport.tex                  # Rapport LaTeX du projet
```

## Structure du Projet

### Backend (Django REST Framework)

```
backend/              # Configuration Django
api/                  # Application principale
  ├── models/         # Modèles de données (MVC: Model)
  │   ├── user.py
  │   ├── influencer.py
  │   ├── company.py
  │   └── application.py
  ├── views/          # Vues API (MVC: Controller)
  │   ├── auth_views.py
  │   ├── user_views.py
  │   └── profile_views.py
  ├── serializers/    # Sérialiseurs DRF
  ├── urls.py         # Routes API
  └── signals.py      # Signaux Django
```

### Frontend (React + TypeScript + Vite)

```
frontend/
  ├── src/
  │   ├── pages/              # Pages/Vues (MVC: View)
  │   │   ├── LandingPage.tsx
  │   │   ├── LoginPage.tsx
  │   │   ├── SignupPage.tsx
  │   │   ├── DashboardPage.tsx
  │   │   └── ...
  │   ├── components/         # Composants réutilisables
  │   │   ├── layout/         # Composants de layout
  │   │   │   ├── Sidebar.tsx
  │   │   │   └── TopBar.tsx
  │   │   ├── ui/             # Composants UI (shadcn/ui)
  │   │   └── OfferCard.tsx
  │   ├── services/           # Services API (MVC: Controller)
  │   │   ├── api.ts
  │   │   └── mockData.ts
  │   ├── contexts/           # Contextes React
  │   │   └── AuthContext.tsx
  │   └── styles/             # Styles CSS
```

## Architecture MVC

### Model (Backend)
- **Django Models** (`api/models/`): Définition des entités de données
- **Database**: MySQL avec schéma personnalisé

### View (Frontend)
- **React Pages** (`frontend/src/pages/`): Pages principales de l'application
- **React Components** (`frontend/src/components/`): Composants réutilisables

### Controller
- **Backend**: Django Views (`api/views/`) - Gestion des requêtes API
- **Frontend**: Services (`frontend/src/services/`) - Communication avec l'API


### Installation Rapide (Résumé)

### Prérequis

- **Python** 3.8+ (recommandé: Python 3.11+)
- **Node.js** 18+ et npm
- **MySQL** 8.0+
- **Git**

### Étape 1 : Cloner le projet

```bash
git clone https://github.com/nourane-hammouda/InfluMatch.git
cd InfluMatch
```

### Étape 2 : Configuration de la Base de Données MySQL

1. Créer une base de données MySQL :
```sql
CREATE DATABASE InfluMatch CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

2. (Optionnel) Importer le schéma initial si disponible :
```bash
mysql -u root -p InfluMatch < InfluMatch.sql
```

### Étape 3 : Configuration du Backend (Django)

1. Créer un environnement virtuel Python :
```bash
python3 -m venv venv
```

2. Activer l'environnement virtuel :
   - **Sur macOS/Linux** :
   ```bash
   source venv/bin/activate
   ```
   - **Sur Windows** :
   ```bash
   venv\Scripts\activate
   ```

3. Installer les dépendances Python :
```bash
pip install -r requirements.txt
```

4. Créer le fichier `.env` à la racine du projet :
```bash
touch .env
```

5. Configurer le fichier `.env` avec vos paramètres :
```env
SECRET_KEY=votre_secret_key_django_très_long_et_aléatoire
DEBUG=True
DB_NAME=InfluMatch
DB_USER=root
DB_PASSWORD=votre_mot_de_passe_mysql
DB_HOST=localhost
DB_PORT=3306
```

   **Générer une SECRET_KEY** :
   ```python
   python -c "from django.core.management.utils import get_random_secret_key; print(get_random_secret_key())"
   ```

6. Appliquer les migrations :
```bash
python manage.py migrate
```

7. (Optionnel) Créer un superutilisateur pour l'admin Django :
```bash
python manage.py createsuperuser
```

8. Lancer le serveur Django :
```bash
python manage.py runserver
```

Le backend sera accessible sur : **http://127.0.0.1:8000**
L'admin Django sera accessible sur : **http://127.0.0.1:8000/admin/**

### Étape 4 : Configuration du Frontend (React)

1. Aller dans le dossier frontend :
```bash
cd frontend
```

2. Installer les dépendances Node.js :
```bash
npm install
```

3. (Optionnel) Créer un fichier `.env` dans le dossier `frontend/` si vous voulez changer l'URL de l'API :
```env
VITE_API_URL=http://127.0.0.1:8000/api
```

4. Lancer le serveur de développement :
```bash
npm run dev
```

Le frontend sera accessible sur : **http://localhost:5173** (ou le port indiqué dans le terminal)

### Étape 5 : Vérification

1. Vérifier que le backend fonctionne :
   - Ouvrir : http://127.0.0.1:8000/api/
   - Vous devriez voir un message JSON

2. Vérifier que le frontend fonctionne :
   - Ouvrir : http://localhost:5173
   - Vous devriez voir la page d'accueil InfluMatch

3. Tester l'inscription et la connexion :
   - Créer un compte depuis la page d'inscription
   - Se connecter avec les identifiants créés

## Commandes Utiles

### Backend
```bash
# Créer les migrations après modification des models
python manage.py makemigrations

# Appliquer les migrations
python manage.py migrate

# Créer un superutilisateur
python manage.py createsuperuser

# Charger des données initiales (si disponible)
python manage.py load_initial_data
```

### Frontend
```bash
# Lancer le serveur de développement
npm run dev

# Construire pour la production
npm run build
```

## Endpoints API

- `POST /api/auth/register/` - Inscription
- `POST /api/auth/token/` - Connexion
- `GET /api/auth/user/` - Informations utilisateur
- `POST /api/auth/token/refresh/` - Rafraîchir le token

## Structure de la Base de Données

Voir `InfluMatch.sql` pour le schéma complet.

## Technologies

- **Backend**: Django 5.2, Django REST Framework, MySQL
- **Frontend**: React 18, TypeScript, Vite, Bootstrap 5
- **Authentication**: JWT (Simple JWT)

