from django.shortcuts import render
from django.shortcuts import get_object_or_404
from rest_framework.generics import RetrieveUpdateAPIView, ListCreateAPIView
from .models import Application
from account.models import Account
from .serializers import PendingShelterApplicationSerializer, PendingSeekerApplicationSerializer, UserApplicationSerializer, OtherApplicationSerializer
from django.core.exceptions import PermissionDenied

# Create your views here.
class ApplicationsRetrieveUpdate(RetrieveUpdateAPIView):
    def get_serializer_class(self):
        if self.request.user.seeker_or_shelter == True:
            application = get_object_or_404(Application, id=self.kwargs['pk'], owner=self.request.user)
        else:
            application = get_object_or_404(Application, id=self.kwargs['pk'], shelter=self.request.user)

        if application.status == 'PENDING':
            if self.request.user.seeker_or_shelter == True:
                return PendingSeekerApplicationSerializer
            return PendingShelterApplicationSerializer
        return OtherApplicationSerializer

    def get_object(self):
        if self.request.user.seeker_or_shelter == True:
            return get_object_or_404(Application, id=self.kwargs['pk'], owner=self.request.user)
        else:
            return get_object_or_404(Application, id=self.kwargs['pk'], shelter=self.request.user)

class UserApplicationsListCreate(ListCreateAPIView):
    serializer_class = UserApplicationSerializer
    
    def get_queryset(self):
        sort_by = self.request.GET.get('sort', '')
        filter_val = self.request.GET.get('filter', '')

        if self.request.user.seeker_or_shelter == True:
            set = Application.objects.filter(owner=self.request.user)
        else:
            set = self.request.user.shelter_applications.all()

        if filter_val.upper() == 'PENDING':
            set = set.filter(status='PENDING')
        elif filter_val.upper() == 'ACCEPTED':
            set = set.filter(status='ACCEPTED')
        elif filter_val.upper() == 'DENIED':
            set = set.filter(status='DENIED')
        elif filter_val.upper() == 'WITHDRAWN':
            set = set.filter(status='WITHDRAWN')
        
        if sort_by.lower() == 'creation_time':
            set = set.order_by('creation_time')
        elif sort_by.lower() == 'last_update_time':
            set = set.order_by('last_update_time')

        return set

    def perform_create(self, serializer):
        if self.request.user.seeker_or_shelter == False:
            raise PermissionDenied()
        elif serializer.validated_data['petlisting'].status != 'AVAILABLE':
            raise PermissionDenied()
        application = Application.objects.create(**serializer.validated_data, status='PENDING', shelter=serializer.validated_data['petlisting'].shelter, owner=self.request.user)