# from django.shortcuts import render

from django.http import HttpResponse 
from django.http import JsonResponse
import json
# from .models import *

# ###/'' Home page response ###
# #/
def home(request):
    if request.method == 'GET':
        return HttpResponse('200')
    elif request.method == 'POST':
        return HttpResponse('400')
