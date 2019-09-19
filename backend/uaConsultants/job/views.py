from django.shortcuts import render

from django.http import HttpResponse 
from django.http import JsonResponse
import json
from .models import *

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

