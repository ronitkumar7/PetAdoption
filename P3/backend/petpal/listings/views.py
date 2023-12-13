from django.shortcuts import render
from django.shortcuts import get_object_or_404
from rest_framework.generics import ListCreateAPIView, RetrieveUpdateDestroyAPIView, ListAPIView
from .models import PetListing
from .serializers import BasePetListingSerializer, UserPetListingSSerializer, PetListingApplicationsSerializer
from django.http import HttpResponse, HttpResponseBadRequest, HttpResponseNotAllowed
from rest_framework.exceptions import PermissionDenied

# Create your views here.
class AllPetListingsList(ListAPIView):
    queryset = PetListing.objects.all()
    serializer_class = BasePetListingSerializer

# Create your views here.
class AllPetListingApplications(ListAPIView):
    serializer_class = PetListingApplicationsSerializer

    def get_queryset(self):
        listing = get_object_or_404(PetListing, id=self.kwargs['pk'])
        return listing.applications.all()

class UserPetListingsListCreate(ListCreateAPIView):
    #queryset = PetListing.objects.all()
    serializer_class = UserPetListingSSerializer

    def get_queryset(self):
        if self.request.user.seeker_or_shelter == True: raise PermissionDenied("You are not authorized to access this resource")
        return PetListing.objects.filter(shelter=self.request.user)

    def perform_create(self, serializer):
        if self.request.user.seeker_or_shelter == True: raise PermissionDenied("You are not authorized to access this resource")
        store = PetListing.objects.create(**serializer.validated_data, shelter=self.request.user)

class UserPetListingsUpdateDestroy(RetrieveUpdateDestroyAPIView):
    serializer_class = UserPetListingSSerializer
    def get_object(self):
        if self.request.user.seeker_or_shelter == True: raise PermissionDenied("You are not authorized to access this resource")
        listing = get_object_or_404(PetListing, id=self.kwargs['pk'])
        if listing.shelter == self.request.user: return listing
        else: raise PermissionDenied("This Listing Does Not Belong To You")
    
class PetListingsSearch(ListAPIView):
    serializer_class = UserPetListingSSerializer

    def get_queryset(self):
        queryset = PetListing.objects.all()
        keyword = self.kwargs.get('keyword')
        filter1 = self.request.GET.get('filter1', '')
        fKeyword1 = self.request.GET.get('fKeyword1', '')
        filter2 = self.request.GET.get('filter2', '')
        fKeyword2 = self.request.GET.get('fKeyword2', '')
        filter3 = self.request.GET.get('filter3', '')
        fKeyword3 = self.request.GET.get('fKeyword3', '')
        filter4 = self.request.GET.get('filter4', '')
        fKeyword4 = self.request.GET.get('fKeyword4', '')
        statusNotFiltered = True
        for pair in [(filter1, fKeyword1), (filter2, fKeyword2), (filter3, fKeyword3), (filter4, fKeyword4)]:
            filter = pair[0]
            keyword = pair[1]
            if filter:
                if filter.lower() in ["shelter", "status", "breed", "gender",]:
                    if filter.lower() == "shelter": queryset = queryset.filter(shelter__username__icontains=keyword)
                    elif filter.lower() == "status": 
                        queryset = queryset.filter(status=keyword)
                        statusNotFiltered = False
                    elif filter.lower() == "breed": queryset = queryset.filter(breed__icontains=keyword)
                    elif filter.lower() == "color": queryset = queryset.filter(gender=keyword)
                else:
                    raise PermissionDenied(f"Invalid Filter, must be one of: shelter, status, breed, gender")
        if statusNotFiltered: queryset = queryset.filter(status="AVAILABLE")
        sort1 = self.request.GET.get('sort1', '') 
        sort2 = self.request.GET.get('sort2', '') 
        for sort in [sort1, sort2]:
            if sort:
                if sort.lower() in ["age", "name"]:
                    if sort.lower() == "age": queryset = queryset.order_by('age')
                    elif sort.lower() == "name": queryset = queryset.order_by('name')
                else:
                    raise PermissionDenied(f"Invalid Sort, must be one of: age, name")
        return queryset