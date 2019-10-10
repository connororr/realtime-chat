from django.db import models
from django.conf import settings
from user.models import CustomUser
import datetime


class job(models.Model):
    project_name = models.CharField(max_length=50,default='My Project')
    date_created = models.DateTimeField(default=datetime.datetime.now)
    description = models.TextField(max_length=500, blank=True)
    business = models.ForeignKey(CustomUser,on_delete=models.PROTECT)
    business_name = models.TextField(max_length=500, blank=True)
    location = models.TextField(max_length=500, blank=True)
    current_bid = models.TextField(max_length=500, blank=True)
    bid_amount = models.TextField(max_length=500, blank=True)
    project_photos = models.ImageField(blank=True)

    def __str__(self):
      return "{}".format(self.project_name)
