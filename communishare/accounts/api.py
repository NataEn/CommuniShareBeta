from django.http import HttpResponseRedirect, JsonResponse

from .models import User
from rest_framework import viewsets
from .serializers import UserListSerializer, UserSerializer
from django.contrib.auth import logout


class UserListViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserListSerializer


class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer


def signed_user(request):
    user = {'name': request.user.username}
    if request.user.username != '':
        user['email'] = request.user.email
        user['id'] = request.user.pk
        user['activity'] = request.user.is_active
    return JsonResponse(user, safe=False)


def signout(request):
    logout(request)
