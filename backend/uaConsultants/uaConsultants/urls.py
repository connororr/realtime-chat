from django.contrib import admin
from django.urls import path , include
from uaConsultants import views

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', views.home),
    path('user/',include('user.urls')),
    path('job/',include('job.urls')),
    path('chat/',include('chat.urls')),
    
    # path('noti/',include('noti.urls')),

    
    
]
