from django.urls import path, include
from . import views
# from rest_framework_jwt.views import obtain_jwt_token

urlpatterns = [
    # path('profile/', views.userProfile),
    
    path('profile/all/', views.allUserView.as_view()),
    path('', include('rest_auth.urls')),
    path('registration/', include('rest_auth.registration.urls')),
    path('profile/<int:pk>/',views.UserProfile.as_view()),
    
    
] 