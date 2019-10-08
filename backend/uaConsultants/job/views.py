from django.shortcuts import render
from django.http import HttpResponse 
from django.http import JsonResponse
from django.urls import reverse
import json
from rest_framework import generics
from .serializers import jobSerializer
from . import models, permissions
from . import serializers


# #### /Job Responses ###
#/Job/search
class jobView(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = [permissions.IsOwnerOrReadOnly]
    queryset = models.job.objects.all()
    serializer_class = jobSerializer

# def jobView(request, job_id):
#     queryset = models.job.objects.get(id=job_id)
#     return HttpResponse("You're looking at question %s." % job_id)


