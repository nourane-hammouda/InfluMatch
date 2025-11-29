# Structure du Projet InfluMatch

## Vue d'ensemble

Le projet suit une architecture **MVC (Model-View-Controller)** avec une séparation claire entre backend et frontend.

## Structure Backend (Django)

```
api/                          # Application Django principale
├── models/                   # MODELS - Définition des entités
│   ├── user.py              # Modèle utilisateur
│   ├── influencer.py        # Modèle influenceur
│   ├── company.py           # Modèle entreprise
│   └── application.py      # Modèle candidature
├── views/                    # CONTROLLERS - Logique métier API
│   ├── auth_views.py        # Authentification
│   └── user_views.py        # Gestion utilisateurs
├── serializers/              # Sérialiseurs DRF
│   └── __init__.py          # JWT serializer personnalisé
├── urls.py                   # Routes API
├── signals.py                # Signaux Django
└── admin.py                 # Configuration admin

backend/                      # Configuration Django
├── settings.py              # Paramètres
├── urls.py                  # URLs principales
├── wsgi.py                  # WSGI config
└── asgi.py                  # ASGI config
```

## Structure Frontend (React + TypeScript)

```
frontend/src/
├── pages/                   # VIEWS - Pages principales
│   ├── LandingPage.tsx
│   ├── LoginPage.tsx
│   ├── SignupPage.tsx
│   ├── DashboardPage.tsx
│   ├── MarketplacePage.tsx
│   ├── ProfileCompletionPage.tsx
│   └── ...
├── components/              # Composants réutilisables
│   ├── layout/             # Composants de layout
│   │   ├── Sidebar.tsx
│   │   └── TopBar.tsx
│   ├── ui/                 # Composants UI (shadcn/ui)
│   │   ├── button.tsx
│   │   ├── input.tsx
│   │   └── ...
│   └── OfferCard.tsx
├── services/                # CONTROLLERS - Services API
│   └── api.ts              # Service de communication API
├── contexts/                # Contextes React
│   └── AuthContext.tsx     # Contexte d'authentification
└── styles/                 # Styles CSS
    ├── bootstrap-custom.css
    └── globals.css
```

## Fichiers supprimés

✅ **Duplicates supprimés:**
- `components/pages/` (doublons de `components/`)
- `data/mockData.ts` et `lib/mockData.ts` (doublons)
- `components/layout/Sidebar.tsx` (doublon)

✅ **Fichiers inutiles supprimés:**
- `api/views.py` (vide, remplacé par `api/views/`)
- `Attributions.md` (documentation non essentielle)
- `guidelines/` (documentation non essentielle)
- `components/layout/PublicHeader.tsx` (non utilisé)

✅ **Cache nettoyé:**
- Tous les `__pycache__/` (ajoutés au .gitignore)
- Tous les `.pyc` fichiers
- Fichiers `.DS_Store`

## Architecture MVC

### Model (Backend)
- **Django Models** → `api/models/`
- Représente les entités de données (User, Influenceur, Entreprise, etc.)

### View (Frontend)
- **React Pages** → `frontend/src/pages/`
- Interface utilisateur et présentation

### Controller
- **Backend Controllers** → `api/views/`
- **Frontend Services** → `frontend/src/services/`
- Gère la logique métier et la communication API

## Organisation des imports

Tous les imports ont été mis à jour pour refléter la nouvelle structure:
- Pages: `from '../pages/...'`
- Services: `from '../services/api'`
- Layout: `from '../components/layout/...'`

## .gitignore

Fichier `.gitignore` créé pour exclure:
- `__pycache__/`, `*.pyc`
- `node_modules/`
- `venv/`
- Fichiers de build
- Variables d'environnement

