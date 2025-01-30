from django.contrib import admin

from .models import User, UserProfile



# Register your models here.
@admin.register(User)
class UserAdmin(admin.ModelAdmin):
  list_display = ['username', 'email']
  

@admin.register(UserProfile)
class UserProfileAdmin(admin.ModelAdmin):
  # list_editable = ['full_name',]
  list_display = ['user', ]
