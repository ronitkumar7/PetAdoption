from rest_framework.serializers import ModelSerializer, DateTimeField, ListField, \
    PrimaryKeyRelatedField, HyperlinkedRelatedField
from .models import Account
from rest_framework import serializers

class SeekerSerializer(ModelSerializer):
    password = serializers.CharField(write_only=True, required=True)
    class Meta:
        model = Account
        exclude = ["mission_statement", "seeker_or_shelter", "shelter_name"]

class SeekerUpdateSerializer(ModelSerializer):
    password = serializers.CharField(write_only=True, required=False)
    username = serializers.CharField(read_only=True)

    class Meta:
        model = Account
        exclude = ["mission_statement", "seeker_or_shelter", "shelter_name"]

class ShelterSerializer(ModelSerializer):
    password = serializers.CharField(write_only=True, required=True)
    class Meta:
        model = Account
        exclude = ["preferences", "seeker_or_shelter"]

class ShelterUpdateSerializer(ModelSerializer):
    password = serializers.CharField(write_only=True, required=False)
    username = serializers.CharField(read_only=True)
    class Meta:
        model = Account
        exclude = ["preferences", "seeker_or_shelter"]

class ShelterViewSerializer(ModelSerializer):
    password = serializers.CharField(write_only=True, required=False)
    username = serializers.CharField(read_only=True)
    class Meta:
        model = Account
        exclude = ["preferences"]