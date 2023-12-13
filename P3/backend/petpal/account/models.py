from django.db import models
from django.contrib.auth.models import User, AbstractUser, UserManager
from django.db.models.signals import post_save
from django.dispatch import receiver
# Create your models here.



class Account(AbstractUser):
    is_active = models.BooleanField(default=True)
    seeker_or_shelter = models.BooleanField()
    phone_num = models.CharField(max_length=12, blank=True)
    location = models.CharField(max_length=200, blank=True)
    preferences = models.CharField(max_length=200, blank=True)
    profile_pic = models.ImageField(upload_to='profiles/', blank=True)
    mission_statement = models.TextField(blank=True)
    shelter_name = models.TextField(blank=True)

    # user = models.OneToOneField(User, on_delete=models.CASCADE)

# Adapted from https://adiramadhan17.medium.com/django-extend-user-model-with-one-to-one-field-92ced0303d84
#this method to generate profile when user is created
# @receiver(post_save, sender=User)
# def create_user_profile(sender, instance, created, **kwargs):
#     if created:
#         Account.objects.create(user=instance)

# #this method to update profile when user is updated
# @receiver(post_save, sender=User)
# def save_user_profile(sender, instance, **kwargs):
#     instance.profile.save()