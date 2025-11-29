from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework import serializers
from django.contrib.auth import get_user_model

User = get_user_model()

class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    """
    Custom serializer to use email instead of username for authentication
    """
    username_field = 'email'
    email = serializers.EmailField()

    def validate(self, attrs):
        # Get email and password
        email = attrs.get('email')
        password = attrs.get('password')
        
        if not email or not password:
            raise serializers.ValidationError('Email et mot de passe sont requis')
        
        try:
            user = User.objects.get(email=email)
        except User.DoesNotExist:
            raise serializers.ValidationError('Email ou mot de passe incorrect')
        
        if not user.check_password(password):
            raise serializers.ValidationError('Email ou mot de passe incorrect')
        
        if not user.is_active or not user.est_actif:
            raise serializers.ValidationError('Ce compte est désactivé')
        
        # Use the parent's validate method but with our user
        attrs['username'] = user.username
        data = super().validate(attrs)
        
        return data

