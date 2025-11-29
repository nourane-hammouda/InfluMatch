# Guide d'Administration Django

## Accéder à l'Admin Django

### 1. Créer un superutilisateur

```bash
cd /Users/nouranehammouda/miniconda3/influmatch
source venv/bin/activate
python manage.py createsuperuser
```

Vous serez invité à entrer :
- **Email** : votre email (ex: admin@influmatch.com)
- **Password** : votre mot de passe (minimum 8 caractères)
- **Password (again)** : confirmez le mot de passe

### 2. Accéder à l'interface admin

Une fois le superutilisateur créé, accédez à :
```
http://127.0.0.1:8000/admin/
```

Connectez-vous avec l'email et le mot de passe que vous avez créés.

## Modèles disponibles dans l'admin

### Utilisateurs
- **Users** : Tous les utilisateurs inscrits (influenceurs et entreprises)
  - Email, type d'utilisateur, statut actif/vérifié
  - Dates de création et dernière connexion

### Influenceurs
- **Influenceurs** : Profils des influenceurs
  - Pseudo, biographie, localisation
  - Pourcentage de completion du profil
  - Statistiques (candidatures, taux d'acceptation)
  
- **Domaines d'expertise** : Domaines disponibles (Mode, Tech, Sport, etc.)
- **Plateformes sociales** : Instagram, TikTok, YouTube, etc.
- **Influenceur plateformes** : Lien entre influenceurs et leurs plateformes
  - Nombre d'abonnés, taux d'engagement
- **Influenceur tarifs** : Tarifs des influenceurs (post, story, vidéo)

### Entreprises
- **Entreprises** : Profils des entreprises
- **Campagnes** : Campagnes créées par les entreprises

### Candidatures
- **Candidatures** : Candidatures des influenceurs aux campagnes
  - Statut (en attente, acceptée, refusée)
  - Date de candidature

## Vérifier les données enregistrées

### Via l'interface admin
1. Connectez-vous à `/admin/`
2. Cliquez sur **Users** pour voir tous les utilisateurs inscrits
3. Cliquez sur **Influenceurs** pour voir les profils complétés
4. Vérifiez les champs :
   - `pourcentage_completion_profil` : doit être entre 0-100%
   - `pseudo`, `biographie`, `localisation` : informations du profil
   - Domaines et plateformes associés

### Via la console Django
```bash
python manage.py shell
```

```python
from api.models import User, Influenceur

# Voir tous les utilisateurs
users = User.objects.all()
for user in users:
    print(f"{user.email} - {user.type_utilisateur}")

# Voir les profils influenceurs
influencers = Influenceur.objects.all()
for inf in influencers:
    print(f"{inf.pseudo} - {inf.pourcentage_completion_profil}%")
    print(f"  Domaines: {list(inf.domaines.values_list('nom', flat=True))}")
```

## Commandes utiles

### Créer un superutilisateur (non-interactif)
```bash
python manage.py createsuperuser --email admin@influmatch.com --noinput
# Puis définir le mot de passe manuellement dans la base ou via shell
```

### Vérifier les données en base
```bash
python manage.py shell
```

```python
from api.models import User, Influenceur, DomaineExpertise, InfluenceurPlateforme

# Compter les utilisateurs
print(f"Total utilisateurs: {User.objects.count()}")
print(f"Total influenceurs: {Influenceur.objects.count()}")

# Voir un profil spécifique
user = User.objects.get(email='votre@email.com')
if hasattr(user, 'influenceur'):
    inf = user.influenceur
    print(f"Pseudo: {inf.pseudo}")
    print(f"Completion: {inf.pourcentage_completion_profil}%")
    print(f"Domaines: {[d.nom for d in inf.domaines.all()]}")
```

## Résolution de problèmes

### "Informations d'authentification non fournies"
- Vérifiez que vous êtes bien connecté
- Vérifiez que le token est stocké dans localStorage (F12 > Application > Local Storage)

### "Superuser must have is_staff=True"
- Le superutilisateur doit avoir `is_staff=True` et `is_superuser=True`
- Vérifiez dans l'admin que ces champs sont cochés

### Modèles non visibles dans l'admin
- Vérifiez que les modèles sont bien enregistrés dans `api/admin.py`
- Redémarrez le serveur Django après modification de `admin.py`

