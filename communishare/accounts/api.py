from django.contrib import messages
from django.contrib.messages import get_messages
from django.http import HttpResponseRedirect, JsonResponse

from equipment.models import EncodeModelToJson
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

def get_user_messages(request):
    storage = get_messages(request)
    messages.info(request, 'HELLO WORLD')
    data = []
    for message in storage:
        data.append(message.message)
    return JsonResponse(data, safe=False)

def signed_user(request):
    user = {'name': request.user.username}
    if request.user.username != '':
        user['email'] = request.user.email
        user['id'] = request.user.pk
        user['activity'] = request.user.is_active
        user['items'] = [x for x in request.user.items.all()]
    return JsonResponse(user, safe=False, encoder=EncodeModelToJson)


def signout(request):
    logout(request)
    return HttpResponseRedirect('/')
