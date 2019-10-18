from django.shortcuts import render
from django.http import HttpResponse 
from django.http import JsonResponse
import json
from .models import *
from .serializers import ConversationSerialize
from . import models
from . import serializers
from django.core.exceptions import ObjectDoesNotExist
from django.views.decorators.csrf import csrf_exempt
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

        req_dict = json.loads(request.body)
        conversation_id = req_dict['conversation_id']
        response_object = {}

        try:
            serialized_qs = serializers.ConversationSerialize(models.Conversation.objects.get(id=conversation_id))

            # check if user is the sender or receiver, and return the corresponding object
            if request.user.business_name == serialized_qs.data['sender_business_name']:
                response_object = {
                    "conversation": {
                        "user_name": serialized_qs.data['receiver_user_name'],
                        "business_name": serialized_qs.data['receiver_business_name'],
                        "profile_picture": serialized_qs.data['receiver_profile_picture'],
                        "job_link": serialized_qs.data['job_link'],
                        "conversation_id": serialized_qs.data['id'],
                        "last_message": serialized_qs.data['messages'][-1] if len(serialized_qs.data['messages']) > 0 else {}
                    },
                    "messages": serialized_qs.data['messages']
                }

            else: # user is receiver
                response_object = {
                    "conversation": {
                        "user_name": serialized_qs.data['sender_user_name'],
                        "business_name": serialized_qs.data['sender_business_name'],
                        "profile_picture": serialized_qs.data['sender_profile_picture'],
                        "job_link": serialized_qs.data['job_link'],
                        "conversation_id": serialized_qs.data['id'],
                        "last_message": serialized_qs.data['messages'][-1] if len(serialized_qs.data['messages']) > 0 else {}
                    },
                    "messages": serialized_qs.data['messages']
                }
        except:
            return JsonResponse({'error':'lookup failed','status':'failure'}, status=400)
        return JsonResponse(response_object, status=200)
        

#/Chat/sendmessage
def chatSendmessage(request):
    if request.method == 'POST':

        req_dict = json.loads(request.body)
        conversation_id = req_dict['conversation_id']

        try:
        
            conversation = models.Conversation.objects.get(id=conversation_id)
            new_message = models.Message.objects.create(conversation=conversation, user_id=request.user, message=req_dict['message'])
            
            return JsonResponse({'status': 'success'}, status=200)
        except:
            return JsonResponse({'error':'failed posting message','status':'failure'}, status=400)


