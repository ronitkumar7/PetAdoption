from django.db import models
from django.contrib.auth.models import User
# from listings.models import PetListing

# Create your models here.
class Application(models.Model):
    owner = models.ForeignKey(User, related_name="applications", on_delete=models.CASCADE)
    # petlisting = models.ForeignKey(PetListing, related_name="applications", on_delete=models.CASCADE)
    applicant = models.CharField(max_length=100)
    email = models.EmailField()
    phone1 = models.CharField(max_length=20)
    phone2 = models.CharField(max_length=20, null=True, blank=True)
    description = models.TextField()
    status = models.CharField(max_length=20)
    creation_time = models.DateTimeField(auto_now_add=True)
    last_update_time = models.DateTimeField(auto_now=True)