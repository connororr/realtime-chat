from rest_framework import serializers
from . import models
from user.serializers import UserSerializer

class MessageSerialize(serializers.ModelSerializer):
    user_id = serializers.CharField(source='bussiness.id', read_only=True)

    class Meta:
        model = models.Message
        fields = ('user_id', 'message','time_sent')


class ConversationSerialize(serializers.ModelSerializer):
    messages = MessageSerialize(many=True, read_only=True)
    business_name = serializers.CharField(source='business.business_name', read_only=True)
    user_name = serializers.CharField(source='business.user_name', read_only=True)
    profile_picture = serializers.CharField(source='business.profile_picture', read_only=True)

    class Meta:
        model = models.Conversation
        fields = ('user_name','business_name', 'profile_picture','job_link','conversation_id','messages')