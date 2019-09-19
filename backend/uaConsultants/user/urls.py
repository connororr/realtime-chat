from django.urls import path
from . import views

urlpatterns = [
    
    path('register/', views.userRegister),
    path('login/', views.userLogin),
    path('block/', views.userBlock),
    path('profile/', views.userProfile),
    
] 