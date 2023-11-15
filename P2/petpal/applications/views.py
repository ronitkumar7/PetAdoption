from django.shortcuts import render
from django.shortcuts import get_object_or_404
from rest_framework.generics import RetrieveUpdateAPIView, ListCreateAPIView
from .models import Application
from .serializers import PendingApplicationSerializer, UserApplicationSerializer, OtherApplicationSerializer

# Create your views here.
class ApplicationsRetrieveUpdate(RetrieveUpdateAPIView):
    def get_serializer_class(self):
        application = get_object_or_404(Application, id=self.kwargs['pk'], owner=self.request.user)
        if application.status == 'PENDING':
            return PendingApplicationSerializer
        return OtherApplicationSerializer

    def get_object(self):
        return get_object_or_404(Application, id=self.kwargs['pk'], owner=self.request.user)

class UserApplicationsListCreate(ListCreateAPIView):
    serializer_class = UserApplicationSerializer
    
    def get_queryset(self):
        sort_by = self.request.GET.get('sort', '')
        filter_val = self.request.GET.get('filter', '')

        set = Application.objects.filter(owner=self.request.user)

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
        application = Application.objects.create(**serializer.validated_data, status='PENDING', owner=self.request.user)