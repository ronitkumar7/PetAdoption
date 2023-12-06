from django.db import models
from account.models import Account

# Create your models here.
class Blog(models.Model):
    owner = models.ForeignKey(Account, related_name="blogs", on_delete=models.CASCADE)
    title = models.CharField(max_length=100)
    body = models.TextField(max_length=6000)
    creation_time = models.DateTimeField(auto_now_add=True)