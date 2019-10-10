from rest_framework import serializers
from . import models

class jobSerialize(serializers.ModelSerializer):
    class Meta:
        model = models.job
        fields = ('project_name','date_created', 'description','business_id', 'business_name','location','current_bid', 'bid_amount', 'project_photos')

