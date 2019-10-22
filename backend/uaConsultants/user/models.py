
from django.contrib.auth.models import AbstractUser
from django.db import models
from django.conf import settings
# from job.models import job

class CustomUser(AbstractUser):
    
    name = models.CharField(max_length=40,default='My Name')
    business_name = models.CharField(max_length=50,default='My Company')
    description = models.TextField(max_length=500, blank=True)
    profile_picture = models.ImageField(blank=True,upload_to='profile_pictures/')
    

    def __str__(self):
        return "{}".format(self.email)
    



