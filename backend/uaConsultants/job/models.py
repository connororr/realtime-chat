from django.db import models
from django.conf import settings
from user.models import CustomUser
import datetime


# class JobPhoto(models.Model):
#     image = models.CharField(max_length=300)
#     title = models.CharField(max_length=50)

class job(models.Model):
    job_name = models.CharField(max_length=50,default='My Job')
    job_description = models.TextField(max_length=500, blank=True)
    date_created = models.DateTimeField(default=datetime.datetime.now)
    business_name = models.ForeignKey(settings.AUTH_USER_MODEL,on_delete=models.PROTECT)
    job_location = models.TextField(max_length=500, blank=True)
    current_bid = models.TextField(max_length=500, blank=True)
    bid_amount = models.TextField(max_length=500, blank=True)
    project_photos = models.ImageField(blank=True)

    def __str__(self):
      return "{}".format(self.job_name)
