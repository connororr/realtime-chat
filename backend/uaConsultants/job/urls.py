from django.urls import path, include
from . import views

urlpatterns = [
    
    path('photo/upload', views.jobPhotoUpload),
    path('register', views.jobRegister),
    path('view', views.jobView),
    path('bid', views.jobBid),
    path('search',views.jobSearch),
    
] 