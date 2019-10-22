from django.db import models
from django.conf import settings
from user.models import CustomUser
from django import forms
import datetime


class job(models.Model):
    project_name = models.CharField(max_length=50,default='My Project')
    date_created = models.DateTimeField(default=datetime.datetime.now)
    description = models.TextField(max_length=500, blank=True)
    business = models.ForeignKey(CustomUser,on_delete=models.PROTECT,related_name='jobs')
    location = models.TextField(max_length=500, blank=True)
    current_bid = models.TextField(max_length=500, blank=True)
    bid_amount = models.TextField(max_length=500, blank=True)

    def __str__(self):
      return self.project_name

class project_photos(models.Model):
    project = models.ForeignKey(job, blank = True, on_delete=models.CASCADE, related_name='project_photos')
    image = models.ImageField(upload_to='job_images')
    title = models.TextField(blank = True, max_length=100, default = "Title")

    def __unicode__(self):
        return '%s: %s' % (self.image, self.title)
