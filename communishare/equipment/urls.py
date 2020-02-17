from rest_framework import routers
from .api import EquipmentViewSet
from django.urls import path
from . import views
app_name = 'equipment'
urlpatterns = [
    path('', views.item_list, name='item_list'),
    path('share-item', views.item_create, name='item_create')
]
# router = routers.DefaultRouter()
# router.register('api/items', EquipmentViewSet, 'items')
# urlpatterns = router.urls
