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
from user.views import CustomUser
from datetime import date
from django.contrib.sessions.models import Session
import io
import base64
from PIL import Image, ImageDraw
from pathlib import Path
import uuid
from django.contrib.auth import authenticate
from rest_framework.authtoken.models import Token
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated

#GET: /job/view
@api_view(["GET"])
@permission_classes([IsAuthenticated])
def jobView(request):
    req_dict =  request.data  
    try:
        token = Token.objects.get(key=req_dict['session_token'])
        job_id = req_dict['job_id'] 
        serialized_qs = serializers.jobSerialize(models.job.objects.get(id=job_id))
        return HttpResponse(JSONRenderer().render(serialized_qs.data), content_type='application/json')
    except:
        return JsonResponse({'error':'lookup failed','status':'failure'}, status=400)


#POST: /job/register 
@api_view(["POST"])
@permission_classes([IsAuthenticated])
def jobRegister(request):
    try:
        req_dict = request.data
        token = Token.objects.get(key=req_dict['session_token'])
        user = CustomUser.objects.get(id=token.user_id)  
        test = models.job.objects.create(project_name=req_dict['project_title'], date_created=date.today(),description=req_dict['project_description'],business=user,location=req_dict['project_location'],current_bid="0",bid_amount="0")
        for photo in req_dict['project_photos']:
            models.project_photos.objects.create(project=test,image=photo['image'],title=photo['title'])
        return JsonResponse({"status":"success"}, status=200)
    except:
        return JsonResponse({'error':'failed to register','status':'failure'}, status=400)    
    return JsonResponse({'error':'failed to authenticate','status':'failure'}, status=400, safe=False)


#POST: /job/bid 
@api_view(["POST"])
@permission_classes([IsAuthenticated])
def jobBid(request):
    try:
        req_dict = request.data
        token = Token.objects.get(key=req_dict['session_token'])
        user = CustomUser.objects.get(id=token.user_id)  
        model = models.job.objects.get(id=req_dict['job_id'])
        #check bid amount is bigger than current top bid amount
        if model.bid_amount != '':
            if int(req_dict['bid_value']) < int(model.bid_amount):
                return JsonResponse({'error': 'current bid is less than top bidder', 'status': 'failure'}, status=400)
            serialized_qs = serializers.jobSerialize(model, data={'bid_amount': req_dict['bid_value'], 'current_bid': req_dict['current_bid']}, partial=True)
            if serialized_qs.is_valid():
                serialized_qs.save()
            return JsonResponse({"status": "success"}, status=200)
    except:
        return JsonResponse({'error':'failed job bidding','status':'failure'}, status=400)


#POST: /Job/Photo/upload 
@api_view(["POST"])
@permission_classes([IsAuthenticated])
def jobPhotoUpload(request):
    try:
        req_dict = request.data
        token = Token.objects.get(key=req_dict['session_token'])
        user = CustomUser.objects.get(id=token.user_id)
        tempname =  str(uuid.uuid4())
        f = open('media/images/'+tempname+'.jpeg', 'wb')
        f.write(base64.b64decode(req_dict['image_byte_array']) )
        f.close()
        return HttpResponse(settings.MEDIA_URL+'images/'+tempname+'.jpeg', content_type="application/json")
    except:
         return JsonResponse({'error':'failed photo upload','status':'failure'}, status=400)    
    return JsonResponse({'error':'failed photo upload','status':'failure'}, status=400)