from rest_framework import serializers
from .models import User


class UserListSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id','is_superuser','username','first_name', 'last_name','image')

class UserSerializer(serializers.ModelSerializer):
    current_user = serializers.SerializerMethodField('_user')
    def _user(self, obj):
        request = getattr(self.context, 'request', None)
        if request:
            return request.user

    class Meta:
        model = User
        fields = ('id','current_user','is_superuser','username','first_name', 'last_name','image')
