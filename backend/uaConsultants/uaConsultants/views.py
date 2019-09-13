from django.http import HttpResponse 
from .models import conversation

def home(request):
    return HttpResponse('home')

def user(request):
    return HttpResponse('user')

def job(request):
    return HttpResponse('job')

def chat(request):
    chat_data = conversation.objects.all()
    for field in chat_data:
        print(field.conversations+' '+field.business_name+' '+field.business_picture+' '+field.job_link+' '+field.user_name)
    return HttpResponse('chat')