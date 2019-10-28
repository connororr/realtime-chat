from django.urls import path
from . import views


urlpatterns = [
    
    path('getall', views.chatGetall),
    path('conversation', views.chatConversation),
    path('sendmessage', views.chatSendMessage),
] 
