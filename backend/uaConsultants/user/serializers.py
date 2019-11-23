from rest_framework import serializers
from . import models
from job import models as job_mod
import rest_auth.serializers
from job.serializers import jobSerialize, jobPhotoSerialize 
from rest_auth.registration.serializers import RegisterSerializer


class CustomUserDetailsSerializer(serializers.ModelSerializer):
    """
    User details based on pk for authenticated user with project info
    """
    jobs = jobSerialize(many=True, read_only=True)
    
    class Meta:
        model = models.CustomUser
        # fields = '__all__'
        fields = ('id', 'name', 'business_name', 'profile_picture', 'description', 'jobs','location','phone')
        read_only_fields = ('email','username' )
        
class CustomRegisterSerializer(RegisterSerializer):
        
        email = serializers.EmailField(required=True)
        password1 = serializers.CharField(write_only=True)
        business_name = serializers.CharField(required=True,max_length=50)
        name = serializers.CharField(required=True,max_length=40)
        location = serializers.CharField(required=True, max_length=3)
        phone = serializers.IntegerField(required=True)

        def get_cleaned_data(self):
            super(CustomRegisterSerializer, self).get_cleaned_data()

            return {
                'password1': self.validated_data.get('password1', ''),
                'email': self.validated_data.get('email', ''),
                'business_name': self.validated_data.get('business_name', ''),
                'name': self.validated_data.get('name', ''),
                'location' : self.validated_data.get('location', ''),
                'phone' : self.validated_data.get('phone', ''),
                
            }

class RatingSerializer(serializers.ModelSerializer):

    class Meta:
        model = models.Rating
        fields = ('rating', 'being_rated', 'rater')

class resultSerializer(serializers.Serializer):
    amount = serializers.IntegerField()
    total = serializers.IntegerField()
    results = CustomUserDetailsSerializer(many=True, read_only=True)