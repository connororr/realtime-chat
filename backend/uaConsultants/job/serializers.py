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
        fields = ('id','project_name','date_created', 'date_start', 'date_end',
        'description','category','jobType','premium','business_id','business_name',
        'location','current_bid', 'bidder', 'project_photos')

class resultSerializer(serializers.Serializer):
    amount = serializers.IntegerField()
    total = serializers.IntegerField()
    results = jobSerialize(many=True, read_only=True)


