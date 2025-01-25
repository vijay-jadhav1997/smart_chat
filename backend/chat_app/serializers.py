from rest_framework import serializers

from auth_api.serializers import UserProfileSerializer

from .models import Message

class MessageSerializer(serializers.ModelSerializer):
  reciever_profile = UserProfileSerializer(read_only=True)
  sender_profile = UserProfileSerializer(read_only=True)

  class Meta:
    model = Message
    fields = ['id','sender', 'reciever', 'reciever_profile', 'sender_profile' ,'message', 'is_read', 'date']
  
  def __init__(self, *args, **kwargs):
    super(MessageSerializer, self).__init__(*args, **kwargs)
    request = self.context.get('request')
    if request and request.method=='POST':
      self.Meta.depth = 0
    else:
      self.Meta.depth = 2
  
