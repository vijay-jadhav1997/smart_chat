from django.contrib import admin
from django.urls import path, include

from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('admin/', admin.site.urls),
    path('auth-api/', include('auth_api.urls'), name='auth_api'),
    path('chat-app/', include('chat_app.urls'), name='chat_app'),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
