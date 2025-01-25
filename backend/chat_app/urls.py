from django.urls import path

from . import views


urlpatterns = [
  path('my-messages/<int:user_id>/', views.my_inbox, name='get_messages'),
  path('get-messages/<int:sender_id>/<int:reciever_id>/', views.get_messages, name='get_messages'),
  path('send-message/', views.send_message, name='get_message'),
]
