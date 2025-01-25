from django.shortcuts import render

from rest_framework.decorators import api_view
from rest_framework import status
from rest_framework.response import Response
from django.db.models import Subquery, OuterRef, Q

from .models import Message
from auth_api.models import User, UserProfile
from .serializers import MessageSerializer

from auth_api.serializers import UserProfileSerializer


# Create your views here.
@api_view(['GET'])
def my_inbox(request, user_id):
  messages = Message.objects.filter(
    id__in=Subquery(
      User.objects.filter(
        Q(sender__reciever=user_id) |
        Q(reciever__sender=user_id)
      ).distinct().annotate(
        last_msg=Subquery(
          Message.objects.filter(
            Q(sender=OuterRef('id'), reciever=user_id) |
            Q(reciever=OuterRef('id'), sender=user_id)
          ).order_by('-id')[:1].values_list('id', flat=True)
        )
      ).values_list('last_msg', flat=True).order_by("-id")
    )
  ).order_by("-id")

  serializer = MessageSerializer(messages, many=True)
  # print(serializer.data)
  return Response(serializer.data)


# to get messages related to sender and reciever
@api_view(['GET'])
def get_messages(request, sender_id, reciever_id):
  messages = Message.objects.filter(
    sender__in=[sender_id, reciever_id], 
    reciever__in=[sender_id, reciever_id]
  )
  serializer = MessageSerializer(messages, many=True)
  return Response(serializer.data)


# to send message
@api_view(['POST'])
def send_message(request):
  serializer = MessageSerializer(data=request.data)
  if serializer.is_valid():
    serializer.save()
    return Response(serializer.data, status=status.HTTP_201_CREATED)
  return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

