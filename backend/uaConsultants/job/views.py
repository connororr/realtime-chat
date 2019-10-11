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
from django.views.decorators.csrf import csrf_exempt
from datetime import date    





##### /Job/view Responses ###
def jobView(request):
    if request.method == 'GET':
        #load http request body into python dictionary, req_dict
        req_dict = json.loads(request.body)  
        userID = req_dict['user_id']
        #query database for user_id, if found return data via jobSerializer. 
        try:
            serialized_qs = serializers.jobSerialize(models.job.objects.get(id=userID))
            serialized_qs.data
            return HttpResponse(JSONRenderer().render(serialized_qs.data), content_type='application/json')
        except:
            return JsonResponse({'error':'lookup failed','status':'failure'}, status=404)
    elif request.method == 'POST':
        return JsonResponse({'error':'invalid request','status':'failure'}, status=404)

@csrf_exempt
def jobRegister(request):
    if request.method == 'POST':
        if request.user.is_authenticated:
            req_dict = json.loads(request.body)  
            models.job.objects.create(project_name=req_dict['project_title'], date_created=date.today(),description=req_dict['project_description'],business=request.user,location=req_dict['project_location'],current_bid="0",bid_amount="0")
            return HttpResponse(req_dict['project_title'], status=404)
    return JsonResponse({'error':'invalid request','status':'failure'}, status=404)


