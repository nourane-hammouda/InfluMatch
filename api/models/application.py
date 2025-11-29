from django.db import models
from .user import User
from .company import Campagne
from .influencer import Influenceur

class Candidature(models.Model):
    STATUT_CHOICES = [
        ('en_attente', 'En attente'),
        ('acceptee', 'Acceptée'),
        ('refusee', 'Refusée'),
        ('retiree', 'Retirée'),
    ]
    
    campagne = models.ForeignKey(Campagne, on_delete=models.CASCADE)
    influenceur = models.ForeignKey(Influenceur, on_delete=models.CASCADE)
    statut = models.CharField(max_length=20, choices=STATUT_CHOICES, default='en_attente')
    message_motivation = models.TextField(max_length=500, null=True, blank=True)
    prix_propose = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)
    collaborations_passees = models.TextField(null=True, blank=True)
    candidate_le = models.DateTimeField(auto_now_add=True)
    evaluee_le = models.DateTimeField(null=True, blank=True)
    evaluee_par = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, blank=True, related_name='candidatures_evaluees')
    
    class Meta:
        db_table = 'candidatures'
        unique_together = ['campagne', 'influenceur']
        indexes = [
            models.Index(fields=['statut']),
            models.Index(fields=['candidate_le']),
        ]

class Notification(models.Model):
    TYPE_CHOICES = [
        ('nouvelle_campagne', 'Nouvelle campagne'),
        ('reponse_candidature', 'Réponse candidature'),
        ('message', 'Message'),
        ('systeme', 'Système'),
    ]
    ENTITE_CHOICES = [
        ('campagne', 'Campagne'),
        ('candidature', 'Candidature'),
        ('utilisateur', 'Utilisateur'),
    ]
    
    utilisateur = models.ForeignKey(User, on_delete=models.CASCADE)
    type = models.CharField(max_length=30, choices=TYPE_CHOICES)
    titre = models.CharField(max_length=255)
    message = models.TextField()
    type_entite_liee = models.CharField(max_length=20, choices=ENTITE_CHOICES, null=True, blank=True)
    id_entite_liee = models.IntegerField(null=True, blank=True)
    est_lue = models.BooleanField(default=False)
    cree_le = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        db_table = 'notifications'
        indexes = [
            models.Index(fields=['utilisateur', 'est_lue']),
        ]

class RechercheSauvegardee(models.Model):
    influenceur = models.ForeignKey(Influenceur, on_delete=models.CASCADE)
    nom_recherche = models.CharField(max_length=100)
    criteres_recherche = models.JSONField()
    cree_le = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        db_table = 'recherches_sauvegardees'