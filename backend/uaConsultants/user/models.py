
from django.contrib.auth.models import AbstractUser
from django.db import models
from django.conf import settings

class CustomUser(AbstractUser):
    business_name = models.CharField(max_length=50,default='My Company')
    username = models.CharField(max_length=30,unique=True, primary_key=True)
    description = models.TextField(max_length=500, blank=True)
    profile_picture = models.ImageField(blank=True)
    

    def __str__(self):
        return "{}".format(self.username)



