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


##### /Job/view Responses ###
def jobView(request):
    if request.method == 'GET':
        #load http request body into python dictionary, req_dict
        req_dict = json.loads(request.body)  
        userID = req_dict['user_id']
        #query database for user_id, if found return data via jobSerializer. 
        try:
            serialized_qs = serializers.jobSerialize(models.job.objects.get(business_id=userID))
            serialized_qs.data
            return HttpResponse(JSONRenderer().render(serialized_qs.data), content_type='application/json')
        except:
            return JsonResponse({'error':'lookup failed','status':'failure'}, status=404)
    elif request.method == 'POST':
        return JsonResponse({'error':'invalid request','status':'failure'}, status=404)

def jobRegister(request):
    if request.method == 'POST':
        # req_dict = json.loads(request.body)  
        # for i in req_dict:
        #     print(i)
        return JsonResponse({'error':'invalid request','status':'failure'}, status=404)
    elif request.method == 'GET':
        return JsonResponse({'error':'invalid request','status':'failure'}, status=404)


