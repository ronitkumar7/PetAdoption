from django.shortcuts import get_object_or_404
from rest_framework.generics import ListCreateAPIView, RetrieveUpdateDestroyAPIView, CreateAPIView
from rest_framework.permissions import IsAdminUser, AllowAny
from account.models import Account
from .models import Comment
from applications.models import Application
from listings.models import PetListing
from django.contrib.auth.models import User
from .serializers import CommentSerializer
from django.core.exceptions import PermissionDenied
from django.http import HttpResponse, HttpResponseBadRequest

class CommentListCreateApplication(ListCreateAPIView):
    serializer_class = CommentSerializer
    def get_queryset(self):
        user = get_object_or_404(Account, username=self.request.user)
        app_id=self.kwargs['pk']
        application = get_object_or_404(Application, id=self.kwargs['pk'])

        
        if application.owner.username == user.username or application.shelter.username == user.username:
            query_set = application.comment_set.all()
            query_set = query_set.order_by("-create_time")
            return query_set

        raise PermissionDenied()

    def perform_create(self, serializer):
        application = get_object_or_404(Application, id=self.kwargs['pk'])
        shelter = application.petlisting.shelter
        user = get_object_or_404(Account, username=self.request.user)
        if application.owner.username == user.username:
            application.save()
            serializer.save(user=user, application=application)
        elif application.petlisting.shelter.username == user.username:
            application.save()
            serializer.save(user=user,  application=application)
        else:
            raise PermissionDenied()

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
            else:
                raise PermissionDenied()


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

        
