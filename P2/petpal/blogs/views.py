from django.shortcuts import render
from django.urls import reverse
from django.shortcuts import get_object_or_404
from rest_framework.generics import RetrieveUpdateDestroyAPIView, ListCreateAPIView, ListAPIView
from .models import Blog
from .serializers import UserBlogSerializer

# Create your views here.
class AllBlogsList(ListAPIView):
    queryset = Blog.objects.all()
    serializer_class = UserBlogSerializer

class BlogsRetrieveUpdateDestroy(RetrieveUpdateDestroyAPIView):
    serializer_class = UserBlogSerializer
        
    def get_object(self):
        return get_object_or_404(Blog, id=self.kwargs['pk'])

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
