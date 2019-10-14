from rest_framework import serializers
from . import models
import rest_auth.serializers

class CustomUserDetailsSerializer(serializers.ModelSerializer):
    """
    User model w/o password
    """
    class Meta:
        model = models.CustomUser
        fields = ('pk', 'username', 'email', 'name', 'business_name', 'profile_picture','description')
        read_only_fields = ('email','username' )


# class UserSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = models.CustomUser
        
#         # fields = '__all__'
#         fields = [ 'email','business_name', 'date_joined','description', 'profile_picture','name',]
#         # exclude = ['']

class allUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.CustomUser
        # fields = '__all__'
        fields = [ 'business_name','description', 'profile_picture','name',]
        # exclude = ['']
        

from rest_auth.registration.serializers import RegisterSerializer
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




