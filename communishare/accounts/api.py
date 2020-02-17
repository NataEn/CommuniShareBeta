from .models import User
from rest_framework import viewsets
from .serializers import UserListSerializer
from .serializers import UserSerializer

class UserListViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserListSerializer

class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
