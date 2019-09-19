from django.db import models

class Chat(models.Model):
    session_token = models.CharField(max_length=50)
    
