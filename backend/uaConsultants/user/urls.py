from django.urls import path, include, re_path
from . import views
# from rest_framework_jwt.views import obtain_jwt_token
from allauth.account.views import confirm_email 
from django.conf.urls import url
import re 
from rest_auth.registration.views import VerifyEmailView, RegisterView
from django.views.generic import TemplateView
from rest_auth.views import (
    LoginView, LogoutView, PasswordChangeView,
    PasswordResetView, PasswordResetConfirmView
)

urlpatterns = [
    
    path('login', views.LoginViewCustom.as_view(), name="user-login"),
    path('logout', views.LogoutViewCustom.as_view(), name='user-logout'),
    path('password/change', PasswordChangeView.as_view(), name='rest_password_change'),
    path('password/reset', PasswordResetView.as_view(), name='rest_password_reset'),
    path('password/reset/confirm', PasswordResetConfirmView.as_view(), name='rest_password_reset_confirm'),
    path('ownprofile', views.LoggedInUserGetProfile),
    path('othersprofile', views.OtherUsersGetProfile),
    path('register', views.RegisterViewCustom.as_view()),
    path('register/verify-email', views.VerifyEmailViewCustom.as_view()),
    # path('account-confirm-email/(?P<key>[-:\w]+)/$', TemplateView.as_view(), name='account_confirm_email')
    url(r'^account-confirm-email/(?P<key>[-:\w]+)/$', TemplateView.as_view(),
        name='account_confirm_email'),
    path('rate', views.userSendRating)

]

