from django.urls import path
from . import views

app_name="notifications"
urlpatterns = [
    path('<int:pk>/', views.NotificationsRetrieveUpdateDestroy.as_view(), name='notification'),
    path('', views.UserNotificationsListCreate.as_view(), name='notifications'),
    ]
