from django.shortcuts import render
from django.shortcuts import get_object_or_404
from rest_framework.generics import ListCreateAPIView, RetrieveUpdateDestroyAPIView, ListAPIView
from .models import PetListing
from .serializers import BasePetListingSerializer, UserPetListingSSerializer
from django.http import HttpResponse, HttpResponseBadRequest

# Create your views here.
class AllPetListingsList(ListAPIView):
    queryset = PetListing.objects.all()
    serializer_class = BasePetListingSerializer

class UserPetListingsListCreate(ListCreateAPIView):
    #queryset = PetListing.objects.all()
    serializer_class = UserPetListingSSerializer

    def get_queryset(self):
        return PetListing.objects.filter(shelter=self.request.user)

    def perform_create(self, serializer):
        store = PetListing.objects.create(**serializer.validated_data, shelter=self.request.user)

class UserPetListingsUpdateDestroy(RetrieveUpdateDestroyAPIView):
    serializer_class = UserPetListingSSerializer
    def get_object(self):
        return get_object_or_404(PetListing, id=self.kwargs['pk'], shelter=self.request.user)
    
class PetListingsSearch(ListAPIView):
    serializer_class = BasePetListingSerializer

    def get_queryset(self):
        queryset = PetListing.objects.all()
        keyword = self.kwargs.get('keyword')
        filter1 = self.kwargs.get('filter1')
        filter2 = self.kwargs.get('filter2')
        filter3 = self.kwargs.get('filter3')
        filter4 = self.kwargs.get('filter4')
        for filter in [filter1, filter2, filter3, filter4]:
            if filter:
                if filter.lower() in ["shelter", "status", "breed", "gender",]:
                    if filter.lower() == "shelter": queryset = queryset.filter(shelter__icontains=keyword)
                    elif filter.lower() == "status": queryset = queryset.filter(status__icontains=keyword)
                    elif filter.lower() == "breed": queryset = queryset.filter(breed__icontains=keyword)
                    elif filter.lower() == "color": queryset = queryset.filter(gender=keyword)
                else:
                    return HttpResponseBadRequest(f"Invalid Filter, must be one of: shelter, status, breed, gender")
        sort1 = self.kwargs.get('sort1')
        sort2 = self.kwargs.get('sort2')    
        for sort in [sort1, sort2]:
            if sort:
                if sort.lower() in ["age", "name"]:
                    if sort.lower() == "age": queryset = queryset.order_by('age')
                    elif sort.lower() == "name": queryset = queryset.order_by('name')
                else:
                    return HttpResponseBadRequest(f"Invalid Sort, must be one of: age, name")
        return queryset