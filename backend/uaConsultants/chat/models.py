from django.db import models
from django.conf import settings
from user.models import CustomUser
import datetime


class Conversation(models.Model):
    sender = models.ForeignKey(CustomUser,on_delete=models.PROTECT, related_name='sender')
    receiver = models.ForeignKey(CustomUser, on_delete=models.PROTECT, related_name='receiver')
    job_link = models.TextField(max_length=500, blank=True)

class Message(models.Model):
    conversation = models.ForeignKey(Conversation,on_delete=models.PROTECT, related_name='messages')
    user_id = models.ForeignKey(CustomUser,on_delete=models.PROTECT)
    message = models.TextField(max_length=500, blank=True)
    time_sent = models.DateTimeField(auto_now=False,auto_now_add=True)