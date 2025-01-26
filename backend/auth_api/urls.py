from django.urls import path

from rest_framework_simplejwt.views import TokenRefreshView

from . import views

urlpatterns = [
  path('token/', views.MyTokenObtainPairView.as_view(), name='get_token'),
  path('token/refresh', TokenRefreshView.as_view(), name='get_token'),
  path('user-signup/', views.user_signup, name='user_signup'),

  # user url
  path('users/', views.get_users, name='get_users'),

  # user profile url
  path('profile/<int:pk>/', views.user_profile_view, name='user_profile'),
  path('search-user/<str:username>/', views.search_users, name='search_users'),

  # custom login/logout view's url
  path('user-login/', views.user_login, name='user_login'),
  path('user-logout/', views.user_logout, name='user_logout'),
]
