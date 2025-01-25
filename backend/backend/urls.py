from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('auth-api/', include('auth_api.urls'), name='auth_api'),
    path('chat-app/', include('chat_app.urls'), name='chat_app'),
]
