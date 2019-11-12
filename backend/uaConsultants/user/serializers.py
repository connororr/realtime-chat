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
        fields = ('business_name', 'profile_picture', 'description', 'jobs')
        read_only_fields = ('email','username' )

class CustomUserDetailsSerializerAnon(serializers.ModelSerializer):
    """
    User details based on pk with minimal info
    """
    class Meta:
        model = models.CustomUser
    
        fields = ('email', 'name', 'business_name', 'profile_picture','description')
        read_only_fields = ('email','username' )


class allUserSerializer(serializers.ModelSerializer):
    jobs = jobSerialize(many=True, read_only=True)
    class Meta:
        model = models.CustomUser
        
        fields = '__all__'
        # fields = [ 'business_name','description', 'profile_picture','name','job']
        # exclude = ['']
        


class CustomRegisterSerializer(RegisterSerializer):
        
        email = serializers.EmailField(required=True)
        password1 = serializers.CharField(write_only=True)
        business_name = serializers.CharField(required=True,max_length=50)
        name = serializers.CharField(required=True,max_length=40)

        def get_cleaned_data(self):
            super(CustomRegisterSerializer, self).get_cleaned_data()

            return {
                'password1': self.validated_data.get('password1', ''),
                'email': self.validated_data.get('email', ''),
                'business_name': self.validated_data.get('business_name', ''),
                'name': self.validated_data.get('name', ''),
                
            }


class RatingSerializer(serializers.ModelSerializer):

    class Meta:
        model = models.Rating
        fields = ('rating', 'being_rated', 'rater')

