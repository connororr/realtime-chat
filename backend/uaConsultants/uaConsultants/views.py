from django.http import HttpResponse 
from django.http import JsonResponse
import json
from .models import conversationData

def home(request):
    if request.method == 'GET':
        return HttpResponse('200')
    elif request.method == 'POST':
        return HttpResponse('400')

def user(request):
    if request.method == 'GET':
        return HttpResponse('200')
    elif request.method == 'POST':
        return HttpResponse('400')

def job(request):
    if request.method == 'GET':
        return HttpResponse('200')
    elif request.method == 'POST':
        return HttpResponse('400')

def chat(request):
    if request.method == 'GET':
        response_data=[]
        for field in conversationData.objects.all():
            response_data.append(field.business_id+" "+field.business_name+" "+field.business_picture+" "+field.job_link+" "+field.user_name)
        return HttpResponse(json.dumps(response_data), content_type="application/json")
    elif request.method == 'POST':
        return HttpResponse('400')
