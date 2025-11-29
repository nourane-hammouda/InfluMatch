from django.db import models
from .user import User

class DomaineExpertise(models.Model):
    nom = models.CharField(max_length=100, unique=True)
    slug = models.SlugField(max_length=100, unique=True)
    description = models.TextField(null=True, blank=True)
    est_actif = models.BooleanField(default=True)
    
    class Meta:
        db_table = 'domaines_expertise'
        verbose_name_plural = 'Domaines d\'expertise'
        indexes = [models.Index(fields=['slug'])]
    
    def __str__(self):
        return self.nom

class Influenceur(models.Model):
    utilisateur = models.OneToOneField(User, on_delete=models.CASCADE, related_name='influenceur')
    pseudo = models.CharField(max_length=100)
    photo_profil = models.CharField(max_length=500, null=True, blank=True)
    biographie = models.TextField(max_length=500, null=True, blank=True)
    localisation = models.CharField(max_length=255, null=True, blank=True)
    pourcentage_completion_profil = models.IntegerField(default=0)
    taux_acceptation = models.DecimalField(max_digits=5, decimal_places=2, default=0.00)
    total_candidatures = models.IntegerField(default=0)
    candidatures_acceptees = models.IntegerField(default=0)
    
    domaines = models.ManyToManyField(DomaineExpertise, through='InfluenceurExpertise', related_name='influenceurs')
    
    class Meta:
        db_table = 'influenceurs'
        indexes = [
            models.Index(fields=['pourcentage_completion_profil']),
            models.Index(fields=['localisation']),
        ]
    
    def __str__(self):
        return self.pseudo

class InfluenceurExpertise(models.Model):
    influenceur = models.ForeignKey(Influenceur, on_delete=models.CASCADE)
    domaine = models.ForeignKey(DomaineExpertise, on_delete=models.CASCADE)
    cree_le = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        db_table = 'influenceur_expertise'
        unique_together = ['influenceur', 'domaine']

class PlateformeSociale(models.Model):
    nom = models.CharField(max_length=50, unique=True)
    url_icone = models.CharField(max_length=500, null=True, blank=True)
    est_actif = models.BooleanField(default=True)
    
    class Meta:
        db_table = 'plateformes_sociales'
    
    def __str__(self):
        return self.nom

class InfluenceurPlateforme(models.Model):
    influenceur = models.ForeignKey(Influenceur, on_delete=models.CASCADE)
    plateforme = models.ForeignKey(PlateformeSociale, on_delete=models.CASCADE)
    nombre_abonnes = models.IntegerField()
    taux_engagement = models.DecimalField(max_digits=5, decimal_places=2, null=True, blank=True)
    vues_moyennes = models.IntegerField(null=True, blank=True)
    url_profil = models.CharField(max_length=500, null=True, blank=True)
    cree_le = models.DateTimeField(auto_now_add=True)
    modifie_le = models.DateTimeField(auto_now=True)
    
    class Meta:
        db_table = 'influenceur_plateformes'
        unique_together = ['influenceur', 'plateforme']
        indexes = [
            models.Index(fields=['nombre_abonnes']),
            models.Index(fields=['influenceur', 'nombre_abonnes']),
        ]

class InfluenceurTarif(models.Model):
    influenceur = models.OneToOneField(Influenceur, on_delete=models.CASCADE, related_name='tarifs')
    prix_par_post = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)
    prix_par_story = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)
    prix_par_video = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)
    est_negociable = models.BooleanField(default=True)
    devise = models.CharField(max_length=3, default='EUR')
    
    class Meta:
        db_table = 'influenceur_tarifs'