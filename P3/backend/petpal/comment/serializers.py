from rest_framework.serializers import ModelSerializer, DateTimeField, ListField, \
    PrimaryKeyRelatedField, HyperlinkedRelatedField
from .models import Comment

class CommentSerializer(ModelSerializer):
    class Meta:
        model = Comment
        exclude = ['application', 'user', 'shelter']
        read_only_fields = ['create_time']

# class ReplySerializer(ModelSerializer):
#     class Meta:
#         model = Reply
#         exclude = []
#         read_only_fields = ['create_time']