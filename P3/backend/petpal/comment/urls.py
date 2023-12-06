from django.urls import path

from .views import CommentListCreateApplication, ReplyCreate, CommentListCreateReview

app_name="comments"
urlpatterns = [
    path('app/<int:pk>/',CommentListCreateApplication.as_view() , name='app_comments'),
    path('<int:pk>/',ReplyCreate.as_view() , name='reply'),
    path('shelter/<int:pk>/reviews/',CommentListCreateReview.as_view() , name='shelter_comments'),


]