
from django.shortcuts import get_object_or_404
from rest_framework.generics import ListCreateAPIView, RetrieveUpdateDestroyAPIView, CreateAPIView
from rest_framework.permissions import IsAdminUser, AllowAny
from .models import Account
from django.contrib.auth.models import User
from .serializers import SeekerSerializer, ShelterSerializer, SeekerUpdateSerializer, ShelterUpdateSerializer, ShelterViewSerializer
from django.http import HttpResponse, HttpResponseBadRequest
from django.core.exceptions import PermissionDenied
from django.contrib.auth.hashers import make_password
from django.contrib.auth import update_session_auth_hash
from listings.models import PetListing

class SeekerCreate(CreateAPIView):
    serializer_class = SeekerSerializer
    permission_classes = [AllowAny]
    def perform_create(self, serializer):
        password = serializer.validated_data.pop('password')     
        serializer.save(seeker_or_shelter=True, password = make_password(password), is_active=True)


class ShelterListCreate(ListCreateAPIView):
    serializer_class = ShelterSerializer
    permission_classes = [AllowAny]
    def get_queryset(self):
        if self.request.user.is_authenticated:
            return Account.objects.filter(seeker_or_shelter=False)
        else:
            raise PermissionDenied()
    
    def perform_create(self, serializer):
        password = serializer.validated_data.pop('password')     
        serializer.save(seeker_or_shelter=False, password = make_password(password), is_active=True)

class ShelterRetrieveUpdateDestroy(RetrieveUpdateDestroyAPIView):
    def get_serializer_class(self):
        if self.request.method == "PUT" or self.request.method == "PATCH":
            return ShelterUpdateSerializer
        else:
            return ShelterViewSerializer
    def get_object(self):
        shelter =  get_object_or_404(Account, id=self.kwargs['pk'])
        user = get_object_or_404(Account, username=self.request.user)
        if self.request.method == "GET":
            return shelter
        if not shelter.seeker_or_shelter and user.username == shelter.username:
            return shelter
        raise PermissionDenied()
    def perform_update(self, serializer):
        if serializer.validated_data.get('password', None) is not None:
            password = serializer.validated_data.pop('password')  
            serializer.save(password = make_password(password), is_active=True)
            update_session_auth_hash(self.request, self.request.user)
        else:
            serializer.save(is_active=True)

class SeekerRetrieveUpdateDestroy(RetrieveUpdateDestroyAPIView):
    def get_serializer_class(self):
        if self.request.method == "PUT" or self.request.method == "PATCH":
            return SeekerUpdateSerializer
        else:
            return SeekerSerializer
    def get_object(self): 
        seeker =  get_object_or_404(Account, id=self.kwargs['pk'])
        user = get_object_or_404(Account, username=self.request.user)
        if self.request.method == "GET" and not user.seeker_or_shelter:
            listings = user.listings.all()
            for lis in listings:
                applications = PetListing.objects.get(id=lis.id).applications.all()
                for app in applications:
                    if app.owner.username == seeker.username:
                        return seeker
        elif seeker.seeker_or_shelter and user.username == seeker.username:
            return seeker
        
        raise PermissionDenied()
    def perform_update(self, serializer):
        if serializer.validated_data.get('password', None) is not None:
            password = serializer.validated_data.pop('password')  
            serializer.save(password = make_password(password), is_active=True)
            update_session_auth_hash(self.request, self.request.user)
        else:
            serializer.save(is_active=True)