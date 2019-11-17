# from django.shortcuts import render
from django.contrib.auth.models import User
from django.contrib import auth
from django.http import HttpResponse
from django.http import JsonResponse
import json
from rest_framework import status
from .models import *
from rest_framework import permissions
from rest_framework.permissions import IsAuthenticatedOrReadOnly, IsAdminUser
# from rest_framework.decorators import list_route
from rest_framework import mixins
from rest_framework import generics
# from .serializers import UserSerializer
from . import models , permissions
from . import serializers
from job.models import job
from django.shortcuts import get_object_or_404
from rest_framework.exceptions import APIException
from rest_framework.views import APIView
from rest_framework.decorators import api_view, renderer_classes
from rest_framework.response import Response
from rest_framework.authentication import TokenAuthentication, SessionAuthentication
from django.contrib.sessions.models import Session
from rest_framework.authtoken.models import Token
from rest_framework.renderers import StaticHTMLRenderer
from rest_auth.registration.views import VerifyEmailView, RegisterView
from django.core.exceptions import ObjectDoesNotExist

@api_view(['POST'])
def LoggedInUserGetProfile(request):

    total_rating = 0

    try:
        req_dict = request.data
        token = Token.objects.get(key=req_dict['session_token'])
        
        # get user
        user_profile_data = CustomUser.objects.get(id=token.user_id)
        user_serializer = serializers.CustomUserDetailsSerializer(user_profile_data)
        
        # get rating
        ratings = Rating.objects.filter(being_rated=token.user_id)

        for rating in ratings:
            serialized_rating = serializers.RatingSerializer(rating)
            total_rating += int(serialized_rating.data['rating'])

        if total_rating > 0:
            total_rating = total_rating/len(ratings)
        
        # add all necessary fields to return object
        return_object = {
            "business_name": user_serializer.data['business_name'],
            "profile_picture": user_serializer.data['profile_picture'],
            "description": user_serializer.data['description'],
            "rating": total_rating,
            "user_projects": user_serializer.data['jobs'] if len(user_serializer.data['jobs']) > 0 else [],
            "open_bids": []
        }

        open_bids = job.objects.filter(current_bid=token.user_id)

        for open_bid in open_bids:
            serialized_bid = serializers.jobSerialize(open_bid)
            return_object['open_bids'].append(serialized_bid.data)

        return JsonResponse(return_object, safe=False, status=200)

    except:
        return JsonResponse({'error':'failed retrieving user info','status':'failure'}, status=400)


@api_view(['POST'])
def OtherUsersGetProfile(request):

    total_rating = 0
    try:
        req_dict = request.data
        token = Token.objects.get(key=req_dict['session_token'])

        # get user
        user_profile_data = CustomUser.objects.get(id=req_dict['user_id'])
        user_serializer = serializers.CustomUserDetailsSerializer(user_profile_data)

        # get rating
        ratings = Rating.objects.filter(being_rated=req_dict['user_id'])

        for rating in ratings:
            serialized_rating = serializers.RatingSerializer(rating)
            total_rating += int(serialized_rating.data['rating'])

        if total_rating > 0:
            total_rating = total_rating/len(ratings)

        # add all necessary fields to the return object
        return_object = {
            "business_name": user_serializer.data['business_name'],
            "profile_picture": user_serializer.data['profile_picture'],
            "description": user_serializer.data['description'],
            "rating": total_rating,
            "user_name": user_serializer.data['name'],
            "business_id": user_serializer.data['id'],
            "user_projects": user_serializer.data['jobs'] if len(user_serializer.data['jobs']) > 0 else []
        }

        return JsonResponse(return_object, safe=False, status=200)     
    except:
        return JsonResponse({'error':'failed retrieving user info','status':'failure'}, status=400)

from rest_auth.views import LoginView, LogoutView
class LogoutViewCustom(LogoutView):
    authentication_classes = (TokenAuthentication,)
    

class LoginViewCustom(LoginView):
    authentication_classes = (TokenAuthentication,)

class RegisterViewCustom(RegisterView):
    authentication_classes = (TokenAuthentication,)

class VerifyEmailViewCustom(VerifyEmailView):
    authentication_classes = (TokenAuthentication,)



##### POST: /user/rate ###
@api_view(["POST"])
def userSendRating(request):

    req_dict = json.loads(request.body)

    try:
        token = Token.objects.get(key=req_dict['session_token'])
        user = CustomUser.objects.get(id=token.user_id)
        being_rated = CustomUser.objects.get(id=req_dict['user_being_rated_id'])
        rating_val = req_dict['rating']

        if int(rating_val) < 0 or int(rating_val) > 5: # ensure rating is between 1 and 5 
            return JsonResponse({'error': 'please give a rating between 1 and 5', 'status': 'failure'}, status=400)

        # update existing rating object
        rating = Rating.objects.get(rater=user, being_rated=being_rated)
        
        serialized_qs = serializers.RatingSerializer(rating, data={'rating': req_dict['rating']}, partial=True)
        if serialized_qs.is_valid():
            serialized_qs.save()

        return JsonResponse({'status': 'success'}, status=200)
    except ObjectDoesNotExist: # if rating doesn't exist

        rating = Rating.objects.create(rating=req_dict['rating'], rater=user, being_rated=being_rated)
        return JsonResponse({'status': 'success'}, status=200)

    except:
        return JsonResponse({'error':'failed posting rating','status':'failure'}, status=400)