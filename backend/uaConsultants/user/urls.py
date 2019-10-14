from django.urls import path, include, re_path
from . import views
# from rest_framework_jwt.views import obtain_jwt_token
from allauth.account.views import confirm_email 
from django.conf.urls import url
import re 
from rest_auth.registration.views import VerifyEmailView, RegisterView

from rest_auth.views import (
    LoginView, LogoutView, PasswordChangeView,
    PasswordResetView, PasswordResetConfirmView
)

urlpatterns = [
    
    path('login', LoginView.as_view(), name="user-login"),
    path('logout', LogoutView.as_view(), name='user-logout'),
    path('password/change', PasswordChangeView.as_view(), name='rest_password_change'),
    path('password/reset', PasswordResetView.as_view(), name='rest_password_reset'),
    path('password/reset/confirm', PasswordResetConfirmView.as_view(), name='rest_password_reset_confirm'),
    path('profile',views.CustomUserDetailsView.as_view()),
    path('profile/all', views.allUserView.as_view()),
    path('register', include('rest_auth.registration.urls')),
]

