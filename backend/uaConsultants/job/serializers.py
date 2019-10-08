from rest_framework import serializers
from . import models

class jobSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.job
        fields = ('job_name', 'job_description','date_created','business_name', 'job_location','current_bid', 'bid_amount', 'project_photos')

