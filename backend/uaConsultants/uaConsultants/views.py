from django.http import HttpResponse 
from django.http import JsonResponse
import json
from .models import *

###/'' Home page response ###
#/
def home(request):
    if request.method == 'GET':
        return HttpResponse('200')
    elif request.method == 'POST':
        return HttpResponse('400')

#### /User Responses ###
#/User/register
def userRegister(request):
    if request.method == 'GET':
        return HttpResponse('400')
    elif request.method == 'POST':
        response_data =   ["session_token","status"]
        return HttpResponse(json.dumps(response_data), content_type="application/json")
        return HttpResponse('200')

#/User/login
def userLogin(request):
    if request.method == 'GET':
        return HttpResponse('200')
    elif request.method == 'POST':
        return HttpResponse('400')

#/User/block
def userBlock(request):
    if request.method == 'GET':
        return HttpResponse('200')
    elif request.method == 'POST':
        return HttpResponse('400')

#/User/Profile
def userProfile(request):
    if request.method == 'GET':
        return HttpResponse('200')
    elif request.method == 'POST':
        return HttpResponse('400')

#### /Job Responses ###
#/Job/search
def jobSearch(request):
    if request.method == 'GET':
        return HttpResponse('200')
    elif request.method == 'POST':
        return HttpResponse('400')

#/Job/photo/upload
def jobPhotoUpload(request):
    if request.method == 'GET':
        return HttpResponse('200')
    elif request.method == 'POST':
        return HttpResponse('400')

#/Job/register
def jobRegister(request):
    if request.method == 'GET':
        return HttpResponse('200')
    elif request.method == 'POST':
        return HttpResponse('400')

#/Job/view
def jobView(request):
    if request.method == 'GET':
        return HttpResponse('200')
    elif request.method == 'POST':
        return HttpResponse('400')

#/Job/bid
def jobBid(request):
    if request.method == 'GET':
        return HttpResponse('200')
    elif request.method == 'POST':
        return HttpResponse('400')

#### /Chat Responses ###
#/Chat/getall
def chatGetall(request):
    if request.method == 'GET':
        return HttpResponse('200')
    elif request.method == 'POST':
        return HttpResponse('400')

#/Chat/conversation
def chatConversation(request):
    if request.method == 'GET':
        return HttpResponse('200')
    elif request.method == 'POST':
        return HttpResponse('400')

#/Chat/sendmessage
def chatSendmessage(request):
    if request.method == 'GET':
        return HttpResponse('200')
    elif request.method == 'POST':
        return HttpResponse('400')

##example json dump
        # response_data=[]
        # for field in conversationData.objects.all():
        #     response_data.append(field.business_id+" "+field.business_name+" "+field.business_picture+" "+field.job_link+" "+field.user_name)
        # return HttpResponse(json.dumps(response_data), content_type="application/json")