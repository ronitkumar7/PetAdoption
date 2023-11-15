from rest_framework.serializers import ModelSerializer, DateTimeField, ListField, PrimaryKeyRelatedField, Choicefield
from rest_framework import serializers
from .models import PetListing

class BasePetListingSerializer(ModelSerializer):
    created_date = DateTimeField(read_only=True)
    status = Choicefield(['PENDING', 'ACCEPTED', 'DENIED', 'WITHDRAWN'])
   
    class Meta:
        model = PetListing
        #exclude = ['shelter']
        fields = '__all__'

class UserPetListingSSerializer(BasePetListingSerializer):
    shelter = PrimaryKeyRelatedField(read_only=True)

