from django.db import models
from django.contrib.auth.models import AbstractUser
# Create your models here.



class Account(AbstractUser):
    seeker_or_shelter = models.BooleanField()
    phone_num = models.CharField(max_length=12, blank=True)
    location = models.CharField(max_length=200, blank=True)
    preferences = models.CharField(max_length=200, blank=True)
    profile_pic = models.ImageField(upload_to='images/', blank=True)
    mission_statement = models.TextField(blank=True)

