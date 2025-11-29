from django.db import models
from .user import User
from .influencer import DomaineExpertise, PlateformeSociale

class Entreprise(models.Model):
    TAILLE_CHOICES = [
        ('startup', 'Startup'),
        ('pme', 'PME'),
        ('grande_entreprise', 'Grande Entreprise'),
        ('agence', 'Agence'),
    ]
    
    utilisateur = models.OneToOneField(User, on_delete=models.CASCADE, related_name='entreprise')
    nom_entreprise = models.CharField(max_length=255)
    url_logo = models.CharField(max_length=500, null=True, blank=True)
    description = models.TextField(null=True, blank=True)
    site_web = models.CharField(max_length=500, null=True, blank=True)
    secteur = models.CharField(max_length=100, null=True, blank=True)
    taille_entreprise = models.CharField(max_length=20, choices=TAILLE_CHOICES, null=True, blank=True)
    
    class Meta:
        db_table = 'entreprises'
        indexes = [models.Index(fields=['nom_entreprise'])]
    
    def __str__(self):
        return self.nom_entreprise

class Campagne(models.Model):
    STATUT_CHOICES = [
        ('brouillon', 'Brouillon'),
        ('active', 'Active'),
        ('fermee', 'Fermée'),
        ('annulee', 'Annulée'),
    ]
    
    entreprise = models.ForeignKey(Entreprise, on_delete=models.CASCADE)
    titre = models.CharField(max_length=255)
    description = models.TextField()
    budget_min = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)
    budget_max = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)
    minimum_abonnes_requis = models.IntegerField(default=0)
    date_limite_candidature = models.DateTimeField()
    date_debut_campagne = models.DateField(null=True, blank=True)
    date_fin_campagne = models.DateField(null=True, blank=True)
    statut = models.CharField(max_length=20, choices=STATUT_CHOICES, default='brouillon')
    total_candidatures = models.IntegerField(default=0)
    cree_le = models.DateTimeField(auto_now_add=True)
    modifie_le = models.DateTimeField(auto_now=True)
    
    domaines = models.ManyToManyField(DomaineExpertise, through='CampagneDomaine', related_name='campagnes')
    plateformes = models.ManyToManyField(PlateformeSociale, through='CampagnePlateforme', related_name='campagnes')
    
    class Meta:
        db_table = 'campagnes'
        indexes = [
            models.Index(fields=['statut']),
            models.Index(fields=['date_limite_candidature']),
            models.Index(fields=['cree_le']),
        ]
    
    def __str__(self):
        return self.titre

class CampagneDomaine(models.Model):
    campagne = models.ForeignKey(Campagne, on_delete=models.CASCADE)
    domaine = models.ForeignKey(DomaineExpertise, on_delete=models.CASCADE)
    
    class Meta:
        db_table = 'campagne_domaines'
        unique_together = ['campagne', 'domaine']

class CampagnePlateforme(models.Model):
    campagne = models.ForeignKey(Campagne, on_delete=models.CASCADE)
    plateforme = models.ForeignKey(PlateformeSociale, on_delete=models.CASCADE)
    
    class Meta:
        db_table = 'campagne_plateformes'
        unique_together = ['campagne', 'plateforme']