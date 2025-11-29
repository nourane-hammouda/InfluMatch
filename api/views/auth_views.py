from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from django.contrib.auth import get_user_model
from rest_framework_simplejwt.tokens import RefreshToken

User = get_user_model()

@api_view(['POST'])
@permission_classes([AllowAny])
def register(request):
    """
    Register a new user
    """
    email = request.data.get('email')
    password = request.data.get('password')
    type_utilisateur = request.data.get('type_utilisateur', 'influenceur')
    
    if not email or not password:
        return Response(
            {'error': 'Email et mot de passe sont requis'},
            status=status.HTTP_400_BAD_REQUEST
        )
    
    # Validate type
    valid_types = ['influenceur', 'entreprise']
    if type_utilisateur not in valid_types:
        return Response(
            {'error': f'type_utilisateur doit être l\'un de: {", ".join(valid_types)}'},
            status=status.HTTP_400_BAD_REQUEST
        )
    
    # Check if user already exists
    if User.objects.filter(email=email).exists():
        return Response(
            {'error': 'Cet email est déjà utilisé'},
            status=status.HTTP_400_BAD_REQUEST
        )
    
    # Create user
    try:
        username = email.split('@')[0]  # Use email prefix as username
        user = User.objects.create_user(
            username=username,
            email=email,
            password=password,
            type_utilisateur=type_utilisateur
        )
        
        # Generate tokens
        refresh = RefreshToken.for_user(user)
        
        return Response({
            'id': user.id,
            'email': user.email,
            'type_utilisateur': user.type_utilisateur,
            'access': str(refresh.access_token),
            'refresh': str(refresh),
        }, status=status.HTTP_201_CREATED)
    except Exception as e:
        return Response(
            {'error': str(e)},
            status=status.HTTP_400_BAD_REQUEST
        )

