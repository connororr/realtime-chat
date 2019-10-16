from django.contrib import admin
from django.urls import path , include
from uaConsultants import views
from django.conf.urls.static import static
from django.conf import settings

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', views.home),
    path('user/',include('user.urls')),
    path('job/',include('job.urls')),
    path('chat/',include('chat.urls')), 
    # path('noti/',include('noti.urls')), 
]+ static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
