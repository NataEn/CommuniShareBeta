from rest_framework import routers
from .api import UserViewSet
from django.urls import include, path

router = routers.DefaultRouter()
router.register('api/user', UserViewSet, 'user')

urlpatterns = [
    path("users/", include(router.urls)),
]
