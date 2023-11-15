
from django.shortcuts import get_object_or_404
from rest_framework.generics import ListCreateAPIView, RetrieveUpdateDestroyAPIView, CreateAPIView
from rest_framework.permissions import IsAdminUser, AllowAny
from .models import Account
from django.contrib.auth.models import User
from .serializers import SeekerSerializer, ShelterSerializer
from django.http import HttpResponse, HttpResponseBadRequest
from django.contrib.auth.hashers import make_password

class SeekerCreate(CreateAPIView):
    serializer_class = SeekerSerializer
    permission_classes = [AllowAny]
    def perform_create(self, serializer):
        password = serializer.validated_data.pop('password')     
        serializer.save(seeker_or_shelter=True, password = make_password(password))


class ShelterListCreate(ListCreateAPIView):
    serializer_class = ShelterSerializer
    permission_classes = [AllowAny]
    def get_queryset(self):
        if self.request.user.is_authenticated:
            return Account.objects.filter(seeker_or_shelter=False)
        else:
            return HttpResponseBadRequest("Unauthorized")
    
    def perform_create(self, serializer):
        password = serializer.validated_data.pop('password')     
        serializer.save(seeker_or_shelter=False, password = make_password(password))

class ShelterRetrieveUpdateDestroy(RetrieveUpdateDestroyAPIView):
    serializer_class = ShelterSerializer
    def get_object(self):
        shelter =  get_object_or_404(Account, id=self.kwargs['pk'])
        user = get_object_or_404(Account, username=self.request.user)
        if self.request.method == "GET":
            return shelter
        if user.username == shelter.username:
            return shelter
        return HttpResponseBadRequest("Unauthorized")

class SeekerRetrieveUpdateDestroy(RetrieveUpdateDestroyAPIView):
    serializer_class = SeekerSerializer
    def get_object(self): 
        seeker =  get_object_or_404(Account, id=self.kwargs['pk'])
        user = get_object_or_404(Account, username=self.request.user)
        if self.request.method == "GET" and not user.seeker_or_shelter:
            listings = User.petlisting_set.all()
            for lis in listing:
                applications = PetListing.objects.get(id=lis.id).application_set.all()
                for app in application:
                    if app.owner.username == seeker.username:
                        return seeker
        elif user.username == seeker.username:
            return seeker
        
        return HttpResponseBadRequest("Unauthorized")