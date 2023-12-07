from django.shortcuts import render
from django.urls import reverse
from django.shortcuts import get_object_or_404
from rest_framework.generics import RetrieveUpdateDestroyAPIView, ListCreateAPIView, ListAPIView, RetrieveAPIView
from .models import Blog, Like
from .serializers import UserBlogSerializer, UserLikeSerializer

# Create your views here.
class AllBlogsList(ListAPIView):
    queryset = Blog.objects.all()
    serializer_class = UserBlogSerializer

class BlogsRetrieve(RetrieveAPIView):
    serializer_class = UserBlogSerializer

    def get_object(self):
        return get_object_or_404(Blog, id=self.kwargs['pk'])

class BlogsRetrieveUpdateDestroy(RetrieveUpdateDestroyAPIView):
    serializer_class = UserBlogSerializer
        
    def get_object(self):
        return get_object_or_404(Blog, id=self.kwargs['pk'], owner=self.request.user)

class UserBlogsListCreate(ListCreateAPIView):
    serializer_class = UserBlogSerializer

    def get_queryset(self):
        sort_by = self.request.GET.get('sort', '')

        set = Blog.objects.filter(owner=self.request.user)
        
        if sort_by.lower() == 'creation_time':
            set = set.order_by('creation_time')

        return set

    def perform_create(self, serializer):
        blog = Blog.objects.create(**serializer.validated_data, owner=self.request.user)

class LikesRetrieveUpdateDestroy(RetrieveUpdateDestroyAPIView):
    serializer_class = UserLikeSerializer
        
    def get_object(self):
        return get_object_or_404(Like, id=self.kwargs['pk'])

class UserLikesListCreate(ListCreateAPIView):
    serializer_class = UserLikeSerializer

    def get_queryset(self):
        return Like.objects.filter(owner=self.request.user, blog=self.kwargs['pk'])

    def perform_create(self, serializer):
        blog = get_object_or_404(Blog, id=self.kwargs['pk'])
        if Like.objects.filter(blog=blog, owner=self.request.user):
            raise PermissionDenied()
        like = Like.objects.create(**serializer.validated_data, owner=self.request.user, blog=blog)
