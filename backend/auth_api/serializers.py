from django.contrib.auth import authenticate
from django.contrib.auth.password_validation import validate_password

from rest_framework import serializers
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

from .models import User, UserProfile

class UserSerializer(serializers.ModelSerializer):
  class Meta:
    model = User
    fields = ['id', 'username', 'email']


# Custom TokenObtainPairSerializer:
class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
  @classmethod
  def get_token(cls, user):
    token = super().get_token(user)

    token['username'] = user.username
    token['email'] = user.email
    token['dp_image'] = str(user.userprofile.dp_image)
    token['bio'] = user.userprofile.bio
    token['mobile_number'] = user.userprofile.mobile_number
    token['gender'] = user.userprofile.gender
    token['address'] = user.userprofile.address
    token['birth_date'] = user.userprofile.birth_date

    return token


class UserSignupSerializer(serializers.ModelSerializer):
  password = serializers.CharField(write_only=True, required=True, validators=[validate_password])
  password2 = serializers.CharField(write_only=True, required=True)

  class Meta:
    model = User
    fields = ['email', 'username', 'password', 'password2']

  def validate(self, data):
    if data['password'] != data['password2']: # checks for 'password' is equal to 'password2'
      raise serializers.ValidationError({'password': 'Password fields do not match.'})
    return data

  def create(self, validated_data):
    validated_data.pop('password2') # removes the 'password2' from validated_data dict
    user = User.objects.create_user(**validated_data)
    return user
  
  
# Serializer for user login
class UserLoginSerializer(serializers.Serializer):
  email = serializers.CharField(required=True)
  password = serializers.CharField(required=True, write_only=True)

  def validate(self, data):
    user = authenticate(email=data.get('email'), password=data.get('password'))
    if not user:
      raise serializers.ValidationError('Invalid email and password.')
    # attach the 'user' obj to validated_data for later use in views
    data['user'] = user 
    return data


# User Profile serializer
class UserProfileSerializer(serializers.ModelSerializer):
  class Meta:
    model = UserProfile
    fields = [ 'id',  'user', 'dp_image', 'bio', 'mobile_number', 'gender', 'address', 'birth_date']
    depth = 3
  
  # def __init__(self, *args, **kwargs):
  #   super(UserProfileSerializer, self).__init__(*args, **kwargs)
  #   request = self.context.get('request')
  #   if request and request.method == 'POST':
  #     self.Meta.depth = 0
  #   else:
  #     self.Meta.depth = 3


  user = serializers.PrimaryKeyRelatedField(read_only=True)  # Prevent modifying the user field

  def to_representation(self, instance):
    """Dynamically adjust depth based on request method."""
    request = self.context.get('request')
    if request and request.method == 'POST':
      self.Meta.depth = 0  # Shallow serialization for POST requests
    return super().to_representation(instance)
  

  def validate_mobile_number(self, value):
    """Ensure mobile number contains only digits and is of valid length."""
    if value and not value.isdigit():
      raise serializers.ValidationError("Mobile number should contain only digits.")

    if value and not (10 <= len(value) <= 15):
      raise serializers.ValidationError("Mobile number should be between 10 to 15 digits.")
    return value

