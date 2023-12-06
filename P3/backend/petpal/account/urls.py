from django.urls import path

from .views import SeekerCreate, ShelterListCreate, ShelterRetrieveUpdateDestroy, SeekerRetrieveUpdateDestroy

app_name="accounts"
urlpatterns = [
    path('users/', SeekerCreate.as_view() , name='users'),
    path('shelters/', ShelterListCreate.as_view() , name='shelters'),
    path('user/<int:pk>/',SeekerRetrieveUpdateDestroy.as_view() , name='user_id'),
    path('shelter/<int:pk>/',ShelterRetrieveUpdateDestroy.as_view() , name='shelter_id'),


]