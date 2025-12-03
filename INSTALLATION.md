# Guide d'Installation - InfluMatch

Ce guide vous explique comment installer et lancer le projet InfluMatch sur un nouvel ordinateur.

## 📋 Prérequis

Avant de commencer, assurez-vous d'avoir installé :

- **Python** 3.8+ (recommandé: Python 3.11+)
- **Node.js** 18+ et npm
- **MySQL** 8.0+
- **Git**

## 🚀 Étapes d'Installation

### Étape 1 : Cloner le projet

```bash
git clone https://github.com/nourane-hammouda/InfluMatch.git
cd InfluMatch
```

### Étape 2 : Configuration de la Base de Données MySQL

1. Connectez-vous à MySQL :
```bash
mysql -u root -p
```

2. Créez la base de données :
```sql
CREATE DATABASE InfluMatch CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
EXIT;
```

3. (Optionnel) Si vous avez un fichier SQL d'initialisation :
```bash
mysql -u root -p InfluMatch < InfluMatch.sql
```

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
```env
SECRET_KEY=votre_secret_key_django_très_long_et_aléatoire
DEBUG=True
DB_NAME=InfluMatch
DB_USER=root
DB_PASSWORD=votre_mot_de_passe_mysql
DB_HOST=localhost
DB_PORT=3306
```

   **💡 Astuce : Pour générer une SECRET_KEY sécurisée** :
   ```bash
   python -c "from django.core.management.utils import get_random_secret_key; print(get_random_secret_key())"
   ```
   Copiez la clé générée dans votre fichier `.env`.

6. **Appliquer les migrations** :
```bash
python manage.py migrate
```

7. **(Optionnel) Créer un superutilisateur pour l'admin Django** :
```bash
python manage.py createsuperuser
```
   Suivez les instructions pour créer un compte administrateur.

8. **Lancer le serveur Django** :
```bash
python manage.py runserver
```

✅ Le backend sera accessible sur : **http://127.0.0.1:8000**  
✅ L'admin Django sera accessible sur : **http://127.0.0.1:8000/admin/**

### Étape 4 : Configuration du Frontend (React)

1. **Aller dans le dossier frontend** :
```bash
cd frontend
```

2. **Installer les dépendances Node.js** :
```bash
npm install
```

3. **(Optionnel) Créer un fichier `.env`** dans le dossier `frontend/` si vous voulez changer l'URL de l'API :
```env
VITE_API_URL=http://127.0.0.1:8000/api
```

4. **Lancer le serveur de développement** :
```bash
npm run dev
```

✅ Le frontend sera accessible sur : **http://localhost:5173** (ou le port indiqué dans le terminal)

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

# Charger des données initiales (si disponible)
python manage.py load_initial_data

# Accéder au shell Django
python manage.py shell
```

### Frontend

```bash
# Lancer le serveur de développement
npm run dev

# Construire pour la production
npm run build

# Vérifier les erreurs de linting
npm run lint
```

## 🐛 Dépannage

### Problème : Erreur de connexion à la base de données

- Vérifiez que MySQL est lancé
- Vérifiez les identifiants dans le fichier `.env`
- Vérifiez que la base de données `InfluMatch` existe

### Problème : Erreur "SECRET_KEY must be set"

- Vérifiez que le fichier `.env` existe à la racine du projet
- Vérifiez que la variable `SECRET_KEY` est définie dans `.env`

### Problème : Erreur CORS dans le navigateur

- Vérifiez que le backend Django est lancé
- Vérifiez que l'URL de l'API dans le frontend correspond au port du backend (par défaut 8000)

### Problème : Les migrations ne s'appliquent pas

```bash
# Supprimer toutes les migrations (ATTENTION : perte de données)
python manage.py migrate --fake-initial

# Ou recréer les migrations
python manage.py makemigrations
python manage.py migrate
```

## 📝 Notes Importantes

- Le fichier `.env` ne doit **JAMAIS** être commité dans Git (il est dans `.gitignore`)
- Gardez votre `SECRET_KEY` secrète et ne la partagez jamais
- En production, mettez `DEBUG=False` dans le fichier `.env`
- Assurez-vous que les deux serveurs (backend et frontend) sont lancés pour que l'application fonctionne correctement

## 🎯 Structure des Ports

- **Backend Django** : Port 8000 (http://127.0.0.1:8000)
- **Frontend React** : Port 5173 (http://localhost:5173)
- **MySQL** : Port 3306 (par défaut)

## 📞 Support

Si vous rencontrez des problèmes, vérifiez :
1. Les logs du serveur Django dans le terminal
2. La console du navigateur (F12) pour les erreurs JavaScript
3. Les logs MySQL pour les erreurs de base de données

