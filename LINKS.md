# 🔗 Liens d'Accès - InfluMatch

## 🌐 Frontend (React + Vite)

**URL principale:** `http://localhost:5173`

### Pages publiques
- **Accueil:** http://localhost:5173/
- **Inscription:** http://localhost:5173/inscription
- **Connexion:** http://localhost:5173/connexion

### Pages authentifiées
- **Dashboard:** http://localhost:5173/dashboard
- **Profil:** http://localhost:5173/profil
- **Completion profil:** http://localhost:5173/profil/completion
- **Marketplace:** http://localhost:5173/marketplace
- **Candidatures:** http://localhost:5173/candidatures
- **Notifications:** http://localhost:5173/notifications
- **Détail offre:** http://localhost:5173/offre/:id

---

## 🔧 Backend (Django REST Framework)

**URL principale:** `http://127.0.0.1:8000`

### Endpoints API

#### Authentification
- **API Root:** http://127.0.0.1:8000/
- **Inscription:** http://127.0.0.1:8000/api/auth/register/
- **Connexion (JWT):** http://127.0.0.1:8000/api/auth/token/
- **Rafraîchir token:** http://127.0.0.1:8000/api/auth/token/refresh/
- **Utilisateur actuel:** http://127.0.0.1:8000/api/auth/user/

#### Profil
- **Mettre à jour profil:** http://127.0.0.1:8000/api/profile/update/

---

## 👨‍💼 Admin Django

**URL:** `http://127.0.0.1:8000/admin/`

### Accès
1. Créer un superutilisateur:
   ```bash
   python manage.py createsuperuser
   ```
2. Se connecter avec l'email et le mot de passe créés

### Modèles disponibles dans l'admin
- **Users** - Tous les utilisateurs
- **Influenceurs** - Profils des influenceurs
- **Domaines d'expertise** - Domaines disponibles
- **Plateformes sociales** - Instagram, TikTok, etc.
- **Influenceur plateformes** - Lien influenceurs/plateformes
- **Influenceur tarifs** - Tarifs des influenceurs
- **Entreprises** - Profils des entreprises
- **Campagnes** - Campagnes créées
- **Candidatures** - Candidatures des influenceurs

---

## 📝 Documentation

- **README.md** - Guide principal du projet
- **ADMIN_GUIDE.md** - Guide d'administration Django
- **PROJECT_STRUCTURE.md** - Structure du projet (MVC)
- **INTEGRATION_GUIDE.md** - Guide d'intégration frontend-backend

---

## 🚀 Commandes de démarrage

### Backend
```bash
cd /Users/nouranehammouda/miniconda3/influmatch
source venv/bin/activate
python manage.py runserver
```

### Frontend
```bash
cd /Users/nouranehammouda/miniconda3/influmatch/frontend
npm run dev
```

---

## 📊 Statut des serveurs

Les serveurs doivent être en cours d'exécution pour accéder aux liens:
- ✅ Backend: `python manage.py runserver` (port 8000)
- ✅ Frontend: `npm run dev` (port 5173)

