# from django.shortcuts import render
from django.contrib.auth.models import User
from django.contrib import auth
from django.http import HttpResponse
from django.http import JsonResponse
import json
from rest_framework import status
from .models import *
from rest_framework import permissions
from rest_framework.permissions import IsAuthenticatedOrReadOnly
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
from rest_framework.authentication import TokenAuthentication
from django.contrib.sessions.models import Session

class allUserView(generics.ListAPIView):
    # permission_classes = [permissions.IsOwnerOrReadOnly]
    queryset = models.CustomUser.objects.all()
    serializer_class = serializers.allUserSerializer
from rest_framework.renderers import StaticHTMLRenderer

@api_view(['GET', 'POST'])
def user_page_view(request):
    """
    View or Update user details.
    """
    
    try:
        # user_profile_data = CustomUser.objects.get(id=request.user.id)
        session_key = request.session.session_key
        # print(session_key)
        session = Session.objects.get(session_key=session_key)
        session_data = session.get_decoded()
        # print (session_data)
        uid = session_data.get('_auth_user_id')
        user_profile_data = CustomUser.objects.get(id=uid)
        
    except:
        raise APIException('No profile linked with this user')

    if request.method == 'GET':
        
        serializer = serializers.CustomUserDetailsSerializer(user_profile_data)
        return Response(serializer.data)

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

from rest_auth.registration.views import VerifyEmailView, RegisterView

class RegisterViewCustom(RegisterView):
    authentication_classes = (TokenAuthentication,)

class VerifyEmailViewCustom(VerifyEmailView):
    authentication_classes = (TokenAuthentication,)
