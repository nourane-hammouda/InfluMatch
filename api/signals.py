from django.db.models.signals import post_save, pre_save
from django.dispatch import receiver
from django.utils import timezone
from datetime import timedelta
from .models import Candidature, User, Notification

@receiver(post_save, sender=Candidature)
def apres_insertion_candidature(sender, instance, created, **kwargs):
    if created:
        instance.campagne.total_candidatures += 1
        instance.campagne.save(update_fields=['total_candidatures'])
        
        instance.influenceur.total_candidatures += 1
        instance.influenceur.save(update_fields=['total_candidatures'])

@receiver(post_save, sender=Candidature)
def apres_acceptation_candidature(sender, instance, created, **kwargs):
    if not created and instance.statut == 'acceptee':
        instance.influenceur.candidatures_acceptees += 1
        if instance.influenceur.total_candidatures > 0:
            taux = (instance.influenceur.candidatures_acceptees * 100.0) / instance.influenceur.total_candidatures
            instance.influenceur.taux_acceptation = round(taux, 2)
        instance.influenceur.save(update_fields=['candidatures_acceptees', 'taux_acceptation'])

@receiver(pre_save, sender=User)
def verrouiller_compte_apres_echecs(sender, instance, **kwargs):
    if instance.tentatives_connexion_echouees >= 5:
        if not instance.verrouille_jusqu_a or instance.verrouille_jusqu_a < timezone.now():
            instance.verrouille_jusqu_a = timezone.now() + timedelta(minutes=15)