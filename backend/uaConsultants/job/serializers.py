from rest_framework import serializers
from . import models

class jobSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.job
        fields = (  'project_name', 'description','business_name', 'business_id', 'location','current_bid', 'bid_amount', 'project_photo')

