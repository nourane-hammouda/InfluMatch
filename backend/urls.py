from django.contrib import admin
from django.urls import path, include, re_path
from django.conf import settings
from django.conf.urls.static import static
from django.http import JsonResponse
from django.views.static import serve
import os

def root_view(request):
    """Simple root endpoint to verify the API is running"""
    return JsonResponse({
        'message': 'InfluMatch API is running',
        'version': '1.0',
        'endpoints': {
            'admin': '/admin/',
            'api': '/api/',
            'auth_token': '/api/auth/token/',
            'auth_refresh': '/api/auth/token/refresh/',
        }
    })

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('api.urls')),
]

# Serve frontend in production
if not settings.DEBUG:
    # Serve static files from frontend build
    urlpatterns += [
        re_path(r'^static/(?P<path>.*)$', serve, {'document_root': settings.STATIC_ROOT}),
    ]
    
    # Serve frontend build files (JS, CSS, etc.)
    if os.path.exists(settings.FRONTEND_BUILD_DIR):
        urlpatterns += [
            re_path(r'^(?P<path>.*\.(js|css|png|jpg|jpeg|gif|svg|ico|woff|woff2|ttf|eot))$', 
                   serve, {'document_root': settings.FRONTEND_BUILD_DIR}),
        ]
        
        # Catch-all: serve index.html for React Router
        urlpatterns += [
            re_path(r'^(?!admin|api|static|media).*$', 
                   serve, {'document_root': settings.FRONTEND_BUILD_DIR, 'path': 'index.html'}),
        ]
else:
    # In development, show API info at root
    urlpatterns += [
        path('', root_view, name='root'),
    ]
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)