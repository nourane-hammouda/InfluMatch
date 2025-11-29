# InfluMatch

Platforme de mise en relation entre influenceurs et entreprises.

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
  │   └── user_views.py
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
  │   │   └── api.ts
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

## Installation

### Backend
```bash
# Activer l'environnement virtuel
source venv/bin/activate

# Installer les dépendances (déjà fait)
pip install -r requirements.txt

# Migrations
python manage.py migrate

# Lancer le serveur
python manage.py runserver
```

### Frontend
```bash
cd frontend
npm install
npm run dev
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

