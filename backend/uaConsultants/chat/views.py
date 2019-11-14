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
from rest_framework.authtoken.models import Token
from rest_framework.decorators import api_view, permission_classes
# Create your views here.


#### /Chat Responses ###

##### GET: /chat/getall ###
@api_view(["POST"])
def chatGetall(request):
        
    return_data = []

    req_dict = request.data
    token = Token.objects.get(key=req_dict['session_token'])
    user = CustomUser.objects.get(id=token.user_id)
    
    

    '''
        sender: you initiated the conversation with someone
        receiver: someone initated the conversation with you
    '''
    # seperate try statements are used to catch the DoesNotExist exception
    # since a user might be only a sender or only a receiver
    try: # user as receiver

        conversations = models.Conversation.objects.filter(receiver_id=user.id)

        for conversation in conversations:
            serialized_convo = serializers.ConversationSerialize(conversation)

            # if user is receiver, and no message has been sent to them
            # do not return the conversation associated to them
            if len(serialized_convo.data['messages']) > 0:
                conversation_data = {
                    "user_name": serialized_convo.data['sender_user_name'],
                    "business_name": serialized_convo.data['sender_business_name'],
                    "profile_picture": serialized_convo.data['sender_profile_picture'],
                    "other_user_id": serialized_convo.data['sender_id'],
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

        conversations = models.Conversation.objects.filter(sender_id=user.id)

        for conversation in conversations:
            serialized_convo = serializers.ConversationSerialize(conversation)
            conversation_data = {
                "user_name": serialized_convo.data['receiver_user_name'],
                "business_name": serialized_convo.data['receiver_business_name'],
                "profile_picture": serialized_convo.data['receiver_profile_picture'],
                "other_user_id": serialized_convo.data['receiver_id'],
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
@api_view(["POST"])
def chatConversation(request):
    

    req_dict = request.data
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
                    "own_user_id": serialized_qs.data['sender_id'],
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
                    "own_user_id": serialized_qs.data['receiver_id'],
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
@api_view(["POST"])
def chatSendMessage(request):

    req_dict = request.data
    
    try:

        token = Token.objects.get(key=req_dict['session_token'])
        user = CustomUser.objects.get(id=token.user_id)
        receiving_user = CustomUser.objects.get(id=req_dict['other_user_id'])

        # if conversation does not exist, create it in the exception
        conversation = Conversation.objects.get(sender=user, receiver=receiving_user)
        new_message = Message.objects.create(conversation=conversation, user_id=user, message=req_dict['message'])
        return JsonResponse({'status': 'success'}, status=200)

    except ObjectDoesNotExist:

        conversation = Conversation.objects.create(sender=user, receiver=receiving_user, job_link=req_dict['job_link'])
        new_message = Message.objects.create(conversation=conversation, user_id=user, message=req_dict['message'])
        return JsonResponse({'status': 'success'}, status=200)
        
    except:
        return JsonResponse({'error':'failed posting message','status':'failure'}, status=400)



