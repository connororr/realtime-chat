from rest_framework import serializers
from . import models


class jobPhotoSerialize(serializers.ModelSerializer):
    class Meta:
        model = models.project_photos
        fields = ('image','title')

class jobSerialize(serializers.ModelSerializer):
    project_photos = jobPhotoSerialize(many=True, read_only=True)
    class Meta:
        model = models.job
        fields = ('project_name','date_created', 'description','business_id', 'business_name','location','current_bid', 'bid_amount', 'project_photos')

