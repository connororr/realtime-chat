from django.shortcuts import render
from django.http import HttpResponse 
from django.http import JsonResponse
import json
from .models import *
from .serializers import ConversationSerialize
from . import models
from . import serializers
from django.core.exceptions import ObjectDoesNotExist
# Create your views here.


#### /Chat Responses ###

##### GET: /chat/getall ###
def chatGetall(request):

    if request.method == 'GET':
        
        return_data = []
        
        # seperate try statements are used to catch the DoesNotExist exception
        # since a user might be only a sender or only a receiver
        try: # user as receiver

            conversations = models.Conversation.objects.filter(receiver_id=request.user.id)

            for conversation in conversations:
                serialized_convo = serializers.ConversationSerialize(conversation)

                # if user is receiver, and no message has been sent to them
                # do not return the conversation associated to them
                if len(serialized_convo.data['messages']) > 0:
                    conversation_data = {
                        "user_name": serialized_convo.data['sender_user_name'],
                        "business_name": serialized_convo.data['sender_business_name'],
                        "profile_picture": serialized_convo.data['sender_profile_picture'],
                        "job_link": serialized_convo.data['job_link'],
                        "conversation_id": serialized_convo.data['id'],
                        "last_message": serialized_convo.data['messages'][-1]
                    }
                    return_data.append(conversation_data)
            
        except ObjectDoesNotExist:
            pass
        except:
            return JsonResponse({"error": "string", "status": "failure"}, status=400)
        
        try: # user as sender

            conversations = models.Conversation.objects.filter(sender_id=request.user.id)

            for conversation in conversations:
                serialized_convo = serializers.ConversationSerialize(conversation)
                conversation_data = {
                    "user_name": serialized_convo.data['receiver_user_name'],
                    "business_name": serialized_convo.data['receiver_business_name'],
                    "profile_picture": serialized_convo.data['receiver_profile_picture'],
                    "job_link": serialized_convo.data['job_link'],
                    "conversation_id": serialized_convo.data['id'],
                    "last_message": serialized_convo.data['messages'][-1] if len(serialized_convo.data['messages']) > 0 else {}
                }
                return_data.append(conversation_data)

        except ObjectDoesNotExist:
            pass
        except:
            return JsonResponse({"error": "string", "status": "failure"}, status=400)
        return JsonResponse(return_data, safe=False, status=200)
        

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

