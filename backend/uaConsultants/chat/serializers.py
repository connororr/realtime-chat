from rest_framework import serializers
from . import models
from user.serializers import UserSerializer



class MessageSerialize(serializers.ModelSerializer):
    user_id = serializers.CharField(source='user_id.id', read_only=True)

    class Meta:
        model = models.Message
        fields = ('user_id', 'message','time_sent')


class ConversationSerialize(serializers.ModelSerializer):
    messages = MessageSerialize(many=True, read_only=True)
    sender_business_name = serializers.CharField(source='sender.business_name', read_only=True)
    sender_user_name = serializers.CharField(source='sender.name', read_only=True)
    sender_profile_picture = serializers.CharField(source='sender.profile_picture', read_only=True)
    receiver_business_name = serializers.CharField(source='receiver.business_name', read_only=True)
    receiver_user_name = serializers.CharField(source='receiver.name', read_only=True)
    receiver_profile_picture = serializers.CharField(source='receiver.profile_picture', read_only=True)

    class Meta:
        model = models.Conversation
        fields = ('sender_user_name','sender_business_name', 'sender_profile_picture','receiver_user_name','receiver_business_name', 'receiver_profile_picture','job_link','id','messages')