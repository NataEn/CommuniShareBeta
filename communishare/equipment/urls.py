from rest_framework import routers
from .api import EquipmentViewSet, ShareEquipmentViewSet
from django.urls import path
from . import views
app_name = 'equipment'

router = routers.DefaultRouter()
router.register(r'items', EquipmentViewSet, basename='items')
router.register(r'share-item', ShareEquipmentViewSet, basename="share")

urlpatterns = [
    path('', views.ItemListView.as_view(), name='item_list'),
    path('share-item', views.item_create, name='item_create'),
    # path('share-item', ShareEquipmentViewSet, name='share')
    path('item/<int:pk>/', views.ItemDetailView.as_view(), name='detail'),
]

#urlpatterns += router.urls