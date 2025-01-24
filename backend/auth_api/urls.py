from django.urls import path

from rest_framework_simplejwt.views import TokenRefreshView

from . import views

urlpatterns = [
  path('token/', views.MyTokenObtainPairView.as_view(), name='get_token'),
  path('token/refresh', TokenRefreshView.as_view(), name='get_token'),
  path('user-signup/', views.user_signup, name='user_signup'),
 
]
