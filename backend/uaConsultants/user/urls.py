from django.urls import path, include
from . import views
from rest_framework_jwt.views import obtain_jwt_token

urlpatterns = [
    
    # path('register/', views.userRegister),
    # path('login/', obtain_jwt_token),
    # path('block/', views.userBlock),
    # path('profile/', views.userProfile),
    # path('logout/',views.userLogout),
    path('profile/all/', views.allUserView.as_view()),
    path('', include('rest_auth.urls')),
    path('registration/', include('rest_auth.registration.urls')),
    path('profile/<int:pk>/',views.UserProfile.as_view()),
    # path('profile', views.sample_view),
    
] 