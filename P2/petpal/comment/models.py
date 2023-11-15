from django.db import models
from account.models import Account
from applications.models import Application
# Create your models here.
class Comment(models.Model):
    text = models.TextField()
    user = models.ForeignKey(Account, on_delete=models.CASCADE, related_name="author")
    create_time = models.DateTimeField(auto_now_add=True)
    shelter = models.ForeignKey(Account, on_delete=models.CASCADE, null=True, blank=True, related_name="shelter")
    application = models.ForeignKey(Application, on_delete=models.CASCADE, null=True, blank=True)
    reply = models.ForeignKey('self', on_delete=models.CASCADE, null=True, blank=True)