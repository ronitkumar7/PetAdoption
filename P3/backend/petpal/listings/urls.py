from django.urls import path
from . import views

urlpatterns = [ 
    path('all/', views.AllPetListingsList.as_view()),
    path('', views.UserPetListingsListCreate.as_view()),
    path('<int:pk>/', views.UserPetListingsUpdateDestroy.as_view()),
    path('<int:pk>/applications/', views.AllPetListingApplications.as_view()),

    path('filters/', views.PetListingsSearch.as_view()),
    path('filters/<str:filter1>/<str:keyword>', views.PetListingsSearch.as_view()),
    path('filters/<str:filter1>/<str:keyword>/results/<str:sort1>', views.PetListingsSearch.as_view()),
    path('filters/<str:filter1>/<str:keyword>/results/<str:sort1>/<str:sort2>', views.PetListingsSearch.as_view()),
    path('filters/<str:filter1>/<str:filter2>/<str:keyword>/results/<str:sort1>', views.PetListingsSearch.as_view()),
    path('filters/<str:filter1>/<str:filter2>/<str:keyword>/results/<str:sort1>/<str:sort2>', views.PetListingsSearch.as_view()),
    path('filters/<str:filter1>/<str:filter2>/<str:filter3>/<str:keyword>/results/<str:sort1>', views.PetListingsSearch.as_view()),
    path('filters/<str:filter1>/<str:filter2>/<str:filter3>/<str:keyword>/results/<str:sort1>/<str:sort2>', views.PetListingsSearch.as_view()),
    path('filters/<str:filter1>/<str:filter2>/<str:filter3>/<str:filter4>/<str:keyword>/results/<str:sort1>', views.PetListingsSearch.as_view()),
    path('filters/<str:filter1>/<str:filter2>/<str:filter3>/<str:filter4>/<str:keyword>/results/<str:sort1>/<str:sort2>', views.PetListingsSearch.as_view()),
    path('results/<str:sort1>', views.PetListingsSearch.as_view()),
    path('results/<str:sort1>/<str:sort2>', views.PetListingsSearch.as_view()),

    path('filters/<str:filter1>/<str:filter2>/<str:keyword>', views.PetListingsSearch.as_view()),
    path('filters/<str:filter1>/<str:filter2>/<str:filter3>/<str:keyword>', views.PetListingsSearch.as_view()),
    path('filters/<str:filter1>/<str:filter2>/<str:filter3>/<str:filter4>/<str:keyword>', views.PetListingsSearch.as_view()),

]

