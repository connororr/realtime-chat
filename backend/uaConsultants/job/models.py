from django.db import models
from django.conf import settings
from user.models import CustomUser
from django import forms
import datetime

class job(models.Model):
    project_name = models.CharField(max_length=50,default='My Project')
    date_created = models.DateTimeField(default=datetime.datetime.now)
    description = models.TextField(max_length=500, blank=True)
    category = models.TextField(max_length=500, blank=True)
    jobType = models.TextField(max_length=50, blank=True)
    premium = models.CharField(max_length=1, default = 'F')
    business = models.ForeignKey(CustomUser,on_delete=models.PROTECT,related_name='jobs')
    location = models.TextField(max_length=500, blank=True)
    current_bid = models.IntegerField(blank=False, default=0)
    bid_amount = models.IntegerField(blank=False, default=0)

    def __str__(self):
      return self.project_name

class project_photos(models.Model):
    project = models.ForeignKey(job, blank = False, on_delete=models.CASCADE, related_name='project_photos')
    image = models.TextField(blank = True, max_length=300, default = "Title")
    title = models.TextField(blank = True, max_length=100, default = "Title")

    def __unicode__(self):
        return '%s: %s' % (self.image, self.title)
