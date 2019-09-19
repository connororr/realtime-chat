# from django.shortcuts import render

from django.http import HttpResponse 
from django.http import JsonResponse
import json
from .models import *

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

# #/User/Profile
def userProfile(request):
    if request.method == 'GET':
        return HttpResponse('200')
    elif request.method == 'POST':
        return HttpResponse('400')


# ##example json dump
#         # response_data=[]
#         # for field in conversationData.objects.all():
#         #     response_data.append(field.business_id+" "+field.business_name+" "+field.business_picture+" "+field.job_link+" "+field.user_name)
#         # return HttpResponse(json.dumps(response_data), content_type="application/json")
