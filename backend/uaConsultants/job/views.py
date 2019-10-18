from django.shortcuts import render
from django.http import HttpResponse 
from django.http import JsonResponse
from django.urls import reverse
from django.conf import settings
import json
from rest_framework import generics
from rest_framework.renderers import JSONRenderer
from .serializers import jobSerialize
from . import models, permissions
from . import serializers
from django.views.decorators.csrf import csrf_exempt
from datetime import date
import io
import base64
from PIL import Image, ImageDraw
from pathlib import Path
import uuid




##### GET: /Job/view ###
def jobView(request):
    if request.method == 'GET':
        #load http request body into python dictionary, req_dict
        req_dict = json.loads(request.body)  
        userID = req_dict['user_id']
        #query database for user_id, if found return data via jobSerializer. 
        try:
            serialized_qs = serializers.jobSerialize(models.job.objects.get(id=userID))
            #serialized_qs.data
            return HttpResponse(JSONRenderer().render(serialized_qs.data), content_type='application/json')
        except:
            return JsonResponse({'error':'lookup failed','status':'failure'}, status=400)
    elif request.method == 'POST':
        return JsonResponse({'error':'invalid request','status':'failure'}, status=400)

##### POST: /Job/Register ###
def jobRegister(request):
    if request.method == 'POST':
        try:
            #If authenticated create a model for job, then create a project_photo entry for every photo
            if request.user.is_authenticated:
                req_dict = json.loads(request.body)  
                test = models.job.objects.create(project_name=req_dict['project_title'], date_created=date.today(),description=req_dict['project_description'],business=request.user,location=req_dict['project_location'],current_bid="0",bid_amount="0")
                for photo in req_dict['project_photos']:
                    v
            return JsonResponse({'status':'success'}, status=200)
        except:
            return JsonResponse({'error':'failed register job','status':'failure'}, status=400)    
    return JsonResponse({'error':'failed register job','status':'failure'}, status=400)

##### POST: /job/bid ###
def jobBid(request):
    req_dict = {}

    if request.method == "POST":
        try:
            if request.user.is_authenticated:   # if authenticated, add bid to the job

                req_dict = json.loads(request.body)
                model = models.job.objects.get(id=req_dict['job_id'])

                    #check bid amount is bigger than current top bid amount
                if model.bid_amount != '':
                    if int(req_dict['bid_value']) < int(model.bid_amount):
                        return JsonResponse({'error': 'current bid is less than top bidder', 'status': 'failure'}, status=400)

                serialized_qs = serializers.jobSerialize(model, data={'bid_amount': req_dict['bid_value'], 'current_bid': req_dict['current_bid']}, partial=True)
                if serialized_qs.is_valid():
                    serialized_qs.save()
                return JsonResponse({'status': 'success'}, status=200)
        except:
            return JsonResponse({'error':'failed job bidding','status':'failure'}, status=400)

##### POST: /Job/Photo/upload ###
def jobPhotoUpload(request):
    if request.method == 'POST':
        try:
            req_dict = json.loads(request.body)
            tempname =  str(uuid.uuid4())
            f = open('media/images/'+tempname+'.jpeg', 'wb')
            f.write(base64.b64decode(req_dict['image_byte_array']) )
            f.close()
            return HttpResponse(settings.MEDIA_URL+'images/'+tempname+'.jpeg', content_type="application/json")
        except:
            return JsonResponse({'error':'failed photo upload','status':'failure'}, status=400)    
    return JsonResponse({'error':'failed photo upload','status':'failure'}, status=400)