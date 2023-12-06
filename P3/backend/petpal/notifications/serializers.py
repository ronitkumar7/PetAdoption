from rest_framework.serializers import ModelSerializer, PrimaryKeyRelatedField, ChoiceField
from .models import Notification

class ReadNotificationSerializer(ModelSerializer): 
    class Meta:
        model = Notification
        fields = '__all__'
        read_only_fields = ['owner', 'state', 'creation_time', 'message', 'link']

class UnreadNotificationSerializer(ModelSerializer): 
    state = ChoiceField(['read'])  

    class Meta:
        model = Notification
        fields = '__all__'
        read_only_fields = ['owner', 'creation_time', 'message', 'link']

class UserNotificationSerializer(ModelSerializer):
    state = ChoiceField(['unread'], read_only=True)

    class Meta:
        model = Notification
        fields = '__all__'
