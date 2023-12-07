from django.urls import path
from . import views

app_name="blogs"
urlpatterns = [ 
    path('all/', views.AllBlogsList.as_view()),
    path('<int:pk>/', views.BlogsRetrieve.as_view(), name='blog'),
    path('<int:pk>/personal/', views.BlogsRetrieveUpdateDestroy.as_view(), name='blogPersonal'),
    path('', views.UserBlogsListCreate.as_view(), name='blogs'),
    path('<int:pk>/likes/', views.UserLikesListCreate.as_view(), name='likes'),
    path('likes/<int:pk>/', views.LikesRetrieveUpdateDestroy.as_view(), name='like'),
]
