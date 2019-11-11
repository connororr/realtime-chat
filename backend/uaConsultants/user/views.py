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
from . import models,permissions
from . import serializers
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

class allUserView(generics.ListAPIView):
    permission_classes = [IsAdminUser]
    queryset = models.CustomUser.objects.all()
    serializer_class = serializers.allUserSerializer

@api_view(['GET'])
def LoggedInUserGetProfile(request):
    try:

        body_unicode = request.body.decode('utf-8')
        body_data = json.loads(body_unicode)
        session_key = request.session.session_key
        session = Session.objects.get(session_key=session_key)
        session_data = session.get_decoded()
        uid = session_data.get('_auth_user_id')
        
        user_profile_data = CustomUser.objects.get(id=uid)
        serializer = serializers.CustomUserDetailsSerializer(user_profile_data)
        return Response(serializer.data)

    except:
        return JsonResponse({'error':'failed retrieving user info','status':'failure'}, status=400)


@api_view(['GET'])
def OtherUsersGetProfile(request):

    try:
        body_unicode = request.body.decode('utf-8')
        body_data = json.loads(body_unicode)
        uid_req = body_data['user_id']
        
        # check for session key
        session_key = request.session.session_key
        session = Session.objects.get(session_key=session_key)
        session_data = session.get_decoded()

        user_profile_data = CustomUser.objects.get(id=uid_req)
        serializer = serializers.CustomUserDetailsSerializerAnon(user_profile_data)
        return Response(serializer.data)     
    except:
        return JsonResponse({'error':'failed retrieving user info','status':'failure'}, status=400)

@api_view(['GET', 'POST'])
def user_page_view(request):
    """
    View or Update user details.
    """
    # authentication_classes = (SessionAuthentication,)
    try:
        body_unicode = request.body.decode('utf-8')
        body_data = json.loads(body_unicode)
        uid_req = body_data['user_id']
        session_key = request.session.session_key
        session = Session.objects.get(session_key=session_key)
        session_data = session.get_decoded()
        uid = session_data.get('_auth_user_id')
        
        if uid == uid_req and request.method == 'GET':
            user_profile_data = CustomUser.objects.get(id=uid_req)
            serializer = serializers.CustomUserDetailsSerializer(user_profile_data)
            return Response(serializer.data)
        else:
            user_profile_data = CustomUser.objects.get(id=uid_req)
            serializer = serializers.CustomUserDetailsSerializerAnon(user_profile_data)
            return Response(serializer.data)     
    except:
        raise APIException('No profile linked with this user')

    # if request.method == 'GET':
        
    #     serializer = serializers.CustomUserDetailsSerializer(user_profile_data)
    #     return Response(serializer.data)

    # elif request.method == 'POST':
    #     serializer = serializers.UserSerializer_(user_profile_data, data=request.data)
    #     # data['name']=
    #     # print(request.data.)
    #     if serializer.is_valid():
            
    #         serializer.save()
    #         return Response(serializer.data)
        
    #     return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

from rest_framework.generics import GenericAPIView, RetrieveUpdateAPIView
class CustomUserDetailsView(RetrieveUpdateAPIView):
    # authentication_classes = (TokenAuthentication,)
    serializer_class = serializers.CustomUserDetailsSerializer
    permission_classes = (IsAuthenticatedOrReadOnly,)
    
    def get_object(self):
        return self.request.user

    def get_queryset(self):
        
        return get_user_model().objects.none()

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

@api_view(["GET"])
def userGetRating(request):

    req_dict = json.loads(request.body)
    total_rating = 0

    try:
        token = Token.objects.get(key=req_dict['session_token'])
        user = CustomUser.objects.get(id=token.user_id)
        ratings = Rating.objects.filter(being_rated=user)

        for rating in ratings:
            
            serialized_rating = serializers.RatingSerializer(rating)
            total_rating += int(serialized_rating.data['rating'])

        if total_rating > 0:
            total_rating = total_rating/len(ratings)

        return JsonResponse({'rating': total_rating, 'status': 'success'}, status=200)

    except:
       return JsonResponse({'error':'failed getting rating','status':'failure'}, status=400)