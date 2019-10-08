from django.shortcuts import render
from django.http import HttpResponse 
from django.http import JsonResponse
import json
from rest_framework import generics
from .serializers import jobSerializer
from . import models, permissions
from . import serializers


# #### /Job Responses ###
#/Job/search
class jobView(generics.ListAPIView):
    permission_classes = [permissions.IsOwnerOrReadOnly]
    queryset = models.job.objects.all()
    serializer_class = jobSerializer


