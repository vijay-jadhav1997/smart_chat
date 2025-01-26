from django.contrib.auth import authenticate, logout
from django.db.models import Q

from rest_framework.decorators import api_view, permission_classes
from rest_framework import status
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny

from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework_simplejwt.tokens import RefreshToken

from .models import User, UserProfile
from .serializers import MyTokenObtainPairSerializer, UserSerializer, UserSignupSerializer, UserProfileSerializer, UserLoginSerializer


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




@api_view(['POST'])
@permission_classes([AllowAny])
def user_login(request):

  serializer = UserLoginSerializer(data=request.data)

  if serializer.is_valid():
    user = serializer.validated_data['user']

    # print(type(user))

    if user is not None:
      refresh = RefreshToken.for_user(user)

      return Response({
        'status': 'success',
        'message': f'Welcome {user.username}, you logged in successfully.',
        'refresh': str(refresh),
        'access': str(refresh.access_token),
        'user': {
          'email': user.email,
          'username': user.username,
          'full_name': user.userprofile.full_name,
          'dp_image': str(user.userprofile.dp_image),
          'bio': user.userprofile.bio,
          'mobile_number': user.userprofile.mobile_number
        },
        # 'user': user
      }, status=status.HTTP_200_OK)

  return Response({
    'status': 'error',
    'message': 'Invalid email or password.',
    'errors': serializer.errors
    }, status=status.HTTP_401_UNAUTHORIZED)



# Logging out a user
@api_view(['POST', 'OPTIONs'])
def user_logout(request):
  # print(request.data)
  # logout(request)
  try:
    logout(request) 
    refresh_token = request.data.get('refresh')
    # print(refresh_token)
    token = RefreshToken(refresh_token)
    token.blacklist()
    return Response({"message": "You Logged out successfully."}, status=status.HTTP_200_OK)
  except Exception as e:
    return Response({"error": "Invalid token"}, status=status.HTTP_400_BAD_REQUEST)


# Get All registered users
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_users(request):
  try:
    users = UserProfile.objects.all()
    serializer = UserProfileSerializer(users, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)
  except Exception as e :
    return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

# User profile
@api_view(['GET', 'POST', 'PUT'])
@permission_classes([IsAuthenticated])
def user_profile_view(request, pk):
  try:
    profile = UserProfile.objects.get(pk=pk)
  except UserProfile.DoesNotExist:
    return Response({"detail": "Profile not found."}, status=status.HTTP_404_NOT_FOUND)

  if request.method == 'GET':
    serializer = UserProfileSerializer(profile)
    return Response(serializer.data)

  if request.method == 'PUT':
    if request.user != profile.user:
      return Response({"detail": "You do not have permission to edit this profile."}, status=status.HTTP_403_FORBIDDEN)
    
    serializer = UserProfileSerializer(profile, data=request.data, partial=True)
    if serializer.is_valid():
      serializer.save()
      return Response(serializer.data)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)



# search the users with username, full_name, or email
@api_view(['GET'])
# @permission_classes([IsAuthenticated])
def search_users(request, username):
  logged_in_user = request.user

  if logged_in_user.is_anonymous:
    return Response(
      {"detail": "Authentication credentials were not provided."},
      status=status.HTTP_401_UNAUTHORIZED
    )
  
  users = UserProfile.objects.filter(
    Q(user__username__icontains=username) | 
    Q(full_name__icontains=username) 
    # | Q(user__email__icontains=username)
  ).exclude(user=logged_in_user)

  if not users.exists():
    return Response(
      {"detail": "No users found."},
      status=status.HTTP_404_NOT_FOUND
    )

  serializer = UserProfileSerializer(users, many=True)
  return Response(serializer.data, status=status.HTTP_200_OK)