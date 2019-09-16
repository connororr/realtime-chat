from django.db import models

class conversationData(models.Model):
    business_id = models.CharField(max_length=50)
    business_name = models.CharField(max_length=50)
    business_picture = models.CharField(max_length=100)
    job_link = models.CharField(max_length=50)
    user_name = models.CharField(max_length=50)