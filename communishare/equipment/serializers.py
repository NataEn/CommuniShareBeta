from rest_framework import serializers
from .models import Item


# equipment serializers
class EquipmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Item
        fields = ["name", "condition", "description", "availability"]


class ItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = Item
        fields = ["name", "condition", "description", "availability"]
