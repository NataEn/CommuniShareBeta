from .models import Item
from rest_framework import viewsets, permissions
from .serializers import EquipmentSerializer


# Equipment viewset:
class EquipmentViewSet(viewsets.ModelViewSet):
    queryset = Item.objects.all()
    permission_classes = [permissions.AllowAny]
    serializer_class = EquipmentSerializer
