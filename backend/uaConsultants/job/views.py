from django.shortcuts import render
from django.http import HttpResponse 
from django.http import JsonResponse
from django.urls import reverse
from django.conf import settings
from django.db.models import Q
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
import operator
from django.contrib.auth import authenticate
from rest_framework.authtoken.models import Token
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from user.models import Rating
from user.serializers import RatingSerializer
from django.utils.dateparse import parse_date


#GET: /job/view
@api_view(["POST"])
@permission_classes([IsAuthenticated])
def jobView(request):

    req_dict =  request.data  
    total_rating = 0
    return_data = {}
    #try:
    token = Token.objects.get(key=req_dict['session_token'])
    job_id = req_dict['job_id'] 
    serialized_qs = serializers.jobSerialize(models.job.objects.get(id=job_id))
    
    
    # add rating to the return object
    ratings = Rating.objects.filter(being_rated=serialized_qs.data['business_id'])

    for rating in ratings:
        
        serialized_rating = RatingSerializer(rating)
        total_rating += int(serialized_rating.data['rating'])

    if total_rating > 0:
        total_rating = total_rating/len(ratings)

    return_data = {
        "id": serialized_qs.data['id'],
        "project_name": serialized_qs.data['project_name'],
        "date_created": serialized_qs.data['date_created'],
        "date_start": serialized_qs.data['date_start'],
        "date_end": serialized_qs.data['date_end'],        
        "description": serialized_qs.data['description'],
        "category": serialized_qs.data['category'],
        "jobType": serialized_qs.data['jobType'],
        "premium": serialized_qs.data['premium'],
        "business_id": serialized_qs.data['business_id'],
        "business_name": serialized_qs.data['business_name'],
        "location": serialized_qs.data['location'],
        "current_bid": serialized_qs.data['current_bid'],
        "bidder": serialized_qs.data['bidder'],
        "project_photos": serialized_qs.data['project_photos'],
        "rating": total_rating
    }
    
    return JsonResponse(return_data, safe=False, status=200)
    #except:
        #return JsonResponse({'error':'lookup failed','status':'failure'}, status=400)


#POST: /job/register 
@api_view(["POST"])
@permission_classes([IsAuthenticated])
def jobRegister(request):
    try:
        req_dict = request.data
        token = Token.objects.get(key=req_dict['session_token'])
        user = CustomUser.objects.get(id=token.user_id) 
        if(req_dict['project_title']!=""): 
            test = models.job.objects.create(project_name=req_dict['project_title'], 
            date_start=req_dict['date_start'],
            date_end=req_dict['date_end'], 
            description=req_dict['project_description'], 
            category=req_dict['project_category'], 
            jobType=req_dict['project_type'],
            premium=(True if req_dict['project_premium']=="T" else False),
            business=user,
            location=req_dict['project_location'],
            current_bid=0)
            for photo in req_dict['project_photos']:
                models.project_photos.objects.create(project=test,image=photo['image'],title=photo['title'])
            return JsonResponse({"status":"success"}, status=200)
    except:
        return JsonResponse({'error':'failed to register','status':'failure'}, status=400)    
    return JsonResponse({'error':'failed to register','status':'failure'}, status=400, safe=False)


#POST: /job/bid 
@api_view(["POST"])
@permission_classes([IsAuthenticated])
def jobBid(request):
    # try:
        req_dict = request.data
        token = Token.objects.get(key=req_dict['session_token'])
        user = CustomUser.objects.get(id=token.user_id)
        model = models.job.objects.get(id=req_dict['job_id'])
        #check bid amount is bigger than current top bid amount
        currBid = int(req_dict['current_bid'])
        if model.current_bid != '':
            if currBid < int(model.current_bid):
                return JsonResponse({'error': 'current bid is less than top bidder', 'status': 'failure'}, status=400)
            serialized_qs = serializers.jobSerialize(model, data={'bidder': user.id, 'current_bid': req_dict['current_bid']}, partial=True)
            if serialized_qs.is_valid():
                serialized_qs.save()
            return JsonResponse({"status": "success"}, status=200)
    # except:
    #     return JsonResponse({'error':'failed job bidding','status':'failure'}, status=400)


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


class resultPage(object):
    def __init__(self, amount, total, results):
        self.amount = amount
        self.total = total
        self.results = results

sorted_hash = []
#GET: /job/search
@api_view(["POST"])
def jobSearch(request):
    req_dict = request.data
    # try:
    terms = req_dict['search_terms'].split()
    category = req_dict['category_1']
    jobType = req_dict['category_2']
    status = req_dict['job_status']
    order = req_dict['order_by']
    searchLocal = req_dict['location']
    date_start = req_dict['date_start']
    date_start_p = parse_date(date_start)
    date_end = req_dict['date_end']
    date_end_p = parse_date(date_end)
    minPrice = int(req_dict['min_price'])
    maxPrice =int(req_dict['max_price'])
    pageAmount = int(req_dict['page_amount'])
    pageNumber =int(req_dict['page_number'])
    result_hash = {}
    job_list = models.job.objects.all()

    

    #search job, description and business for search terms, if none add all to results
    if(len(terms)>0):
        for term in terms:
            queryset = job_list.filter(
                Q(project_name__icontains=term) | 
                Q(description__icontains=term) | 
                Q(business__business_name__icontains=term))
            for q in queryset:
                currBid = int(q.current_bid)
                if(minPrice<=currBid and maxPrice>=currBid):
                        #order by relevance
                        if(order == "Relevance"):
                            if q in result_hash.keys():
                                result_hash[q] = result_hash[q]+1
                            else:
                                result_hash[q] = 1
                            #order by bid
                        if(order == "Lowest Bid" or order == "Highest Bid"):
                            if q not in result_hash.keys():
                                    result_hash[q] = currBid
                            #order by date
                        if(order == "Oldest" or order == "Newest"):
                            if q not in result_hash.keys():
                                    result_hash[q] = q.date_created
                        if(order == "Alphabetic"):
                            if q not in result_hash.keys():
                                    result_hash[q] = q.project_name[0]            
    else:
        for q in job_list:
                currBid = int(q.current_bid)
                if(minPrice<=currBid and maxPrice>=currBid):
                            #order by relevance
                        if(order == "Relevance"):
                            result_hash[q] = 1
                            #order by bid                            
                        if(order == "Lowest Bid" or order == "Highest Bid"):
                            if q not in result_hash.keys():
                                result_hash[q] = currBid
                            #order by date
                        if(order == "Oldest" or order == "Newest"):
                            if q not in result_hash.keys():
                                result_hash[q] = q.date_created
                        if(order == "Alphabetic"):
                            if q not in result_hash.keys():
                                result_hash[q] = q.project_name[0]

    #If location is set, filter out all jobs not in region
    if (searchLocal!=""):
        for q in list(result_hash.keys()):
            if q.location!=searchLocal:
                del result_hash[q]
    
    #If category is set, filter out all jobs not in region
    if (category!=""):
        for q in list(result_hash.keys()):
            if q.category!=category:
                del result_hash[q]
    
    #If type is set, filter out all jobs not in region
    if (jobType!=""):
        for q in list(result_hash.keys()):
            if q.jobType!=jobType:
                del result_hash[q]

    #If status is set, filter out all jobs not in region
    if (status!=""):
        for q in list(result_hash.keys()):
            if q.premium=="F" and status == "Premium":
                del result_hash[q]
            if q.premium=="T" and status == "Standard":
                del result_hash[q]                                

        #order dict depending on choice
    if(order=="Alphabetic"):
        sorted_hash=sorted(result_hash.items(), key=operator.itemgetter(1))
    elif(order == "Relevance" or order == "Highest Bid" or order == "Newest"):
        sorted_hash = sorted(result_hash.items(), key=operator.itemgetter(1), reverse=True)
    else:
        sorted_hash = sorted(result_hash.items(), key=operator.itemgetter(1))

        
        # #Display Results according to page parameters
    temp_list = []
    if(len(sorted_hash)<=pageAmount):
        if(pageNumber==0):
            for i in sorted_hash:
                temp_list.append(i[0])
        else:
            return HttpResponse("")
    else:
        temp_list = []
        for i in range(pageAmount*pageNumber, (pageAmount*pageNumber)+pageAmount):
            temp_list.append(sorted_hash[i][0])
    pageResponse = resultPage(len(temp_list),len(sorted_hash),temp_list)
    serialized_qs = serializers.resultSerializer(pageResponse)
    return HttpResponse(JSONRenderer().render(serialized_qs.data), content_type='application/json')

    # except:
    #     return JsonResponse({'error':'search failed','status':'failure'}, status=400)


