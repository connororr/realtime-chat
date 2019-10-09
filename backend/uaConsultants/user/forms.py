# from django import forms
# from django.contrib.auth.forms import UserCreationForm
# from django.contrib.auth.models import User

# class RegistrationForm(UserCreationForm):
#     business_name = business_name = models.CharField(max_length=30)

#     class Meta:
#         model = User
#         fields = ('username', 'password1', 'password2', )

from django import forms
from django.contrib.auth.forms import UserCreationForm, UserChangeForm
from .models import CustomUser

class CustomUserCreationForm(UserCreationForm):

    class Meta:
        model = CustomUser
        fields = ( 'email', )

class CustomUserChangeForm(UserChangeForm):

    class Meta:
        model = CustomUser
        # fields = ('username', 'email')
        fields = UserChangeForm.Meta.fields
