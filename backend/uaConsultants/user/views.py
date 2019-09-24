# from django.shortcuts import render
from django.contrib.auth.models import User
from django.contrib import auth
from django.http import HttpResponse 
from django.http import JsonResponse
import json
from .models import *

from rest_framework import generics
from .serializers import UserSerializer
from . import models
from . import serializers


# #### /User Responses ###
# #/User/register
def userRegister(request):
    if request.method == 'GET':
        return HttpResponse('400')
    elif request.method == 'POST':
        response_data =   ["session_token","status"]
        return HttpResponse(json.dumps(response_data), content_type="application/json")
        return HttpResponse('200')

# #/User/login
def userLogin(request):
    if request.method == 'GET':
        return HttpResponse('200')
    elif request.method == 'POST':
        return HttpResponse('400')

# #/User/block
def userBlock(request):
    if request.method == 'GET':
        return HttpResponse('200')
    elif request.method == 'POST':
        return HttpResponse('400')

# # #/User/Profile
# def userProfile(request):
#     # if request.method == 'GET':
#     #     return HttpResponse('200')
#     # elif request.method == 'POST':
#     #     return HttpResponse('400')

# def sample_view(request):
#     current_user = request.user
#     return current_user.id

class UserProfile(generics.RetrieveUpdateDestroyAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer

class allUserView(generics.ListAPIView):
    queryset = models.User.objects.all()
    serializer_class = serializers.UserSerializer

# ##example json dump
#         # response_data=[]
#         # for field in conversationData.objects.all():
#         #     response_data.append(field.business_id+" "+field.business_name+" "+field.business_picture+" "+field.job_link+" "+field.user_name)
#         # return HttpResponse(json.dumps(response_data), content_type="application/json")
