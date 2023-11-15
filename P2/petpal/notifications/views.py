from django.shortcuts import render
from django.urls import reverse
from django.shortcuts import get_object_or_404
from rest_framework.generics import RetrieveUpdateDestroyAPIView, ListCreateAPIView
from .models import Notification
from .serializers import ReadNotificationSerializer, UnreadNotificationSerializer, UserNotificationSerializer

# Create your views here.
class NotificationsRetrieveUpdateDestroy(RetrieveUpdateDestroyAPIView):
    def get_serializer_class(self):
        notification = get_object_or_404(Notification, id=self.kwargs['pk'], owner=self.request.user)
        if notification.state == 'unread':
            return UnreadNotificationSerializer
        return ReadNotificationSerializer
        
    def get_object(self):
        return get_object_or_404(Notification, id=self.kwargs['pk'], owner=self.request.user)

class UserNotificationsListCreate(ListCreateAPIView):
    serializer_class = UserNotificationSerializer

    def get_queryset(self):
        sort_by = self.request.GET.get('sort', '')
        filter_val = self.request.GET.get('filter', '')

        set = Notification.objects.filter(owner=self.request.user)

        if filter_val.lower() == 'read':
            set = set.filter(state='read')
        elif filter_val.lower() == 'unread':
            set = set.filter(status='unread')
        
        if sort_by.lower() == 'creation_time':
            set = set.order_by('creation_time')

        return set

    def perform_create(self, serializer):
        notification = Notification.objects.create(**serializer.validated_data, state='unread', owner=self.request.user)
