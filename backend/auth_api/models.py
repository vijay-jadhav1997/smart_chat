from django.db import models
from django.contrib.auth.models import AbstractUser
from django.db.models.signals import post_save
from django.dispatch import receiver

# Create your models here.
class User(AbstractUser):
  email = models.EmailField(unique=True, db_index=True)

  # email-based login (uses email at authentication)
  USERNAME_FIELD = 'email'
  REQUIRED_FIELDS = ['username']

  def __str__(self):
    return self.username


class UserProfile(models.Model):
  user = models.OneToOneField(User, on_delete=models.CASCADE)
  # full_name = models.CharField(max_length=300)
  dp_image = models.ImageField(default="default.jpg", upload_to='user_dp_images/', blank=True, null=True)
  bio = models.TextField(max_length=500, blank=True, null=True)
  mobile_number = models.CharField(max_length=15, blank=True, null=True, db_index=True)
  address = models.CharField(max_length=350, blank=True, null=True)
  gender = models.CharField(max_length=1, choices=[('m', 'Male'), ('f', 'Female'), ('o', 'Other'),], blank=True, null=True)
  birth_date = models.DateField(blank=True, null=True)


  def __str__(self):
    return self.full_name




@receiver(post_save, sender=User)
def create_user_profile(sender, instance, created, **kwargs):
  if created:
    UserProfile.objects.create(user=instance)
  else:
    instance.userprofile.save()


# def create_user_profile(sender, instance, created, **kwargs):
#   if created:
#     UserProfile.objects.get_or_create(user=instance)

# def save_user_profile(sender, instance, **kwargs):
#   instance.userprofile.save()

# post_save.connect(create_user_profile, sender=User)
# post_save.connect(save_user_profile, sender=User)