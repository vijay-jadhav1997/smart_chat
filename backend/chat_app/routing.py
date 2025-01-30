from django.urls import re_path
from .consumers import PrivateChatConsumer

websocket_urlpatterns = [
  re_path(r"ws/chat_app/(?P<receiver_id>\d+)/$", PrivateChatConsumer.as_asgi()),
]
