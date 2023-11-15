from rest_framework.serializers import ModelSerializer, DateTimeField, ListField, \
    PrimaryKeyRelatedField, HyperlinkedRelatedField
from .models import Account

class SeekerSerializer(ModelSerializer):
    class Meta:
        model = Account
        exclude = ["mission_statement", "seeker_or_shelter"]

class ShelterSerializer(ModelSerializer):
    class Meta:
        model = Account
        exclude = ["preferences", "seeker_or_shelter"]