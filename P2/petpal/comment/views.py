from django.shortcuts import get_object_or_404
from rest_framework.generics import ListCreateAPIView, RetrieveUpdateDestroyAPIView, CreateAPIView
from rest_framework.permissions import IsAdminUser, AllowAny
from account.models import Account
from .models import Comment
from applications.models import Application
from listings.models import PetListing
from django.contrib.auth.models import User
from .serializers import CommentSerializer
from django.http import HttpResponse, HttpResponseBadRequest

class CommentListCreateApplication(ListCreateAPIView):
    serializer_class = CommentSerializer
    def get_queryset(self):
        user = get_object_or_404(Account, username=self.request.user)
        app_id=self.kwargs['pk']
        application = get_object_or_404(Application, id=self.kwargs['pk'])
        application.save()
        query_set = application.comments_set.all()
        query_set = query_set.order_by("-create_time")
        if application.owner.username == user.username:
            return query_set
        elif application.petlisting.shelter.username == user.username:
            return query_set 
        return HttpResponseBadRequest("Unauthorized")

    def perform_create(self, serializer):
        application = get_object_or_404(Application, id=self.kwargs['pk'])
        shelter = application.petlisting.shelter
        user = get_object_or_404(Account, username=self.request.user)
        if application.owner.username == user.username:
            serializer.save(user=user, application=application)
        elif application.petlisting.shelter.username == user.username:
            serializer.save(user=user,  application=application)
        return HttpResponseBadRequest("Unauthorized")

class ReplyCreate(CreateAPIView):
    serializer_class = CommentSerializer
    def perform_create(self, serializer):
        comment = get_object_or_404(Comment, id=self.kwargs['pk'])
        user = get_object_or_404(Account, username=self.request.user)
        if comment.application is None:
            shelter = comment.shelter
            serializer.save(user=user, shelter=shelter, reply=comment)
        else:
            application = comment.application
            if application.owner.username == user.username:
                serializer.save(user=user, application=application, reply=comment)
            elif application.petlisting.shelter.username == user.username:
                serializer.save(user=user,  application=application, reply=comment)
            return HttpResponseBadRequest("Unauthorized")


class CommentListCreateReview(ListCreateAPIView):
    serializer_class = CommentSerializer
    def get_queryset(self):
        user = get_object_or_404(Account, username=self.request.user)
        shelter_id=self.kwargs['pk']
        shelter = get_object_or_404(Account, id=self.kwargs['pk'])
        query_set = shelter.shelter.all()
        query_set = query_set.order_by("-create_time")
        return query_set

    def perform_create(self, serializer):
        shelter = get_object_or_404(Account, id=self.kwargs['pk'])
        user = get_object_or_404(Account, username=self.request.user)
        serializer.save(user=user, shelter=shelter)

        
