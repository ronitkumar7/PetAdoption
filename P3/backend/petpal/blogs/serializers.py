from rest_framework.serializers import ModelSerializer, PrimaryKeyRelatedField
from .models import Blog

class UserBlogSerializer(ModelSerializer):
    owner = PrimaryKeyRelatedField(read_only=True)
    class Meta:
        model = Blog
        fields = '__all__'
