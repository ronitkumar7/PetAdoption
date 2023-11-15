
from django.shortcuts import get_object_or_404
from rest_framework.generics import ListCreateAPIView, RetrieveUpdateDestroyAPIView, CreateAPIView
from rest_framework.permissions import IsAdminUser, AllowAny
from .models import Account
from django.contrib.auth.models import User
from .serializers import SeekerSerializer, ShelterSerializer
from django.http import HttpResponse, HttpResponseBadRequest

class SeekerCreate(CreateAPIView):
    serializer_class = SeekerSerializer
    permission_classes = [AllowAny]
    def perform_create(self, serializer):
        # user = User.objects.create_user(
        #     serializer
        # )        
        serializer.save(seeker_or_shelter=True)


class ShelterListCreate(ListCreateAPIView):
    serializer_class = ShelterSerializer
    def get_queryset(self):
        return Account.objects.filter(seeker_or_shelter=False)
    
    def perform_create(self, serializer):
        serializer.save(seeker_or_shelter=False)

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