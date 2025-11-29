from django.contrib import admin
from django.contrib.auth import get_user_model
from .models.influencer import (
    Influenceur, 
    DomaineExpertise, 
    PlateformeSociale, 
    InfluenceurPlateforme, 
    InfluenceurTarif,
    InfluenceurExpertise
)
from .models.company import Entreprise, Campagne
from .models.application import Candidature

User = get_user_model()

# User Admin
@admin.register(User)
class UserAdmin(admin.ModelAdmin):
    list_display = ('email', 'type_utilisateur', 'est_actif', 'est_verifie', 'cree_le')
    list_filter = ('type_utilisateur', 'est_actif', 'est_verifie', 'cree_le')
    search_fields = ('email', 'username')
    readonly_fields = ('cree_le', 'modifie_le', 'derniere_connexion')
    fieldsets = (
        ('Informations principales', {
            'fields': ('email', 'username', 'type_utilisateur')
        }),
        ('Statut', {
            'fields': ('est_actif', 'est_verifie', 'is_staff', 'is_superuser')
        }),
        ('Dates', {
            'fields': ('cree_le', 'modifie_le', 'derniere_connexion')
        }),
    )

# Influencer Admin
@admin.register(Influenceur)
class InfluenceurAdmin(admin.ModelAdmin):
    list_display = ('pseudo', 'utilisateur', 'localisation', 'pourcentage_completion_profil', 'total_candidatures')
    list_filter = ('pourcentage_completion_profil', 'localisation')
    search_fields = ('pseudo', 'utilisateur__email', 'biographie')
    readonly_fields = ('pourcentage_completion_profil', 'total_candidatures', 'candidatures_acceptees')
    fieldsets = (
        ('Informations de base', {
            'fields': ('utilisateur', 'pseudo', 'photo_profil', 'biographie', 'localisation')
        }),
        ('Statistiques', {
            'fields': ('pourcentage_completion_profil', 'taux_acceptation', 'total_candidatures', 'candidatures_acceptees')
        }),
    )

@admin.register(DomaineExpertise)
class DomaineExpertiseAdmin(admin.ModelAdmin):
    list_display = ('nom', 'slug', 'est_actif')
    list_filter = ('est_actif',)
    search_fields = ('nom', 'description')

@admin.register(PlateformeSociale)
class PlateformeSocialeAdmin(admin.ModelAdmin):
    list_display = ('nom', 'est_actif')
    list_filter = ('est_actif',)
    search_fields = ('nom',)

@admin.register(InfluenceurPlateforme)
class InfluenceurPlateformeAdmin(admin.ModelAdmin):
    list_display = ('influenceur', 'plateforme', 'nombre_abonnes', 'taux_engagement', 'cree_le')
    list_filter = ('plateforme', 'cree_le')
    search_fields = ('influenceur__pseudo', 'plateforme__nom')

@admin.register(InfluenceurTarif)
class InfluenceurTarifAdmin(admin.ModelAdmin):
    list_display = ('influenceur', 'prix_par_post', 'prix_par_story', 'prix_par_video', 'est_negociable')
    list_filter = ('est_negociable', 'devise')
    search_fields = ('influenceur__pseudo',)

# Company Admin
@admin.register(Entreprise)
class EntrepriseAdmin(admin.ModelAdmin):
    list_display = ('nom_entreprise', 'utilisateur', 'secteur', 'taille_entreprise')
    list_filter = ('secteur', 'taille_entreprise')
    search_fields = ('nom_entreprise', 'utilisateur__email', 'description')

@admin.register(Campagne)
class CampagneAdmin(admin.ModelAdmin):
    list_display = ('titre', 'entreprise', 'budget_max', 'date_debut_campagne', 'date_fin_campagne', 'statut')
    list_filter = ('statut', 'date_debut_campagne', 'date_fin_campagne')
    search_fields = ('titre', 'entreprise__nom_entreprise', 'description')

# Application Admin
@admin.register(Candidature)
class CandidatureAdmin(admin.ModelAdmin):
    list_display = ('influenceur', 'campagne', 'statut', 'candidate_le', 'evaluee_le')
    list_filter = ('statut', 'candidate_le')
    search_fields = ('influenceur__pseudo', 'campagne__titre')
    readonly_fields = ('candidate_le', 'evaluee_le')
