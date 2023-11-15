from django.urls import path
from . import views

app_name="applications"
urlpatterns = [ 
    path('<int:pk>/', views.ApplicationsRetrieveUpdate.as_view(), name='application'),
    path('', views.UserApplicationsListCreate.as_view(), name='applications'),
]
