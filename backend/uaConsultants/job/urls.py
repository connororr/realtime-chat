from django.urls import path, include
from . import views

urlpatterns = [
    
    # path('search/', views.jobSearch),
    # path('photo/upload/', views.jobPhotoUpload),
    #path('register/', views.jobRegister),
     path('view/<pk>/', views.jobView.as_view()),
    # path('bid/', views.jobBid),
    
] 