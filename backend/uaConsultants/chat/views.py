from django.shortcuts import render
from django.http import HttpResponse 
from django.http import JsonResponse
import json
from .models import *
# Create your views here.


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

