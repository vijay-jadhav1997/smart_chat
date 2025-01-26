from django.contrib import admin

from .models import Message

# Register your models here.
@admin.register(Message)
class MessageModel(admin.ModelAdmin):
  list_editable = ['is_read',]
  list_display = ['id', 'user', 'sender', 'reciever', 'is_read', 'message']