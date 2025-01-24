from django.contrib.auth import authenticate
from django.contrib.auth.password_validation import validate_password

from rest_framework import serializers
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

from .models import User, UserProfile

class UserSerializer(serializers.ModelSerializer):
  class Meta:
    model = User
    fields = ['id', 'username', 'email']


class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
  @classmethod
  def get_token(cls, user):
    token = super().get_token(user)

    token['username'] = user.username
    token['email'] = user.email
    token['full_name'] = user.userprofile.full_name
    token['dp_image'] = str(user.userprofile.dp_image)
    token['bio'] = user.userprofile.bio
    token['mobile_number'] = user.userprofile.mobile_number

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
  
