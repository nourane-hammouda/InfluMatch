from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from django.contrib.auth import get_user_model
from api.models.influencer import InfluenceurPlateforme, InfluenceurTarif

User = get_user_model()

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def current_user(request):
    """
    Get current authenticated user information with full profile data
    """
    user = request.user
    
    # Check if user has a profile (influencer or company)
    profile_complete = False
    completion_percent = 0
    profile_data = {}
    
    if hasattr(user, 'influenceur'):
        # Check influencer profile completion
        influencer = user.influenceur
        profile_complete = (
            influencer.pseudo and
            influencer.biographie and
            influencer.localisation and
            influencer.domaines.exists() and
            InfluenceurPlateforme.objects.filter(influenceur=influencer).exists()
        )
        completion_percent = influencer.pourcentage_completion_profil
        
        # Get full profile data
        domains = [d.nom for d in influencer.domaines.all()]
        
        # Get platforms
        platforms_data = {}
        platforms = InfluenceurPlateforme.objects.filter(influenceur=influencer).select_related('plateforme')
        for platform_link in platforms:
            platforms_data[platform_link.plateforme.nom] = {
                'active': True,
                'followers': str(platform_link.nombre_abonnes)
            }
        
        # Get rates
        rates_data = {
            'story': '',
            'post': '',
            'video': '',
            'negotiable': True
        }
        if hasattr(influencer, 'tarifs'):
            tarifs = influencer.tarifs
            if tarifs.prix_par_story:
                rates_data['story'] = str(tarifs.prix_par_story)
            if tarifs.prix_par_post:
                rates_data['post'] = str(tarifs.prix_par_post)
            if tarifs.prix_par_video:
                rates_data['video'] = str(tarifs.prix_par_video)
            rates_data['negotiable'] = tarifs.est_negociable
        
        profile_data = {
            'name': influencer.pseudo or '',
            'pseudo': influencer.pseudo or '',
            'bio': influencer.biographie or '',
            'location': influencer.localisation or '',
            'domains': domains,
            'platforms': platforms_data,
            'rates': rates_data
        }
    elif hasattr(user, 'entreprise'):
        # Check company profile completion
        entreprise = user.entreprise
        profile_complete = (
            entreprise.nom_entreprise and
            entreprise.description and
            entreprise.secteur
        )
    
    return Response({
        'id': user.id,
        'email': user.email,
        'username': user.username,
        'type_utilisateur': user.type_utilisateur,
        'profile_complete': profile_complete,
        'completion_percent': completion_percent,
        'est_actif': user.est_actif,
        'est_verifie': user.est_verifie,
        'profile': profile_data,
    })
