from .models import Item
from rest_framework import viewsets, permissions
from rest_framework import status
from .serializers import EquipmentSerializer, ItemSerializer
from django.http import HttpResponse, JsonResponse
from rest_framework.parsers import JSONParser
from rest_framework.response import Response



# Equipment viewset:
class EquipmentViewSet(viewsets.ViewSet):
    def retrieve(self, request):
        items = Item.objects.all()
        serializer = EquipmentSerializer(items, many=True)
        return JsonResponse(serializer.data, safe=False)

class ShareEquipmentViewSet(viewsets.ViewSet):
    def retrieve(self, request):
        item = Item.objects.last()
        serializer = ItemSerializer(item, many=True)
        return JsonResponse(serializer.data, safe=False)

    def add(self, request):
        data = JSONParser().parse(request)
        serializer = ItemSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data, status=201)
        return JsonResponse(serializer.errors, status=400)






