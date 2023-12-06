from django.db import models
from django.contrib.auth.models import User
from account.models import Account

# Create your models here.
class Notification(models.Model):
    owner = models.ForeignKey(Account, related_name="notifications", on_delete=models.CASCADE)
    state = models.CharField(max_length=10)
    creation_time = models.DateTimeField(auto_now_add=True)
    message = models.TextField()
    link = models.URLField()