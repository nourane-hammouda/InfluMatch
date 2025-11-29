from django.urls import path, include
from rest_framework.routers import DefaultRouter
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from .views.auth_views import register
from .views.user_views import current_user
from .views.profile_views import update_profile
from .serializers import CustomTokenObtainPairSerializer

router = DefaultRouter()

urlpatterns = [
    path('', include(router.urls)),
    path('auth/token/', TokenObtainPairView.as_view(serializer_class=CustomTokenObtainPairSerializer), name='token_obtain'),
    path('auth/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('auth/register/', register, name='register'),
    path('auth/user/', current_user, name='current_user'),
    path('profile/update/', update_profile, name='update_profile'),
]