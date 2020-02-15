from rest_framework import routers
from .api import EquipmentViewSet

router = routers.DefaultRouter()
router.register('api/items', EquipmentViewSet, 'items')
urlpatterns = router.urls
