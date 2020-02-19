from django.http import HttpResponseRedirect, JsonResponse

from .models import User
from rest_framework import viewsets
from .serializers import UserListSerializer, UserSerializer


class UserListViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserListSerializer


class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer


def signed_user(request):
    current_user = request.user
    print(current_user)
    user = {
        'name': request.user.username,
        'email': request.user.email,
        'id': request.user.pk,
        'activity': request.user.is_active,
    }
    return JsonResponse(user, safe=False)
