from rest_framework.serializers import ModelSerializer, PrimaryKeyRelatedField
from .models import Blog, Like

class UserBlogSerializer(ModelSerializer):
    owner = PrimaryKeyRelatedField(read_only=True)
    class Meta:
        model = Blog
        fields = '__all__'

class UserLikeSerializer(ModelSerializer):
    owner = PrimaryKeyRelatedField(read_only=True)
    blog = PrimaryKeyRelatedField(read_only=True)
    class Meta:
        model = Like
        fields = '__all__'
