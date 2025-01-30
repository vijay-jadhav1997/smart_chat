from django.shortcuts import render
from django.db.models import Subquery, OuterRef, Q

from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework import status
from rest_framework.response import Response

from auth_api.models import User, UserProfile
from auth_api.serializers import UserProfileSerializer

from .models import Message
from .serializers import MessageSerializer



# Create your views here.
@api_view(['GET'])
def my_inbox(request, user_id):
  messages = Message.objects.filter(
    id__in=Subquery(
      User.objects.filter(
        Q(sender__receiver=user_id) |
        Q(receiver__sender=user_id)
      ).distinct().annotate(
        last_msg=Subquery(
          Message.objects.filter(
            Q(sender=OuterRef('id'), receiver=user_id) |
            Q(receiver=OuterRef('id'), sender=user_id)
          ).order_by('-id')[:1].values_list('id', flat=True)
        )
      ).values_list('last_msg', flat=True).order_by("-id")
    )
  ).order_by("-id")

  serializer = MessageSerializer(messages, many=True)
  # print(serializer.data)
  return Response(serializer.data, status=status.HTTP_200_OK)


# to get messages related to sender and receiver
@api_view(['GET'])
def get_messages(request, sender_id, receiver_id):
  messages = Message.objects.filter(
    sender__in=[sender_id, receiver_id], 
    receiver__in=[sender_id, receiver_id]
  )
  serializer = MessageSerializer(messages, many=True)
  return Response(serializer.data)


# to send message
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def send_message(request):
  serializer = MessageSerializer(data=request.data)
  if serializer.is_valid():
    serializer.save()
    return Response(serializer.data, status=status.HTTP_201_CREATED)
  return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

