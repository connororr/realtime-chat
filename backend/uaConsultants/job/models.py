from django.db import models
from django.conf import settings

# class JobPhoto(models.Model):
#     image = models.CharField(max_length=300)
#     title = models.CharField(max_length=50)

class job(models.Model):

    job_name = models.CharField(max_length=50,default='My Job')
    date_created = models.TextField(max_length=500, blank=True)
    job_summary = models.TextField(max_length=500, blank=True)
    business_id = models.TextField(max_length=500, blank=True)
    current_bid = models.TextField(max_length=500, blank=True)
    project_photos = models.ImageField(blank=True)

    def __str__(self):
        return "{}".format(self.job_name)
