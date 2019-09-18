from django.db import models

class user(models.Model):
    user_id = models.CharField(max_length=50)
    email = models.CharField(max_length=50)
    name = models.CharField(max_length=50)
    business_name = models.CharField(max_length=100)
    password = models.CharField(max_length=50)
    session_token = models.CharField(max_length=50)
    block_status = models.CharField(max_length=50)
    date_created = models.IntegerField()
    profile_picture = models.CharField(max_length=50)
    description = models.CharField(max_length=50)

