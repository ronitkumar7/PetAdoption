from django.urls import path
from . import views

app_name="blogs"
urlpatterns = [ 
    path('all/', views.AllBlogsList.as_view()),
    path('<int:pk>/', views.BlogsRetrieveUpdateDestroy.as_view(), name='blog'),
    path('', views.UserBlogsListCreate.as_view(), name='blogs'),
]
