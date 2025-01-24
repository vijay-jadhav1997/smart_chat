from django.db import models
from django.contrib.auth.models import AbstractUser
from django.db.models.signals import post_save

# Create your models here.
class User(AbstractUser):
  email = models.EmailField(unique=True)

  # email-based login (uses email at authentication)
  USERNAME_FIELD = 'email'
  REQUIRED_FIELDS = ['username']

  def __str__(self):
    return self.username


class UserProfile(models.Model):
  user = models.OneToOneField(User, on_delete=models.CASCADE)
  full_name = models.CharField(max_length=300)
  dp_image = models.ImageField(default="default.jpg", upload_to='user_dp_images/')
  bio = models.TextField(max_length=500, blank=True, null=True)
  mobile_number = models.CharField(max_length=15, blank=True, null=True)

  def __str__(self):
    return self.full_name


def create_user_profile(sender, instance, created, **kwargs):
  if created:
    UserProfile.objects.get_or_create(user=instance)

def save_user_profile(sender, instance, **kwargs):
  instance.userprofile.save()

post_save.connect(create_user_profile, sender=User)
post_save.connect(save_user_profile, sender=User)