from django.contrib.auth import authenticate, logout

from rest_framework.decorators import api_view, permission_classes
from rest_framework import status
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny

from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework_simplejwt.tokens import RefreshToken

from .models import User, UserProfile
from .serializers import MyTokenObtainPairSerializer, UserSignupSerializer, UserLoginSerializer


#  To get tokenpair
class MyTokenObtainPairView(TokenObtainPairView):
  serializer_class = MyTokenObtainPairSerializer


# Register a new user
@api_view(['POST'])
@permission_classes([AllowAny])
def user_signup(request):
  serializer = UserSignupSerializer(data=request.data)
  
  if serializer.is_valid():
    try:
      user = serializer.save()
      # print('user serializer => ', user)
      return Response({
        'status': 'success',
        "message": f'Hello {user.username}, your registration is successful.', 
        "user": {"id": user.id, "email": user.email, "username": user.username}}, 
        status=status.HTTP_201_CREATED)
    except Exception as e:
      return Response({
        'status': 'error',
        'meaasege': 'An error occurred during user registration.',
        'details': str(e),
        'errors': serializer.errors
      }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

  # return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
  return Response({
    'status': 'error',
    'meaasege': 'Validation errors occurred.',
    'errors': serializer.errors
  }, status=status.HTTP_400_BAD_REQUEST)


