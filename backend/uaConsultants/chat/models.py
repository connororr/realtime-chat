from django.db import models
from user.models import CustomUser
import datetime

class Conversation(models.Model):
    business = models.ForeignKey(CustomUser,on_delete=models.PROTECT)
    job_link = models.TextField(max_length=500, blank=True)

class Message(models.Model):
    conversation = models.ForeignKey(Conversation,on_delete=models.PROTECT)
    user_id = models.ForeignKey(CustomUser,on_delete=models.PROTECT)
    message = models.TextField(max_length=500, blank=True)
    time_sent = models.DateTimeField(auto_now=False,auto_now_add=True)