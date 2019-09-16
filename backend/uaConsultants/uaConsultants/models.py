from django.db import models

class register(models.Model):
    email = models.CharField(max_length=50)
    name = models.CharField(max_length=50)
    business_name = models.CharField(max_length=100)
    password = models.CharField(max_length=50)

class login(models.Model):
    email = models.CharField(max_length=50)
    password = models.CharField(max_length=50)

class registerResponseSuccess(models.Model):
    session_token = models.CharField(max_length=50)
    status = models.CharField(max_length=50)

class registerResponseFail(models.Model):
    error = models.CharField(max_length=50)
    status = models.CharField(max_length=50)
    username = models.CharField(max_length=50)

class loginResponseSuccess(models.Model):
    session_token = models.CharField(max_length=50)
    status = models.CharField(max_length=50)

class loginResponseFail(models.Model):
    error = models.CharField(max_length=50)
    status = models.CharField(max_length=50)

class userBlock(models.Model):
    session_token = models.CharField(max_length=50)
    block_id = models.CharField(max_length=50)

class responseSuccess(models.Model):
    status = models.CharField(max_length=50)

class responseFail(models.Model):
    error = models.CharField(max_length=50)
    status = models.CharField(max_length=50)

class profileResponseSuccess(models.Model):
    business_id = models.CharField(max_length=50)
    date_created = models.IntegerField()
    profile_picture = models.CharField(max_length=100)
    description = models.CharField(max_length=50)
    ####open_projects = models.CharField(max_length=50)

class conversationData(models.Model):
    business_id = models.CharField(max_length=50)
    business_name = models.CharField(max_length=50)
    business_picture = models.CharField(max_length=100)
    job_link = models.CharField(max_length=50)
    user_name = models.CharField(max_length=50)