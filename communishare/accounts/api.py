from .models import User
from rest_framework import viewsets
from .serializers import UserSerializer


# User viewset:
class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
