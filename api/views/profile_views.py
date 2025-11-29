from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth import get_user_model
from api.models.influencer import Influenceur, DomaineExpertise, PlateformeSociale, InfluenceurPlateforme, InfluenceurTarif
from django.db import transaction

User = get_user_model()

@api_view(['POST', 'PUT'])
@permission_classes([IsAuthenticated])
def update_profile(request):
    """
    Update influencer profile with all information
    """
    user = request.user
    
    if user.type_utilisateur != 'influenceur':
        return Response(
            {'error': 'This endpoint is only for influencers'},
            status=status.HTTP_403_FORBIDDEN
        )
    
    try:
        with transaction.atomic():
            # Get or create influencer profile
            influencer, created = Influenceur.objects.get_or_create(utilisateur=user)
            
            data = request.data
            
            # Update basic profile info
            if 'name' in data:
                # Store name in pseudo if no pseudo provided
                if not influencer.pseudo:
                    influencer.pseudo = data['name']
            if 'pseudo' in data:
                influencer.pseudo = data['pseudo']
            if 'bio' in data:
                influencer.biographie = data['bio']
            if 'location' in data:
                influencer.localisation = data['location']
            
            # Update domains
            if 'domains' in data:
                domains = data['domains']
                # Clear existing domains
                influencer.domaines.clear()
                # Add new domains
                for domain_name in domains:
                    if domain_name and domain_name.strip():
                        # Try to find existing domain or create new one
                        domain, _ = DomaineExpertise.objects.get_or_create(
                            nom=domain_name.strip(),
                            defaults={'slug': domain_name.strip().lower().replace(' ', '-')}
                        )
                        influencer.domaines.add(domain)
            
            # Update platforms
            if 'platforms' in data:
                platforms_data = data['platforms']
                # Clear existing platforms
                InfluenceurPlateforme.objects.filter(influenceur=influencer).delete()
                # Add new platforms
                for platform_name, platform_info in platforms_data.items():
                    if platform_info.get('active', False):
                        followers = platform_info.get('followers', '0')
                        try:
                            import re
                            followers_int = int(re.sub(r'\D', '', str(followers))) if isinstance(followers, str) else int(followers)
                        except (ValueError, AttributeError):
                            followers_int = 0
                        
                        # Get or create platform
                        platform, _ = PlateformeSociale.objects.get_or_create(
                            nom=platform_name,
                            defaults={'est_actif': True}
                        )
                        
                        InfluenceurPlateforme.objects.create(
                            influenceur=influencer,
                            plateforme=platform,
                            nombre_abonnes=followers_int
                        )
            
            # Update rates
            if 'rates' in data:
                rates_data = data['rates']
                tarifs, _ = InfluenceurTarif.objects.get_or_create(influenceur=influencer)
                
                if 'story' in rates_data and rates_data['story']:
                    try:
                        tarifs.prix_par_story = float(rates_data['story'])
                    except (ValueError, TypeError):
                        pass
                if 'post' in rates_data and rates_data['post']:
                    try:
                        tarifs.prix_par_post = float(rates_data['post'])
                    except (ValueError, TypeError):
                        pass
                if 'video' in rates_data and rates_data['video']:
                    try:
                        tarifs.prix_par_video = float(rates_data['video'])
                    except (ValueError, TypeError):
                        pass
                if 'negotiable' in rates_data:
                    tarifs.est_negociable = rates_data['negotiable']
                
                tarifs.save()
            
            # Calculate completion percentage
            completion = 0
            if influencer.pseudo:
                completion += 15
            if influencer.biographie:
                completion += 10
            if influencer.localisation:
                completion += 10
            if influencer.domaines.exists():
                completion += 20
            if InfluenceurPlateforme.objects.filter(influenceur=influencer).exists():
                completion += 20
            if hasattr(influencer, 'tarifs') and (
                influencer.tarifs.prix_par_story or 
                influencer.tarifs.prix_par_post or 
                influencer.tarifs.prix_par_video
            ):
                completion += 25
            
            influencer.pourcentage_completion_profil = completion
            influencer.save()
        
        return Response({
            'success': True,
            'completion_percent': completion,
            'message': 'Profil mis à jour avec succès'
        }, status=status.HTTP_200_OK)
        
    except Exception as e:
        return Response(
            {'error': str(e)},
            status=status.HTTP_400_BAD_REQUEST
        )

