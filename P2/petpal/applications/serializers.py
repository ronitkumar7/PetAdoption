from rest_framework.serializers import ModelSerializer, PrimaryKeyRelatedField, ChoiceField
from .models import Application

class PendingShelterApplicationSerializer(ModelSerializer): 
    status = ChoiceField(['ACCEPTED', 'DENIED'])  
    class Meta:
        model = Application
        fields = '__all__'
        read_only_fields = ['owner', 'petlisting', 'shelter', 'applicant', 'email', 'phone1', 'phone2', 'description', 'creation_time', 'last_update_time']

class PendingAcceptedSeekerApplicationSerializer(ModelSerializer): 
    status = ChoiceField(['WITHDRAWN'])  
    class Meta:
        model = Application
        fields = '__all__'
        read_only_fields = ['owner', 'petlisting', 'shelter', 'applicant', 'email', 'phone1', 'phone2', 'description', 'creation_time', 'last_update_time']

class OtherApplicationSerializer(ModelSerializer): 
    class Meta:
        model = Application
        fields = '__all__'
        read_only_fields = ['owner', 'petlisting', 'shelter', 'applicant', 'email', 'phone1', 'phone2', 'description', 'status', 'creation_time', 'last_update_time']

class UserApplicationSerializer(ModelSerializer):
    owner = PrimaryKeyRelatedField(read_only=True)
    status = ChoiceField(['PENDING'], read_only=True)
    shelter = PrimaryKeyRelatedField(read_only=True)
    class Meta:
        model = Application
        fields = '__all__'
