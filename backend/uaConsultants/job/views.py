from django.shortcuts import render
from django.http import HttpResponse 
from django.http import JsonResponse
from django.urls import reverse
import json
from rest_framework import generics
from rest_framework.renderers import JSONRenderer
from .serializers import jobSerialize
from . import models, permissions
from . import serializers


# #### /Job Responses ###
#/Job/search
# class jobView(generics.RetrieveUpdateDestroyAPIView):
#     permission_classes = [permissions.IsOwnerOrReadOnly]
#     queryset = models.job.objects.all()
#     serializer_class = jobSerializer

# def jobView(request, job_id):
#     queryset = models.job.objects.get(id=job_id)
#     return HttpResponse("You're looking at question %s." % job_id)

def jobView(request):
    req_dict = dict()
    userID=""
    if request.method == 'GET':
        req_dict = json.loads(request.body)  
        userID = req_dict['user_id']
        serialized_qs = serializers.jobSerialize(models.job.objects.get(business_id=userID))
        serialized_qs.data
    return HttpResponse(JSONRenderer().render(serialized_qs.data), content_type='application/json')

