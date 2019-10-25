from rest_framework import serializers
from . import models
# from user.serializers import CustomUserDetailsSerializer


class jobPhotoSerialize(serializers.ModelSerializer):
    class Meta:
        model = models.project_photos
        fields = ('image','title')


class jobSerialize(serializers.ModelSerializer):
    project_photos = jobPhotoSerialize(many=True, read_only=True)
    business_name = serializers.CharField(source='business.business_name', read_only=True)

    class Meta:
        model = models.job
        fields = ('project_name','date_created', 'description','category','jobType','business_id','business_name','location','current_bid', 'bid_amount', 'project_photos')

class resultSerializer(serializers.Serializer):
    amount = serializers.IntegerField()
    total = serializers.IntegerField()
    results = jobSerialize(many=True, read_only=True)


