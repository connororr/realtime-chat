from django.urls import path
from . import views
from rest_framework_jwt.views import obtain_jwt_token

urlpatterns = [
    
    path('register/', views.userRegister),
    path('login/', obtain_jwt_token),
    path('block/', views.userBlock),
    path('profile/', views.userProfile),
    # path('logout/',views.userLogout),
    
] 