from django.db import models
from django.contrib.auth.models import User
from account.models import Account

# Create your models here.
class PetListing(models.Model):
    name = models.CharField(max_length=40)
    breed = models.CharField(max_length=40, null=True, blank=True)
    age = models.PositiveIntegerField(null=True, blank=True)
    gender = models.CharField(max_length=40, null=True, blank=True)
    size = models.CharField(max_length=40, null=True, blank=True)
    description = models.TextField(max_length=200,null=True, blank=True)
    avatar = models.ImageField(upload_to='avatars/', blank=True)
    created_date = models.DateTimeField(auto_now_add=True)
    status = models.CharField(max_length=40)

    shelter = models.ForeignKey(Account, related_name='listings', 
                              null=True, on_delete=models.CASCADE,
                              blank=True)

    def __str__(self):
        return self.name
    