from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import Account
# from django.contrib.auth.models import User
# admin.site.register(Account, User)
admin.site.register(Account, UserAdmin)
# admin.site.register(Account)
# Register your models here.
