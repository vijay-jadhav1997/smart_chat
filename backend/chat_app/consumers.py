import json

from channels.generic.websocket import AsyncWebsocketConsumer
from channels.db import database_sync_to_async

from django.contrib.auth import get_user_model

from .models import Message


#* Get User model from auth_api
User = get_user_model()

# Consumers:
class PrivateChatConsumer(AsyncWebsocketConsumer):

  async def connect(self):
    """Handles new WebSocket connection."""
    self.sender = self.scope["user"]  # Logged-in user
    self.receiver_id = int(self.scope["url_route"]["kwargs"]["receiver_id"])
    
    # It ensure the same chat room name for both users (sorted IDs)
    self.room_name = f"chat_{min(self.sender.id, int(self.receiver_id))}_{max(self.sender.id, int(self.receiver_id))}"
    self.room_group_name = f"private_{self.room_name}"

    # Add user to the WebSocket group
    await self.channel_layer.group_add(self.room_group_name, self.channel_name)
    await self.accept()


  async def disconnect(self, close_code):
    """Handles WebSocket disconnection."""
    await self.channel_layer.group_discard(self.room_group_name, self.channel_name)
    await self.close()


  async def receive(self, text_data):
    """Handles incoming messages."""
    data = json.loads(text_data)
    message = data["message"]
    is_read = data["is_read"]

    # Save message to DataBase (async call)
    chat_message = await self.save_message(self.sender.id, self.receiver_id, message, is_read)

    # Send message to the room
    await self.channel_layer.group_send(
      self.room_group_name,
      {
        "type": "chat_message",
        "message": message,
        "sender": self.sender.username,
        "timestamp": chat_message.timestamp.isoformat(),
      }
    )


  async def chat_message(self, event):
    """Sends the received message to WebSocket clients."""
    await self.send(text_data=json.dumps({
      "message": event["message"],
      "sender": event["sender"],
      "timestamp": event["timestamp"],
    }))


  @database_sync_to_async
  def save_message(self, sender_id, receiver_id, message):
    """Saves the chat message to the database."""
    # sender = User.objects.get(id=sender_id)
    # receiver = User.objects.get(id=receiver_id)
    # return Message.objects.create(sender=sender, receiver=receiver, message=message, is_read=is_read)
    return Message.objects.create(
      sender_id=sender_id, receiver_id=receiver_id, message=message
    )








#? (We'll work with it later, when we get time) group chatting
"""
class GroupChatConsumer(AsyncWebsocketConsumer):
  async def connect(self):
    self.room_name = self.scope['url_route']['kwargs']['room_name']
    self.room_group_name = f'chat_{self.room_name}'
    
    await self.channel_layer.group_add(self.room_group_name, self.channel_name)
    await self.accept()

  async def disconnect(self, close_code):
    await self.channel_layer.group_discard(self.room_group_name, self.channel_name)

  async def receive(self, text_data):
    data = json.loads(text_data)
    message = data['message']
    sender = self.scope['user']

    await self.channel_layer.group_send(
      self.room_group_name,
      {"type": "chat_message", "message": message, "sender": sender.username}
    )

  async def chat_message(self, event):
    await self.send(text_data=json.dumps({"message": event["message"], "sender": event["sender"]}))

"""
