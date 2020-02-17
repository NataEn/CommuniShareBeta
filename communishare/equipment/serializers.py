from rest_framework import serializers
from .models import Item

# equipment serializers
class EquipmentSerializer(serializers.ModelSerializer):
    class Meta:
        model=Item
        fields='__all__'
